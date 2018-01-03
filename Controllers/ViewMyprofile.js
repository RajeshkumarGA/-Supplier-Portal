app.controller('ViewMyprofileController', ['$scope','sessionService', '$rootScope','$http', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants','$location',function ($scope,sessionService, $rootScope,$http, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants,$location) {
 $rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
  $rootScope.userName = sessionService.get('UserName');
  if(sessionService.get('tempisPRSEnabled')=='true'){
    $rootScope.IsPRSEnabled=true;
    }
    else{
      $rootScope.IsPRSEnabled=false;
    }
    if(sessionService.get('tempisFISEnabled')=='true'){
      $rootScope.isFISEnabled=true;
    }
    else{
      $rootScope.isFISEnabled=false;
      
    }
    if(sessionService.get('tempisSubmissionNonPOInvoiceEnabled')=='true'){
      $rootScope.isSubmissionNonPOInvoiceEnabled=true;
    }
    else{
      $rootScope.isSubmissionNonPOInvoiceEnabled=false;
      
    }
 $scope.LastName=sessionService.get('lastName');
 $scope.PhoneNo=sessionService.get('phoneNumber');
 $scope.CompanyName=sessionService.get('companyName');
 $scope.Address=sessionService.get('address');
 access_token=sessionService.get('AccessToken');
 token_type=sessionService.get('TokenType');
 authrization=token_type+' '+access_token;
 $scope.changePassowrd=function(){
 	$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/changePassword',
			headers: {'Authorization':authrization,'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {OldPassword: $scope.oldPassword,NewPassword: $scope.newPassword,ConfirmPassword: $scope.confirmPassword}
			})
			.then(function(response){
					alert('Password has been changed Successfully!!');
					sessionService.destroy('UserLoggedIn');
					 sessionService.destroy('UserName'); 
					 sessionService.destroy('firstName');
					 sessionService.destroy('lastName');
					 sessionService.destroy('phoneNumber');
					 sessionService.destroy('companyName');
					 sessionService.destroy('address');
					 $location.path('/');

			},function errorCallBack(){
				if($scope.newPassword==$scope.confirmPassword){
			        errors = [];
			   		 if ($scope.newPassword.length < 8) {
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
				        alert(errors.join("\n"));
				    }
				    else
					alert('OOPS!!You have enterd wrong password.');
				
				}
				else{
					if($scope.newPassword!=$scope.confirmPassword)
					alert('OOPS!!New and Confirm Passwords are not Same.');
				}
				

			});
 }
  

  }])

