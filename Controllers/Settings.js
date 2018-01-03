app.controller('SettingsController', ['$scope','sessionService', '$rootScope','$http', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
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
	ifsSupplierID = sessionService.get('ifsSupplierNum');
	fullName = sessionService.get('fullName');
	tokenType = sessionService.get('TokenType');
	accessToken = sessionService.get('AccessToken');
	//$rootScope.IsPRSEnabled=sessionService.get('IsPRSEnabled');
	URL ='http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/supplier/suppliers/'+ifsSupplierID;
	// console.log(URL);
	var Headers = tokenType +' '+ accessToken;
	// console.log(Headers);
	$http({
		method: 'GET',
		url: URL,
		headers: {'Authorization': Headers,'Content-Type':'application/x-www-form-urlencoded'},
	})
	.then(function(response){
		// console.log(response);
		$scope.settingsfullName = fullName;
		$scope.settingssupplierId = response.data.supplierId;
		$scope.settingsAddress = response.data.address1+response.data.address2+','+response.data.city+','+response.data.state+','+response.data.county;
		$scope.settingsEmail = response.data.email;
		if(response.data.defaultPayAddress=="true") $scope.settingsDefaultPayAddress=true;
		else $scope.settingsDefaultPayAddress=false;
		if(response.data.defaultVisitAddress == "true") $scope.settingsDefaultVisitAddress=true;
		else $scope.settingsDefaultVisitAddress=false;
		$scope.Mobile = response.data.mobile;
		$scope.paymentMethod = response.data.paymentMethod;
		$scope.paymentTerms = response.data.paymentTerms;
	    $scope.AddressId = response.data.addressId;
	    $scope.Address1 = response.data.address1;
	    $scope.Address2 = response.data.address2;
	    $scope.City = response.data.city;
	    $scope.State = response.data.state;
	    $scope.County = response.data.county;
	    $scope.ZipCode = response.data.zipCode;
	    $scope.DefaultDocumentAddress = response.data.defaultDocumentAddress;
	    $scope.DeliveryTerms = response.data.deliveryTerms;
	    $scope.DeliveryTermsDesc = response.data.deliveryTermsDesc;
	    $scope.ShipViaCode = response.data.shipViaCode;
	    $scope.ShipViaCodeDesc = response.data.shipViaCodeDesc;
	    $scope.DocAddress = response.data.docAddress;
	    $scope.SupplierName = response.data.supplierName;		
	},function errorCallback(response){
		console.log(response);

	});

	$scope.updateSupplierDetails = function(){
			$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/supplier/updateSupplierDetails',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			     "SupplierId":$scope.settingssupplierId,
        			 "AddressId":$scope.AddressId,
			         "Address1":$scope.Address1,
			         "Address2":$scope.Address2,
			         "City":$scope.City,
			         "State":$scope.State,
			         "County":$scope.County,
			         "ZipCode":$scope.ZipCode,
			         "DefaultPayAddress":$scope.settingsDefaultPayAddress,
			         "DefaultDocumentAddress":$scope.DefaultDocumentAddress,
			         "DefaultVisitAddress":$scope.settingsDefaultVisitAddress,
			         "DefaultDeliveryAddress":$scope.DefaultDeliveryAddress,
			         "DeliveryTerms":$scope.DeliveryTerms,
			         "DeliveryTermsDesc":$scope.DeliveryTermsDesc,
			         "ShipViaCode":$scope.ShipViaCode,
			         "ShipViaCodeDesc":$scope.ShipViaCodeDesc,
			         "DocAddress":$scope.DocAddress,
			         "Mobile":$scope.Mobile,
			         "Email":$scope.settingsEmail,
			         "SupplierName":$scope.settingsfullName,
			         "PaymentTerms":$scope.paymentTerms,
			         "PaymentMethod":$scope.paymentMethod
	  		      }
			}).then(function(response){
				console.log(response);
				if(response.status == 200){
					alert("Your Supplier Profile updated Successfully");
				}
				
			})
	}

	   $scope.toggle = true;
	    $scope.$watch('toggle', function(){
	        $scope.toggleText = $scope.toggle ? 'Hide Widget' : 'Show Widget';
	    })


	    $scope.DefaultItemLines = function(getLineNo,value){
	    	$scope.defaultItemLinesInTable = getLineNo;
	    	// alert(getLineNo+" "+value);

	    	if(value==1)
	    		{
	    			if(getLineNo == 20)
			    	{
			    		// alert($scope.DefaultItemLinesInTable);
			    		var myEl = angular.element( document.querySelector( '#Button1' ));
				        myEl.addClass('btn-primary');
				        var myE2 = angular.element( document.querySelector( '#Button2' ));
				        myE2.removeClass('btn-primary');
				        var myE3 = angular.element( document.querySelector( '#Button3' ));
				        myE3.removeClass('btn-primary');
			    	}
			    	else if(getLineNo == 50){
			    		// alert($scope.DefaultItemLinesInTable);
			    		var myEl = angular.element( document.querySelector( '#Button1' ));
				        myEl.removeClass('btn-primary');
				        var myE2 = angular.element( document.querySelector( '#Button2' ));
				        myE2.addClass('btn-primary');
				        var myE3 = angular.element( document.querySelector( '#Button3' ));
				        myE3.removeClass('btn-primary');
			    	}
			    	else if(getLineNo == 100){
			    		// alert($scope.DefaultItemLinesInTable);
			    		var myEl = angular.element( document.querySelector( '#Button1' ));
				        myEl.removeClass('btn-primary');
				        var myE2 = angular.element( document.querySelector( '#Button2' ));
				        myE2.removeClass('btn-primary');
				        var myE3 = angular.element( document.querySelector( '#Button3' ));
				        myE3.addClass('btn-primary');
			    	}
			    }
			    else{
			    	// alert("show");
			    	if(getLineNo == 20)
			    	{
			    		// alert($scope.DefaultItemLinesInTable);
			    		var myEl = angular.element( document.querySelector( '#Button11' ));
				        myEl.addClass('btn-primary');
				        var myE2 = angular.element( document.querySelector( '#Button22' ));
				        myE2.removeClass('btn-primary');
				        var myE3 = angular.element( document.querySelector( '#Button33' ));
				        myE3.removeClass('btn-primary');
			    	}
			    	else if(getLineNo == 50){
			    		// alert($scope.DefaultItemLinesInTable);
			    		var myEl = angular.element( document.querySelector( '#Button11' ));
				        myEl.removeClass('btn-primary');
				        var myE2 = angular.element( document.querySelector( '#Button22' ));
				        myE2.addClass('btn-primary');
				        var myE3 = angular.element( document.querySelector( '#Button33' ));
				        myE3.removeClass('btn-primary');
			    	}
			    	else if(getLineNo == 100){
			    		// alert($scope.DefaultItemLinesInTable);
			    		var myEl = angular.element( document.querySelector( '#Button11' ));
				        myEl.removeClass('btn-primary');
				        var myE2 = angular.element( document.querySelector( '#Button22' ));
				        myE2.removeClass('btn-primary');
				        var myE3 = angular.element( document.querySelector( '#Button33' ));
				        myE3.addClass('btn-primary');
			    	}

			    }
	    	
	    	
	    }
        

        
	    $http({
		method: 'GET',
		url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/userconfiguration/getUserConfiguration/'+ifsSupplierID,
		headers: {'Authorization': Headers,'Content-Type':'application/x-www-form-urlencoded'},
		})
		.then(function(response){
			var isPREnabled= false;
	        var isFisEnabled=false;
	        var isInvoice=false;
	        $scope.isPREnableddisabled= true;
	        $scope.isFisEnableddisabled=true;
	        $scope.isInvoicedisabled=true;
	        $scope.isPREnabledUser=true;
	        $scope.isFisEnabledUser=true;
	        $scope.isInvoiceUser=true;
	        if(sessionService.get('isFISEnabled')=='true'){
	         	$scope.isFisEnableddisabled=false;
	         	isFisEnabled=true;
	         	
	        }
	        if(sessionService.get('isPRSEnabled') =='true'){
	        	isPREnabled = true;
	        	$scope.isPREnableddisabled = false;
	        }
	        if(sessionService.get('isSubmissionNonPOInvoiceEnabled')=='true'){
	        	isInvoice = true;
	        	$scope.isInvoicedisabled = false;
	        }
			if(response.data.length == 0)
			{
				$http({
				method: 'POST',
				url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/userconfiguration/createuserconfiguration',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					      var str = [];
					      for(var p in obj)
					      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					      return str.join("&");
					  	},
		  		data: {
						    "isPurchaseRequistionEnabled": isPREnabled,
						    "isRecentPurchaseOrderEnabled": isFisEnabled,
						    "isUnpaidInvoicesEnabled": isInvoice,
						    "isSupplierInvoiceMonthFilterEnabled": true,
						    "isPurchaseOrderMonthsFilterEnabled": true,
						    "isSupplierPaymentsMonthFilterEnabled": true,
						    "isSupplierShipmentsMonthFilterEnabled": true,
						    "defaultItemLinesInTable": 20,
						    "supplierId":ifsSupplierID
		  		      }
				}).then(function(response){
					
				})
			}
			else{
				console.log(response);

				// debugger;
	 			if(response.data[0].isPurchaseRequistionEnabled==true && isPREnabled==true) {
	 				$scope.isPREnabledUser = true ;
	 			}
	 			else{
	 				$scope.isPREnabledUser =false;
	 				// debugger;
	 			} 
			    if(response.data[0].isRecentPurchaseOrderEnabled==true && isFisEnabled==true){ 
			    	$scope.isFisEnabledUser = true;
			    	// debugger;
			    }
			    else{
					$scope.isFisEnabledUser = false;
				}
			    if(response.data[0].isUnpaidInvoicesEnabled==true && isInvoice==true){
			    	$scope.isInvoiceUser = true;
			    	// debugger;	
			    } 
			    else{
			    	$scope.isInvoiceUser = false;
			    } 
			    $scope.isSupplierInvoiceMonthFilterEnabled =response.data[0].isSupplierInvoiceMonthFilterEnabled;
			    $scope.isPurchaseOrderMonthsFilterEnabled =response.data[0].isPurchaseOrderMonthsFilterEnabled;
			    $scope.isSupplierPaymentsMonthFilterEnabled =response.data[0].isSupplierPaymentsMonthFilterEnabled;
			    $scope.isSupplierShipmentsMonthFilterEnabled =response.data[0].isSupplierShipmentsMonthFilterEnabled;
			    $scope.defaultItemLinesInTable =response.data[0].defaultItemLinesInTable;
			    $scope.DefaultItemLines($scope.defaultItemLinesInTable,2);
			}
		})

		$scope.updateUserConfiguration = function(){
			
			$http({
				method: 'POST',
				url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/userconfiguration/updateUserConfiguration',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					      var str = [];
					      for(var p in obj)
					      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					      return str.join("&");
					  	},
		  		data: {
						    "isPurchaseRequistionEnabled": $scope.isPREnabledUser,
						    "isRecentPurchaseOrderEnabled":  $scope.isFisEnabledUser,
						    "isUnpaidInvoicesEnabled":  $scope.isInvoiceUser,
						    "isSupplierInvoiceMonthFilterEnabled":  $scope.isSupplierInvoiceMonthFilterEnabled,
						    "isPurchaseOrderMonthsFilterEnabled": $scope.isPurchaseOrderMonthsFilterEnabled,
						    "isSupplierPaymentsMonthFilterEnabled": $scope.isSupplierPaymentsMonthFilterEnabled,
						    "isSupplierShipmentsMonthFilterEnabled":$scope.isSupplierShipmentsMonthFilterEnabled,
						    "defaultItemLinesInTable": $scope.defaultItemLinesInTable,
						    "supplierId":ifsSupplierID

		  		      }
				}).then(function(response){
					// console.log(response);
					alert("updated Successfully");
					$scope.DefaultItemLines($scope.defaultItemLinesInTable,2);
					 sessionService.set('tempisPRSEnabled',$scope.isPREnabledUser);
		      		 sessionService.set('tempisFISEnabled',$scope.isFisEnabledUser);
		      		 sessionService.set('tempisSubmissionNonPOInvoiceEnabled',$scope.isInvoiceUser);
					 $scope.$emit('pagePerSettings', [sessionService.get('UserLoggedIn'),$scope.isPREnabledUser,$scope.isFisEnabledUser,$scope.isInvoiceUser]);
				})

		}


  

  }])

