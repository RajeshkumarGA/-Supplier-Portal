app.controller('CreateInvoiceController',['$scope','sessionService', '$rootScope','$http','$filter', '$location','uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants','$window','$sce',function ($scope,sessionService, $rootScope,$http,$filter,$location,uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants,$window,$sce){
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
	//$rootScope.IsPRSEnabled=sessionService.get('IsPRSEnabled');
	tokenType = sessionService.get('TokenType');
  accessToken = sessionService.get('AccessToken');
  var Headers = tokenType+' '+accessToken;
  ifsSupplierID = sessionService.get('ifsSupplierNum');
  $scope.SubmitInvoice=function()
  {
    if($scope.InvoiceNo === undefined )
    {
      alert("please fill the Invoice Number field");
    }
  	else if($scope.InvoiceDate === undefined )
  	{
  		alert("please fill the Invoice Date field");
  	}
  	else if($scope.DueDate === undefined)
  	{
  		alert("please fill the Due Date field");
  	}
  	else if($scope.POCompany === undefined)
  	{
  		alert("please fill the Company field");
  	}
    else if($scope.PoCurrency === undefined)
    {
      alert("please fill the Currency field");
    }
    else if($scope.PaymentReference === undefined)
    {
      alert("please fill the Payment Reference field");
    }
    else if($scope.InvoiceAmount === undefined)
    {
      alert("please fill the Invoice Amount field");
    }
  	else
  	{
  		var formatted_datetime = $filter('date')($scope.InvoiceDate,'yyyy-MM-dd HH:mm:ss');
  		var due_datetime=$filter('date')($scope.DueDate,'yyyy-MM-dd HH:mm:ss');
  		var obj=
      {     
  			InvoiceAmount:$scope.InvoiceAmount,
  			childsupplierId:$scope.PoSupplierID,
  			childsupplierName:$scope.PoSupplierName,
  			strGrossAmount:'',
  			strNetAmount:'',
  			strTaxAmount:'',
  			Company:$scope.Company,
  			Supplier:$scope.PoSupplierID,
  			SupplierName:$scope.PoSupplierName,
  			InvoiceId:$scope.InvoiceNo,
  			InvoiceNo:$scope.InvoiceNo,
        PaymentDate:formatted_datetime,
  			PoReference:'',
  			InvoiceDate:formatted_datetime,
  			DueDate:due_datetime,
  			Currency:$scope.PoCurrency,
  			GrossAmount:'',
  			NetAmount:'',
  			TaxAmount:$scope.TaxAmount,
  			Status:$scope.poStatus,
  			PaymentTerms:'',
  			PaymentTermsDesc:'',
  			PaymentReference:$scope.PaymentReference,
        Note:$scope.Notes,
        lineNumbers:$scope.getSelectedRows()
  		}
  		console.log(obj);
    	$http({
    		method: 'POST',
    		url:'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createInvoice',
    		headers: {'Authorization': Headers,'Content-Type':'application/x-www-form-urlencoded'},
  			transformRequest: function(obj){
  	      var str = [];
  	      for(var p in obj)
  	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  	      return str.join("&");
  	  	},
    	  	data:obj,
    	})
			.then(function(response){
        console.log("create Invoice response");
			  console.log(response);
				alert('Created Successfully!!');
				$location.path('/SupplierInvoice');
			});

  	}
  	
  } 

 // Getting Line Data api
 
 $scope.gridOptions = {
    // enableRowSelection: true,
    // enableSelectAll: true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    enablePinning: false,
    paginationPageSizes: [10,20,75],
    paginationPageSize: 10,
    columnDefs: [
      { field: 'POLineNo',  displayName: "PO Line No", width: 130,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
      { field: 'POReleaseNo',  displayName: "PO Release No", width: 130,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
      { field: 'UMO',  displayName: "UMO", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
      { field: 'ReceiptReference',  displayName: "Receipt Reference", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
      { field: 'PartNo',  displayName: "Part No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
      { field: 'Description',  displayName: "Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
      { field: 'Quantity',  displayName: "Quantity", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
      { field: 'LineAmount',  displayName: "LineAmount",cellFilter: 'currency:"USD " :2', width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
      { field: 'InvoicePrice',  displayName: "Invoice Price",cellFilter: 'currency:"USD " :2', width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
      { field: 'TaxAmount',  displayName: "Tax Amount",cellFilter: 'currency:"USD " :2', width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
    ],
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };

  console.log("data is");
  console.log($scope.dataset);
  function data(data) {
    $scope.gridOptions.data = data;
  }

  $scope.getSelectedRows = function()
  {
   $scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
   //console.log($scope.mySelectedRows);
   $scope.arr = [];
   var s='';
   for(var i=0;i<$scope.mySelectedRows.length;i++)
   {
     //console.log($scope.mySelectedRows[i].POLineNo);
     $scope.arr.push($scope.mySelectedRows[i].POLineNo);
     if(i==0)s=$scope.mySelectedRows[i].POLineNo;
     else{ s=s+","+$scope.mySelectedRows[i].POLineNo;}
   }
   console.log(s);
   return s;
  }
  $scope.lading = false;
  $scope.uploadFile = function(){
    $scope.lading = true;
    var file = $scope.Data;
    // console.log('file is ' );
    // console.dir(file);
    var uploadUrl = "http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createInvoicePdf/postAttachment";
    //   $scope.uploadFileToUrl(file, uploadUrl);
    // $scope.uploadFileToUrl = function(file, uploadUrl)

    var Data = new FormData();
    Data.append('Data', file);
    Data.append('InvoiceId',"123455");
    $http.post(uploadUrl, Data, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .then(function(response){
      // alert(response);
      console.log(response);
      $scope.GetPdf();
    })
  
  };

  //Getting Pdf Data api
 $scope.GetPdf =function(){

   apiEndPoint = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createInvoicePdfController/getattachment/'+$scope.InvoiceNo;//invoice no
   // var Headers = tokenType+' '+accessToken;
   $scope.pdfData = [];
   $http({
      method:'GET',
      url: apiEndPoint,
      headers:{'Authorization':undefined}
   }).then(function(response){
    $scope.lading = false;
    console.log("pdf response");
    console.log(response);
     for(var i=0;i<response.data.length;i++){
      var objpdf ={
        "attachmentID":response.data[i].attachmentID,
        "fileName":response.data[i].fileName,
        "createdDate":response.data[i].createdDate,
        "fileContent":response.data[i].fileContent
      }
      $scope.pdfData.push(objpdf);
      
    }
    console.log( $scope.pdfData);
    // console.log($scope.pdfData[0].fileContent);
   });
  }

  $scope.downloadPdf = function(val){
    // alert(val);
    var response = $scope.pdfData[val].fileContent;
    var pdf = atob(response);
      var arr = new Array(pdf.length);
      for (var i = 0; i < pdf.length; i++) {
        arr[i] = pdf.charCodeAt(i);
      }
    var byteArray = new Uint8Array(arr);
    var pdfFile = new Blob([byteArray], { type: 'application/pdf' });
    var pdfUrl = URL.createObjectURL(pdfFile);
    $scope.content = $sce.trustAsResourceUrl(pdfUrl);
    var printwWindow = $window.open(pdfUrl);
    // printwWindow.print();        
  }
 
  $scope.deletePdf = function(val)
  { 
    $scope.lading = true;
    // console.log(val);
    apiEndPoint = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createInvoicePdfController/deleteattachment/'+val;
   // var Headers = tokenType+' '+accessToken;
   $scope.pdfData = [];
   $http({
      method:'GET',
      url: apiEndPoint,
      headers:{'Authorization':undefined}
   }).then(function(response){
        console.log(response);
        $scope.GetPdf();
   });
  }

 $scope.items =[];

 apiEndPoint = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/po/getpurchaseorders/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: apiEndPoint,
    headers:{'Authorization':Headers}
 }).then(function(response){
     console.log(response);
    for (var i=0;i<response.data.length;i++){
        $scope.Arrival_date=response.data[i].datE_ENTERED.split('T');
        $scope.Approved_date=response.data[i].wanteD_RECEIPT_DATE.split('T');
        var obj = {
                    "PO_Number":response.data[i].ordeR_NO,
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
      $scope.items.push(obj);
    }
  });
$scope.fun = function(argument,index) {
   $scope.query = argument;
   alert( argument+" "+index);
   $scope.varShow = !$scope.varShow;
   for(var i=0;i<$scope.items.length;i++){
      if(argument == $scope.items[i].PO_Number)
      {
        // alert($scope.items[i].PO_Number+" "+i);
        $scope.PoSupplierID = $scope.items[i].Supplier_Id;
        $scope.PoSupplierName = $scope.items[i].Supplier_Name;
        $scope.POStatus = $scope.items[i].Status;
        $scope.PoRef = $scope.items[i].Supplier_Id;
        $scope.Company = $scope.items[i].Company;
        $scope.POAmount = $scope.items[i].Total_Gross_Amount;
        $scope.POCurrency = $scope.items[i].Currency_Code;
        $scope.DateEntered = $scope.items[i].Date_Entered;

         var Headers = tokenType+' '+accessToken;
  $http({
      method:'GET',
      url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/po/getSupplierPurchaseOrderLinesbyOrderNo/'+$scope.items[i].PO_Number,//order no
      headers:{'Authorization':Headers}
  }).then(function(response)
  {
    $scope.dataset =[];
    for (var i=0;i<response.data.length;i++){
      var obj = {
        "POLineNo":response.data[i].linE_NO,
        "POReleaseNo":response.data[i].releasE_NO,
        "UMO":response.data[i].uniT_MEAS,
        "ReceiptReference":null,
        "PartNo":response.data[i].parT_NO,
        "Description":response.data[i].description,
        "Quantity":response.data[i].qtY_INVOICED,
        "LineAmount":response.data[i].neT_AMOUNT,
        "InvoicePrice":response.data[i].invoicE_UNIT_PRICE,
        "TaxAmount":response.data[i].taX_AMOUNT      
      }
      $scope.dataset.push(obj);
    }
    data($scope.dataset);
 });
        
      }
   } 
}
$scope.myFunct = function(keyEvent) {
   var sh = 0;
  if (keyEvent.which === 13){
    // alert('I am an alert '+$scope.varShow);
    sh = 1;
  }
  if(sh == 1){
     $scope.varShow = !$scope.varShow; 
  }
}

}])
.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign; 
      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}])
