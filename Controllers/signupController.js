app.controller('signupController',['$scope','$http',function($scope,$http){
	$scope.submitForm= function(){
		$scope.userData = {
			"Email" :$scope.userEmail,
	        "UserName" :$scope.userName,
			"Password" :$scope.userPassword,
			"ConfirmPassword" :$scope.userConfirmPassword,
			"FirstName" :$scope.userFirstName,
			"CompanyName" :$scope.userCompany,
			"PhoneNumber" :$scope.userPhone,
			"Address" :$scope.userAddress,
			"LastName" :$scope.userLastName
		}
		$http.post('http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/create',
		{
			Email :$scope.userEmail,
	        UserName :$scope.userName,
			Password :$scope.userPassword,
			ConfirmPassword :$scope.userConfirmPassword,
			FirstName :$scope.userFirstName,
			CompanyName :$scope.userCompany,
			PhoneNumber :$scope.userPhone,
			Address :$scope.userAddress,
			LastName :$scope.userLastName
		}).then(function(response){
			  $scope.loginDone = true;
		      console.log(JSON.stringify(response));

		},function errorCallBack(response) {
			  alert(response.data.message);
			
        })
		// console.log($scope.userData);
	}
}]);