app.controller('MyDashboardController',['$scope','sessionService', '$rootScope','$http','$location', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http,$location, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants){
	  $rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
  	  $rootScope.userName = sessionService.get('UserName');
  	  $scope.dataset =[];
	  $scope.ApiDone= false;
	  ifsSupplierID = sessionService.get('ifsSupplierNum');
	  tokenType = sessionService.get('TokenType');

	  // Recent Purchase Requisitions
	  accessToken = sessionService.get('AccessToken');
	  dataURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/purchaserequisition/getpurchaserequisitions/'+ifsSupplierID;
	  var Headers = tokenType+' '+accessToken;
	  $http({
	    method:'GET',
	    url: dataURL,
	    headers:{'Authorization':Headers}
	  })
	  .then(function(response){
	    for (var i=0;i<response.data.length;i++){
	      $scope.Arrival_date=response.data[i].requisitionDate.split('T');
	      $scope.Approved_date=response.data[i].latestOrderDate.split('T');
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
	        "wantedReceiptDate":response.data[i].wantedReceiptDate
	      }
	      $scope.dataset.push(obj);
	    }
	    data($scope.dataset);
	    $scope.ApiDone= true;
	  },
	  function errorCallback(response){
	        console.log(response);
	  });

	   $scope.gridOptions = {
	    enableFiltering: true,
	    onRegisterApi: function(gridApi){
	      $scope.gridApi = gridApi;
	    },
	    paginationPageSizes: [10,20,75],
	    paginationPageSize: 10,
	    enablePinning: false,
	    columnDefs: [
	     { field: 'supplierId',displayName:'Supplier Id', width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'orderFor', displayName: "Order For", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'reqNo',displayName:"Req No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'releaseNo', displayName: "Release No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'partNo', displayName: "Part No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'state', displayName: "State", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'originalQuantity', displayName: "Original Quantity", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'unitMeas', displayName: "Unit Meas", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'qtyPurchaseUnit', displayName: "Qty Purchase Unit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'buyUnitMeas' , displayName: "Buy Unit Meas", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
	      { field: 'purchaseCode', displayName: "Purchase Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'purchaseCodeDescription', displayName: "Purchase Code Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'vendorPartNo', displayName: "Vendor Part No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'vendoePartDescription', displayName: "Vendoe Part Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'authReq' , displayName: "Auth Req", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'wantedReceiptDate', displayName: "Wanted Receipt Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'requisitionDate', displayName: "Requisition Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'latestOrderDate', displayName: "Latest Order Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'status', displayName: "Status", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'noteText', displayName: "Note Text", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'requestType', displayName: "Request Type", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'priceBase', displayName: "Price Base", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'priceInclTaxCurr', displayName: "Price Incl Tax Curr", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'currencyRate' , displayName: "Currency Rate", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'buyUnitPrice' , displayName: "Buy Unit Price", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'addituonalCostAmount' , displayName: "Addituonal Cost Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'additionalCostAmountGross' , displayName: "Additional Cost Amount Gross", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'netAmountBase', displayName: "Net Amount Base", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'grossAmountBase' , displayName: "Gross Amount Base", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'grossAmountCurr' , displayName: "Gross Amount Curr", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'purchaseGroup', displayName: "Purchase Group", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'purchaseGroupDesc', displayName: "Purchase Group Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'requisitioner', displayName: "Requisitioner", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'requisitionerName', displayName: "Requisitioner Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'receiver', displayName: "Receiver", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'orderCode', displayName: "Order Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'program', displayName: "Program", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'programdesc', displayName: "Program Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'projectId', displayName: "Project Id", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'projectDesc', displayName: "Project Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, },
	      { field: 'conversionFac' , displayName: "Conversion Fac", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false, }
	    ],
	    onRegisterApi: function(gridApi){
	      $scope.gridApi = gridApi;
	     }
	   };
	  data($scope.dataset);
	  function data(data) {
	    $scope.dateBarChart=[];
	    $scope.gridOptions.data = data;
	    _.forEach($scope.gridOptions.data, function (val) {
	      val.requisitionDate = new Date(val.requisitionDate);
	    });
	    _.forEach($scope.gridOptions.data, function (val) {
	      val.latestOrderDate = new Date(val.latestOrderDate);
	    });
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

 },function errorCallback(response){
    console.log(response);
 }); 

 $scope.gridOptions1 = {
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    enablePinning: false,
    paginationPageSizes: [10,20,75],
    paginationPageSize: 10,
    columnDefs: [
      { field: 'PO_Number',  displayName: "PO Number", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Supplier_Id',  displayName: "Supplier Id", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Supplier_Name',  displayName: "Supplier Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Total_Tax_Amount', maxWidth: 130, minWidth: 130 , displayName: "Total Tax Amount",enableHiding:false,enableFiltering: false,enablePinning:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Total_Net_Amount', maxWidth: 130, minWidth: 130 , displayName: "Total Net Amount",enableHiding:false,enableFiltering: false,enablePinning:false, groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Total_Gross_Amount', maxWidth: 130, minWidth: 130 , displayName: "Total Gross Amount",enableHiding:false,enableFiltering: false,enablePinning:false, groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Order_Total_Amount_Base',  displayName: "Order Total Amount Base", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Total_Gross_Incl_Charge',  displayName: "Total Gross Incl Charge", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Invoice_Net_Amount',  displayName: "Invoice Net Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Revision',  displayName: "Revision", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Currency_Code',  displayName: "Currency Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Date_Entered',  displayName: "Date Entered", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Wanted_Receipt_Date',  displayName: "Wanted Receipt Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Buyer_Name',  displayName: "Buyer Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Status',  displayName: "Status", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Company',  displayName: "Company", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Company_Name',  displayName: "Company Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Payment_Term',  displayName: "Payment Term", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Payment_Term_Description',  displayName: "Payment Term Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Cancel_Reason',  displayName: "Cancel Reason", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Cancel_Reason_Description',  displayName: "Cancel Reason Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
      { field: 'Ship_Via_Code_Description',  displayName: "Ship Via Code Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,}
      // pre-populated search field
      ],
      
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };

  data1($scope.dataset);
	  function data1(data) {
	    $scope.dateBarChart=[];
	    $scope.gridOptions1.data = data;
	    _.forEach($scope.gridOptions1.data, function (val) {
	      val.requisitionDate = new Date(val.requisitionDate);
	    });
	    _.forEach($scope.gridOptions1.data, function (val) {
	      val.latestOrderDate = new Date(val.latestOrderDate);
	    });
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
		        var obj = {
		          "Invoice_Id":response.data[i].invoiceId,
		          "Invoice_No":response.data[i].invoiceNo,
		          "Supplier_Id":response.data[i].supplier,
		          "Supplier_Name":response.data[i].supplierName,
		          "Company":response.data[i].company,
		          "PO_Reference":response.data[i].poReference,
		          "Payment_Date":response.data[i].paymentDate,
		          "Invoice_Date":response.data[i].invoiceDate,
		          "Due_Date":response.data[i].dueDate,
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
		 },function errorCallback(response){
		    console.log(response);
		 });  

		 $scope.gridOptions2 = {
		    enableFiltering: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    },
		    paginationPageSizes: [10,20,75],
		    paginationPageSize: 10,
		    columnDefs: [
		       
		        { field: 'Invoice_Id',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Invoice Id", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Invoice_No',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Invoice No", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Supplier_Id',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Supplier Id", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Supplier_Name',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Supplier Name", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Company',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:"Company",headerCellClass:$scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'PO_Reference',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "PO Reference", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Payment_Date',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Payment Date", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Invoice_Date',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Invoice Date", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Due_Date',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Due Date", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Gross_Amount',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Gross Amount", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Net_Amount',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Net Amount", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Tax_Amount',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Tax Amount", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Payment_Terms_Description',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Payment Terms Description", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Payment_Reference',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Payment Reference", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Currency',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Currency", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,},
		        { field: 'Status',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Status", headerCellClass: $scope.highlightFilteredHeader,enableFiltering: false,}

		        ],

		      onRegisterApi: function(gridApi){
		        $scope.gridApi = gridApi;
		      }
		    };
		      data2($scope.datase2);
			  function data2(data) {
			    $scope.gridOptions2.data = data;
			    _.forEach($scope.gridOptions2.data, function (val) {
			     
			    });
			    _.forEach($scope.gridOptions2.data, function (val) {
			     
			    });

			  }

// Shipments
 $scope.dataset3=[];
 dataURL3 = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/suppliershipment/getsuppliershipmentsbysupplier/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: dataURL3,
    headers:{'Authorization':Headers}
 }).then(function(responce){
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
        $scope.ApiDone= true;
    });

 	$scope.gridOptions3 = {
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    paginationPageSizes: [10,20,75],
    paginationPageSize: 10,
    enablePinning: false,
    columnDefs: [
       
        { field: 'Supplier_Id',displayName: "Supplier Id", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering:false,},
        { field: 'Line_No',displayName: "Line No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Order_No',displayName: "Order No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Description',displayName: "Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Supplier_Name',displayName: "Supplier Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Release_No',displayName: "Release No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Receipt_No',displayName: "Receipt No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Part_No ',displayName: "Part No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'State',displayName: "State", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Qty_Arrived',displayName: "Qty Arrived", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Buy_Unit_Meas',displayName: "Buy Unit Meas", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Inventory_Part',displayName: "Inventory Part", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Invoice_Qty_Arrived',displayName: "Invoice Qty Arrived", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Catch_Qty_Arrived',displayName: "Catch Qty Arrived", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Catch_UOM',displayName: "Catch UOM", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Qty_Inspected',displayName: "Qty Inspected", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: ' Qty_To_Inspect',displayName: "Qty To Inspect", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Arrival_Date',displayName: "Arrival Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Approved_Date',displayName: "Approved Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Final_Invoice_Date',displayName: "Final Invoice Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Qty_Invoiced',displayName: "Qty Invoiced", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Qty_Scrapped_Credit',displayName: "Qty Scrapped Credit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Qty_Scrapped_No_Credit',displayName: "Qty Scrapped No Credit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Qty_Returned_Credit',displayName: "Qty Returned Credit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Qty_Returned_No_Credit',displayName: "Qty Returned No Credit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Qty_Consignment',displayName: "Qty Consignment", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Notified_Consumed_Qty',displayName: "Notified Consumed Qty", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Receiver',displayName: "Receiver", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Receipt_Reference',displayName: "Receipt Reference", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Note_Text',displayName: "Note Text", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Reqisition_No',displayName: "Reqisition No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Requsition_Line',displayName: "Requsition Line", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Project_ID',displayName: "Project ID", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Project_Name',displayName: "Project Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,},
        { field: 'Total_Qty',displayName: "Total Qty", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,enableFiltering: false,}
      ],
     
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };
    function data3(data) {
    $scope.gridOptions3.data = data;
    _.forEach($scope.gridOptions3.data, function (val) {
      val.Arrival_Date = new Date(val.Arrival_Date);
    });
    _.forEach($scope.gridOptions3.data, function (val) {
      val.Approved_Date = new Date(val.Approved_Date);
    });

  }

  // Payments

  $scope.dataset4=[];
  dataURL4 = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/payments/getpaymentsforsupplier/'+ifsSupplierID;
 $http({
    method:'GET',
    url: dataURL4,
    headers:{'Authorization':Headers}
 }).then(function(response){
  for(var i=0;i<response.data.length;i++){
    $scope.pay_date=response.data[i].paymentDate.split('T');
    var obj={
      'Company':''+response.data[i].company,
      'Invoice_NO':''+response.data[i].invoiceNo,
      'PO_No':''+response.data[i].poId,
      'Pay_Reference':''+response.data[i].payReference,
      'Pay_Date':$scope.pay_date[0],
      'Invoice_Amount':''+response.data[i].invoiceAmount,
      'Discount_Amount':''+response.data[i].discountAmount,
      'Payment_Amount':''+response.data[i].paymentAmount,
      'Open_Amount':''+response.data[i].openAmount,
      'Cheque_NO':''+response.data[i].CheckNo,
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
    
})

  $scope.gridOptions4 = {
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    paginationPageSizes: [10,20,75],
    paginationPageSize: 10,
    enablePinning:false,
    columnDefs: [
       
        {field:'Company',displayName:'Company' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Invoice_NO' ,displayName:'Invoice NO' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'PO_No' ,displayName:'PO No' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Pay_Reference',displayName:'Pay Reference' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Invoice_Due_Date',displayName:'Invoice Due Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Pay_Date' ,displayName:'Pay Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Paid_Amount'  ,displayName:'Paid Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Discount_Amount' ,displayName:'Discount Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Payment_Amount',displayName:'Payment Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Open_Amount'   ,displayName:'Open Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Cheque_Amount'  ,displayName:'Cheque Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Status'        ,displayName:'Status' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Payment_ID'    ,displayName:'Payment ID' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Cheque_Print_Date'   ,displayName:'Cheque Print Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Cheque_Void_Date'    ,displayName:'Cheque Void Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
        {field:'Cheque_Clear_Date'   ,displayName:'Cheque Clear Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,}

        ],
        exporterCsvFilename: 'Payments.csv',
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };
    function data4(data) {
    $scope.gridOptions4.data = data;
    _.forEach($scope.gridOptions4.data, function (val) {
     
    });
   
  }

}])