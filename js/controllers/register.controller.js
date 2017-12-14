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
                          //var url = $interpolate('/profilepage')($scope);
                          var url='/profilepage';
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
