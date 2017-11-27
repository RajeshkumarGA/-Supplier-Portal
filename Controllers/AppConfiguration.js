app.controller('AppConfigurationController',['$scope','$rootScope','sessionService',function($scope,$rootScope,sessionService){
	$rootScope.AdminloggedIn=sessionService.get('AdminLoggedIn');
    $rootScope.userName = sessionService.get('UserName'); 
}]);