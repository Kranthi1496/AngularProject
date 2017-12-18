 //Application Module
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
          
          .when('/confirm/:name/:uid/:fid', {
              templateUrl: 'views/confirmpage.html',
              controller: 'confirmpageController'
          })
          .otherwise({
              redirectTo: function() {
                  alert("Sorry Url not valid you are redirected to home page");

                  return '/';
              }
          });
  });


 


  
  

 



