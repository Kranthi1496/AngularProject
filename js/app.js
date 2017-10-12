  var App = angular.module('fbangular', ['ngRoute', 'jcs-autoValidate']);

  //capturing image/file to upload
  App.directive("fileInput", function($parse) {
      return {
          link: function($scope, element, attrs) {
              element.on("change", function(event) {
                  var files = event.target.files;
                  console.log(files);
                  $scope.test = files[0].name;
                  $parse(attrs.fileInput).assign($scope, element[0].files);
                  $scope.$apply();
                  if ($scope.fileid == 'File3') {
                      $scope.uploadcoverphoto();
                  }
                  if ($scope.fileid == 'File2') {
                      $scope.uploadprofilepicture();
                  }
                  if ($scope.fileid == 'File1') {
                      $scope.uploadFile();
                  }

              });
          }
      }
  });



  // configuring our routes
  App.config(function($routeProvider) {
      $routeProvider

          // route for the home page
          .when('/', {
              templateUrl: 'views/home.html',
              controller: 'mainController'
          })

          .when('/register', {
              templateUrl: 'views/register.html',
              controller: 'registerController'
          })

          .when('/login', {
              templateUrl: 'views/login.html',
              controller: 'loginController'
          })

          .when('/profilepage', {
              templateUrl: 'views/profilepage.html',
              controller: 'profilepageController'
          })

          .when('/timeline', {
              templateUrl: 'views/homepage.html',
              controller: 'homepageController'
          })

          .when('/friend', {
              templateUrl: 'views/friendpage.html',
              controller: 'friendpageController'
          })

          .otherwise({
              redirectTo: function() {
                  alert("Sorry Url not valid you are redirected to home page");

                  return '/';
              }
          });
  });


  App.controller('mainController', function($scope, $interpolate, $location, $rootScope) {
      $scope.loginobj = {};
      $scope.loginobj.showlogin = true;
      $scope.registerobj = {};
      $scope.registerobj.showregister = true;
      $scope.profileobj = {};
      $scope.profileobj.showprofile = !true;
      $scope.logoutobj = {};
      $scope.logoutobj.showlogout = !true;
      $scope.homeobj = {};
      $scope.homeobj.showhome = !true;
      //$rootScope.kranthikumar='from root';
      var url = $interpolate('/')($scope);

      $scope.logout = function() {
          localStorage.removeItem("email");
          localStorage.removeItem("friendid");
          $scope.loginobj.showlogin = true;
          $scope.registerobj.showregister = true;
          $scope.profileobj.showprofile = !true;
          $scope.logoutobj.showlogout = !true;
          $scope.homeobj.showhome = !true;
          $location.path(url);
      }
  });

  App.controller('aboutController', function($scope) {
      $scope.message = 'This is about page';
  });

  App.controller('contactController', function($scope) {
      $scope.message = 'This is contact page';
  });


  App.controller('registerController', function($scope, $http, $location, $interpolate) {
      var list = [];
      $scope.list = list;
      var test = [];
      $scope.test = test;
      $scope.nameerror = !true;
      $scope.emailerror = !true;

      /*                    submit                        */

      $scope.submit = function(form) {
          //console.log(this.form);
          $scope.submitted = true;
          $scope.test = this.form;
          $scope.failn = '1';
          $scope.faile = '1';
          if ($scope.form.user && $scope.form.email && $scope.form.education && $scope.form.password && $scope.form.cpassword) {
              $http.post('api/user/register.php', {
                      'user': $scope.form.user,
                      'email': $scope.form.email,
                      'education': $scope.form.education,
                      'password': $scope.form.password
                  })
                  .success(function(response) {
                      $scope.res1 = response.data;
                      //console.log($scope.res1);


                      if (response.status === 'OK') {
                          $scope.list = response.data[0];
                          //console.log(response);
                          // console.log($scope.list.name);
                          var url = $interpolate('/profilepage')($scope);
                          //console.log(url);
                          if (typeof(Storage) !== "undefined") {

                              localStorage.setItem("email", $scope.list.email);


                          }

                          $location.path(url);
                      } else {

                          if (response.status === 'FAILN') { $scope.failn = '0'; }
                          if (response.status === 'FAILE') { $scope.faile = '0'; }

                      }
                  });



          } //end if

          // }//end else

      }; //end submit

  });

  App.controller('loginController', function($scope, $http, $location, $interpolate) {

      var list = [];
      $scope.list = list;
      //$scope.display=!true;
      $scope.submit = function(form) {
          $scope.submitted = true;
          if ($scope.form.email && $scope.form.password) {
              $http.post('api/user/login.php', { 'email': $scope.form.email, 'password': $scope.form.password })
                  .success(function(response) {
                      $scope.res = response;
                      //console.log(response);

                      if (response.status === 'OK') {
                          //console.log('entered');
                          $scope.list = response.data[0];
                          //console.log(response);
                          //console.log($scope.list.name);
                          var url = $interpolate('/timeline')($scope);
                          //console.log(url);
                          if (typeof(Storage) !== "undefined") {

                              localStorage.setItem("email", $scope.list.email);


                          }

                          $location.path(url);
                      } else {
                          console.log('email/password wrong');
                      }
                  });

          }

      };
  });

  App.controller('homepageController', function($scope, $routeParams, $http, $location, $interpolate, $controller) {

      $scope.loginobj.showlogin = !true;
      $scope.registerobj.showregister = !true;
      $scope.profileobj.showprofile = true;
      $scope.logoutobj.showlogout = true;
      $scope.homeobj.showhome = true;
      var list = [];
      $scope.list = list;
      var profilepics = [];
      $scope.profilepics = profilepics;
      $scope.email = localStorage.getItem("email");

      $http.get("api/posts/selectprofilepicture.php")
          .success(function(response) {
              $scope.profilepics = response.data;

          });
      /* fetch details */
      $http.post('api/profile/profiledetails.php', { 'email': $scope.email })

          .success(function(response) {
              $scope.res = response;
              //console.log(response);
              $scope.list = response.data[0];
              if (response.status === 'OK') {
                  $scope.id = $scope.list.id;
                  $scope.name = $scope.list.name;
                  $scope.email = $scope.list.email;
                  $scope.education = $scope.list.education;

              }


              /*show friends*/
              $http.post('api/friends/yourfriends.php', { 'uid': $scope.id })

                  .success(function(response) {
                      //console.log(response);
                      $scope.yourfriends = response.data;
                      //console.log($scope.yourfriends);
                      var x = $scope.yourfriends.length;
                      var array = [];
                      var k, p;
                      for (var i = 0; i < x; i++) {
                          p = $scope.yourfriends[i].uid;
                          k = $scope.yourfriends[i].fid;
                          // console.log($scope.id);
                          var m = $scope.id;
                          if (p != m) {
                              array.push(p);
                          }
                          if (k != m) {
                              array.push(k);
                          }
                      } //end for
                      //console.log(array);
                      //farray contains your friends
                      $scope.farray = array;
                      //console.log($scope.farray);


                      /*find friends*/
                      $http.get('api/friends/findfriends.php')

                          .success(function(response) {

                              //console.log(response);
                              $scope.findfriends = response.data;
                              var findfriendslength = $scope.findfriends.length;
                              //console.log(findfriendslength);
                              //console.log($scope.farray.length);
                              var sfarray = [];
                              var m, l, q;
                              for (m = 0; m < findfriendslength; m++) {
                                  q = $scope.findfriends[m].id;
                                  if (q != $scope.id) {
                                      sfarray.push(q);
                                  }

                              } //end for
                              // console.log(sfarray);
                              //console.log(array);
                              var farraylen = array.length;
                              // console.log(farraylen);
                              var a, b;
                              //filtering to add friends 
                              for (a = 0; a < farraylen; a++) {
                                  for (b = 0; b < findfriendslength; b++) {
                                      if ($scope.farray[a] == sfarray[b]) {
                                          sfarray.splice(b, 1);
                                      }
                                  }
                              }
                              // console.log(sfarray);
                              $scope.showfriendsarray = sfarray;


                          });

                      /*  */
                      /*finding friends end*/

                  });
              /*show friends end */

              $scope.select();
          });
      /*fetch details end*/


      /*      fetch all users      */
      $http.get('api/profile/allusers.php')

          .success(function(response) {
              // console.log(response);
              $scope.allusers = response.data;
              //console.log($scope.allusers);
          });
      /*            end                  */


      /* Add friends */
      $scope.addfriend = function(friend) {
          // console.log(friend);
          //$scope.btnshow=true;
          var addfriendtolist = [];
          $scope.addfriendtolist = friend;
          // console.log($scope.addfriendtolist);
          // console.log($scope.addfriendtolist.id);
          $http.post('api/friends/addfriend.php', {
                  'uid': $scope.id,
                  'fid': $scope.addfriendtolist.id
              })

              .success(function(response) {
                  // console.log(response);
                  var url = $interpolate('/profilepage')($scope);
                  $location.path(url);

              });

      };
      /* */

      /*get all posts*/
      $http.get('api/posts/getallposts.php')

          .success(function(response) {
              $scope.res = response;
              //console.log(response);
              $scope.allposts = response.data;
              //console.log($scope.allposts);




          });

      /**/


      $scope.select = function() {
          $http.get("api/posts/select.php")
              .success(function(response) {
                  $scope.images = response.data;
                  //console.log(response);

              });
      }

  }); //homepage controller end

  App.controller('profilepageController', function($scope, $routeParams, $http, $location, $interpolate) {
      //$scope.testname=$routeParams.name;
      //vm = this;
      $scope.showsecondrow = true;
      $scope.showusersposts = true;
      $scope.showuserphotos = true;
      $scope.heading = !true;
      $scope.showdetails = !true;
      $scope.showuserpoststop = !true;
      $scope.showuserphotostop = !true;

      $scope.loginobj.showlogin = !true;
      $scope.registerobj.showregister = !true;
      $scope.profileobj.showprofile = true;
      $scope.logoutobj.showlogout = true;
      $scope.homeobj.showhome = true;
      var list = [];
      $scope.list = list;
      var showposts = [];
      $scope.showposts = showposts;
      var findfriends = [];
      $scope.findfriends = findfriends;
      var yourfriends = [];
      $scope.yourfriends = yourfriends;
      var friendsposts = [];
      $scope.friendsposts = friendsposts;
      var allposts = [];
      $scope.allposts = allposts;
      var currentuserposts = [];
      $scope.currentuserposts = currentuserposts;
      $scope.kran = true;
      $scope.local = localStorage.getItem("email");

      $scope.aboutme = function() {
          $scope.showsecondrow = !true;
          $scope.heading = true;
          $scope.showdetails = true;
          $scope.showuserphotos = !true;
          $scope.showuserpoststop = !true;
          $scope.showusersposts = !true;
          $scope.showuserphotostop = !true;
          $scope.param = '1';
      }

      $scope.showposts = function() {
          $scope.showsecondrow = !true;
          $scope.showdetails = !true;
          $scope.showuserphotos = !true;
          $scope.showuserpoststop = true;
          $scope.showusersposts = !true;
          $scope.showuserphotostop = !true;
          $scope.heading = true;
          $scope.param = '2';

      }

      $scope.showimages = function() {
          $scope.showsecondrow = !true;
          $scope.showdetails = !true;
          $scope.showuserphotos = !true;
          $scope.showuserpoststop = !true;
          $scope.showusersposts = !true;
          $scope.showuserphotostop = true;
          $scope.heading = true;
          $scope.param = '3';
      }

      /* fetch details */
      $http.post('api/profile/profiledetails.php', { 'email': $scope.local })

          .success(function(response) {
              $scope.res = response;
              // console.log(response);
              $scope.list = response.data[0];
              if (response.status === 'OK') {
                  $scope.id = $scope.list.id;
                  $scope.name = $scope.list.name;
                  $scope.email = $scope.list.email;
                  $scope.education = $scope.list.education;

              }


              /*show friends*/
              $http.post('api/friends/yourfriends.php', { 'uid': $scope.id })

                  .success(function(response) {
                      //console.log(response);
                      $scope.yourfriends = response.data;
                      // console.log($scope.yourfriends);
                      var x = $scope.yourfriends.length;
                      var array = [];
                      var k, p;
                      for (var i = 0; i < x; i++) {
                          p = $scope.yourfriends[i].uid;
                          k = $scope.yourfriends[i].fid;
                          // console.log($scope.id);
                          var m = $scope.id;
                          if (p != m) {
                              array.push(p);
                          }
                          if (k != m) {
                              array.push(k);
                          }
                      } //end for
                      //console.log(array);
                      //farray contains your friends
                      $scope.farray = array;
                      //console.log($scope.farray);



                      /*find friends*/
                      $http.get('api/friends/findfriends.php')

                          .success(function(response) {

                              // console.log(response);
                              $scope.findfriends = response.data;
                              var findfriendslength = $scope.findfriends.length;
                              // console.log(findfriendslength);
                              //console.log($scope.farray.length);
                              var sfarray = [];
                              var m, l, q;
                              for (m = 0; m < findfriendslength; m++) {
                                  q = $scope.findfriends[m].id;
                                  if (q != $scope.id) {
                                      sfarray.push(q);
                                  }

                              } //end for
                              // console.log(sfarray);
                              //  console.log(array);
                              var farraylen = array.length;
                              // console.log(farraylen);
                              var a, b;
                              //filtering to add friends 
                              for (a = 0; a < farraylen; a++) {
                                  for (b = 0; b < findfriendslength; b++) {
                                      if ($scope.farray[a] == sfarray[b]) {
                                          sfarray.splice(b, 1);
                                      }
                                  }
                              }
                              // console.log(sfarray);
                              $scope.showfriendsarray = sfarray;


                          });

                      /*  */
                      /*finding friends end*/

                  });
              /*show friends end */


              /*getting current users posts*/
              $http.post('api/posts/currentuserposts.php', { 'user': $scope.name })

                  .success(function(response) {
                      //console.log(response);
                      $scope.posts = response.data;
                      // console.log($scope.posts);

                  });
              /*           user posts end         */



              $scope.select();
              $scope.selectprofilepic();
          });

      /* fetch details end  */

      /*      fetch all users      */
      $http.get('api/profile/allusers.php')

          .success(function(response) {
              //console.log(response);
              $scope.allusers = response.data;
              //console.log($scope.allusers);
          });
      /*            end                  */


      /*post status*/
      $scope.postsubmit = function(form) {
          if ($scope.form.post) {
              $http.post('api/posts/post.php', {
                      'user': $scope.name,
                      'uid': $scope.id,
                      'post': $scope.form.post
                  })

                  .success(function(response) {
                      $scope.res = response;
                      //console.log(response);
                      $scope.posts = response.data;
                      //console.log($scope.posts);

                  });
              $scope.form.post = '';


          }
      };
      /*   */



      /* Add friends */
      $scope.addfriend = function(friend) {
          //console.log(friend);
          //$scope.btnshow=true;
          var addfriendtolist = [];
          $scope.addfriendtolist = friend;
          // console.log($scope.addfriendtolist);
          // console.log($scope.addfriendtolist.id);
          $http.post('api/friends/addfriend.php', {
                  'uid': $scope.id,
                  'fid': $scope.addfriendtolist.id
              })

              .success(function(response) {
                  //console.log(response);


              });

      };
      /* */

      /*receiving id of file upload*/
      $scope.send_id = function(event) {
          //alert(event.target.id);
          $scope.fileid = event.target.id;
      }
      /**/

      /* upload image */
      $scope.uploadFile = function() {

          if ($scope.test) { //console.log($scope.test);
              var form_data = new FormData();
              //console.log($scope.id);

              angular.forEach($scope.files, function(file) {
                  form_data.append('file', file);
                  form_data.append('unique', $scope.id);
              });

              $http.post('api/posts/upload.php', form_data, {
                  transformRequest: angular.identity, //try to serialize our FormData object 
                  headers: { 'Content-Type': undefined, 'Process-Data': false }
              }).success(function(response) {
                  // alert(response); 
                  // console.log(response);
                  $scope.imagestatus = response;
                  $scope.select();
              });

              var oldInput = document.getElementById('File1');
              oldInput.value = '';
          } //end if  
      } //end function

      $scope.select = function() {
          $http.get("api/posts/select.php")
              .success(function(response) {
                  $scope.images = response.data;
                  //console.log(response);

              });
      }

      /*  */



      /* upload profilepicture */
      $scope.uploadprofilepicture = function() {
          // console.log($scope.test);
          if ($scope.test) {
              var form_data = new FormData();
              // console.log($scope.id);

              angular.forEach($scope.files, function(file) {
                  form_data.append('file', file);
                  form_data.append('unique', $scope.id);
                  form_data.append('type', 'PRIMARY');
              });

              $http.post('api/posts/profilepicture.php', form_data, {
                  transformRequest: angular.identity, //try to serialize our FormData object 
                  headers: { 'Content-Type': undefined, 'Process-Data': false }
              }).success(function(response) {
                  // alert(response); 
                  // console.log(response);
                  $scope.imgstatus = response;

                  $scope.selectprofilepic();
              });

              var clearinput = document.getElementById('File2');
              clearinput.value = '';
          } //end if  
      } //end function
      $scope.showcover = true;
      $scope.showprofilepic = true;
      $scope.selectprofilepic = function() {
          $http.get("api/posts/selectprofilepicture.php")
              .success(function(response) {
                  $scope.profilepics = response.data;

                  $scope.pplength = $scope.profilepics.length;
                  console.log($scope.profilepics);
                  console.log($scope.pplength);
                  console.log($scope.profilepics[34].pic_type);

                  var start, end;
                  for (start = 0; start < $scope.pplength; start++) {

                      if ($scope.id == $scope.profilepics[start].uid && $scope.profilepics[start].pic_type == 'COVER') {

                          $scope.showcover = false;

                      }

                      if ($scope.id == $scope.profilepics[start].uid && $scope.profilepics[start].pic_type == 'PRIMARY') {

                          $scope.showprofilepic = false;

                      }

                  }

              });
      }




      /*  */


      /* upload coverphoto */
      $scope.uploadcoverphoto = function() {
          //console.log($scope.test);
          if ($scope.test) {
              var form_data = new FormData();
              //console.log($scope.id);

              angular.forEach($scope.files, function(file) {
                  form_data.append('file', file);
                  form_data.append('unique', $scope.id);
                  form_data.append('type', 'COVER');
              });

              $http.post('api/posts/profilepicture.php', form_data, {
                  transformRequest: angular.identity, //try to serialize our FormData object 
                  headers: { 'Content-Type': undefined, 'Process-Data': false }
              }).success(function(response) {
                  // alert(response); 
                  //console.log(response);
                  $scope.coverstatus = response;

                  $scope.selectprofilepic();
              });

              var clearcover = document.getElementById('File3');
              clearcover.value = '';
          } //end if  
      } //end function


      /*get all posts*/
      $http.get('api/posts/getallposts.php')

          .success(function(response) {
              $scope.res = response;
              // console.log(response);
              $scope.allposts = response.data;
              // console.log($scope.allposts);




          });

      /**/

      /*go to friend profile*/
      $scope.fetch = function(pic) {
          //console.log(pic.uid);
          $scope.friend_id = pic.uid;
          var url = $interpolate('/friend')($scope);
          if (typeof(Storage) !== "undefined") {
              localStorage.setItem("friendid", $scope.friend_id);
          }
          $location.path(url);

      }
      /**/


  });


  App.controller('friendpageController', function($scope, $http, $location, $interpolate) {
      $scope.loginobj.showlogin = !true;
      $scope.registerobj.showregister = !true;
      $scope.profileobj.showprofile = true;
      $scope.logoutobj.showlogout = true;
      $scope.homeobj.showhome = true;
      var userdetails = [];
      var profilepics = [];
      var yourfriends = [];
      var posts = [];
      var images = [];
      $scope.images = images;
      $scope.posts = posts;
      $scope.profilepics = profilepics;
      $scope.userdetails = userdetails;
      $scope.yourfriends = yourfriends;
      $scope.person_id = localStorage.getItem("friendid");

      $http.post('api/friends/frienddetails.php', { 'uid': $scope.person_id })

          .success(function(response) {
              // console.log(response);
              $scope.userdetails = response.data;
              //console.log($scope.userdetails);
              //console.log($scope.userdetails[0].name);
              $scope.username = $scope.userdetails[0].name;
              $scope.education = $scope.userdetails[0].education;
              $scope.email_id = $scope.userdetails[0].email;
              $http.get("api/posts/selectprofilepicture.php")
                  .success(function(response) {
                      $scope.profilepics = response.data;

                      //console.log($scope.profilepics);
                  });

              $http.post('api/friends/yourfriends.php', { 'uid': $scope.person_id })

                  .success(function(response) {
                      // console.log(response);
                      $scope.yourfriends = response.data;
                      var x = $scope.yourfriends.length;
                      var array = [];
                      var k, p;
                      for (var i = 0; i < x; i++) {
                          p = $scope.yourfriends[i].uid;
                          k = $scope.yourfriends[i].fid;
                          // console.log($scope.id);
                          var m = $scope.person_id;
                          if (p != m) {
                              array.push(p);
                          }
                          if (k != m) {
                              array.push(k);
                          }
                      } //end for
                      //console.log(array);
                      //farray contains your friends
                      $scope.farray = array;

                      // console.log($scope.farray);
                      // console.log($scope.profilepics);

                  });


              /*getting current users posts*/
              $http.post('api/posts/currentuserposts.php', { 'user': $scope.username })

                  .success(function(response) {
                      //console.log(response);
                      $scope.posts = response.data;
                      //console.log($scope.posts);

                  });
              /*           user posts end         */


              $http.get("api/posts/select.php")
                  .success(function(response) {
                      $scope.images = response.data;
                      // console.log(response);

                  });

          });


  });