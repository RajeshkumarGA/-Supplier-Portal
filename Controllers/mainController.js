app.controller('mainController',
	['$scope','$rootScope','$location','$http','sessionService','$route','$interval',function($scope,$rootScope,$location,$http,sessionService, $route,$interval){
  $scope.Logout= function(){
			sessionService.clear();
			$scope.UserloggedIn=sessionService.get('UserLoggedIn');
			$scope.AdminloggedIn=sessionService.get('AdminLoggedIn');
			$scope.IsPRSEnabled= false;
			$scope.isFISEnabled= false;
			$scope.isSubmissionNonPOInvoiceEnabled= false;
		    
			$location.path("/");
		
	}
	$scope.$on('pagePer',function(evt,arr){
		$scope.UserloggedIn = arr[0];
		$scope.IsPRSEnabled= arr[1];
		$scope.isFISEnabled= arr[2];
		$scope.isSubmissionNonPOInvoiceEnabled= arr[3];
	});
	$scope.$on('pagePerSettings',function(evt,arr){
		$scope.UserloggedIn = arr[0];
		$scope.IsPRSEnabled= arr[1];
		$scope.isFISEnabled= arr[2];
		$scope.isSubmissionNonPOInvoiceEnabled= arr[3];
	});
		setInterval(function() {
			sessionService.clear();
			$scope.UserloggedIn=sessionService.get('UserLoggedIn');
			$scope.AdminloggedIn=sessionService.get('AdminLoggedIn');
			$scope.IsPRSEnabled= false;
			$scope.isFISEnabled= false;
			$scope.isSubmissionNonPOInvoiceEnabled= false;
			$route.reload();
			$location.path("/");
		},600000);

		// $rootScope.$on('$locationChangeSuccess', function() {
  //       if($rootScope.previousLocation == $location.path()) {
  //           console.log("Back Button Pressed");
  //       }
  //       $rootScope.previousLocation = $rootScope.actualLocation;
  //       $rootScope.actualLocation = $location.path();
  //   });

}]);