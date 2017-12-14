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
                      console.log(response);
                        
                      if (response.status === 'OK') {
                          //console.log('entered');
                          $scope.list = response.data[0];
                          //console.log(response);
                          //console.log($scope.list.name);
                         // var url = $interpolate('/timeline')($scope);
                         var url='/timeline';
                          //console.log(url);
                          if (typeof(Storage) !== "undefined") {

                              localStorage.setItem("email", $scope.list.email);


                          }

                          $location.path(url);
                      } else {
                          //console.log('email/password wrong');
                      }
                  });

          }

      };
  });