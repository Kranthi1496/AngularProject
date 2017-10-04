	
	var App = angular.module('fbangular', ['ngRoute','jcs-autoValidate']);
  
 //capturing image/file to upload
 App.directive("fileInput", function($parse){  
      return{  
           link: function($scope, element, attrs){  
                element.on("change", function(event){  
                     var files = event.target.files;  
                     console.log(files); 
                     $scope.test= files[0].name;
                     $parse(attrs.fileInput).assign($scope, element[0].files);  
                     $scope.$apply();  
                });  
           }  
      }  
 }); 



	// configuring our routes
	App.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'mainController'
			})

			.when('/register', {
				templateUrl : 'views/register.html',
				controller  : 'registerController'
			})

			.when('/login', {
				templateUrl : 'views/login.html',
				controller  : 'loginController'
			})

			.when('/profilepage', {
				templateUrl : 'views/profilepage.html',
				controller  : 'profilepageController'
			})

      .when('/timeline', {
        templateUrl : 'views/homepage.html',
        controller  : 'homepageController'
      })

			.otherwise( {
				redirectTo:function(){
				 alert("Sorry Url not valid you are redirected to home page");

				 return '/';
				}
			});
	});


	App.controller('mainController', function($scope,$interpolate,$location,$rootScope) {
   $scope.loginobj = {};
   $scope.loginobj.showlogin = true;
   $scope.registerobj = {};
   $scope.registerobj.showregister=true;
   $scope.profileobj = {};
   $scope.profileobj.showprofile=!true;
   $scope.logoutobj = {};
   $scope.logoutobj.showlogout=!true;
   $scope.homeobj={};
   $scope.homeobj.showhome=!true;
   //$rootScope.kranthikumar='from root';
   var url=$interpolate('/')($scope);
     
      $scope.logout=function(){
        localStorage.removeItem("email");
        $scope.loginobj.showlogin = true;
        $scope.registerobj.showregister=true;
        $scope.profileobj.showprofile=!true;
        $scope.logoutobj.showlogout=!true;
        $scope.homeobj.showhome=!true;
        $location.path(url);
      }
	});

	App.controller('aboutController', function($scope) {
		$scope.message = 'This is about page';
	});

	App.controller('contactController', function($scope) {
		$scope.message = 'This is contact page';
	});


	App.controller('registerController', function($scope,$http,$location,$interpolate) {
     var list = [];
      $scope.list=list;
       var test = [];
        $scope.test=test;
        $scope.nameerror=!true;
        $scope.emailerror=!true;
	
/*                    submit                        */

      $scope.submit = function(form) {
          //console.log(this.form);
        $scope.submitted = true;
        $scope.test=this.form;
        $scope.failn='1';
        $scope.faile='1';
         if($scope.form.user && $scope.form.email && $scope.form.education && $scope.form.password && $scope.form.cpassword) {
            $http.post('api/user/register.php',{ 'user':$scope.form.user,
                                           'email':$scope.form.email,
                                       'education':$scope.form.education,
                                        'password': $scope.form.password})
                 .success(function (response) {
                    $scope.res1=response.data;
                    console.log($scope.res1);
                 

                      if(response.status === 'OK'){
                        $scope.list=response.data[0];
                        console.log(response);
                        console.log($scope.list.name);
                        var url=$interpolate('/profilepage')($scope);
                        console.log(url);
                          if(typeof(Storage) !== "undefined") {
  
                            localStorage.setItem("email",$scope.list.email);
    
   
                          } 

                         $location.path(url);
                      }
                      else{
                        // $scope.nameerror=true;
                        // $scope.emailerror=true;
                        // $scope.fail='0';
                        if(response.status === 'FAILN'){$scope.failn='0';}
                          if (response.status === 'FAILE') {$scope.faile='0';}

                      }
                });
              
                

         } //end if

      // }//end else
    
      };//end submit

	});

	App.controller('loginController', function($scope,$http,$location,$interpolate) {
     
     var list = [];
      $scope.list=list;
       //$scope.display=!true;
        $scope.submit = function(form) {
        	$scope.submitted = true;
           if($scope.form.email && $scope.form.password ) {
            $http.post('api/user/login.php',{'email':$scope.form.email,'password' : $scope.form.password})
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                        
                  if(response.status === 'OK'){
                    //console.log('entered');
                    $scope.list=response.data[0];
                    console.log(response);
                    console.log($scope.list.name);
                    var url=$interpolate('/timeline')($scope);
                    console.log(url);
                         if (typeof(Storage) !== "undefined") {
  
                         localStorage.setItem("email",$scope.list.email);
    
   
                         } 

                       $location.path(url);
                   }
                  else {
                    console.log('email/password wrong');
                   }
               });

         }
    
        };
	});

  App.controller('homepageController', function($scope,$routeParams,$http,$location,$interpolate,$controller) {
   
   $scope.loginobj.showlogin=!true;
   $scope.registerobj.showregister=!true;
   $scope.profileobj.showprofile=true;
   $scope.logoutobj.showlogout=true;
   $scope.homeobj.showhome=true; 
   var list = [];
   $scope.list=list;
   $scope.email=localStorage.getItem("email");
   //$controller('profilepageController', {$scope: $scope});

    /* fetch details */
      $http.post('api/profile/profiledetails.php',{'email':$scope.email })
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                  $scope.list=response.data[0];
                    if(response.status === 'OK'){
                      $scope.id=$scope.list.id;
                      $scope.name=$scope.list.name;
                      $scope.email=$scope.list.email;
                      $scope.education=$scope.list.education;

                    }


                    /*show friends*/
                       $http.post('api/friends/yourfriends.php',{'uid':$scope.id})
                                        
                            .success(function (response) {
                              console.log(response);
                               $scope.yourfriends=response.data;
                                console.log($scope.yourfriends);
                                 var x=$scope.yourfriends.length;
                                 var array=[];
                                 var k,p;
                                  for(var i=0;i<x;i++){
                                   p=$scope.yourfriends[i].uid;
                                   k=$scope.yourfriends[i].fid;
                                  // console.log($scope.id);
                                   var m=$scope.id;
                                    if(p!=m ){
                                     array.push(p);
                                    }
                                    if(k!=m ){
                                     array.push(k);
                                    }
                                }//end for
                                //console.log(array);
                                //farray contains your friends
                                $scope.farray=array;
                                //console.log($scope.farray);

                               
                                      /*find friends*/
                              $http.get('api/friends/findfriends.php')
                                        
                                   .success(function (response) {

                                     console.log(response);
                                      $scope.findfriends=response.data;
                                       var findfriendslength=$scope.findfriends.length;
                                        console.log(findfriendslength);
                                        //console.log($scope.farray.length);
                                         var sfarray=[];
                                         var m,l,q;
                                          for(m=0;m<findfriendslength;m++){
                                            q=$scope.findfriends[m].id;
                                             if(q!=$scope.id){
                                              sfarray.push(q);
                                               }
 
                                          }//end for
                                          console.log(sfarray);
                                          console.log(array);
                                          var farraylen=array.length;
                                          console.log(farraylen);
                                          var a,b;
                                          //filtering to add friends 
                                           for(a=0;a<farraylen;a++){
                                              for(b=0;b<findfriendslength;b++){
                                                if($scope.farray[a]==sfarray[b]){
                                                   sfarray.splice(b,1);
                                                  }
                                                }
                                             }
                                             console.log(sfarray);
                                             $scope.showfriendsarray=sfarray;
                 
                
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
                                        
           .success(function (response) {
             console.log(response);
              $scope.allusers=response.data;
               console.log($scope.allusers);
           });
      /*            end                  */


       /* Add friends */
          $scope.addfriend = function (friend) {
                    console.log(friend);
                    //$scope.btnshow=true;
                     var addfriendtolist=[];
                     $scope.addfriendtolist=friend;
                    // console.log($scope.addfriendtolist);
                     console.log($scope.addfriendtolist.id);
                    $http.post('api/friends/addfriend.php',{'uid':$scope.id,
                                                    'fid':$scope.addfriendtolist.id})
                                        
                          .success(function (response) {
                           console.log(response);
                         var url=$interpolate('/profilepage')($scope);
                          $location.path(url);
                           
                     });

                };
         /* */
   
      /*get all posts*/
        $http.get('api/posts/getallposts.php')
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.allposts=response.data;
                  console.log($scope.allposts);
                 
                  

                
                     });

        /**/


         $scope.select = function() {  
           $http.get("api/posts/select.php")  
                .success(function(response){  
                 $scope.images = response.data;  
                 console.log(response);

           });  
      } 

  });//homepage controller end

	App.controller('profilepageController', function($scope,$routeParams,$http,$location,$interpolate) {
    //$scope.testname=$routeParams.name;
	 
	 $scope.loginobj.showlogin=!true;
   $scope.registerobj.showregister=!true;
   $scope.profileobj.showprofile=true;
   $scope.logoutobj.showlogout=true;
   $scope.homeobj.showhome=true;
	 var list = [];
   $scope.list=list;
   var showposts=[];
   $scope.showposts=showposts;
   var findfriends=[];
   $scope.findfriends=findfriends;
   var yourfriends=[];
   $scope.yourfriends=yourfriends;
   var friendsposts=[];
   $scope.friendsposts=friendsposts;
   var allposts=[];
   $scope.allposts=allposts;
   var currentuserposts=[];
   $scope.currentuserposts=currentuserposts;
   $scope.kran=true;
   $scope.local=localStorage.getItem("email");
 
         /* fetch details */
      $http.post('api/profile/profiledetails.php',{'email':$scope.local })
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                  $scope.list=response.data[0];
                    if(response.status === 'OK'){
                      $scope.id=$scope.list.id;
                      $scope.name=$scope.list.name;
                      $scope.email=$scope.list.email;
                      $scope.education=$scope.list.education;

                    }


                    /*show friends*/
                       $http.post('api/friends/yourfriends.php',{'uid':$scope.id})
                                        
                            .success(function (response) {
                              console.log(response);
                               $scope.yourfriends=response.data;
                                console.log($scope.yourfriends);
                                 var x=$scope.yourfriends.length;
                                 var array=[];
                                 var k,p;
                                  for(var i=0;i<x;i++){
                                   p=$scope.yourfriends[i].uid;
                                   k=$scope.yourfriends[i].fid;
                                  // console.log($scope.id);
                                   var m=$scope.id;
                                    if(p!=m ){
                                     array.push(p);
                                    }
                                    if(k!=m ){
                                     array.push(k);
                                    }
                                }//end for
                                //console.log(array);
                                //farray contains your friends
                                $scope.farray=array;
                                //console.log($scope.farray);

                               
                                      /*find friends*/
                              $http.get('api/friends/findfriends.php')
                                        
                                   .success(function (response) {

                                     console.log(response);
                                      $scope.findfriends=response.data;
                                       var findfriendslength=$scope.findfriends.length;
                                        console.log(findfriendslength);
                                        //console.log($scope.farray.length);
                                         var sfarray=[];
                                         var m,l,q;
                                          for(m=0;m<findfriendslength;m++){
                                            q=$scope.findfriends[m].id;
                                             if(q!=$scope.id){
                                              sfarray.push(q);
                                               }
 
                                          }//end for
                                          console.log(sfarray);
                                          console.log(array);
                                          var farraylen=array.length;
                                          console.log(farraylen);
                                          var a,b;
                                          //filtering to add friends 
                                           for(a=0;a<farraylen;a++){
                                              for(b=0;b<findfriendslength;b++){
                                                if($scope.farray[a]==sfarray[b]){
                                                   sfarray.splice(b,1);
                                                  }
                                                }
                                             }
                                             console.log(sfarray);
                                             $scope.showfriendsarray=sfarray;
                 
                
                                       });

         /*  */
                               /*finding friends end*/

                          });
                    /*show friends end */


                    /*getting current users posts*/
                    $http.post('api/posts/currentuserposts.php',{'user':$scope.name })
                                        
                         .success(function (response) {
                            console.log(response);
                             $scope.posts=response.data;
                              console.log($scope.posts);
                
                         });
               /*           user posts end         */



               $scope.select();
               $scope.selectprofilepic();
           });

      /* fetch details end  */
          
            /*      fetch all users      */             
      $http.get('api/profile/allusers.php')
                                        
           .success(function (response) {
             console.log(response);
              $scope.allusers=response.data;
               console.log($scope.allusers);
           });
      /*            end                  */

       
       /*post status*/
        $scope.postsubmit = function(form) {
          if($scope.form.post){
              $http.post('api/posts/post.php',{'user':$scope.name,
                                          'uid':$scope.id,
                                          'post':$scope.form.post })
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.posts=response.data;
                 console.log($scope.posts);
                
                     });
             $scope.form.post='';


          }
        };
      /*   */

   
      
         /* Add friends */
          $scope.addfriend = function (friend) {
                    console.log(friend);
                    //$scope.btnshow=true;
                     var addfriendtolist=[];
                     $scope.addfriendtolist=friend;
                    // console.log($scope.addfriendtolist);
                     console.log($scope.addfriendtolist.id);
                    $http.post('api/friends/addfriend.php',{'uid':$scope.id,
                                                    'fid':$scope.addfriendtolist.id})
                                        
                          .success(function (response) {
                           console.log(response);
                         
                           
                     });

                };
         /* */

   /* upload image */
        $scope.uploadFile = function(){
          if($scope.test)  {console.log($scope.test);
           var form_data = new FormData();  
           console.log($scope.id);
          
           angular.forEach($scope.files, function(file){  
                form_data.append('file', file);  
                form_data.append('unique', $scope.id );
           });  
           
           $http.post('api/posts/upload.php', form_data, 
           {  
                transformRequest: angular.identity, //try to serialize our FormData object 
                headers: {'Content-Type': undefined,'Process-Data': false}  
           }).success(function(response){  
               // alert(response); 
               console.log(response);
                $scope.imagestatus=response; 
                $scope.select();  
           });  

           var oldInput = document.getElementById('File1');
           oldInput.value='';
         }//end if  
      }//end function
        
        $scope.select = function(){  
           $http.get("api/posts/select.php")  
                .success(function(response){  
                 $scope.images = response.data;  
                 console.log(response);

           });  
      }  

   /*  */



   /* upload profilepicture */
        $scope.uploadprofilepicture = function(){
          if($scope.test)  {
           var form_data = new FormData();  
           console.log($scope.id);
          
           angular.forEach($scope.files, function(file){  
                form_data.append('file', file);  
                form_data.append('unique', $scope.id );
           });  
           
           $http.post('api/posts/profilepicture.php', form_data, 
           {  
                transformRequest: angular.identity, //try to serialize our FormData object 
                headers: {'Content-Type': undefined,'Process-Data': false}  
           }).success(function(response){  
               // alert(response); 
               console.log(response);
                $scope.imagestatus=response; 
                $scope.selectprofilepic();  
           });  

           var clearinput = document.getElementById('File2');
           clearinput.value='';
         }//end if  
      }//end function
        
        $scope.selectprofilepic = function(){  
           $http.get("api/posts/selectprofilepicture.php")  
                .success(function(response){  
                 $scope.profilepics = response.data;  

                 console.log($scope.profilepics);
                 //console.log($scope.profilepics[0].uid);

                 var profilepicslength=$scope.profilepics.length;
                 var iterate=profilepicslength-1;
                 var i,j,k;
                 for(i=iterate;i>=0;i--){
                   if($scope.profilepics[i].uid==$scope.id){

                          $scope.showpic=$scope.profilepics[i].picid;
                          break;
                  }
                 }

           });  
      }  

   /*  */
 
        
       
        /*get all posts*/
        $http.get('api/posts/getallposts.php')
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.allposts=response.data;
                  console.log($scope.allposts);
                 
                  
                    
                
                     });

        /**/
       
     

    
      /*hide form*/
     // if ($scope.local) {
     //       $http.post('php/profile/profiletest.php',{'user':$scope.local })
           	                            
     //         .success(function (response) {
     //            $scope.res=response;
     //             console.log(response);

     //             if(response=='username exists'){
     //             	$scope.kran=!true;
     //             }
     //                 });
     //             }

         
      /**/
     

      /*Education details*/
        // $scope.submit = function(form) {
        
        //  if ($scope.form.user && $scope.form.school && $scope.form.college && $scope.form.address && $scope.form.workexperience ) {
        //    $http.post('php/profile/profile.php',{'user':$scope.form.user,
        //    	                             'school':$scope.form.school,
        //    	                             'college':$scope.form.college,
        //    	                             'address':$scope.form.address,
        //    	                          'workexperience' : $scope.form.workexperience})
        //      .success(function (response) {
        //         $scope.res=response;
        //          console.log(response);
 
        //        });

        //  }
    
        // };
    /* */
  // }

	});

