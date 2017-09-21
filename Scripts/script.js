	
	var App = angular.module('kranthi', ['ngRoute']);
  
 //capturing image/file to upload
 App.directive("fileInput", function($parse){  
      return{  
           link: function($scope, element, attrs){  
                element.on("change", function(event){  
                     var files = event.target.files;  
                     console.log(files[0].name); 
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
     
      
     $scope.logout=function(){
        localStorage.removeItem("email");
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
        $scope.nameerror=!true;
        $scope.emailerror=!true;
	
/*                    submit                        */

      $scope.submit = function(form) {
          //console.log(this.form);
        $scope.submitted = true;
        $scope.test=this.form;
     
         if($scope.form.user && $scope.form.email && $scope.form.education && $scope.form.password && $scope.form.cpassword) {
            $http.post('php/register.php',{ 'user':$scope.form.user,
                                           'email':$scope.form.email,
                                       'education':$scope.form.education,
                                        'password': $scope.form.password})
                 .success(function (response) {
                    $scope.res=response;
                    console.log($scope.res);
                   

                      if(response!='Name already exists Try another' && response!='Email already exists Try another'){
                        $scope.list=response.data[0];
                        console.log(response);
                        console.log($scope.list.name);
                        //var url=$interpolate('/profilepage/{{list.name}}/{{list.email}}/{{list.company}}')($scope);
                        var url=$interpolate('/profilepage')($scope);
                        console.log(url);
                          if(typeof(Storage) !== "undefined") {
  
                            localStorage.setItem("email",$scope.list.email);
    
   
                          } 

                         $location.path(url);
                      }
                      else{
                        $scope.nameerror=true;
                        $scope.emailerror=true;
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
            $http.post('php/login.php',{'email':$scope.form.email,'password' : $scope.form.password})
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                        
                  if(response!='email and password not matched' && response!='email is incorrect'){
                    $scope.list=response.data[0];
                    console.log(response);
                    console.log($scope.list.name);
                     //var url=$interpolate('/profilepage/{{list.name}}/{{list.email}}/{{list.company}}')($scope);
                     var url=$interpolate('/profilepage')($scope);
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
   $scope.local=localStorage.getItem("email");
      /* logout*/
      // $scope.logout=function(){
      // 	localStorage.removeItem("name");
      // 	$scope.parentobj.variable1 = true;
      //   $scope.registerobj.showregister=true;
      //     $scope.profileobj.showprofile=!true;
      // 	 $location.path(url);
      // }
      /**/
         /* fetch details */
      $http.post('php/profiledetails.php',{'email':$scope.local })
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                  $scope.list=response.data[0];
                    if(response!='email is incorrect'){
                      $scope.id=$scope.list.id;
                      $scope.name=$scope.list.name;
                      $scope.email=$scope.list.email;
                      $scope.education=$scope.list.education;

                    }


                    /*show friends*/
                       $http.post('php/yourfriends.php',{'uid':$scope.id})
                                        
                            .success(function (response) {
                              console.log(response);
                               $scope.yourfriends=response.data;
                                console.log($scope.yourfriends);
                                 var x=$scope.yourfriends.length;
                                 var array=[];
                                 var k;var p;
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
                                }
                                //console.log(array);
                                $scope.farray=array;
                                //console.log($scope.farray);

                               /*finding friends*/
                                      /*find friends*/
       $http.get('php/findfriends.php')
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.findfriends=response.data;
                 //
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

                  }
                  console.log(sfarray);
                 //

                 //
                 console.log(array);

                 var farraylen=array.length;
                 console.log(farraylen);
                 var a,b;
                for(a=0;a<farraylen;a++){
               for(b=0;b<findfriendslength;b++){
                if($scope.farray[a]==sfarray[b]){
                    sfarray.splice(b,1);
                    }
                      }
                 }
                 console.log(sfarray);
                 $scope.showfriendsarray=sfarray;
                 //
                
                     });

         /*  */
                               /*finding friends end*/

                          });
                    /*show friends end */


                    /*getting current users posts*/
                    $http.post('php/currentuserposts.php',{'user':$scope.name })
                                        
                         .success(function (response) {
                            console.log(response);
                             $scope.posts=response.data;
                              console.log($scope.posts);
                
                         });
               /*           user posts end         */



               $scope.select();
           });

      /* fetch details end  */
          
            /*      fetch all users      */             
      $http.get('php/allusers.php')
                                        
           .success(function (response) {
             console.log(response);
              $scope.allusers=response.data;
               console.log($scope.allusers);
           });
      /*            end                  */

       
       /*post status*/
        $scope.postsubmit = function(form) {
          if($scope.form.post){
              $http.post('php/post.php',{'user':$scope.name,
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
                     var addfriendtolist=[];
                     $scope.addfriendtolist=friend;
                    // console.log($scope.addfriendtolist);
                     console.log($scope.addfriendtolist.id);
                    $http.post('php/addfriend.php',{'uid':$scope.id,
                                                    'fid':$scope.addfriendtolist.id})
                                        
                          .success(function (response) {
                           $scope.res=response;
                           console.log(response);
                         
                           
                     });

                };
         /* */

   /* upload image */
$scope.uploadFile = function(){
          if($scope.test)  {
           var form_data = new FormData();  
          // $scope.id=3;
          console.log($scope.id);
          // form_data.append('unique', $scope.id );
           angular.forEach($scope.files, function(file){  
                form_data.append('file', file);  
                form_data.append('unique', $scope.id );
           });  
           //console.log(form_data.file);
           $http.post('php/upload.php', form_data, 
           {  
                transformRequest: angular.identity, //try to serialize our FormData object 
                headers: {'Content-Type': undefined,'Process-Data': false}  
           }).success(function(response){  
                alert(response);  
                $scope.select();  
           });  

           var oldInput = document.getElementById('File1');
           oldInput.value='';
      }  
      }
      $scope.select = function(){  
           $http.get("php/select.php")  
           .success(function(response){  
                $scope.images = response.data;  
                console.log(response);

           });  
      }  

   /*  */
 
        
       
        /*get all posts*/
        $http.get('php/getallposts.php')
                                        
             .success(function (response) {
                $scope.res=response;
                 console.log(response);
                 $scope.allposts=response.data;
                  console.log($scope.allposts);
                 
                  

                
                     });

        /**/
       
     

    
      /*hide form*/
     // if ($scope.local) {
     //       $http.post('php/profiletest.php',{'user':$scope.local })
           	                            
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
        //    $http.post('php/profile.php',{'user':$scope.form.user,
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

