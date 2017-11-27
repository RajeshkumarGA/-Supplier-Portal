app.controller('ViewMyprofileController', ['$scope','sessionService', '$rootScope','$http', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
 $rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
 $rootScope.userName = sessionService.get('UserName'); 
 $scope.FirstName =sessionService.get('firstName');
 $scope.LastName=sessionService.get('lastName');
 $scope.PhoneNo=sessionService.get('phoneNumber');
 $scope.CompanyName=sessionService.get('companyName');
 $scope.Address=sessionService.get('address');
   // $scope.toggle = true;
   //  $scope.$watch('toggle', function(){
   //      $scope.toggleText = $scope.toggle ? 'Hide Widget' : 'Show Widget';

   //  })
  

  }])

