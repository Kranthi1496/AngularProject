 App.controller('homepageController', function($scope, $routeParams, $http, $location, $controller) {
   if(localStorage.getItem("email") != null) {
      $scope.loginobj.showlogin = !true;
      $scope.registerobj.showregister = !true;
      $scope.profileobj.showprofile = true;
      $scope.logoutobj.showlogout = true;
      $scope.homeobj.showhome = true;

      $scope.notifyobj.shownotifications = true;
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

                $scope.postandlikefilter();
              
              /*show friends*/
              $http.post('api/friends/yourfriends.php', { 'uid': $scope.id })

                  .success(function(response) {
                      //console.log(response);
                      $scope.yourfriends = response.data;
                      //console.log($scope.yourfriends);
                      var x = $scope.yourfriends.length;
                      var array = [];
                      var k, p;
                       for(var i = 0; i < x; i++) {
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
                      array.push($scope.id);
                      $scope.farray = array;
                      //console.log("my friends"+ $scope.farray);


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
                              for(m = 0; m < findfriendslength; m++) {
                                   q = $scope.findfriends[m].id;
                                   if(q != $scope.id) {
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

              $http.post('api/friends/pendingrequest.php', { 'uid': $scope.id })
              .success(function(response) {
              // console.log(response);
              $scope.pendingrequests = response.data;
              $scope.pendingrequestslength= $scope.pendingrequests.length;
             console.log($scope.pendingrequests);

                });

               $http.post('api/friends/notification.php', { 'uid': $scope.id })
              .success(function(response) {
              
              $scope.getnotification = response.data;
               console.log("notification"+response.data);
              $scope.notificationlength=$scope.getnotification.length;
             console.log( "length"  + $scope.getnotificationlength);
                });
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
        var addfriendtolist = [];
        $scope.addfriendtolist = friend;
        $scope.no='NO';
          // console.log($scope.addfriendtolist);
          // console.log($scope.addfriendtolist.id);
        $http.post('api/friends/addfriend.php', {
                  'uid': $scope.id,
                  'fid': $scope.addfriendtolist.id,
                  'status':$scope.no,
                  'notification':$scope.no

              })

            .success(function(response) {
              
                  var url='/profilepage';
                  $location.path(url);

              });

      };
      /* */
       /* Confirm friend */
      $scope.accept = function(friend) {
        $scope.friend_id=friend.id;
        $scope.yes='YES';
        $http.post('api/friends/confirmfriend.php', {
                   'uid': $scope.id,
                  'fid': $scope.friend_id,
                  'status':$scope.yes,
                  'notification':$scope.yes

                  })

              .success(function(response) {
                 
                  var url='/profilepage';
                  $location.path(url);

              });

      };
      /* */
       
       /* Reject friend */
      $scope.reject = function(friend) {
        $scope.friend_id=friend.id;
        $http.post('api/friends/rejectfriend.php', {
                   'uid': $scope.id,
                  'fid': $scope.friend_id
                 
                  })

              .success(function(response) {
                 
                  var url='/profilepage';
                  $location.path(url);

              });

      };
      /* */
    
      /*get all posts*/
      $scope.postandlikefilter=function(){
        $http.get('api/posts/getallposts.php')

            .success(function(response) {
               $scope.res = response;
              //console.log(response);
               $scope.allposts = response.data;
           
                 
                     $http.get("api/likes/getlikes.php")
                       .success(function(response) {
                        $scope.getlikes = response.data;


                         var postandlike=[];
            
                         //console.log($scope.allposts[0]);
                            var pl=$scope.allposts.length;
                             var ll=$scope.getlikes.length;
             
                            //   console.log($scope.getlikes);
                               
                    //*******************likes count**********//
                           var temparray=[];
                           for(var a3=0;a3<1000;a3++){
                            temparray[a3]=0;
                           }
                            //console.log(temparray);
                           var a1,a2;
                           for(a1=0;a1<ll;a1++){
                          //  console.log($scope.getlikes[1].pid);
                            var ci = parseInt($scope.getlikes[a1].pid);
                               temparray[ci]++;

                           }
                         
                           //**********end**********//
                                
                          //********main logic**********//
                            for(i=0;i<pl;i++){
                               var temp = {  'name':$scope.allposts[i].name,
                                              'uid':$scope.allposts[i].uid,
                                              'pid':$scope.allposts[i].pid,
                                             'post': $scope.allposts[i].post, 
                                             'type': gettype($scope.allposts[i].pid, $scope.id) , 
                                            'count':count($scope.allposts[i].pid)
                                          };
                              
                                    postandlike.push(temp);
                              }

                         
                                function gettype(postid,userid){
                                  var negativestatus='no';
                                    for (z = 0; z < ll; z++) {
                                      if ($scope.getlikes[z].pid == postid && $scope.getlikes[z].uid == userid) {
                                       var sendtype=$scope.getlikes[z].type;
                                        return sendtype;
                                        }
                                    }

                                      return negativestatus;
                                 }
                                 var pllen=postandlike.length;
                                // console.log('before'+pl);
                              // console.log('transformed'+pllen);
                               console.log(postandlike);
                                function count(c){
                                  return temparray[c];
                                }
                               $scope.likefilter=postandlike;
                                //end//

                        });
                  //}
          });
}
      /**/


      $scope.select = function() {
          $http.get("api/posts/select.php")
              .success(function(response) {
                  $scope.images = response.data;
                  //console.log(response);

              });
      }

      /*like section*/
      $scope.like=function(like,getid){

        //console.log(like);
        $scope.typestats=getid.target.id;
        var post_like=[];
        $scope.post_like=like;
         $http.post('api/likes/like.php', {
                  'uid': $scope.id,
                  'pid': $scope.post_like.pid,
                  'type': $scope.typestats
              })

              .success(function(response) {
                 //  console.log(response);
                 $scope.postandlikefilter();
                 // $scope.likescall();
              });
      }
      /**/

      /*notifications*/
      
      $scope.test=function(){
        $scope.notify=true;
        console.log("clicked");
      }
      /**/

    }
    else{
      alert("session expired");
    // var tempurl = $interpolate('/')($scope); 
    var tempurl='/';
     $location.path(tempurl);
    }

  }); //homepage controller end