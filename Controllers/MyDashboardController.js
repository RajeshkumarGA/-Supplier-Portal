app.controller('MyDashboardController',['$scope','sessionService', '$rootScope','$http','$location', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http,$location, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants){
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
	// debugger;
	
	$scope.dataset =[];
	$scope.ApiDone= false;
	ifsSupplierID = sessionService.get('ifsSupplierNum');
	tokenType = sessionService.get('TokenType');

	// Recent Purchase Requisitions
	accessToken = sessionService.get('AccessToken');
	dataURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/purchaserequisition/getpurchaserequisitions/'+ifsSupplierID;
	var Headers = tokenType+' '+accessToken;


    $http({
	method: 'GET',
	url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/userconfiguration/getUserConfiguration/'+ifsSupplierID,
	headers: {'Authorization': Headers,'Content-Type':'application/x-www-form-urlencoded'},
	})
	.then(function(response){

		if(response.data.length == 0)
		{
			$scope.UnpaidInvoicesEnabled = true;
			$scope.RecentPurchaseOrderEnabled = true;
			$scope.PurchaseRequistionEnabled = true;
			$scope.PurchaseOrderMonthsFilter = true;
			$scope.SupplierInvoiceMonthFilter = true;
			$scope.SupplierPaymentsMonthFilter = true;
			$scope.ShipmentsMonthFilter = true;
			$scope.linesPerPage = 20;
			sessionService.set("linesPerPage",$scope.linesPerPage);
			$scope.gridOptions.paginationPageSize = parseInt($scope.linesPerPage);
			$scope.gridOptions1.paginationPageSize = parseInt($scope.linesPerPage);
			$scope.gridOptions2.paginationPageSize = parseInt($scope.linesPerPage);
			$scope.gridOptions3.paginationPageSize = parseInt($scope.linesPerPage);
			$scope.gridOptions4.paginationPageSize = parseInt($scope.linesPerPage);
		}
		else
		{
			console.log(response);
			$scope.UnpaidInvoicesEnabled = response.data[0].isUnpaidInvoicesEnabled;
			$scope.RecentPurchaseOrderEnabled = response.data[0].isRecentPurchaseOrderEnabled;
			$scope.PurchaseRequistionEnabled = response.data[0].isPurchaseRequistionEnabled;
			$scope.PurchaseOrderMonthsFilter = response.data[0].isPurchaseOrderMonthsFilterEnabled;
			$scope.SupplierInvoiceMonthFilter = response.data[0].isSupplierInvoiceMonthFilterEnabled;
			$scope.SupplierPaymentsMonthFilter = response.data[0].isSupplierPaymentsMonthFilterEnabled;
			$scope.ShipmentsMonthFilter = response.data[0].isSupplierShipmentsMonthFilterEnabled;
			$scope.linesPerPage = response.data[0].defaultItemLinesInTable;
			sessionService.set("linesPerPage",$scope.linesPerPage);
			$scope.gridOptions.paginationPageSize = parseInt($scope.linesPerPage);
			$scope.gridOptions1.paginationPageSize = parseInt($scope.linesPerPage);
			$scope.gridOptions2.paginationPageSize = parseInt($scope.linesPerPage);
			$scope.gridOptions3.paginationPageSize = parseInt($scope.linesPerPage);
			$scope.gridOptions4.paginationPageSize = parseInt($scope.linesPerPage);
		}
		
	});
	$http({
	method:'GET',
	url: dataURL,
	headers:{'Authorization':Headers}
	})
  	.then(function(response){
    	for (var i=0;i<response.data.length;i++){
	      $scope.Arrival_date=response.data[i].requisitionDate.split('T');
	      $scope.Approved_date=response.data[i].latestOrderDate.split('T');
	      $scope.WantedReceiptDate=response.data[i].wantedReceiptDate.split('T');
	      var obj = {
	        "index":i,
	        "additionalCostAmountGross":response.data[i].additionalCostAmountGross,
	        "addituonalCostAmount":response.data[i].addituonalCostAmount,
	        "authReq":response.data[i].authReq,
	        "buyUnitMeas":response.data[i].buyUnitMeas,
	        "buyUnitPrice":response.data[i].buyUnitPrice,
	        "contact":response.data[i].contact,
	        "contactName":response.data[i].contactName,
	        "contract":response.data[i].contract,
	        "contractDescription":response.data[i].contractDescription,
	        "conversionFac":response.data[i].conversionFac,
	        "currencyCode":response.data[i].currencyCode,
	        "currencyRate":response.data[i].currencyRate,
	        "demandCode":response.data[i].demandCode,
	        "description":response.data[i].description,
	        "discount":response.data[i].discount,
	        "fbuyUnitPrice":response.data[i].fbuyUnitPrice,
	        "grossAmountBase":response.data[i].grossAmountBase,
	        "grossAmountCurr":response.data[i].grossAmountCurr,
	        "headState":response.data[i].headState,
	        "id":response.data[i].id,
	        "latestOrderDate":$scope.Approved_date[0],
	        "lineNoPR":response.data[i].lineNoPR,
	        "netAmountBase":response.data[i].netAmountBase,
	        "netAmountBaseCurr":response.data[i].netAmountBaseCurr,
	        "noteText":response.data[i].noteText,
	        "orderCode":response.data[i].orderCode,
	        "orderDate":response.data[i].orderDate,
	        "orderFor":response.data[i].orderFor,
	        "originalQuantity":response.data[i].originalQuantity,
	        "parentVendorDescription":response.data[i].parentVendorDescription,
	        "parentVendorNo":response.data[i].parentVendorNo,
	        "partNo":response.data[i].partNo,
	        "price":response.data[i].price,
	        "priceBase":response.data[i].priceBase,
	        "priceCurr":response.data[i].priceCurr,
	        "priceInclTaxBase":response.data[i].priceInclTaxBase,
	        "priceInclTaxCurr":response.data[i].priceInclTaxCurr,
	        "program":response.data[i].program,
	        "programdesc":response.data[i].programdesc,
	        "projectDesc":response.data[i].projectDesc,
	        "projectId":response.data[i].projectId,
	        "purchaseCode":response.data[i].purchaseCode,
	        "purchaseCodeDescription":response.data[i].purchaseCodeDescription,
	        "purchaseGroup":response.data[i].purchaseGroup,
	        "purchaseGroupDesc":response.data[i].purchaseGroupDesc,
	        "qtyPurchaseUnit":response.data[i].qtyPurchaseUnit,
	        "quantity":response.data[i].quantity,
	        "receiver":response.data[i].receiver,
	        "releaseNo":response.data[i].releaseNo,
	        "reqNo":response.data[i].reqNo,
	        "requestType":response.data[i].requestType,
	        "requisitionDate":$scope.Arrival_date[0],
	        "requisitioner":response.data[i].requisitioner,
	        "requisitionerName":response.data[i].requisitionerName,
	        "state":response.data[i].state,
	        "status":response.data[i].status,
	        "supplierId":response.data[i].supplierId,
	        "unitMeas":response.data[i].unitMeas,
	        "vendoePartDescription":response.data[i].vendoePartDescription,
	        "vendorName":response.data[i].vendorName,
	        "vendorNo":response.data[i].vendorNo,
	        "vendorPartNo":response.data[i].vendorPartNo,
	        "wantedReceiptDate":$scope.WantedReceiptDate[0]
	       }
      	   $scope.dataset.push(obj);
    	}

	    data($scope.dataset); 
	    $scope.selectdate(90);
	    //$scope.ApiDone= true;
	    $rootScope.loading=false;
    },
	  function errorCallback(response){
	        console.log(response);
	});
   

   $scope.gridOptions = {
	    enableFiltering: true,
	    onRegisterApi: function(gridApi){
	      $scope.gridApi = gridApi;
	    },
        
	    paginationPageSizes: [20,50,100],
	    enablePinning: false,
	    columnDefs: [
	      { field: 'reqNo',displayName:"Req No",width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'requisitionDate', displayName: "Requisition Date",width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd"' },
	      { field: 'status', displayName: "Status",width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'netAmountBase', displayName: "Net Amount Base", cellFilter: 'currency:"USD " :2',width: 150,visible: true,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'grossAmountBase' , displayName: "Gross Amount Base", cellFilter: 'currency:"USD " :2',width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'grossAmountCurr' , displayName: "Gross Amount Curr", cellFilter: 'currency:"USD " :2',width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'requisitionerName', displayName: "Requisitioner Name",width: 150,visible: true,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, }, 
	      { field: 'supplierId',displayName:'Supplier Id',width: 150,visible: false, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'orderFor', displayName: "Order For",width: 150,visible: false, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'releaseNo', displayName: "Release No",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'partNo', displayName: "Part No",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'state', displayName: "State",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'originalQuantity', displayName: "Original Quantity",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'unitMeas', displayName: "Unit Meas",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'qtyPurchaseUnit', displayName: "Qty Purchase Unit",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'buyUnitMeas' , displayName: "Buy Unit Meas",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'purchaseCode', displayName: "Purchase Code",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'purchaseCodeDescription', displayName: "Purchase Code Description",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'vendorPartNo', displayName: "Vendor Part No",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'vendoePartDescription', displayName: "Vendoe Part Description",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'authReq' , displayName: "Auth Req",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'wantedReceiptDate', displayName: "Wanted Receipt Date",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd"' },
	      { field: 'latestOrderDate', displayName: "Latest Order Date",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd"' },
	      { field: 'noteText', displayName: "Note Text",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'requestType', displayName: "Request Type",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'priceBase', displayName: "Price Base",cellFilter: 'currency:"USD " :2',width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'priceInclTaxCurr', displayName: "Price Incl Tax Curr", cellFilter: 'currency:"USD " :2',width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'currencyRate' , displayName: "Currency Rate",cellFilter: 'currency:"USD " :2',width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'buyUnitPrice' , displayName: "Buy Unit Price", cellFilter: 'currency:"USD " :2',width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'addituonalCostAmount' , displayName: "Addituonal Cost Amount",cellFilter: 'currency:"USD " :2',width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'additionalCostAmountGross' , displayName: "Additional Cost Amount Gross",cellFilter: 'currency:"USD " :2',width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'purchaseGroup', displayName: "Purchase Group",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'purchaseGroupDesc', displayName: "Purchase Group Desc",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'requisitioner', displayName: "Requisitioner",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'receiver', displayName: "Receiver",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'orderCode', displayName: "Order Code",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'program', displayName: "Program",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'programdesc', displayName: "Program Desc",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'projectId', displayName: "Project Id",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'projectDesc', displayName: "Project Desc",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'conversionFac' , displayName: "Conversion Fac",width: 150,visible: false,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, }
	    ],

	    onRegisterApi: function(gridApi){
	      $scope.gridApi = gridApi;
	    }
   };
   console.log($scope.linesPerPage);
   
   console.log($scope.gridOptions.paginationPageSize);

    // data($scope.dataset);
    function data(data) {
	    $scope.dateBarChart=[];
	    $scope.gridOptions.data = data;
    }

   	$scope.selectdate=function(getdays){
	   	var today = new Date();
	    var nextWeek = new Date();
	    nextWeek.setDate(nextWeek.getDate() - getdays);
	    // console.log(getdays);
	    $scope.fdate =new Date(nextWeek);
	    $scope.edate= today;
	    $scope.workingDatabase=[];
	 
      	for(var i=0;i<$scope.dataset.length;i++){
	      	if($scope.fdate.getFullYear()<= new Date($scope.dataset[i].requisitionDate).getFullYear()){
	      		if($scope.fdate.getMonth()<new Date($scope.dataset[i].requisitionDate).getMonth() ){
	      			$scope.workingDatabase.push($scope.dataset[i]);
	      		}
	      		else if($scope.fdate.getMonth()==new Date($scope.dataset[i].requisitionDate).getMonth()){
	      			if($scope.fdate.getDate()<=new Date($scope.dataset[i].requisitionDate).getDate()){
						$scope.workingDatabase.push($scope.dataset[i]);
	      			}
	      		}
	      	}
        }
      	data($scope.workingDatabase); 
	}

    $scope.viewAll = function(){
    	data($scope.dataset);
    }


    URLGetUnpaid = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/getpurchaserequisitionscustomisationdata/'+ifsSupplierID;
	var Headers = tokenType+' '+accessToken;
	$http({
	method:'GET',
	url: URLGetUnpaid,
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	}).then(function(response){
		if(response.data.length == 0){
			$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/createpurchaserequisitioncustomization',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			     "SupplierID":ifsSupplierID,
        			 "IsReqNoActive":true,
			         "IsRequistionDateActive":true,
			         "IsStatusActive":true,
			         "IsNetAmountBaseActive":true,
			         "IsGrossAmountBaseActive":true,
			         "IsGrossAmountCurrActive":true,
			         "IsRequisitionerNameActive":true,
			         "IsSupplierIdActive":false,
			         "IsOrderForActive":false,
			         "IsReleaseNoActive":false,
			         "IsPartNoActive":false,
			         "IsStateActive":false,
			         "IsOriginalQuantityActive":false,
			         "IsUnitMeansActive":false,
			         "IsQtyPurchaseUnitActive":false,
			         "IsBuyUnitMeasActive":false,
			         "IsPurchaseCodeActive":false,
			         "IsPurchaseCodeDesciptionActive":false,
			         "IsVendorNoActive":false,
			         "IsVendorPartDesciptionActive":false,
			         "IsAuthReqActive":false,
			         "IsWantedRecieptDateActive":false,
			         "IsLatestOrderDateActive":false,
			         "IsNoteTextActive":false,
			         "IsRequestTypeActive":false,
			         "IsPriceBaseActive":false,
			         "IsPriceIncTaxCurrActive":false,
			         "IsCurrencyRateActive":false,
			         "IsBuyUnitPriceActive":false,
			         "IsAdditionalCostAmountActive":false,
			         "IsAdditionalCostAmountGrossActive":false,
			         "IsPurchaseGroupActive":false,
			         "IsPurchaseGroupDescActive":false,
			         "IsRequisitionerActive":false,
			         "IsRecieverActive":false,
			         "IsOrderCodeActive":false,
			         "IsProgramActive":false,
			         "IsProgramDescActive":false,
			         "IsProjectIdActive":false,
			         "IsProjectDescActive":false,
			         "isConversionFacActive":false
	  		      }
			}).then(function(response){
				console.log("createing Unpaid Invoices");
				console.log(response);
			});
		}
		else{
			// console.log("purchaserequisition response");
			// console.log(response);
		    $scope.columnArray[0].value = response.data[0].isReqNoActive ;
		    $scope.columnArray[1].value = response.data[0].isRequistionDateActive ;
		    $scope.columnArray[2].value = response.data[0].isStatusActive ;
		    $scope.columnArray[3].value = response.data[0].isNetAmountBaseActive ;
		    $scope.columnArray[4].value = response.data[0].isGrossAmountBaseActive ;
		    $scope.columnArray[5].value = response.data[0].isGrossAmountCurrActive ;
		    $scope.columnArray[6].value = response.data[0].isRequisitionerNameActive ;
		    $scope.columnArray[7].value = response.data[0].isSupplierIdActive ;
		    $scope.columnArray[8].value = response.data[0].isOrderForActive ;
		    $scope.columnArray[9].value = response.data[0].isReleaseNoActive ;
		    $scope.columnArray[10].value = response.data[0].isPartNoActive ;
		    $scope.columnArray[11].value = response.data[0].isStateActive ;
		    $scope.columnArray[12].value = response.data[0].isOriginalQuantityActive ;
		    $scope.columnArray[13].value = response.data[0].isUnitMeansActive ;
		    $scope.columnArray[14].value = response.data[0].isQtyPurchaseUnitActive ;
		    $scope.columnArray[15].value = response.data[0].isBuyUnitMeasActive ;
		    $scope.columnArray[16].value = response.data[0].isPurchaseCodeActive ;
		    $scope.columnArray[17].value = response.data[0].isPurchaseCodeDesciptionActive ;
		    $scope.columnArray[18].value = response.data[0].isVendorNoActive ;
		    $scope.columnArray[19].value = response.data[0].isVendorPartDesciptionActive ;
		    $scope.columnArray[20].value = response.data[0].isAuthReqActive;
		    $scope.columnArray[21].value = response.data[0].isWantedRecieptDateActive;
		    $scope.columnArray[22].value = response.data[0].isLatestOrderDateActive;
		    $scope.columnArray[23].value = response.data[0].isNoteTextActive;
		    $scope.columnArray[24].value = response.data[0].isRequestTypeActive;
		    $scope.columnArray[25].value = response.data[0].isPriceBaseActive;
		    $scope.columnArray[26].value = response.data[0].isPriceIncTaxCurrActive ;
		    $scope.columnArray[27].value = response.data[0].isCurrencyRateActive;
		    $scope.columnArray[28].value = response.data[0].isBuyUnitPriceActive ;
		    $scope.columnArray[29].value = response.data[0].isAdditionalCostAmountActive ;
		    $scope.columnArray[30].value = response.data[0].isAdditionalCostAmountGrossActive ;
		    $scope.columnArray[31].value = response.data[0].isPurchaseGroupActive ;
		    $scope.columnArray[32].value = response.data[0].isPurchaseGroupDescActive ;
		    $scope.columnArray[33].value = response.data[0].isRequisitionerActive ;
		    $scope.columnArray[34].value = response.data[0].isRecieverActive ;
		    $scope.columnArray[35].value = response.data[0].isOrderCodeActive;
		    $scope.columnArray[36].value = response.data[0].isProgramActive;
		    $scope.columnArray[37].value = response.data[0].isProgramDescActive;
		    $scope.columnArray[38].value = response.data[0].isProjectIdActive;
		    $scope.columnArray[39].value = response.data[0].isProjectDescActive;
		    $scope.columnArray[40].value = response.data[0].isConversionFacActive;
		    $scope.hideColumn();
		}
	});

    $scope.columnArray=[
		{'id':0,'title': ' reqNo' ,'value':true},
		{'id':1,'title': ' Requisition Date' ,'value':true},
		{'id':2,'title': ' Status' ,'value':true},
		{'id':3,'title': ' Net Amount Base','value':true},
		{'id':4,'title': ' Gross Amount Base' ,'value':true},
		{'id':5,'title': ' Gross Amount Curr' ,'value':true},
		{'id':6,'title': ' Requisitioner Name' ,'value':true},
		{'id':7,'title': ' supplierId' ,'value':false},
	    {'id':8,'title': ' orderFor' ,'value':false},   
	    {'id':9,'title': ' Release No' ,'value':false},
	    {'id':10,'title': ' Part No','value':false},
	    {'id':11,'title': ' State' ,'value':false},
	    {'id':12,'title': ' Original Quantity' ,'value':false},
	    {'id':13,'title': ' Unit Meas' ,'value':false},
	    {'id':14,'title': ' Qty Purchase Unit' ,'value':false},
	    {'id':15,'title': ' Buy Unit Meas' ,'value':false},
	    {'id':16,'title': ' Purchase Code' ,'value':false},
	    {'id':17,'title': ' Purchase Code Description','value':false},
	    {'id':18,'title': ' Vendor No' ,'value':false},
	    {'id':19,'title': ' Vendoe Part Description' ,'value':false},
	    {'id':20,'title': ' authReq' ,'value':false},
	    {'id':21,'title': ' Wanted Receipt Date' ,'value':false}, 
	    {'id':22,'title': ' Latest Order Date' ,'value':false},
	    {'id':23,'title': ' NoteText','value':false},
	    {'id':24,'title': ' Request Type' ,'value':false},
	    {'id':25,'title': ' Price Base','value':false},
	    {'id':26,'title': ' Price Incl Tax Curr' ,'value':false},
	    {'id':27,'title': ' Currency Rate'  ,'value':false},
	    {'id':28,'title': ' Buy Unit Price' ,'value':false},
	    {'id':29,'title': ' addituonalCostAmount','value':false}, 
	    {'id':30,'title': ' additionalCostAmountGross','value':false}, 
	    {'id':31,'title': ' Purchase Group','value':false},
	    {'id':32,'title': ' Purchase Group Desc' ,'value':false},
	    {'id':33,'title': ' Requisitioner' ,'value':false},
	    {'id':34,'title': ' Receiver','value':false}, 
	    {'id':35,'title': ' Order Code' ,'value':false},
	    {'id':36,'title': ' Program' ,'value':false},
	    {'id':37,'title': ' Program Desc' ,'value':false},
	    {'id':38,'title': ' Project Id' ,'value':false}, 
	    {'id':39,'title': ' Project Desc' ,'value':false},
	    {'id':40,'title': ' Conversion Fac' ,'value':false},
	];
	$scope.updatePurchaseRequisitions = function(){
		$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/updatepurchaserequisitionssettings',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			     "SupplierID":ifsSupplierID,
        			 "IsReqNoActive":$scope.columnArray[0].value,
			         "IsRequistionDateActive":$scope.columnArray[1].value,
			         "IsStatusActive":$scope.columnArray[2].value,
			         "IsNetAmountBaseActive":$scope.columnArray[3].value,
			         "IsGrossAmountBaseActive":$scope.columnArray[4].value,
			         "IsGrossAmountCurrActive":$scope.columnArray[5].value,
			         "IsRequisitionerNameActive":$scope.columnArray[6].value,
			         "IsSupplierIdActive":$scope.columnArray[7].value,
			         "IsOrderForActive":$scope.columnArray[8].value,
			         "IsReleaseNoActive":$scope.columnArray[9].value,
			         "IsPartNoActive":$scope.columnArray[10].value,
			         "IsStateActive":$scope.columnArray[11].value,
			         "IsOriginalQuantityActive":$scope.columnArray[12].value,
			         "IsUnitMeansActive":$scope.columnArray[13].value,
			         "IsQtyPurchaseUnitActive":$scope.columnArray[14].value,
			         "IsBuyUnitMeasActive":$scope.columnArray[15].value,
			         "IsPurchaseCodeActive":$scope.columnArray[16].value,
			         "IsPurchaseCodeDesciptionActive":$scope.columnArray[17].value,
			         "IsVendorNoActive":$scope.columnArray[18].value,
			         "IsVendorPartDesciptionActive":$scope.columnArray[19].value,
			         "IsAuthReqActive":$scope.columnArray[20].value,
			         "IsWantedRecieptDateActive":$scope.columnArray[21].value,
			         "IsLatestOrderDateActive":$scope.columnArray[22].value,
			         "IsNoteTextActive":$scope.columnArray[23].value,
			         "IsRequestTypeActive":$scope.columnArray[24].value,
			         "IsPriceBaseActive":$scope.columnArray[25].value,
			         "IsPriceIncTaxCurrActive":$scope.columnArray[26].value,
			         "IsCurrencyRateActive":$scope.columnArray[27].value,
			         "IsBuyUnitPriceActive":$scope.columnArray[28].value,
			         "IsAdditionalCostAmountActive":$scope.columnArray[29].value,
			         "IsAdditionalCostAmountGrossActive":$scope.columnArray[30].value,
			         "IsPurchaseGroupActive":$scope.columnArray[31].value,
			         "IsPurchaseGroupDescActive":$scope.columnArray[32].value,
			         "IsRequisitionerActive":$scope.columnArray[33].value,
			         "IsRecieverActive":$scope.columnArray[34].value,
			         "IsOrderCodeActive":$scope.columnArray[35].value,
			         "IsProgramActive":$scope.columnArray[36].value,
			         "IsProgramDescActive":$scope.columnArray[37].value,
			         "IsProjectIdActive":$scope.columnArray[38].value,
			         "IsProjectDescActive":$scope.columnArray[39].value,
			         "isConversionFacActive":$scope.columnArray[40].value
	  		      }
			}).then(function(response){
				alert("Updateed sucessfully");
				$scope.hideColumn();
			});

	}
	$scope.hideColumn=function(){
		for(var i=0;i<$scope.columnArray.length;i++){
			if($scope.columnArray[i].value){
				$scope.gridOptions.columnDefs[i] = { field: $scope.gridOptions.columnDefs[i].name, visible: true,width: 150, };
			}
			else{
				$scope.gridOptions.columnDefs[i] = { field: $scope.gridOptions.columnDefs[i].name, visible: false,width: 150,};
			}
		}
		// console.log($scope.columnArray);
		$scope.gridApi.core.refresh();
	}

	// Recent Purchase Orders
	$scope.dataset1 =[];
	apiEndPoint1 = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/po/getpurchaseorders/'+ifsSupplierID;
	$http({
		method:'GET',
		url: apiEndPoint1,
		headers:{'Authorization':Headers}
	}).then(function(response){
		for (var i=0;i<response.data.length;i++){
			$scope.Arrival_date=response.data[i].datE_ENTERED.split('T');
			$scope.Approved_date=response.data[i].wanteD_RECEIPT_DATE.split('T');
			var obj = {
				"PO_Number":172140,
				"Supplier_Id":response.data[i].supplierId,
				"Supplier_Name":"UNITED CENTRAL INDUSTRIAL SUPPLY",
				"Total_Tax_Amount":response.data[i].totaL_TAX_AMT,
				"Total_Net_Amount":response.data[i].totaL_NET_AMT,
				"Total_Gross_Amount":response.data[i].totaL_GROSS_AMT,
				"Order_Total_Amount_Base":response.data[i].ordeR_TOTAL_AMT_BASE,
				"Total_Gross_Incl_Charge":response.data[i].totaL_GROSS_INCL_CHG,
				"Invoice_Net_Amount":response.data[i].invoiceD_NET_AMT,
				"Revision":response.data[i].revision,
				"Currency_Code":response.data[i].currencY_CODE,
				"Date_Entered":$scope.Arrival_date[0],
				"Wanted_Receipt_Date":$scope.Approved_date[0],
				"Buyer_Name":response.data[i].buyeR_NAME,
				"Status":response.data[i].status,
				"Company":response.data[i].company,
				"Company_Name":response.data[i].companY_NAME,
				"Payment_Term":response.data[i].paymenT_TERMS,
				"Payment_Term_Description":response.data[i].paymenT_TERMS_DESC,
				"Cancel_Reason":response.data[i].canceL_REASON,
				"Cancel_Reason_Description":response.data[i].canceL_REASON_DESC,
				"Ship_Via_Code_Description":response.data[i].shiP_VIA_CODE_DESC
			}
			$scope.dataset1.push(obj);
		}
		data1($scope.dataset1);
		$scope.selectdate1(90);
	},function errorCallback(response){
		console.log(response);
	}); 

	$scope.gridOptions1 = {
		enableFiltering: true,
		onRegisterApi: function(gridApi1){
		$scope.gridApi1 = gridApi1;
		},
		enablePinning: false,
		paginationPageSizes: [20,50,100],
		
		columnDefs: [
			{ field: 'Supplier_Name',  displayName: "Supplier Name",width: 150,visible: true,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Total_Gross_Amount',  displayName: "Total Gross Amount",cellFilter: 'currency:"USD " :2',width: 150,visible: true,enableHiding:false,enableFiltering: false,enablePinning:false, groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Order_Total_Amount_Base',  displayName: "Order Total Amount Base",cellFilter: 'currency:"USD " :2',width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Total_Gross_Incl_Charge',  displayName: "Total Gross Incl Charge",width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Invoice_Net_Amount',  displayName: "Invoice Net Amount",cellFilter: 'currency:"USD " :2',width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Date_Entered',  displayName: "Date Entered",width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd hh:mm:ss"'},
			{ field: 'Status',  displayName: "Status",width: 150,visible: true, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'PO_Number',  displayName: "PO Number",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Supplier_Id',  displayName: "Supplier Id",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Total_Tax_Amount',displayName: "Total Tax Amount",cellFilter: 'currency:"USD " :2',visible: false, width: 150,enableHiding:false,enableFiltering: false,enablePinning:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Total_Net_Amount',displayName: "Total Net Amount",cellFilter: 'currency:"USD " :2',visible: false, width: 150,enableHiding:false,enableFiltering: false,enablePinning:false, groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Revision',  displayName: "Revision",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Currency_Code',  displayName: "Currency Code",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Wanted_Receipt_Date',  displayName: "Wanted Receipt Date",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd hh:mm:ss"'},
			{ field: 'Buyer_Name',  displayName: "Buyer Name",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Company',  displayName: "Company",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Company_Name',  displayName: "Company Name",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Payment_Term',  displayName: "Payment Term",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Payment_Term_Description',  displayName: "Payment Term Description",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Cancel_Reason',  displayName: "Cancel Reason",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Cancel_Reason_Description',  displayName: "Cancel Reason Description",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Ship_Via_Code_Description',  displayName: "Ship Via Code Description",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,}
			// pre-populated search field
		],

		onRegisterApi: function(gridApi1){
		$scope.gridApi1 = gridApi1;
		}
	};

	data1($scope.dataset1);
	function data1(data) {
		$scope.dateBarChart=[];
		$scope.gridOptions1.data = data;
		// _.forEach($scope.gridOptions1.data, function (val) {
		// 	val.Date_Entered = new Date(val.Date_Entered);
		// });
		// _.forEach($scope.gridOptions1.data, function (val) {
		// 	val.Date_Entered = new Date(val.Date_Entered);
		// });
	}

	$scope.selectdate1=function(getdays){
		var today = new Date();
		var nextWeek = new Date();
		nextWeek.setDate(nextWeek.getDate() - getdays);
		$scope.fdate =new Date(nextWeek);
		$scope.edate= today;
		$scope.workingDatabase=[];
		for(var i=0;i<$scope.dataset1.length;i++){
			if($scope.fdate.getFullYear()<= new Date($scope.dataset1[i].Date_Entered).getFullYear()){
				if($scope.fdate.getMonth()< new Date($scope.dataset1[i].Date_Entered).getMonth() ){
					$scope.workingDatabase.push($scope.dataset1[i]);
				}
				else if($scope.fdate.getMonth()== new Date($scope.dataset1[i].Date_Entered).getMonth()){
					if($scope.fdate.getDate()<= new Date($scope.dataset1[i].Date_Entered).getDate()){
						$scope.workingDatabase.push($scope.dataset1[i]);
					}
				}
			}
		}
		data1($scope.workingDatabase);
	}

    $scope.viewAll1 = function(){
    	data1($scope.dataset1);
    }

    URLgetpurchaseordercustomisationdata = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/getpurchaseordercustomisationdata/'+ifsSupplierID;
	var Headers = tokenType+' '+accessToken;
	$http({
	method:'GET',
	url: URLgetpurchaseordercustomisationdata,
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	}).then(function(response){
		if(response.data.length == 0){
			$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/createpurchaseordercustomization',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			     "SupplierID":ifsSupplierID,
        			 "IsSupplierNameActive":true,
			         "IsTotalGrossAmountActive":true,
			         "IsOrderTotalAmountBaseActive":true,
			         "IsTotalGrossChangeActive":true,
			         "IsInvoiceNetAmountActive":true,
			         "IsDateEnteredActive":true,
			         "IsStatusActive":true,
			         "IsPONumberActive":false,
			         "IsSupplierIdActive":false,
			         "IsTotalTaxAmountActive":false,
			         "IsTotalNetAmountActive":false,
			         "IsRevisionActive":false,
			         "IsCurrencyCodeActive":false,
			         "IsWantedRecieptDateActive":false,
			         "IsBuyerNameActive":false,
			         "IsCompanyActive":false,
			         "IsCompanyNameActive":false,
			         "IsPaymentTermActive":false,
			         "IsPaymentTermDescActive":false,
			         "IsCancelReasonActive":false,
			         "IsCancelReasonDescActive":false,
			         "IsShipViaCodeActive":false
	  		      }
			}).then(function(response){
				console.log("createing  Purchase Order");
				console.log(response);
			});
		}
		else{
			// console.log("get Purchase Order");
			// console.log(response.data[0].isBuyerNameActive);
		    $scope.columnArray1[0].value = response.data[0].isSupplierNameActive;
		    $scope.columnArray1[1].value = response.data[0].isTotalGrossAmountActive;
		    $scope.columnArray1[2].value = response.data[0].isOrderTotalAmountBaseActive;
		    $scope.columnArray1[3].value = response.data[0].isTotalGrossChangeActive;
		    $scope.columnArray1[4].value = response.data[0].isInvoiceNetAmountActive;
		    $scope.columnArray1[5].value = response.data[0].isDateEnteredActive;
		    $scope.columnArray1[6].value = response.data[0].isStatusActive;
		    $scope.columnArray1[7].value = response.data[0].isPONumberActive;
		    $scope.columnArray1[8].value = response.data[0].isSupplierIdActive;
		    $scope.columnArray1[9].value = response.data[0].isTotalTaxAmountActive;
		    $scope.columnArray1[10].value = response.data[0].isTotalNetAmountActive;
		    $scope.columnArray1[11].value = response.data[0].isRevisionActive;
		    $scope.columnArray1[12].value = response.data[0].isCurrencyCodeActive;
		    $scope.columnArray1[13].value = response.data[0].isWantedRecieptDateActive;
		    $scope.columnArray1[14].value = response.data[0].isBuyerNameActive;
		    $scope.columnArray1[15].value = response.data[0].isCompanyActive;
		    $scope.columnArray1[16].value = response.data[0].isCompanyNameActive;
		    $scope.columnArray1[17].value = response.data[0].isPaymentTermActive;
		    $scope.columnArray1[18].value = response.data[0].isPaymentTermDescActive;
		    $scope.columnArray1[19].value = response.data[0].isCancelReasonActive;
		    $scope.columnArray1[20].value = response.data[0].isCancelReasonDescActive;
		    $scope.columnArray1[21].value = response.data[0].isShipViaCodeActive;
		    $scope.hideColumnOrders();
		}
	});

    $scope.columnArray1=[
	    {'id':0,'title':'Supplier Name','value':true},
	    {'id':1,'title':'Total Gross Amount','value':true},
	    {'id':2,'title':'Order Total Amount Base','value':true},
	    {'id':3,'title':'Total Gross Incl Charge','value':true},
	    {'id':4,'title':'Invoice Net Amount','value':true},
	    {'id':5,'title':'Date Entered','value':true},
	    {'id':6,'title':'Status','value':true},
	    {'id':7,'title':'PO Number','value':false},
	    {'id':8,'title':'Supplier Id','value':false},
	    {'id':9,'title':'Total Tax Amount','value':false},
	    {'id':10,'title':'Total Net Amount','value':false},
	    {'id':11,'title':'Revision','value':false},
	    {'id':12,'title':'Currency Code','value':false},
	    {'id':13,'title':'Wanted Receipt Date','value':false},
	    {'id':14,'title':'Buyer Name','value':false},
	    {'id':15,'title':'Company','value':false},
	    {'id':16,'title':'Company Name','value':false},
	    {'id':17,'title':'Payment Term','value':false},
	    {'id':18,'title':'Payment Term Description','value':false},
	    {'id':19,'title':'Cancel Reason','value':false},
	    {'id':20,'title':'Cancel Reason Description','value':false},
	    {'id':21,'title':'Ship Via Code Description','value':false}
    ];

    $scope.updatePurchaseOrder = function(){
		$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/updatepurchaseordersettings',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			     
			         "SupplierID":ifsSupplierID,
        			 "IsSupplierNameActive":$scope.columnArray1[0].value,
			         "IsTotalGrossAmountActive":$scope.columnArray1[1].value,
			         "IsOrderTotalAmountBaseActive":$scope.columnArray1[2].value,
			         "IsTotalGrossChangeActive":$scope.columnArray1[3].value,
			         "IsInvoiceNetAmountActive":$scope.columnArray1[4].value,
			         "IsDateEnteredActive":$scope.columnArray1[5].value,
			         "IsStatusActive":$scope.columnArray1[6].value,
			         "IsPONumberActive":$scope.columnArray1[7].value,
			         "IsSupplierIdActive":$scope.columnArray1[8].value,
			         "IsTotalTaxAmountActive":$scope.columnArray1[9].value,
			         "IsTotalNetAmountActive":$scope.columnArray1[10].value,
			         "IsRevisionActive":$scope.columnArray1[11].value,
			         "IsCurrencyCodeActive":$scope.columnArray1[12].value,
			         "IsWantedRecieptDateActive":$scope.columnArray1[13].value,
			         "IsBuyerNameActive":$scope.columnArray1[14].value,
			         "IsCompanyActive":$scope.columnArray1[15].value,
			         "IsCompanyNameActive":$scope.columnArray1[16].value,
			         "IsPaymentTermActive":$scope.columnArray1[17].value,
			         "IsPaymentTermDescActive":$scope.columnArray1[18].value,
			         "IsCancelReasonActive":$scope.columnArray1[19].value,
			         "IsCancelReasonDescActive":$scope.columnArray1[20].value,
			         "IsShipViaCodeActive":$scope.columnArray1[21].value
	  		      }
			}).then(function(response){
				alert("Updateed sucessfully");
				$scope.hideColumnOrders();
			});

	}

	$scope.hideColumnOrders=function(){
		for(var i=0;i<$scope.columnArray1.length;i++){
			if($scope.columnArray1[i].value){
				$scope.gridOptions1.columnDefs[i] = { field: $scope.gridOptions1.columnDefs[i].name, visible: true,width: 150, };
			}
			else{
				$scope.gridOptions1.columnDefs[i] = { field: $scope.gridOptions1.columnDefs[i].name, visible: false,width: 150,};
			}
		}
		$scope.gridApi1.core.refresh();
	}
  
	// Unpaid Invoices
	$scope.dataset2 =[]
	URL2 = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/invoice/getsupplierinvoices/'+ifsSupplierID;
	var Headers = tokenType+' '+accessToken;
	$http({
	method:'GET',
	url: URL2,
	headers:{'Authorization':Headers}
	}).then(function(response){
		for (var i=0;i<response.data.length;i++){
			// $scope.payment_Date=response.data[i].paymentDate.split('T');
			$scope.invoice_Date=response.data[i].invoiceDate.split('T');
			$scope.due_Date=response.data[i].dueDate.split('T');
			var obj = {
				"Invoice_Id":response.data[i].invoiceId,
				"Invoice_No":response.data[i].invoiceNo,
				"Supplier_Id":response.data[i].supplier,
				"Supplier_Name":response.data[i].supplierName,
				"Company":response.data[i].company,
				"PO_Reference":response.data[i].poReference,
				"Payment_Date":response.data[i].paymentDate,
				"Invoice_Date":$scope.invoice_Date[0],
				"Due_Date":$scope.due_Date[0],
				"Gross_Amount":response.data[i].grossAmount,
				"Net_Amount":response.data[i].netAmount,
				"Tax_Amount":response.data[i].taxAmount,
				"Payment_Terms_Description":response.data[i].paymentTermsDesc,
				"Payment_Reference":response.data[i].paymentReference,
				"Currency":response.data[i].currency,
				"Status":response.data[i].status
			}
			$scope.dataset2.push(obj);
		}
		data2($scope.dataset2);
		$scope.selectdate2(90);
	},function errorCallback(response){
		console.log(response);
	});


	$scope.gridOptions2 = {
		enableFiltering: true,
		onRegisterApi: function(gridApi2){
			$scope.gridApi2 = gridApi2;
		},
		paginationPageSizes: [20,50,100],
		columnDefs: [
			{ field: 'Invoice_No', width: 150,visible: true,  enableColumnResizing: false, pinnedLeft:false,displayName: "Invoice No", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
			{ field: 'Supplier_Name',width: 150,visible: true,    enableColumnResizing: false, pinnedLeft:false,displayName: "Supplier Name", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
			{ field: 'PO_Reference',width: 150,visible: true,    enableColumnResizing: false, pinnedLeft:false,displayName: "PO Reference", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
			{ field: 'Invoice_Date',width: 150,visible: true,    enableColumnResizing: false, pinnedLeft:false,displayName: "Invoice Date", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd"'},
			{ field: 'Due_Date',width: 150,visible: true,    enableColumnResizing: false, pinnedLeft:false,displayName: "Due Date", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd'},
			{ field: 'Gross_Amount',width: 150,visible: true,    enableColumnResizing: false, pinnedLeft:false,displayName: "Gross Amount", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false, cellFilter: 'currency:"USD " :2',},
			{ field: 'Invoice_Id',width: 150,visible: true,   enableColumnResizing: false, pinnedLeft:false,displayName: "Invoice Id", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
			{ field: 'Supplier_Id',   width: 150,visible: false,  enableColumnResizing: false, pinnedLeft:false,displayName: "Supplier Id", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
			{ field: 'Company',width: 150,visible: false,enableColumnResizing:false,pinnedLeft:false,displayName:"Company",headerCellClass:$scope.highlightFilteredHeader,enableFiltering: false,},
			{ field: 'Payment_Date',   width: 150,visible: false,  enableColumnResizing: false, pinnedLeft:false,displayName: "Payment Date", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd"'}, 
			{ field: 'Net_Amount',   width: 150,visible: false,  enableColumnResizing: false, pinnedLeft:false,displayName: "Net Amount", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,cellFilter: 'currency:"USD " :2',},
			{ field: 'Tax_Amount',   width: 150,visible: false,  enableColumnResizing: false, pinnedLeft:false,displayName: "Tax Amount", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false, cellFilter: 'currency:"USD " :2',},
			{ field: 'Payment_Terms_Description',   width: 150,visible: false,  enableColumnResizing: false, pinnedLeft:false,displayName: "Payment Terms Description", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
			{ field: 'Payment_Reference',   width: 150,visible: false,  enableColumnResizing: false, pinnedLeft:false,displayName: "Payment Reference", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
			{ field: 'Currency',   width: 150,visible: false,  enableColumnResizing: false, pinnedLeft:false,displayName: "Currency", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
			{ field: 'Status',   width: 150,visible: false,  enableColumnResizing: false, pinnedLeft:false,displayName: "Status", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,}
		],
		onRegisterApi: function(gridApi2){
			$scope.gridApi2 = gridApi2;
		}
	};

	$scope.UnpaidInvoicesCount = 0;
	$scope.AmountUnpaid = 0;
	data2($scope.dataset2);
	function data2(data) {
		$scope.UnpaidInvoicesCount = 0;
		$scope.AmountUnpaid = 0;
		$scope.gridOptions2.data = data;
		_.forEach($scope.gridOptions2.data, function (val) {
			// val.Invoice_Date = new Date(val.Invoice_Date);
			$scope.UnpaidInvoicesCount++;
			$scope.AmountUnpaid+=val.Gross_Amount;
		});
	}

	$scope.selectdate2=function(getdays){
		var today = new Date();
		var nextWeek = new Date();
		nextWeek.setDate(nextWeek.getDate() - getdays);
		$scope.fdate =new Date(nextWeek);
		$scope.edate= today;
		$scope.workingDatabase=[];
		for(var i=0;i<$scope.dataset2.length;i++){
			if($scope.fdate.getFullYear()<=new Date($scope.dataset2[i].Invoice_Date).getFullYear()){
				if($scope.fdate.getMonth()<new Date($scope.dataset2[i].Invoice_Date).getMonth() ){
					$scope.workingDatabase.push($scope.dataset2[i]);
				}
				else if($scope.fdate.getMonth()==new Date($scope.dataset2[i].Invoice_Date).getMonth()){
					if($scope.fdate.getDate()<=new Date($scope.dataset2[i].Invoice_Date).getDate()){
						$scope.workingDatabase.push($scope.dataset2[i]);
					}
				}
			}
		}
		data2($scope.workingDatabase);
	}

	$scope.viewAll2 = function(){
		data2($scope.dataset2);
	}

	URLGetUnpaid = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/getunpaidcustomizationdata/'+ifsSupplierID;
	var Headers = tokenType+' '+accessToken;
	$http({
	method:'GET',
	url: URLGetUnpaid,
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	}).then(function(response){
		if(response.data.length == 0){
			$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/createunpaidinvoicescustomization',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			     "SupplierID":ifsSupplierID,
        			 "IsSupplierIdActive":false,
			         "IsSupplierNameActive":true,
			         "IsPOReferenceActive":true,
			         "IsInvoiceDateActive":true,
			         "IsDueDateActive":true,
			         "IsGrossAmountActive":true,
			         "IsNetAmountActive":false,
			         "IsTaxAmountActive":false,
			         "IsInvoiceIdActive":true,
			         "IsInvoiceNoActive":true,
			         "IsPaymentDateActive":false,
			         "IsCompanyActive":false,
			         "IsPaymentTermsDescActive":false,
			         "IsPaymentReferenceActive":false,
			         "IsCurrencyActive":false,
			         "isStatusActive":false
	  		      }
			}).then(function(response){
				console.log("createing Unpaid Invoices");
				console.log(response);
			});
		}
		else{
			
		    $scope.columnArray2[0].value = response.data[0].isInvoiceNoActive;
		    $scope.columnArray2[1].value = response.data[0].isSupplierNameActive;
		    $scope.columnArray2[2].value = response.data[0].isPOReferenceActive;
		    $scope.columnArray2[3].value = response.data[0].isInvoiceDateActive;
		    $scope.columnArray2[4].value = response.data[0].isDueDateActive;
		    $scope.columnArray2[5].value = response.data[0].isGrossAmountActive;
		    $scope.columnArray2[6].value = response.data[0].isInvoiceIdActive;
		    $scope.columnArray2[7].value = response.data[0].isSupplierIdActive;
		    $scope.columnArray2[8].value = response.data[0].isCompanyActive;
		    $scope.columnArray2[9].value = response.data[0].isPaymentDateActive;
		    $scope.columnArray2[10].value = response.data[0].isNetAmountActive;
		    $scope.columnArray2[11].value = response.data[0].isTaxAmountActive;
		    $scope.columnArray2[12].value = response.data[0].isPaymentTermsDescActive;
		    $scope.columnArray2[13].value = response.data[0].isPaymentReferenceActive;
		    $scope.columnArray2[14].value = response.data[0].isCurrencyActive;
		    $scope.columnArray2[15].value = response.data[0].isStatusActive;
		    $scope.hideColumnInvoices();
		}
	});

	$scope.columnArray2=[
		{'id':0,'title':'Invoice No','value':true},
		{'id':1,'title':'Supplier Name','value':true},
		{'id':2,'title':'PO Reference','value':true},
		{'id':3,'title':'Invoice Date','value':true},
		{'id':4,'title':'Due Date','value':true},
		{'id':5,'title':'Gross Amount','value':true},
		{'id':6,'title':'Invoice Id','value':true},
		{'id':7,'title':'Supplier Id','value':false},
		{'id':8,'title':'Company','value':false},
		{'id':9,'title':'Payment Date','value':false},
		{'id':10,'title':'Net Amount','value':false},
		{'id':11,'title':'Tax Amount','value':false},
		{'id':12,'title':'Payment Terms Description','value':false},
		{'id':13,'title':'Payment Reference','value':false},
		{'id':14,'title':'Currency','value':false},
		{'id':15,'title':'Status','value':false}
	];
	$scope.updateUnpaidInvoices = function(){
		$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/updateunpaidinvoicessettings',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			     "SupplierID":ifsSupplierID,
        			 "IsSupplierIdActive":$scope.columnArray2[7].value,
			         "IsSupplierNameActive":$scope.columnArray2[1].value,
			         "IsPOReferenceActive":$scope.columnArray2[2].value,
			         "IsInvoiceDateActive":$scope.columnArray2[3].value,
			         "IsDueDateActive":$scope.columnArray2[4].value,
			         "IsGrossAmountActive":$scope.columnArray2[5].value,
			         "IsNetAmountActive":$scope.columnArray2[10].value,
			         "IsTaxAmountActive":$scope.columnArray2[11].value,
			         "IsInvoiceIdActive":$scope.columnArray2[6].value,
			         "IsInvoiceNoActive":$scope.columnArray2[0].value,
			         "IsPaymentDateActive":$scope.columnArray2[9].value,
			         "IsCompanyActive":$scope.columnArray2[8].value,
			         "IsPaymentTermsDescActive":$scope.columnArray2[12].value,
			         "IsPaymentReferenceActive":$scope.columnArray2[13].value,
			         "IsCurrencyActive":$scope.columnArray2[14].value,
			         "isStatusActive":$scope.columnArray2[15].value
	  		      }
			}).then(function(response){
				alert("Updateed sucessfully");
				$scope.hideColumnInvoices();
			});

	}
	$scope.hideColumnInvoices=function(){
		for(var i=0;i<$scope.columnArray2.length;i++){
			if($scope.columnArray2[i].value){
				$scope.gridOptions2.columnDefs[i] = { field: $scope.gridOptions2.columnDefs[i].name, visible: true,width: 150, };
			}
			else{
				$scope.gridOptions2.columnDefs[i] = { field: $scope.gridOptions2.columnDefs[i].name, visible: false,width: 150,};
			}
		}
		$scope.gridApi2.core.refresh();
	}
		  

	// Shipments
	$scope.dataset3=[];
	dataURL3 = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/suppliershipment/getsuppliershipmentsbysupplier/'+ifsSupplierID;
	var Headers = tokenType+' '+accessToken;
	$http({
		method:'GET',
		url: dataURL3,
		headers:{'Authorization':Headers}
	})
	.then(function(responce){
		for(var i=0;i<responce.data.length;i++){
			$scope.Arrival_date=responce.data[i].arrivaL_DATE.split('T');
			$scope.Approved_date=responce.data[i].approveD_DATE.split('T');
			var obj = {
				"Supplier_Id":ifsSupplierID,
				"Line_No":responce.data[i].linE_NO,
				"Order_No":responce.data[i].ordeR_NO,
				"Description":responce.data[i].description,
				"Supplier_Name":"UNITED CENTRAL INDUSTRIAL SUPPLY",
				"Release_No":responce.data[i].releasE_NO,
				"Receipt_No":responce.data[i].receipT_NO,
				"Part_No":responce.data[i].parT_NO,
				"State":responce.data[i].state,
				"Qty_Arrived":responce.data[i].qtY_ARRIVED,
				"Buy_Unit_Meas":responce.data[i].buY_UNIT_MEAS,
				"Inventory_Part":responce.data[i].inventorY_PART,
				"Invoice_Qty_Arrived":responce.data[i].inV_QTY_ARRIVED,
				"Catch_Qty_Arrived":responce.data[i].catcH_QTY_ARRIVED,
				"Catch_UOM":responce.data[i].catcH_UOM,
				"Qty_Inspected":responce.data[i].qtY_INSPECTED,
				"Qty_To_Inspect":responce.data[i].qtY_TO_INSPECT,
				"Arrival_Date":$scope.Arrival_date[0],
				"Approved_Date":$scope.Approved_date[0],
				"Final_Invoice_Date":responce.data[i].finallY_INVOICED_DATE,
				"Qty_Invoiced":responce.data[i].qtY_INVOICED,
				"Qty_Scrapped_Credit":responce.data[i].qtY_SCRAPPED_CREDIT,
				"Qty_Scrapped_No_Credit":responce.data[i].qtY_SCRAPPED_NO_CREDIT,
				"Qty_Returned_Credit":responce.data[i].qtY_RETURNED_CREDIT,
				"Qty_Returned_No_Credit":responce.data[i].qtY_RETURNED_NO_CREDIT,
				"Qty_Consignment":responce.data[i].qtY_CONSIGNMENT,
				"Notified_Consumed_Qty":responce.data[i].notifieD_CONSUMED_QTY,
				"Receiver":responce.data[i].receiver,
				"Receipt_Reference":responce.data[i].receipT_REFERENCE,
				"Note_Text":responce.data[i].notE_TEXT,
				"Reqisition_No":responce.data[i].requisitioN_NO,
				"Requsition_Line":responce.data[i].reQ_LINE,
				"Project_ID":responce.data[i].projecT_ID,
				"Project_Name":responce.data[i].projecT_NAME,
				"Total_Qty":responce.data[i].totaL_QTY
			}
			$scope.dataset3.push(obj);
		}
		data3($scope.dataset3);
		$scope.selectdate3(90);
		$scope.ApiDone= true;
	});

	$scope.gridOptions3 = {
		enableFiltering: true,
		onRegisterApi: function(gridApi){
			$scope.gridApi = gridApi;
		},
		paginationPageSizes: [20,50,100],
		
		enablePinning: false,
		columnDefs: [
			{ field: 'Order_No',displayName: "Order No",visible: true,width: 110, pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Description',displayName: "Description",visible: true,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Qty_Arrived',displayName: "Qty Arrived",visible: true,width: 110,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Arrival_Date',displayName: "Arrival Date",visible: true,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,cellFilter: 'date:\'yyyy-MM-dd\''},
			{ field: 'Supplier_Id',displayName: "Supplier Id",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering:false,},
			{ field: 'Line_No',displayName: "Line No",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Supplier_Name',displayName: "Supplier Name",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Release_No',displayName: "Release No",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Receipt_No',displayName: "Receipt No",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Part_No ',displayName: "Part No",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'State',displayName: "State",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Buy_Unit_Meas',displayName: "Buy Unit Meas",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Inventory_Part',displayName: "Inventory Part",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Invoice_Qty_Arrived',displayName: "Invoice Qty Arrived",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Catch_Qty_Arrived',displayName: "Catch Qty Arrived",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Catch_UOM',displayName: "Catch UOM",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Qty_Inspected',displayName: "Qty Inspected",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Qty_To_Inspect',displayName: "Qty To Inspect",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Approved_Date',displayName: "Approved Date",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd"'},
			{ field: 'Final_Invoice_Date',displayName: "Final Invoice Date",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,type: 'date',cellFilter: 'date:"yyyy-MM-dd"'},
			{ field: 'Qty_Invoiced',displayName: "Qty Invoiced",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Qty_Scrapped_Credit',displayName: "Qty Scrapped Credit",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Qty_Scrapped_No_Credit',displayName: "Qty Scrapped No Credit",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Qty_Returned_Credit',displayName: "Qty Returned Credit",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Qty_Returned_No_Credit',displayName: "Qty Returned No Credit",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Qty_Consignment',displayName: "Qty Consignment",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Notified_Consumed_Qty',displayName: "Notified Consumed Qty",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Receiver',displayName: "Receiver",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Receipt_Reference',displayName: "Receipt Reference",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Note_Text',displayName: "Note Text",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Reqisition_No',displayName: "Reqisition No",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Requsition_Line',displayName: "Requsition Line",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Project_ID',displayName: "Project ID",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Project_Name',displayName: "Project Name",visible: false, width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{ field: 'Total_Qty',displayName: "Total Qty", visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,}
		],

		onRegisterApi: function(gridApi){
			$scope.gridApi = gridApi;
		}
	};

	function data3(data) {
		$scope.NoOfShipments = 0;
		$scope.gridOptions3.data = data;
		_.forEach($scope.gridOptions3.data, function (val) {
			// val.Arrival_Date = new Date(val.Arrival_Date);
			$scope.NoOfShipments++;
		});
	}

	$scope.selectdate3=function(getdays){
		var today = new Date();
		var nextWeek = new Date();
		nextWeek.setDate(nextWeek.getDate() - getdays);
		$scope.fdate =new Date(nextWeek);
		$scope.edate= today;
		$scope.workingDatabase=[];
		for(var i=0;i<$scope.dataset3.length;i++){
			if($scope.fdate.getFullYear()<=new Date($scope.dataset3[i].Arrival_Date).getFullYear()){
				if($scope.fdate.getMonth()<new Date($scope.dataset3[i].Arrival_Date).getMonth() ){
					$scope.workingDatabase.push($scope.dataset3[i]);
				}
				else if($scope.fdate.getMonth()==new Date($scope.dataset3[i].Arrival_Date).getMonth()){
					if($scope.fdate.getDate()<=new Date($scope.dataset3[i].Arrival_Date).getDate()){
						$scope.workingDatabase.push($scope.dataset3[i]);
					}
				}
			}
		}
		data3($scope.workingDatabase);
	}

	$scope.viewAll3 = function(){
		data3($scope.dataset3);
	}


    URLgetpurchaseordercustomisationdata = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/getshipmentcustomisationdata/'+ifsSupplierID;
	var Headers = tokenType+' '+accessToken;
	$http({
	method:'GET',
	url: URLgetpurchaseordercustomisationdata,
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	}).then(function(response){
		if(response.data.length == 0){
			$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/createshipmentscustomizationdata',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			     "SupplierID":ifsSupplierID,
        			 "IsOrderNoActive":true,
			         "IsDescriptionActive":true,
			         "IsQtyArrivedActive":true,
			         "IsArrivalDateActive":true,
			         "IsSupplierIdActive":true,
			         "IsLineNoActive":true,
			         "IsSupplierNameActive":true,
			         "IsReleaseNoActive":false,
			         "IsRecieptNoActive":false,
			         "IsPartNoActive":false,
			         "IsStateActive":false,
			         "IsBuyUnitMeansActive":false,
			         "IsInventoryPartActive":false,
			         "IsInvoiceQtyArrivedActive":false,
			         "IsCatchQtyArrivedActive":false,
			         "IsCatchUOMActive":false,
			         "IsQtyInspectedActive":false,
			         "IsQtyToInspectActive":false,
			         "IsApprovedDateActive":false,
			         "IsFinalInvoiceDateActive":false,
			         "IsQuantityInvoicedActive":false,
			         "IsQuantityScrappedCreditActive":false,
			         "IsQuantityScrappedNoCreditActive":false,
			         "IsQuantityReturnCreditActive":false,
			         "IsQuantityReturnNoCreditActive":false,
			         "IsQuantityConsignmentActive":false,
			         "IsNotifiedConsumedQtyActive":false,
			         "IsRecieverActive":false,
			         "IsRecieptReferenceActive":false,
			         "IsNoteTextActive":false,
			         "IsRequistionNoActive":false,
			         "IsRequisitionLineActive":false,
			         "IsProjectIdActive":false,
			         "IsProjectNameActive":false,
			         "IsTotalQuantityActive":false
	  		      }
			}).then(function(response){
				console.log("createing  Purchase Order");
				console.log(response);
			});
		}
		else{
			// console.log("get Shipments");
			// console.log(response.data[0]);
		    $scope.columnArray3[0].value = response.data[0].isOrderNoActive;
		    $scope.columnArray3[1].value = response.data[0].isDescriptionActive;
		    $scope.columnArray3[2].value = response.data[0].isQtyArrivedActive;
		    $scope.columnArray3[3].value = response.data[0].isArrivalDateActive;
		    $scope.columnArray3[4].value = response.data[0].isSupplierIdActive;
		    $scope.columnArray3[5].value = response.data[0].isLineNoActive;
		    $scope.columnArray3[6].value = response.data[0].isSupplierNameActive;
		    $scope.columnArray3[7].value = response.data[0].isReleaseNoActive;
		    $scope.columnArray3[8].value = response.data[0].isRecieptNoActive;
		    $scope.columnArray3[9].value = response.data[0].isPartNoActive;
		    $scope.columnArray3[10].value = response.data[0].isStateActive;
		    $scope.columnArray3[11].value = response.data[0].isBuyUnitMeansActive;
		    $scope.columnArray3[12].value = response.data[0].isInventoryPartActive;
		    $scope.columnArray3[13].value = response.data[0].isInvoiceQtyArrivedActive;
		    $scope.columnArray3[14].value = response.data[0].isCatchQtyArrivedActive;
		    $scope.columnArray3[15].value = response.data[0].isCatchUOMActive;
		    $scope.columnArray3[16].value = response.data[0].isQtyInspectedActive;
		    $scope.columnArray3[17].value = response.data[0].isQtyToInspectActive;
		    $scope.columnArray3[18].value = response.data[0].isApprovedDateActive;
		    $scope.columnArray3[19].value = response.data[0].isFinalInvoiceDateActive;
		    $scope.columnArray3[20].value = response.data[0].isQuantityInvoicedActive;
		    $scope.columnArray3[21].value = response.data[0].isQuantityScrappedCreditActive;
		    $scope.columnArray3[22].value = response.data[0].isQuantityScrappedNoCreditActive;
		    $scope.columnArray3[23].value = response.data[0].isQuantityReturnCreditActive;
		    $scope.columnArray3[24].value = response.data[0].isQuantityReturnNoCreditActive;
		    $scope.columnArray3[25].value = response.data[0].isQuantityConsignmentActive;
		    $scope.columnArray3[26].value = response.data[0].isNotifiedConsumedQtyActive;
		    $scope.columnArray3[27].value = response.data[0].isRecieverActive;
		    $scope.columnArray3[28].value = response.data[0].isRecieptReferenceActive;
		    $scope.columnArray3[29].value = response.data[0].isNoteTextActive;
		    $scope.columnArray3[30].value = response.data[0].isRequistionNoActive;
		    $scope.columnArray3[31].value = response.data[0].isRequisitionLineActive;
		    $scope.columnArray3[32].value = response.data[0].isProjectIdActive;
		    $scope.columnArray3[33].value = response.data[0].isProjectNameActive;
		    $scope.columnArray3[34].value = response.data[0].isTotalQuantityActive;
		    $scope.hideColumnShipments();
		}
	});

	$scope.columnArray3=[
		{'id':0,'title':'Order No','value':true},
		{'id':1,'title':'Description','value':true},
		{'id':2,'title':'Qty Arrived','value':true},
		{'id':3,'title':'Arrival Date','value':true},
		{'id':4,'title':'Supplier Id','value':false},
		{'id':5,'title':'Line No','value':false},
		{'id':6,'title':'Supplier Name','value':false},
		{'id':7,'title':'Release No','value':false},
		{'id':8,'title':'Receipt No','value':false},
		{'id':9,'title':'Part No','value':false},
		{'id':10,'title':'State','value':false},
		{'id':11,'title':'Buy Unit Meas','value':false},
		{'id':12,'title':'Inventory Part','value':false},
		{'id':13,'title':'Invoice Qty Arrived','value':false},
		{'id':14,'title':'Catch Qty Arrived','value':false},
		{'id':15,'title':'Catch UOM','value':false},
		{'id':16,'title':'Qty Inspected','value':false},
		{'id':17,'title':'Qty To Inspect','value':false},
		{'id':18,'title':'Approved Date','value':false},
		{'id':19,'title':'Final Invoice Date','value':false},
		{'id':20,'title':'Qty Invoiced','value':false},
		{'id':21,'title':'Qty Scrapped Credit','value':false},
		{'id':22,'title':'Qty Scrapped No Credit','value':false},
		{'id':23,'title':'Qty Returned Credit','value':false},
		{'id':24,'title':'Qty Returned No Credit','value':false},
		{'id':25,'title':'Qty Consignment','value':false},
		{'id':26,'title':'Notified Consumed Qty','value':false},
		{'id':27,'title':'Receiver','value':false},
		{'id':28,'title':'Receipt Reference','value':false},
		{'id':29,'title':'Note Text','value':false},
		{'id':30,'title':'Reqisition No','value':false},
		{'id':31,'title':'Requsition Line','value':false},
		{'id':32,'title':'Project ID','value':false},
		{'id':33,'title':'Project Name','value':false},
		{'id':34,'title':'Total Qty','value':false}
	];

	$scope.updateShipments = function(){
		$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/updateshipmentsettings',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
			         "SupplierID":ifsSupplierID,
        			 "IsOrderNoActive":$scope.columnArray3[0].value,
			         "IsDescriptionActive":$scope.columnArray3[1].value,
			         "IsQtyArrivedActive":$scope.columnArray3[2].value,
			         "IsArrivalDateActive":$scope.columnArray3[3].value,
			         "IsSupplierIdActive":$scope.columnArray3[4].value,
			         "IsLineNoActive":$scope.columnArray3[5].value,
			         "IsSupplierNameActive":$scope.columnArray3[6].value,
			         "IsReleaseNoActive":$scope.columnArray3[7].value,
			         "IsRecieptNoActive":$scope.columnArray3[8].value,
			         "IsPartNoActive":$scope.columnArray3[9].value,
			         "IsStateActive":$scope.columnArray3[10].value,
			         "IsBuyUnitMeansActive":$scope.columnArray3[11].value,
			         "IsInventoryPartActive":$scope.columnArray3[12].value,
			         "IsInvoiceQtyArrivedActive":$scope.columnArray3[13].value,
			         "IsCatchQtyArrivedActive":$scope.columnArray3[14].value,
			         "IsCatchUOMActive":$scope.columnArray3[15].value,
			         "IsQtyInspectedActive":$scope.columnArray3[16].value,
			         "IsQtyToInspectActive":$scope.columnArray3[17].value,
			         "IsApprovedDateActive":$scope.columnArray3[18].value,
			         "IsFinalInvoiceDateActive":$scope.columnArray3[19].value,
			         "IsQuantityInvoicedActive":$scope.columnArray3[20].value,
			         "IsQuantityScrappedCreditActive":$scope.columnArray3[21].value,
			         "IsQuantityScrappedNoCreditActive":$scope.columnArray3[22].value,
			         "IsQuantityReturnCreditActive":$scope.columnArray3[23].value,
			         "IsQuantityReturnNoCreditActive":$scope.columnArray3[24].value,
			         "IsQuantityConsignmentActive":$scope.columnArray3[25].value,
			         "IsNotifiedConsumedQtyActive":$scope.columnArray3[26].value,
			         "IsRecieverActive":$scope.columnArray3[27].value,
			         "IsRecieptReferenceActive":$scope.columnArray3[28].value,
			         "IsNoteTextActive":$scope.columnArray3[29].value,
			         "IsRequistionNoActive":$scope.columnArray3[30].value,
			         "IsRequisitionLineActive":$scope.columnArray3[31].value,
			         "IsProjectIdActive":$scope.columnArray3[32].value,
			         "IsProjectNameActive":$scope.columnArray3[33].value,
			         "IsTotalQuantityActive":$scope.columnArray3[34].value
	  		      }
			}).then(function(response){
				alert("Updateed sucessfully");
				$scope.hideColumnShipments();
			});
		}
	$scope.hideColumnShipments=function(){
		for(var i=0;i<$scope.columnArray3.length;i++){
			if($scope.columnArray3[i].value){
				$scope.gridOptions3.columnDefs[i] = { field: $scope.gridOptions3.columnDefs[i].name, visible: true,width: 150, };
			}
			else{
				$scope.gridOptions3.columnDefs[i] = { field: $scope.gridOptions3.columnDefs[i].name, visible: false,width: 150,};
			}
		}
		// console.log($scope.columnArray2);
		$scope.gridApi2.core.refresh();
	}

	// Payments
	$scope.dataset4=[];
	dataURL4 = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/payments/getpaymentsforsupplier/'+ifsSupplierID;
	$http({
		method:'GET',
		url: dataURL4,
		headers:{'Authorization':Headers}
	})
	.then(function(response){
		// console.log(response);
		for(var i=0;i<response.data.length;i++){
			$scope.paymentDate=response.data[i].paymentDate.split('T');
			// $scope.checkPrintDate=response.data[i].checkPrintDate.split('T');
			// $scope.chekVoiddDate=response.data[i].chekVoiddDate.split('T');
			// $scope.CheckCleardate=response.data[i].CheckCleardate.split('T');
		    var obj={
		      'Company':''+response.data[i].company,
		      'Invoice_NO':''+response.data[i].invoiceNo,
		      'PO_No':''+response.data[i].poId,
		      'Pay_Reference':''+response.data[i].payReference,
		      'paymentDate':$scope.paymentDate[0],
		      'Invoice_Amount':''+response.data[i].invoiceAmount,
		      'Discount_Amount':''+response.data[i].discountAmount,
		      'Payment_Amount':''+response.data[i].paymentAmount,
		      'Open_Amount':''+response.data[i].openAmount,
		      'Cheque_NO':''+response.data[i].checkNo,
		      'Status':''+response.data[i].status,
		      'Currency':''+response.data[i].currency,
		      'Payment_ID':response.data[i].paymentId,
		      'Cheque_Print_Date':response.data[i].checkPrintDate,
		      'Cheque_Void_Date':response.data[i].chekVoiddDate,
		      'Cheque_Clear_Date':response.data[i].CheckCleardate
		    }
			$scope.dataset4.push(obj);
		}
		data4($scope.dataset4);
		$scope.selectdate4(90);
	})

	$scope.gridOptions4 = {
		enableFiltering: true,
		onRegisterApi: function(gridApi){
			$scope.gridApi4 = gridApi;
		},
		paginationPageSizes: [20,50,100],
		
		enablePinning:false,
		columnDefs: [
			{field:'Payment_ID'    ,displayName:'Payment ID' ,visible: true,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{field:'Cheque_NO'    ,displayName:'Cheque NO' ,visible: true,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
			{field:'paymentDate' ,displayName:'Pay Date' ,visible: true,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, type: 'date',cellFilter: 'date:\'yyyy-MM-dd\'',},
			{field:'Payment_Amount',displayName:'Payment Amount' ,visible: true,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,cellFilter: 'currency:"USD " :2',},
			{field:'Company',displayName:'Company' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
			{field:'Invoice_NO' ,displayName:'Invoice NO' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
			{field:'PO_No' ,displayName:'PO No' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
			{field:'Pay_Reference',displayName:'Pay Reference' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
			{field:'Invoice_Due_Date',displayName:'Invoice Due Date' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false, type: 'date',cellFilter: 'date:\'yyyy-MM-dd\''},
			// {field:'Paid_Amount'  ,displayName:'Paid Amount' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,cellFilter: 'currency:"USD " :2',},
			{field:'Discount_Amount' ,displayName:'Discount Amount' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,cellFilter: 'currency:"USD " :2',},
			{field:'Open_Amount'   ,displayName:'Open Amount' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,cellFilter: 'currency:"USD " :2',},
			// {field:'Cheque_Amount'  ,displayName:'Cheque Amount' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,cellFilter: 'currency:"USD " :2',},
			{field:'Status'        ,displayName:'Status' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
			{field:'Cheque_Print_Date'   ,displayName:'Cheque Print Date' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false, type: 'date',cellFilter: 'date:\'yyyy-MM-dd\''},
			{field:'Cheque_Void_Date'    ,displayName:'Cheque Void Date' ,visible: false,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false, type: 'date',cellFilter: 'date:\'yyyy-MM-dd\''}
			// {field:'Cheque_Clear_Date'   ,displayNa me:'Cheque Clear Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,cellFilter: 'date:\'yyyy-MM-dd\''}
		],

		onRegisterApi: function(gridApi){
			$scope.gridApi4 = gridApi;
		}
	};

	function data4(data) {
		$scope.NoOfPayments=0;
		$scope.AmountReceived=0;
		$scope.gridOptions4.data = data;
		_.forEach($scope.gridOptions4.data, function (val) {
			// val.paymentDate = new Date(val.paymentDate);
			// console.log(val.paymentDate+" "+$scope.NoOfPayments)
			$scope.NoOfPayments++;
			$scope.AmountReceived+=parseInt(val.Payment_Amount);
		}); 
		// console.log($scope.gridOptions4.data);
	}
	$scope.selectdate4=function(getdays){
		var today = new Date();
		var nextWeek = new Date();
		nextWeek.setDate(nextWeek.getDate() - getdays);
		$scope.fdate =new Date(nextWeek);
		$scope.edate= today;
		$scope.workingDatabase=[];
		for(var i=0;i<$scope.dataset4.length;i++){
			if($scope.fdate.getFullYear()<=new Date($scope.dataset4[i].paymentDate).getFullYear()){
				if($scope.fdate.getMonth()<new Date($scope.dataset4[i].paymentDate).getMonth() ){
					$scope.workingDatabase.push($scope.dataset4[i]);
				}
				else if($scope.fdate.getMonth()==new Date($scope.dataset4[i].paymentDate).getMonth()){
					if($scope.fdate.getDate()<=new Date($scope.dataset4[i].paymentDate).getDate()){
						$scope.workingDatabase.push($scope.dataset4[i]);
					}
				}
			}
		}
		data4($scope.workingDatabase);
	}

	$scope.viewAll4 = function(){
		data4($scope.dataset4);
	}

	 URLgetpurchaseordercustomisationdata = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/getsupplierpaymentcolumns/'+ifsSupplierID;
	var Headers = tokenType+' '+accessToken;
	$http({
	method:'GET',
	url: URLgetpurchaseordercustomisationdata,
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	}).then(function(response){
		if(response.data.length == 0){
			$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/supplierpaymentcolumns',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
	  			     "SupplierId":ifsSupplierID,
        			 "Company":false,
			         "InvoiceNo":false,
			         "InvoiceDueDate":false,
			         "PaymentDate":true,
			         "InvoiceAmount":false,
			         "PaymentAmount":true,
			         "POId":false,
			         "DiscountAmount":false,
			         "OpenAmount":false,
			         "CheckNo":true,
			         "Status":false,
			         "PaymentId":true,
			         "CheckPrintDate":false,
			         "ChekVoiddDate":false,
			         "CheckCleardate":false,
			         "PayRef":false
	  		      }
			}).then(function(response){
				console.log("createing  Payments");
				console.log(response);
			});
		}
		else{
			// console.log("get Payments");
			// console.log(response.data[0].paymentId);
		    $scope.columnArray4[0].value = response.data[0].paymentId;
		    $scope.columnArray4[1].value = response.data[0].checkNo;
		    $scope.columnArray4[2].value = response.data[0].paymentDate;
		    $scope.columnArray4[3].value = response.data[0].paymentAmount;
		    $scope.columnArray4[4].value = response.data[0].company;
		    $scope.columnArray4[5].value = response.data[0].invoiceNo;
		    $scope.columnArray4[6].value = response.data[0].poId;
		    $scope.columnArray4[7].value = response.data[0].payRef;
		    $scope.columnArray4[8].value = response.data[0].invoiceDueDate;
		    $scope.columnArray4[9].value = response.data[0].discountAmount;
		    $scope.columnArray4[10].value = response.data[0].openAmount;
		    $scope.columnArray4[11].value = response.data[0].status;
		    $scope.columnArray4[12].value = response.data[0].checkPrintDate;
		    $scope.columnArray4[13].value = response.data[0].chekVoiddDate;
		    $scope.hideColumnPayments();
		}
	});


	$scope.columnArray4=[
		{'id':0,'title':'Payment ID','value':true}, 
		{'id':1,'title':'Cheque NO','value':true}, 
		{'id':2,'title':'Pay Date','value':true}, 
		{'id':3,'title':'Payment Amount','value':true}, 
		{'id':4,'title':'Company','value':false},   
		{'id':5,'title':'Invoice NO','value':false},    
		{'id':6,'title':'PO No','value':false},    
		{'id':7,'title':'Pay Reference','value':false},  
		{'id':8,'title':'Invoice Due Date','value':false},   
		// {'id':9,'title':'Paid Amount','value':false},  
		{'id':9,'title':'Discount Amount','value':false},      
		{'id':10,'title':'Open Amount','value':false},    
		// {'id':12,'title':'Cheque Amount','value':false},  
		{'id':11,'title':'Status','value':false},       
		{'id':12,'title':'Cheque Print Date','value':false},    
		{'id':13,'title':'Cheque Void Date','value':false}, 
		// {'id':16,'title':'Cheque Clear Date','value':false}
	];

	$scope.updatePayments = function(){
		$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/dashboardcustomization/updatesupplierpaymentscoulmns',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  		data: {
			         "SupplierID":ifsSupplierID,
        			 "Company":$scope.columnArray4[4].value,
			         "InvoiceNo":$scope.columnArray4[5].value,
			         "InvoiceDueDate":$scope.columnArray4[8].value,
			         "PaymentDate":$scope.columnArray4[2].value,
			         "InvoiceAmount":true,
			         "PaymentAmount":$scope.columnArray4[3].value,
			         "POId":$scope.columnArray4[6].value,
			         "DiscountAmount":$scope.columnArray4[9].value,
			         "OpenAmount":$scope.columnArray4[10].value,
			         "CheckNo":$scope.columnArray4[1].value,
			         "Status":$scope.columnArray4[11].value,
			         "PaymentId":$scope.columnArray4[0].value,
			         "CheckPrintDate":$scope.columnArray4[12].value,
			         "ChekVoiddDate":$scope.columnArray4[13].value,
			         // "CheckCleardate":$scope.columnArray4[4].value,
			         "PayRef":$scope.columnArray4[7].value
			        			         
	  		      }
			}).then(function(response){
				alert("Updateed sucessfully");
				$scope.hideColumnPayments();
			});
		}

	$scope.hideColumnPayments=function(){
		for(var i=0;i<$scope.columnArray4.length;i++){
			if($scope.columnArray4[i].value){
				$scope.gridOptions4.columnDefs[i] = { field: $scope.gridOptions4.columnDefs[i].name, visible: true,width: 150, };
			}
			else{
				$scope.gridOptions4.columnDefs[i] = { field: $scope.gridOptions4.columnDefs[i].name, visible: false,width: 150,};
			}
		}
		// console.log($scope.columnArray4);
		$scope.gridApi4.core.refresh();
	}
}])