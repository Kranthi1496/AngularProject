	
	var App = angular.module('kranthi', ['ngRoute']);
  
	// configuring our routes
	App.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})

			.when('/register', {
				templateUrl : 'pages/register.html',
				controller  : 'registerController'
			})

			.when('/login', {
				templateUrl : 'pages/login.html',
				controller  : 'loginController'
			})

			.when('/profilepage', {
				templateUrl : 'pages/profilepage.html',
				controller  : 'profilepageController'
			})

			// .when('/kran', {
			// 	redirectTo:function(){
			// 		return '/contact';
			// 	}
			

			// })
          
			.otherwise( {
				// templateUrl : 'pages/home.html',
				// controller  : 'mainController'
				//template:"<h1>Invalid route</h1>"
				redirectTo:function(){
				 alert("Sorry Url not valid you are redirected to home page");

				 return '/';
				}
			});
	});


	App.controller('mainController', function($scope,$interpolate,$location) {
   $scope.loginobj = {};
   $scope.loginobj.showlogin = true;
   $scope.registerobj = {};
   $scope.registerobj.showregister=true;
   $scope.profileobj = {};
   $scope.profileobj.showprofile=!true;
   $scope.logoutobj = {};
   $scope.logoutobj.showlogout=!true;
   var url=$interpolate('/')($scope);
       $scope.localvariable=localStorage.getItem("name");
       console.log($scope.localvariable);
      
     $scope.logout=function(){
        localStorage.removeItem("name");
        $scope.loginobj.showlogin = true;
        $scope.registerobj.showregister=true;
        $scope.profileobj.showprofile=!true;
        $scope.logoutobj.showlogout=!true;
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
	
/*                    submit                        */

      $scope.submit = function(form) {
          //console.log(this.form);
        $scope.submitted = true;
        $scope.test=this.form;
         if($scope.form.user && $scope.form.email && $scope.form.company &&$scope.form.password) {
            $http.post('php/register.php',{ 'user':$scope.form.user,
                                        'email' : $scope.form.email,
                                        'company':$scope.form.company,
                                        'password' : $scope.form.password})
                 .success(function (response) {
                    $scope.res=response;
                    console.log($scope.res);
                    $scope.res1=response;

                      if(response!='Username already exists Try another'){
                        $scope.list=response.data[0];
                        console.log(response);
                        console.log($scope.list.name);
                        //var url=$interpolate('/profilepage/{{list.name}}/{{list.email}}/{{list.company}}')($scope);
                        var url=$interpolate('/profilepage')($scope);
                        console.log(url);
                          if(typeof(Storage) !== "undefined") {
  
                            localStorage.setItem("name",$scope.list.name);
    
   
                          } 

                         $location.path(url);
                      }
                });
              
                      $scope.form.user='';
                       

         }
    
      };

	});

	App.controller('loginController', function($scope,$http,$location,$interpolate) {
     var list = [];
      $scope.list=list;
       //$scope.display=!true;
        $scope.submit = function(form) {
        	$scope.submitted = true;
         if ($scope.form.user && $scope.form.password ) {
           $http.post('php/login.php',{'user':$scope.form.user,'password' : $scope.form.password})
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                        
                  if(response!='username and password not matched' && response!='username is incorrect'){
                    $scope.list=response.data[0];
                    console.log(response);
                    console.log($scope.list.name);
                     //var url=$interpolate('/profilepage/{{list.name}}/{{list.email}}/{{list.company}}')($scope);
                     var url=$interpolate('/profilepage')($scope);
                      console.log(url);
                         if (typeof(Storage) !== "undefined") {
  
                         localStorage.setItem("name",$scope.list.name);
    
   
                         } 

                       $location.path(url);
                   }
                  else {
                    console.log('username/password wrong');
                   }
               });

         }
    
        };
	});

	App.controller('profilepageController', function($scope,$routeParams,$http,$location,$interpolate) {
    $scope.testname=$routeParams.name;
	 
	 $scope.loginobj.showlogin=!true;
   $scope.registerobj.showregister=!true;
   $scope.profileobj.showprofile=true;
   $scope.logoutobj.showlogout=true;
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
   $scope.local=localStorage.getItem("name");
      /* logout*/
      // $scope.logout=function(){
      // 	localStorage.removeItem("name");
      // 	$scope.parentobj.variable1 = true;
      //   $scope.registerobj.showregister=true;
      //     $scope.profileobj.showprofile=!true;
      // 	 $location.path(url);
      // }
      /**/

      
     // if($scope.testname==$scope.local){
        /*getting current users posts*/
        $http.post('php/currentuserposts.php',{'user':$scope.local })
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.posts=response.data;
                 console.log($scope.posts);
                
                     });
        /**/
       
        /*get all posts*/
        $http.get('php/getallposts.php')
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.allposts=response.data;
                  
                  

                
                     });

        /**/
         /*show friends*/
       $http.post('php/yourfriends.php',{'user1':$scope.local})
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.yourfriends=response.data;

                
                     });
      /* */
       /*find friends*/
       $http.get('php/allusers.php')
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.findfriends=response.data;
                
                     });

         /*  */

         /* Add friends */
          $scope.addfriend = function (friend) {
                    console.log(friend);
                    var addfriendtolist=[];
                    $scope.addfriendtolist=friend;
                    console.log($scope.addfriendtolist);
                    console.log($scope.addfriendtolist.name);
                    $http.post('php/addfriend.php',{'user1':$scope.local,
                                                     'user2':$scope.addfriendtolist.name })
                                        
                          .success(function (response) {
                           $scope.res=response;
                           console.log(response);
                           //$scope.list=response.data[0];
                           
                     });

                };
         /* */
       /* fetch details */
      $http.post('php/profiledetails.php',{'user':$scope.local })
           	                            
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.list=response.data[0];
                if(response!='username is incorrect'){

                	$scope.name=$scope.list.name;
                	$scope.email=$scope.list.email;
                	$scope.company=$scope.list.company;

                }
                     });
      /**/
      /*hide form*/
     if ($scope.local) {
           $http.post('php/profiletest.php',{'user':$scope.local })
           	                            
             .success(function (response) {
                $scope.res=response;
                 console.log(response);

                 if(response=='username exists'){
                 	$scope.kran=!true;
                 }
                     });
                 }

         
      /**/
      /*post status*/
        $scope.postsubmit = function(form) {
          if($scope.form.post){
              $http.post('php/post.php',{'user':$scope.local,
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

      /*Education details*/
        $scope.submit = function(form) {
        	//$scope.submitted = true;
         if ($scope.form.user && $scope.form.school && $scope.form.college && $scope.form.address && $scope.form.workexperience ) {
           $http.post('php/profile.php',{'user':$scope.form.user,
           	                             'school':$scope.form.school,
           	                             'college':$scope.form.college,
           	                             'address':$scope.form.address,
           	                          'workexperience' : $scope.form.workexperience})
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
 
               });

         }
    
        };
    /* */
  // }
  // else{
  //   alert("session expired you are redirected to login page");
  //    $scope.loginobj.showlogin = true;
  //       $scope.registerobj.showregister=true;
  //       $scope.profileobj.showprofile=!true;
  //       $scope.logoutobj.showlogout=!true;
  //   var turl=$interpolate('/login')($scope);
  //   $location.path(turl);
  // }
	});

