app.controller('mainController',['$scope','sessionService','$location',function($scope,sessionService,$location){
	$scope.Logout= function(){
		sessionService.destroy('UserName');
		sessionService.destroy('UserLoggedIn');
		$scope.UserloggedIn=sessionService.get('UserLoggedIn');
		$location.path("/");
		// location.reload();
		$scope.$on("isUserLoggin", function (evt,UserloggedIn) {
			console.log("is Data emiting?");
			$scope.UserloggedIn = UserloggedIn;
		});


		sessionService.destroy('UserName');
		sessionService.destroy('AdminLoggedIn');
		$scope.UserloggedIn=sessionService.get('AdminLoggedIn');
		$location.path("/");
	    location.reload();
		// $scope.$on("isAdminLoggedIn", function (evt,AdminLoggedIn) {
		// 	console.log("is Data emiting?");
		// 	$scope.AdminLoggedIn = AdminLoggedIn;
		// });
	}
}])