	
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


	App.controller('mainController', function($scope) {
		$scope.message = 'This is Home page';
		//$scope.display=true;

		
 
    //$scope.variable1 = true;
    //
     $scope.parentobj = {};
     //$scope.obj={};
     //$scope.obj.displaylogout=!true;
    $scope.parentobj.variable1 = true;
    //
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
          var url=$interpolate('/profilepage/{{form.user}}/{{form.email}}/{{form.company}}')($scope);
           console.log(url);
          // $scope.list.push(form);
         //  console.log($scope.form.user);
            $http.post('php/register.php',{ 'user':$scope.form.user,
                                        'email' : $scope.form.email,
                                        'company':$scope.form.company,
                                        'password' : $scope.form.password})
                 .success(function (response) {
                    $scope.res=response;
                    console.log($scope.res);
                     var result = response.match(/record/g);
                       if(result){
                        $scope.res1=response;
                        $location.path(url);
                        }
                       
                        console.log($scope.form.user);
                   });
                    //console.log($scope.form.user);
                      $scope.form.user='';
                            // $scope.form.email=''; 
                            // $scope.form.company='';
                            // $scope.form.password='';

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
	    
     // $scope.obj.displaylogout=true;
 var url=$interpolate('/')($scope);
	     $scope.parentobj.variable1=!true;
		//$scope.name=$routeParams.name;
		//$scope.email=$routeParams.email;
		//$scope.company=$routeParams.company;
//$rootScope.variable1=!true;
		var list = [];
      $scope.list=list;
      $scope.kran=true;
      $scope.local=localStorage.getItem("name");
      /* logout*/
      $scope.logout=function(){
      	localStorage.removeItem("name");
      	$scope.parentobj.variable1 = true;
      	 $location.path(url);
      }
      /**/
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
	});

