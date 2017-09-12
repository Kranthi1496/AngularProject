	
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

			.when('/profilepage/:name/:email/:company', {
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
                     var url=$interpolate('/profilepage/{{list.name}}/{{list.email}}/{{list.company}}')($scope);
                      console.log(url);
                       $location.path(url);
                   }
                  else {
                    console.log('username/password wrong');
                   }
               });

         }
    
        };
	});

	App.controller('profilepageController', function($scope,$routeParams) {
	
		$scope.name=$routeParams.name;
		$scope.email=$routeParams.email;
		$scope.company=$routeParams.company;
	});

