app.controller('homeLoginController',
	['$scope','$rootScope','$location','$http','sessionService',function($scope,$rootScope,$location,$http,sessionService){
	$scope.changePassword = false;
	// $scope.alertData = false;	
	$scope.login = function(){
		$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/oauth/token',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {username: $scope.userName, password: $scope.userPassword,grant_type:'password'}
			})
			.then(function(response){
	      var accessToken = response.data.access_token;
	      var tokenType = response.data.token_type;
	      sessionService.set('AccessToken',accessToken);
	      sessionService.set('TokenType',tokenType);
	      var URL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/user/'+$scope.userName;
	      var Headers = tokenType +' '+ accessToken;
      	$http({
					method: 'GET',
	    		url: URL,
	    		headers: {'Authorization': Headers},
			})
	    .then(function(response){
	    	if(response.data.isActive){
		      if(response.data.roles.indexOf('Admin') !== -1){
		      	sessionService.set('UserName',response.data.userName);
		      	sessionService.set('AdminLoggedIn',true);
		      	$rootScope.AdminloggedIn=sessionService.get('AdminLoggedIn');
		      	$scope.$emit('isAdminLoggedIn', sessionService.get('AdminLoggedIn'));
		      	$rootScope.userName = sessionService.get('UserName');
		      	$rootScope.UserloggedIn=false;
		      	$location.path('/AdminHome');
		      	console.log(sessionService.get('AdminLoggedIn'));
		      	// sessionService.set('UserName',response.data.userName);
		      	// $rootScope.AdminuserName = sessionService.get('UserName');
		      }
		      else{
		      	ifsSupplierId = response.data.ifsSupplierNum;
		      	fullName = response.data.fullName;
		      	sessionService.set('ifsSupplierNum',ifsSupplierId);
		      	sessionService.set('fullName',fullName);
		      	console.log(response.data);
		      	sessionService.set('firstName',response.data.firstName);
		      	sessionService.set('lastName',response.data.lastName);
		      	sessionService.set('phoneNumber',response.data.phoneNumber);
		      	sessionService.set('companyName',response.data.companyName);
		      	sessionService.set('UserName',response.data.userName);
		      	sessionService.set('address',response.data.address);
		      	
		      	sessionService.set('UserLoggedIn',true);
		      	$rootScope.UserloggedIn = sessionService.get('UserLoggedIn');
		      	$scope.$emit('isUserLoggin', sessionService.get('UserLoggedIn'));
		      	$rootScope.userName = sessionService.get('UserName');
		      	$rootScope.AdminloggedIn=false;
		      	$location.path('/Dashboard');
		      }
		  }
		  else{
		  	alert('Contact to Admin for Access the portal.');
		  }
			},
			function errorCallBack(response) {
			 	alert('Permission Denied');
			})
		},
		function errorCallBack(response) {
			alert(response.data.error_description);
		})
  }

  $scope.changePassword1 = function(){
  	$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/PasswordRecovery',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {"Email" : $scope.email, }
			})
			.then(function(response){
				$scope.changePassword = true;
				 $scope.verificationCode = '';
				 $scope.newPassword =''
				 $scope.conformPassword =''
				$scope.updatePassword = function(){
					// alert("please fill all the fields");
					if($scope.verificationCode ==='' ){
						alert("please fill the Verification Code field");
					}
					else if($scope.newPassword ===''){
						alert("please fill the New Password field");
					}
					else if($scope.conformPassword ===''){
						alert("please fill the Conform Password field");
					}
					else{
						flag = true;
						if($scope.newPassword === $scope.conformPassword){
							
			                    errors = [];
			                    if ($scope.newPassword.length <8){
			                        errors.push("Your password must be at least 8 characters");
			                    }
			                    if ($scope.newPassword.search(/[a-z]/) < 0) {
			                        errors.push("Your password must contain at least one lower case letter."); 
			                    }
			                    if ($scope.newPassword.search(/[A-Z]/) < 0) {
			                        errors.push("Your password must contain at least one Upper Case letter."); 
			                    }
			                    if ($scope.newPassword.search(/[0-9]/) < 0) {
			                        errors.push("Your password must contain at least one digit.");
			                    }
			                    if ($scope.newPassword.search(/[!@$%^&*]/) < 0) {
			                        errors.push("Your password must contain at least one special characters.");
			                    }
			                    if (errors.length > 0) {
			                    	flag = false;
			                        alert(errors.join("\n"));
			                    }
			                    else{
			                    	$http({
									method: 'POST',
									url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/ResetPassword',
									headers: {'Content-Type': 'application/x-www-form-urlencoded'},
									transformRequest: function(obj) {
								    var str = [];
								    for(var p in obj)
								    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
								      return str.join("&");
							  		},
							  		data: {"Email" : $scope.email, "Code" :$scope.verificationCode, "NewPassword" : $scope.newPassword  }
									})
									.then(function(response){
										// console.log(response);
										alert(response.data);
										$scope.changePassword = false;
											$location.path("/");
										},
										function errorCallBack(response) {
												alert("Wrong Verification Code")
											})

			                    }	
							
						}
						else{
							alert("New Password and Conform Password are Diffrent");
						}
					}
				}

				},
		function errorCallBack(response) {
			console.log(response);
		})
  	
  }
}]);