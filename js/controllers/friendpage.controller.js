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