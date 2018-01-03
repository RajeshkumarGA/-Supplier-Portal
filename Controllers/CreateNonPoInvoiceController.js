app.controller('CreateNonPoInvoiceController',['$scope','sessionService', '$rootScope','$http','$filter', '$location','uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants','$window','$sce',function ($scope,sessionService, $rootScope,$http,$filter,$location,uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants,$window,$sce){
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
  tokenType = sessionService.get('TokenType');
  accessToken = sessionService.get('AccessToken');

  $scope.SupplierId = sessionService.get('ifsSupplierNum');
$scope.SubmitInvoice=function(){
	var formatted_datetime = $filter('date')($scope.InvoiceDate,'yyyy-MM-dd HH:mm:ss Z');
	var createDate=$filter('date')($scope.CreateDate,'yyyy-MM-dd HH:mm:ss Z');
	var updateDate=$filter('date')($scope.UpdateDate,'yyyy-MM-dd HH:mm:ss Z');
	var obj={
		      "SupplierId":$scope.SupplierId,
          "InvoiceNo":$scope.InvoiceNo,
          "Company": $scope.Company,
          "Currency":$scope.Currency,
          "InvoiceDate":formatted_datetime,
          "InvoiceAmount":$scope.InvoiceAmount,
          "Note":$scope.Note,
          "NOofAttachments": 1,
          "FileExists": false,
          "CreateDate":createDate,
          "UpdateDate":updateDate,
          "Status":$scope.Status
	}
	console.log(obj);
	$http({
			method: 'POST',
			url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createnonpoinvoice/postInvoice',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
	      var str = [];
	      for(var p in obj)
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      return str.join("&");
	  	},
	  	data:obj,
			})
			.then(function(response){
				alert('Created Successfully!!');
				$location.path('/NonPOInvoices');
			});
}
var countLineId = 0;
  
$scope.SubmitInvoiceLineData = function()
{ countLineId++;
  if($scope.InvoiceNo === undefined || $scope.InvoiceNo === "")
  {
    alert("please fill the Invoice Number field");
    countLineId--;
  }
  else{
    var date1 = new Date();
    var obj={
          "InvoiceNo":$scope.InvoiceNo,
          "Inv_Line_no":countLineId,
          "Description":$scope.Description,
          "Unit": $scope.UMO,
          "Quantity":$scope.Quantity,
          "TaxType":$scope.TaxType,
          "TaxValue":$scope.TaxValue,
          "UnitPrice":$scope.UnitPrice,
          "Amount": $scope.InvoiceLineAmount,
          "CreatedDate":$filter('date')(date1,'yyyy-MM-dd HH:mm:ss '),
          "UpdatedDate":$filter('date')(date1,'yyyy-MM-dd HH:mm:ss '),
          "TaxPercentage":''    
  } 
  console.log(obj);

  $http({
      method: 'POST',
      url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createnonpoinvoice/postnonpoinvoiceline',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data:obj,
      })
      .then(function(response){
        alert('Created Successfully!!');
        console.log(response);
        // $location.path('/NonPOInvoices');
      });
  }
  // $scope.gridApi.core.refresh();
  
}

// Getting Line Data api

// $scope.getNoPoInvoiceLineData();


$scope.getNoPoInvoiceLineData = function(){
  $scope.dataset =[];

    var Headers = tokenType+' '+accessToken;
    $http({
        method:'GET',
        url: 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createnonpoinvoice/getinvoicelinenonpo/'+$scope.InvoiceNo,//invoice no
        headers:{'Authorization':Headers}
     }).then(function(response){
      console.log("response is");
      console.log(response);
      for (var i=0;i<response.data.length;i++){
            var obj = {
                        "LineNo":response.data[i].inv_Line_no,
                        "CreatedDate":response.data[i].createdDate,
                        "UMO":response.data[i].unit,
                        "Quantity":response.data[i].quantity,
                        "TaxType":response.data[i].taxType,
                        "TaxValue":response.data[i].taxValue,
                        "UnitPrice":response.data[i].unitPrice,
                        "Description":response.data[i].description,
                        "InvoiceLineAmount":response.data[i].amount,
                        "UpdatedDate":response.data[i].updatedDate     
                   }
          $scope.dataset.push(obj);
        }
        data($scope.dataset);
     });
     // $scope.gridApi.core.refresh();
     $scope.gridOptions = {
        // enableRowSelection: true,
        // enableSelectAll: true,
        enableFiltering: true,

        onRegisterApi: function(gridApi){
          $scope.gridApi = gridApi;
          gridApi.core.refresh();
        },
        enablePinning: false,
        paginationPageSizes: [10,20,75],
        paginationPageSize: 10,
        columnDefs: [
          { field: 'LineNo',  displayName: "Line No", width: 130,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
          { field: 'CreatedDate',  displayName: "Created Date",cellFilter: 'date:\'yyyy-MM-dd\'', width: 130,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
          { field: 'UMO',  displayName: "UMO", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
          { field: 'Quantity',  displayName: "Quantity", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
          { field: 'TaxType',  displayName: "Tax Type", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
          { field: 'TaxValue',  displayName: "Tax Value", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
          { field: 'UnitPrice',  displayName: "Unit Price", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
          { field: 'Description',  displayName: "Description",width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
          { field: 'InvoiceLineAmount',  displayName: "Invoice Line Amount",cellFilter: 'currency:"USD " :2', width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},
          { field: 'UpdatedDate',  displayName: "Updated Date",cellFilter: 'date:\'yyyy-MM-dd\'',width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,},

          
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
  }
$scope.lading = false;
$scope.uploadFile = function(){
  $scope.lading = true;
    var file = $scope.Data;
    // console.log('file is ' );
    // console.dir(file);
    var uploadUrl = "http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createNonPoInvoiceAttachment/postAttachment";
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
   apiEndPoint = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createNonPoInvoiceAttachmentController/getattachment/'+$scope.InvoiceNo;//invoice no
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
    console.log(val);
    apiEndPoint = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/createNonPoInvoiceAttachmentController/deleteattachment/'+val;
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

}])