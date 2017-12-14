//Controller Module
//registering maincontroller
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
      $scope.notifyobj={};
      $scope.notifyobj.shownotifications = !true;
      //$rootScope.kranthikumar='from root';
   
          var url='/';
      $scope.logout = function() {
          localStorage.removeItem("email");
          localStorage.removeItem("friendid");
          $scope.loginobj.showlogin = true;
          $scope.registerobj.showregister = true;
          $scope.profileobj.showprofile = !true;
          $scope.logoutobj.showlogout = !true;
          $scope.homeobj.showhome = !true;
           $scope.notifyobj.shownotifications = !true;
          $location.path(url);
      }

      $scope.notifications=function(){
        alert("notifications");
      }
  });
