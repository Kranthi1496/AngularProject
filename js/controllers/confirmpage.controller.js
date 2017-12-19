App.controller('confirmpageController', function($scope, $http, $location, $interpolate,$routeParams) {


	$scope.friendname=$routeParams.name;
	$scope.uid=$routeParams.uid;
	$scope.fid=$routeParams.fid;
	$scope.confirm='0';
  $scope.local = localStorage.getItem("email");
  
  $http.post('api/profile/profiledetails.php', { 'email': $scope.local })

      .success(function(response) {
         $scope.res = response;
            if (response.status === 'OK') {
              // console.log(response);
              $scope.list = response.data[0];
              
                  $scope.id = $scope.list.id;
                  $scope.name = $scope.list.name;
                  $scope.email = $scope.list.email;
                  $scope.education = $scope.list.education;

              
          

                  if($scope.id == $scope.fid){
                    $scope.confirm='1';
             
                    $scope.confirmfriend=function(){
                      $scope.status='YES';
	                    $scope.notification='YES';
             	        
                      $http.post('api/friends/confirmfriend.php', {
                      'uid': $scope.uid,
                      'fid': $scope.fid,
                      'status':$scope.status,
                      'notification':$scope.notification

                       })

                         .success(function(response) {
                          //console.log(response.status);
            	             if(response.status === 'OK'){
            		            var tempurl='/profilepage';
            		            $location.path(tempurl);
            	              }
                          
                          });
              
                     }
                  }

                  else {

                  var url='/login';
                  alert("please login")
                  $location.path(url);

                  }




           }



           else{

          	 var url='/login';
          	 alert("please login")
          	 $location.path(url);

           }

      });   
});//controller end