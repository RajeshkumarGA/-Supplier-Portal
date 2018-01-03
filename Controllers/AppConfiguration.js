app.controller('AppConfigurationController',['$scope','$rootScope','sessionService','$http',function($scope,$rootScope,sessionService,$http){
	$rootScope.AdminloggedIn=sessionService.get('AdminLoggedIn');
    $rootScope.userName = sessionService.get('UserName');
    var access_token=sessionService.get('AccessToken');
    var token_type=sessionService.get('TokenType');
   

     $scope.StatusUpdate=function (getElement,value){
      // $scope.updatedStatus=value;
      if(value){
        var myEl = angular.element( document.querySelector( '#'+getElement+'activeButton' ) );
        myEl.addClass('btn-primary');
        var myE2 = angular.element( document.querySelector( '#'+getElement+'inactiveButton' ) );
        myE2.removeClass('btn-primary');
        $scope.updatedStatus = "active";
      }
      else{
        var myEl = angular.element( document.querySelector( '#'+getElement+'inactiveButton' ) );
        myEl.addClass('btn-primary');
        var myE2 = angular.element( document.querySelector( '#'+getElement+'activeButton' ) );
        myE2.removeClass('btn-primary');
        $scope.updatedStatus = "inactive";
      }
    } 
     var URL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/adminConnectionDetails/getCompanyConnectionDetails';
    var Headers = token_type +' '+ access_token;
    $http({
    method: 'GET',
    url: URL,
    headers: {'Authorization': Headers},
  })
  .then(function(response){
  	 $scope.Description = response.data[0].Description;
  	 $scope.IFSServerUrl = response.data[0].IFSServerUrl;
  	 $scope.IFSUserName = response.data[0].IFSUserName;
  	 $scope.IFSUserPassword = response.data[0].IFSUserPassword;
  	 $scope.Status = response.data[0].Status;
  	 $scope.Notes = response.data[0].Notes;

  	// console.log(response);
  })

  $scope.StatusUpdateNotification=function (getElement,value){
      // $scope.updatedStatus=value;
      if(value){
      	// alert(value);
        var myEl = angular.element( document.querySelector( '#'+getElement+'activeButton' ) );
        myEl.addClass('btn-primary');
        var myE2 = angular.element( document.querySelector( '#'+getElement+'inactiveButton' ) );
        myE2.removeClass('btn-primary');
        $scope.updatedStatus = "active";
      }
      else{
        var myEl = angular.element( document.querySelector( '#'+getElement+'inactiveButton' ) );
        myEl.addClass('btn-primary');
        var myE2 = angular.element( document.querySelector( '#'+getElement+'activeButton' ) );
        myE2.removeClass('btn-primary');
        $scope.updatedStatus = "inactive";
      }
    } 

    $scope.UpdateNotification = function(){
    	$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/notificationdetails/updateNotificationDetails',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			   "SmtpHost":$scope.SmtpHost,
	  			   "SmtpPort" : $scope.SmtpPort,
	  		       "SmtpAuth" : $scope.SmtpAuth,
	  		       "UserName" :$scope.UserName,
	  		       "Password" : $scope.Password,
	  		       "Email_id" :$scope.Email_id,
	  		       "Status" : $scope.updatedStatus,
	  		       "Notes" :$scope.Notes
	  		      }
			}).then(function(response){
				if(response.status==200){
					alert("Notification Updated Successfully")
				}
				// console.log(response);
			})
    }

    var URL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/notificationdetails/getNotificationDetails';
    var Headers = token_type +' '+ access_token;
    $http({
    method: 'GET',
    url: URL,
    headers: {'Authorization': Headers},
  })
  .then(function(response){
  	 $scope.SmtpHost = response.data[0].smtpHost;
  	 $scope.SmtpPort = response.data[0].smtpPort;
  	 $scope.SmtpAuth = response.data[0].smtpAuth;
  	 $scope.UserName = response.data[0].userName;
  	 $scope.Email_id = response.data[0].email_id;
  	 $scope.STatus = response.data[0].status;
  	 $scope.NOtes = response.data[0].notes;

  	// console.log(response);
  })

    $scope.UpdateConnection = function(){
    	$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/adminConnectionDetails/updateAdminConnectionDetails',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			   "Description":$scope.Description,
	  			   "IFSServerUrl" : $scope.IFSServerUrl,
	  		       "IFSUserName" : $scope.IFSUserName,
	  		       "IFSUserPassword" :$scope.IFSUserPassword,
	  		       "Status" : $scope.updatedStatus,
	  		       "Notes" :$scope.Notes
	  		      }
			}).then(function(response){
				if(response.status==200){
					alert("Connection Updated Successfully")
				}
				// console.log(response);
			})
    }

   var URL1 = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/companyprofile/getCompanyProfile/EP';
   $http({
    method: 'GET',
    url: URL1,
    headers: {'Authorization': Headers},
  })
  .then(function(response){
  	console.log(response);
  	               $scope.CompanyId=response.data[0].companyId;
	  			   $scope.CompanyName=response.data[0].companyName;
	  		       $scope.CompanyEmailID=response.data[0].companyEmailID;
	  		       $scope.Fax=response.data[0].fax;
	  		       $scope.PhoneNumber=response.data[0].phoneNumber;
	  		       $scope.WebLink=response.data[0].webLink;
	  		       $scope.FacebookLink=response.data[0].facebookLink;
	  		       $scope.TwitterLink=response.data[0].twitterLink;
	  		       $scope.ImageLink=response.data[0].imageLink;
  })

    $scope.updateCompanyProfile = function(){
        alert($scope.CompanyId+" "+$scope.CompanyName+" "+ $scope.ImageLink+" data is");	     
    	$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/companyprofile/updateCompanyProfile',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			   "CompanyId":$scope.CompanyId,
	  			   "CompanyName" : $scope.CompanyName,
	  		       "CompanyEmailID" : $scope.CompanyEmailID,
	  		       "Fax" :$scope.Fax,
	  		       "PhoneNumber" : $scope.PhoneNumber,
	  		       "WebLink" :$scope.WebLink,
	  		       "FacebookLink" :$scope.FacebookLink,
	  		       "TwitterLink" :$scope.TwitterLink,
	  		       "ImageLink " :$scope.ImageLink
	  		      }
			}).then(function(response){
				if(response.status == 200)
				{
					alert("Updated Successfully");
				}
				// console.log(response);
			})

			alert($scope.CompanyId+" "+$scope.CompanyName+" "+ $scope.ImageLink+" data is");
    }
 

}]);