app.controller('SettingsController', ['$scope','sessionService', '$rootScope','$http', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
	$rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
	$rootScope.userName = sessionService.get('UserName'); 
	ifsSupplierID = sessionService.get('ifsSupplierNum');
	fullName = sessionService.get('fullName');
	tokenType = sessionService.get('TokenType');
	accessToken = sessionService.get('AccessToken');
	URL ='http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/supplier/suppliers/'+ifsSupplierID;
	console.log(URL);
	var Headers = tokenType +' '+ accessToken;
	console.log(Headers);
	$http({
		method: 'GET',
		url: URL,
		headers: {'Authorization': Headers},
	})
	.then(function(response){
		$scope.settingsfullName = fullName;
		$scope.settingssupplierId = response.data.supplierId;
		$scope.settingsAddress = response.data.address1+response.data.address2+','+response.data.city+','+response.data.state+','+response.data.county;
		$scope.settingsEmail = response.data.email;
		if(response.data.defaultPayAddress=="TRUE") $scope.settingsDefaultPayAddress=true;
		else $scope.settingsDefaultPayAddress=false;
		if(response.data.settingsDefaultVisitAddress=="TRUE") $scope.settingsDefaultVisitAddress=true11;
		else $scope.settingsDefaultVisitAddress=false;
		$scope.EditsettingsMobile = response.data.settingsmobile;
		$scope.EditsettingsfullName = fullName;
		$scope.EditsettingssupplierId = response.data.supplierId;
		$scope.EditsettingsAddress = response.data.address1+response.data.address2+','+response.data.city+','+response.data.state+','+response.data.county;
		$scope.EditsettingsEmail = response.data.email;
		if(response.data.defaultPayAddress=="TRUE") $scope.EditsettingsDefaultPayAddress=true;
		else $scope.settingsDefaultPayAddress=false;
		if(response.data.settingsDefaultVisitAddress=="TRUE") $scope.EditsettingsDefaultVisitAddress=true;
		else $scope.EditsettingsDefaultVisitAddress=false;
		$scope.EditsettingsMobile = response.data.settingsmobile;Edit
		
	},function errorCallback(response){
		console.log(response);

	});

	   $scope.toggle = true;
	    $scope.$watch('toggle', function(){
	        $scope.toggleText = $scope.toggle ? 'Hide Widget' : 'Show Widget';

	    })
  

  }])

