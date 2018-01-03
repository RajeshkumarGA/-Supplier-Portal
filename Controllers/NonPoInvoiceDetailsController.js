app.controller('NonPoInvoiceDetailsController', ['$scope','sessionService', '$rootScope','$http', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
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

$scope.dataset =[];
$scope.pieData = [];
$scope.ApiDone= false;
 $scope.ifsSupplierID = sessionService.get('ifsSupplierNum');
 invoiceDetails = JSON.parse(sessionService.get('invoiceDetails'));
 console.log(invoiceDetails);
 invoice_id=invoiceDetails.Invoice_Id;
 $scope.Supplier_Id = invoiceDetails.Supplier_Id;
 $scope.invoice_no=invoiceDetails.Invoice_No;
 $scope.po_ref  = invoiceDetails.PO_Reference;
 $scope.payment_refrence = invoiceDetails.Payment_Reference;
 $scope.invoice_date=invoiceDetails.Invoice_Date.split('T');
 // $scope.due_date=invoiceDetails.Due_Date.split('T');
 $scope.payment_terms = invoiceDetails.Payment_Terms_Description;
 $scope.status = invoiceDetails.Status;
 $scope.currency = invoiceDetails.Currency;
 $scope.gross_amount = invoiceDetails.Gross_Amount;
 $scope.tax_amount = invoiceDetails.Tax_Amount;
 $scope.net_amount= invoiceDetails.Net_Amount;
 $scope.payment_terms_description = invoiceDetails.Payment_Terms_Description;
 tokenType = sessionService.get('TokenType');
 accessToken = sessionService.get('AccessToken');
 URL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/nonpoinvoice/getnonposupplierinvoicedetails/'+1241733;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: URL,
    headers:{'Authorization':Headers}
 }).then(function(response){
  console.log(response);
    for (var i=0;i<response.data.length;i++){
        var obj = {
                    "poNumber":response.data[i].poNumber,
                    "lineNoInvoice":response.data[i].lineNoInvoice,
                    "releaseNo":response.data[i].releaseNo,
                    "receiptno":response.data[i].receiptno,
                    "receiptReference":response.data[i].receiptReference,
                    "receiptArrivalDate":response.data[i].receiptArrivalDate,
                    "lineGrossAmount":response.data[i].lineGrossAmount,
                    "linetaxAmount":response.data[i].linetaxAmount,
                    "lineNetAmount":response.data[i].lineNetAmount,
                    "partNo":response.data[i].partNo,
                    "partDesc":response.data[i].partDesc,
                    "supplierPartNumber":response.data[i].supplierPartNumber,
                    "supplierPartDescription":response.data[i].supplierPartDescription,
                    "chargeTypeDescription":response.data[i].chargeTypeDescription,
                    "chargeGroupDescription":response.data[i].chargeGroupDescription,
                    "quantity":response.data[i].quantity,
                    "uom":response.data[i].uom
           
               }
      $scope.dataset.push(obj);
    }
   data($scope.dataset);
   $scope.linesPerPage = sessionService.get("linesPerPage")
   $scope.gridOptions.paginationPageSize = parseInt($scope.linesPerPage);
 },function errorCallback(response){
    console.log(response);
 });  


  var today = new Date();
  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  $scope.datePicker = { 
    options: {  
      formatMonth: 'MM',
      startingDay: 1 
    },
    format: "yyyy-MM-dd" 
  };
  $scope.showDatePopup = [];
  $scope.showDatePopup.push({ opened: false });
  $scope.showDatePopup.push({ opened: false });
  $templateCache.put('ui-grid/date-cell',
    "<div class='ui-grid-cell-contents'>{{COL_FIELD | date:'yyyy-MM-dd'}}</div>"
    );
  $templateCache.put('ui-grid/ui-grid-date-filter',
    "<div class=\"ui-grid-filter-container\" ng-repeat=\"colFilter in col.filters\" >" + 
    "<input type=\"text\" uib-datepicker-popup=\"{{datePicker.format}}\" " + 
    "datepicker-options=\"datePicker.options\" " + 
    "datepicker-append-to-body=\"true\" show-button-bar=\"false\"" +
    "is-open=\"showDatePopup[$index].opened\" class=\"ui-grid-filter-input ui-grid-filter-input-{{$index}}\"" + 
    "style=\"font-size:1em; width:11em!important\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\" " + 
    " aria-label=\"{{colFilter.ariaLabel || aria.defaultFilterLabel}}\" />" +

    "<span style=\"padding-left:0.3em;\"><button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"showDatePopup[$index].opened = true\">" +
    "<i class=\"glyphicon glyphicon-calendar\"></i></button></span>" +

    "<div role=\"button\" class=\"ui-grid-filter-button\" ng-click=\"removeFilter(colFilter, $index)\" ng-if=\"!colFilter.disableCancelFilterButton\" ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" ng-show=\"colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== ''\">" +
    "<i class=\"ui-grid-icon-cancel\" ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;</i></div></div><div ng-if=\"colFilter.type === 'select'\"><select class=\"ui-grid-filter-select ui-grid-filter-input-{{$index}}\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || aria.defaultFilterLabel}}\" aria-label=\"{{colFilter.ariaLabel || ''}}\" ng-options=\"option.value as option.label for option in colFilter.selectOptions\"><option value=\"\"></option></select><div role=\"button\" class=\"ui-grid-filter-button-select\" ng-click=\"removeFilter(colFilter, $index)\" ng-if=\"!colFilter.disableCancelFilterButton\" ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" ng-show=\"colFilter.term !== undefined && colFilter.term != null\"><i class=\"ui-grid-icon-cancel\" ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;</i></div></div>"
    );

  $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
    if( col.filters[0].term ){
      return 'header-filtered';
    } else {
      return '';
    }
  };

  $scope.gridOptions = {
    // enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
    // enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
    // enableHorizontalScrollbar:0;
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    paginationPageSizes: [20,50,100],
   
    columnDefs: [
       
                { field: 'poNumber',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:true,displayName:'Po Number',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'lineNoInvoice',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:true,displayName:'Line No Invoice',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'releaseNo',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:true,displayName:'Release No',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'receiptno',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Receipt no',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'receiptReference',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Receipt Reference',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'receiptArrivalDate',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Receipt Arrival Date',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'lineGrossAmount',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Line Gross Amount',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'linetaxAmount',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Line Tax Amount',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'lineNetAmount',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Line Net Amount',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'partNo',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Part No',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'partDesc',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Part Desc',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'supplierPartNumber',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Supplier Part Number',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'supplierPartDescription',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Supplier Part Description',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'chargeTypeDescription',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Charge Type Description',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'chargeGroupDescription',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Charge Group Description',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'quantity',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'Quantity',headerCellClass:$scope.highlightFilteredHeader,},
                { field: 'uom',minWidth:130,width:130,enableColumnResizing:false,pinnedLeft:false,displayName:'UOM',headerCellClass:$scope.highlightFilteredHeader,}
        ],
        
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;

      }

    };
     // console.log("data is");
     // console.log($scope.dataset);
  
    $scope.columnArray=[
        // {'id':0,'title':'PO Number','value':false},
        // {'id':1,'title':'Line No Invoice','value':false},
        // {'id':2,'title':'Release No','value':false},
        {'id':3,'title':'Receipt No','value':false},
        {'id':4,'title':'Receipt Reference','value':false},
        {'id':5,'title':'Receipt Arrival Date','value':false},
        {'id':6,'title':'Line Gross Amount','value':false},
        {'id':7,'title':'Line Tax Amount','value':false},
        {'id':8,'title':'Line Net Amount','value':false},
        {'id':9,'title':'Part No','value':false},
        {'id':10,'title':'Part Desc','value':false},
        {'id':11,'title':'Supplier Part Number','value':false},
        {'id':12,'title':'Supplier Part Description','value':false},
        {'id':13,'title':'Charge Type Description','value':false},
        {'id':14,'title':'Charge Group Description','value':false},
        {'id':15,'title':'Quantity','value':false},
        {'id':16,'title':'UMO','value':false}
    ];
    $scope.hideColumn=function(){
      for(var i=0;i<$scope.columnArray.length;i++){
        if($scope.columnArray[i].value){
          $scope.gridOptions.columnDefs[i+3].visible = false;

      }
      else{
        $scope.gridOptions.columnDefs[i+3].visible = true;
        
      }

    }
    $scope.gridApi.core.refresh();
  // $scope.gridApi.gridOptions.refresh();
  }
  $scope.resetAllColumns = function(){
    for(var i=0;i<$scope.columnArray.length;i++){
          $scope.gridOptions.columnDefs[i+3].visible = true;

      }
       $scope.gridApi.core.refresh();

  }
  $scope.export = function(){
    if (true) {
      var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
      $scope.gridApi.exporter.csvExport('all','all', myElement );
    } else if ($scope.export_format == 'pdf') {
      $scope.gridApi.exporter.pdfExport( $scope.export_row_type, $scope.export_column_type );
    };
  };

 $scope.exportVisible = function() {
    var exportData = [];
    var exportColumnHeaders = $scope.gridOptions.showHeader ? uiGridExporterService.getColumnHeaders($scope.gridApi.grid, uiGridExporterConstants.VISIBLE) : [];
    angular.forEach($scope.gridApi.grid.rows, function(row) {
      if (row.visible) {
        var values = [];
        angular.forEach(exportColumnHeaders, function(column) {
            var value = row.entity[column.name];
            values.push({
              value: value
            });
        });
        exportData.push(values);
      }
    });
    var csvContent = uiGridExporterService.formatAsCsv(exportColumnHeaders, exportData, ',');
    uiGridExporterService.downloadFile($scope.gridOptions.exporterCsvFilename, csvContent, $scope.gridOptions.exporterOlderExcelCompatibility);
  };


   data($scope.dataset);
  function data(data) {
    $scope.gridOptions.data = data;
    _.forEach($scope.gridOptions.data, function (val) {
      
    });
    _.forEach($scope.gridOptions.data, function (val) {
      
    });

  }

  $scope.filter = function(getValue){
    var myE0 = angular.element( document.querySelector( '.active' ) );
    myE0.removeClass('active');
    var myEl = angular.element( document.querySelector( '#POSTATUS_'+getValue) );
    myEl.addClass('active');
    $scope.workingDatabase=$scope.dataset;
    switch (getValue){
      case 0:
      data($scope.workingDatabase);
      break;
      case 1:
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Cashed')
          $scope.workingDatabase.push($scope.dataset[i]);

      }
      data($scope.workingDatabase);
      break;
      case 2:
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Printed')
          $scope.workingDatabase.push($scope.dataset[i]);

      }
      data($scope.workingDatabase);
      break;
      case 3:
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Released')
          $scope.workingDatabase.push($scope.dataset[i]);

      }
      data($scope.workingDatabase);
      break;

    }
  }
  $scope.selectdate=function(){
    $scope.fdate= new Date($scope.fromdatesearch);
    $scope.edate= new Date($scope.enddatesearch);
    if($scope.fromdatesearch && $scope.enddatesearch){
      $scope.workingDatabase=[];
     /* var fdate= new Date($scope.fromdatesearch);
      if(fdate.getMonth()+1>=10){
        strFDate=fdate.getFullYear()+'-'+parseInt(fdate.getMonth()+1)+'-'+fdate.getDate();
      }
      else{
        strFDate=fdate.getFullYear()+'-0'+parseInt(fdate.getMonth()+1)+'-'+fdate.getDate();
      }
      var edate= new Date($scope.enddatesearch);
      if(edate.getMonth()+1>=10){
        strEDate=edate.getFullYear()+'-'+parseInt(edate.getMonth()+1)+'-'+edate.getDate();
      }
      else{
        strEDate=edate.getFullYear()+'-0'+parseInt(edate.getMonth()+1)+'-'+edate.getDate();
      }
      console.log(strEDate);
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].fromdate.getMonth()+1>=10){
          datasetFromdate=$scope.dataset[i].fromdate.getFullYear()+'-'+parseInt($scope.dataset[i].fromdate.getMonth()+1)+'-'+$scope.dataset[i].fromdate.getDate();
        }
        else{
          datasetFromdate=$scope.dataset[i].fromdate.getFullYear()+'-'+parseInt($scope.dataset[i].fromdate.getMonth()+1)+'-'+$scope.dataset[i].fromdate.getDate();
        }
        if($scope.dataset[i].enddate.getMonth()+1>=10){
          datasetEnddate=$scope.dataset[i].enddate.getFullYear()+'-'+parseInt($scope.dataset[i].enddate.getMonth()+1)+'-'+$scope.dataset[i].enddate.getDate();
        }
        else{
          datasetEnddate=$scope.dataset[i].enddate.getFullYear()+'-'+parseInt($scope.dataset[i].enddate.getMonth()+1)+'-'+$scope.dataset[i].enddate.getDate();
        }
        if(datasetFromdate.match(strFDate) && datasetEnddate.match(strEDate) ){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }*/
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].fromdate.getDate() && $scope.fdate.getMonth()-1<=$scope.dataset[i].fromdate.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].fromdate.getFullYear() && $scope.edate.getDate()>=$scope.dataset[i].enddate.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].enddate.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].enddate.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
      data($scope.workingDatabase);
    }
  else{
    if($scope.fromdatesearch) {
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].fromdate.getDate() && $scope.fdate.getMonth()<=$scope.dataset[i].fromdate.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].fromdate.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
    }
    else{
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.edate.getDate()>=$scope.dataset[i].enddate.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].enddate.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].enddate.getFullYear()){
           $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
    }
   /* var date= new Date($scope.fromdatesearch);
    if(date.getMonth()+1>=10){
      strFDate=date.getFullYear()+'-'+parseInt(date.getMonth()+1)+'-'+date.getDate();
    }
    else{
      strFDate=date.getFullYear()+'-0'+parseInt(date.getMonth()+1)+'-'+date.getDate();
    }
    for(var i=0;i<$scope.dataset.length;i++){
      if($scope.dataset[i].fromdate.getMonth()+1>=10){
        datasetFromdate=$scope.dataset[i].fromdate.getFullYear()+'-'+parseInt($scope.dataset[i].fromdate.getMonth()+1)+'-'+$scope.dataset[i].fromdate.getDate();
      }
      else{
        datasetFromdate=$scope.dataset[i].fromdate.getFullYear()+'-'+parseInt($scope.dataset[i].fromdate.getMonth()+1)+'-'+$scope.dataset[i].fromdate.getDate();
      }
      if(datasetFromdate.match(strFDate)){
        $scope.workingDatabase.push($scope.dataset[i]);
      }
    }*/
    data($scope.workingDatabase);

  }
    if(!$scope.fromdatesearch && ! $scope.enddatesearch){
      $scope.workingDatabase=[];
      $scope.workingDatabase=$scope.dataset;
      data($scope.workingDatabase);
    }
  }
 
    //If DIV is visible it will be hidden and vice versa.
   $scope.toggle = true;
    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'Hide Widget' : 'Show Widget';

    })
  $scope.pieData=[];
  $scope.renderCharts = function(){
    $scope.renderPieChart();
    $scope.renderBarChart();
    
   
    var count = 0;
    for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Planned')
          count++;
      }
      $scope.PieActive = count;
      $scope.pieData.push(count);

    var count1 = 0
    for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Closed')
          count1++;
      }
       $scope.PieClosed = count1;
       $scope.pieData.push(count1);

    var count2 = 0
    for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Released')
          count2++;
      }
      $scope.PieCancelled = count2;
      $scope.pieData.push(count2);

      var t = count+count1+count2;
      $scope.PieActivePer = ((count*100)/t).toFixed(0);
      $scope.PieClosedPer = ((count1*100)/t).toFixed(0);
      $scope.PieCancelledPer = ((count2*100)/t).toFixed(0);
      // console.log("pie Data is");
      // console.log($scope.pieData[0]);

  }

  $scope.renderPieChart = function(){
     var PieTotal = parseInt($scope.PieActive) + parseInt($scope.PieClosed) + parseInt($scope.PieCancelled);
     console.log(PieTotal);
     // $scope.PieActivePer = ((33*100)/(33+231+44)).toFixed(0);
     // $scope.PieClosedPer = ((231*100)/(33+231+44)).toFixed(0);
     // $scope.PieCancelledPer = ((44*100)/(33+231+44)).toFixed(0);
      var data = {datasets: [{data: [33,231,44],
        backgroundColor: ["#f8e71c","#f5a800","#bd10e0"]}],
        labels: ["Active","Closed","Current"],
      };
      var canvas = document.getElementById("myPieChart");
      var ctx = canvas.getContext("2d");
      var myNewChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options:{legend:{display:false,
                         position:"right",
                          labels:{              
                                  boxWidth:10,
                                }
                         
                        },
                },

      });
      $scope.addOnClickOnPie = function(evt) {
        var activePoints = myNewChart.getElementsAtEvent(evt);
        if (activePoints[0]) {
          var chartData = activePoints[0]['_chart'].config.data;
          var idx = activePoints[0]['_index'];
          var label = chartData.labels[idx];
          var value = chartData.datasets[0].data[idx];
          var url = "http://example.com/?label=" + label + "&value=" + value;
         $scope.pievalue = idx;
       }
     };
   }

   $scope.renderBarChart = function() {
   $scope.val = [44,11,22,33,55,33,11,22,44,33,0,0];
    console.log($scope.val);
    var data = {labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{
     data:$scope.val ,
     backgroundColor:'#f5f6fa',
     borderColor:'#FFF',
     hoverBackgroundColor:'#00aaff',
    
   }],
 };
 var canvas = document.getElementById("myBarChart");
      var ctx = canvas.getContext("2d");
      canvas.style.width = "300px";
      canvas.style.height = "50px";
      var myNewChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        gridLines: {display: false},
        options: {
          labels: {
                fontColor: "white",
                fontSize: 18
            },
          legend:{display: false},
          scales: {
            xAxes: [{
              gridLines: {
                display:false
              },
              categoryPercentage: 1.0,
              barPercentage: 0.8,
              ticks: {
                    
                    fontColor: "white",
                    fontSize: 14,
                   }
            }],
            yAxes: [{
              display: false ,
              
            }]
          }
        }
      });

      $scope.addOnClickOnBar1 = function(evt) {
        var activePoints = myNewChart.getElementsAtEvent(evt);
        if (activePoints[0]) {
          var chartData = activePoints[0]['_chart'].config.data;
          var idx = activePoints[0]['_index'];
          $scope.barvalue = idx;
          $scope.pievalue = idx;
        }
      };
    }

  
    $scope.search=function(){
      if($scope.searchKeywords){
        var strSearchKeywords=$scope.searchKeywords.toString();
        $scope.workingDatabase=[];
        for(var i=0;i<$scope.dataset.length;i++){
                var strpoNumber = $scope.dataset[i].poNumber.toString();
                var strlineNoInvoice = $scope.dataset[i].lineNoInvoice.toString();
                var strreleaseNo = $scope.dataset[i].releaseNo.toString();
                var strreceiptno = $scope.dataset[i].receiptno.toString();
                var strreceiptReference = $scope.dataset[i].receiptReference.toString();
                var strreceiptArrivalDate = $scope.dataset[i].receiptArrivalDate.toString();
                var strlineGrossAmount = $scope.dataset[i].lineGrossAmount.toString();
                var strlinetaxAmount = $scope.dataset[i].linetaxAmount.toString();
                var strlineNetAmount = $scope.dataset[i].lineNetAmount.toString();
                var strpartNo = $scope.dataset[i].partNo.toString();
                // var strpartDesc = $scope.dataset[i].partDesc.toString();
                // var strsupplierPartNumber = $scope.dataset[i].supplierPartNumber.toString();
                // var strsupplierPartDescription = $scope.dataset[i].supplierPartDescription.toString();
                // var strchargeTypeDescription = $scope.dataset[i].chargeTypeDescription.toString();
                // var strchargeGroupDescription = $scope.dataset[i].chargeGroupDescription.toString();
                var strquantity = $scope.dataset[i].quantity.toString();
                var struom = $scope.dataset[i].uom.toString();
       
          if(
                        strpoNumber.match(strSearchKeywords) ||
                        strlineNoInvoice.match(strSearchKeywords) ||
                        strreleaseNo.match(strSearchKeywords) ||
                        strreceiptno.match(strSearchKeywords) ||
                        strreceiptReference.match(strSearchKeywords) ||
                        strreceiptArrivalDate.match(strSearchKeywords) ||
                        strlineGrossAmount.match(strSearchKeywords) ||
                        strlinetaxAmount.match(strSearchKeywords) ||
                        strlineNetAmount.match(strSearchKeywords) ||
                        strpartNo.match(strSearchKeywords) ||
                        // strpartDesc.match(strSearchKeywords) ||
                        // strsupplierPartNumber.match(strSearchKeywords) ||
                        // strsupplierPartDescription.match(strSearchKeywords) ||
                        // strchargeTypeDescription.match(strSearchKeywords) ||
                        // strchargeGroupDescription.match(strSearchKeywords) ||
                        strquantity.match(strSearchKeywords) ||
                        struom.match(strSearchKeywords)
                )

          {
            $scope.workingDatabase.push($scope.dataset[i]);
          }
        }
        data($scope.workingDatabase);
      }
      else{
        $scope.workingDatabase=$scope.dataset;
        data($scope.workingDatabase);
      }
    }

  }])

