app.controller('CreateInvoiceController',['$scope','sessionService', '$rootScope','$http', '$location','uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http,$location,uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants){
	$rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
	$rootScope.userName=sessionService.get('UserName');
	$scope.OrderID="8494930";
	$scope.SupplierID="748";
	$scope.SupplierName="Trigger Tech";
	$scope.POStatus="8494930";
	$scope.Amount="748";
	$scope.Currency="USD";
	$scope.DateEntered="12/05/17";


}])