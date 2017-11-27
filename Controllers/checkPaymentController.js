app.controller('checkPaymentController', ['$scope','sessionService', '$rootScope','$http','$location', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http,$location,uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
 $rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
$rootScope.userName = sessionService.get('UserName'); 
ifsSupplierID = sessionService.get('ifsSupplierNum');
 tokenType = sessionService.get('TokenType');
 accessToken = sessionService.get('AccessToken');
 $scope.viewChange=function(getValue){
    if(getValue==0) $location.path('/Payments'); 
    if(getValue==1) $location.path('/AutomaticPayment'); 
    if(getValue==2) $location.path('/CheckPayment');
}
 $scope.dataset=[];
 URL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/payments/getcheckpaymentsforsupplier/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: URL,
    headers:{'Authorization':Headers}
 }).then(function(response){
  
    /*for (var i=0;i<response.data.length;i++){
    var obj={
      "Company":response.data[i].Company , 
      "Invoice_NO":response.data[i].voucheR_NO,   
      "PO_No":response.data[i].voucheR_NO, 
      "Pay_Reference":'NA', 
      "Invoice_Due_Date":"NA", 
      "Pay_Date":response.data[i].payDate,    
      "Invoice_Amount":response.data[i].voucheR_NO, 
      "Paid_Amount":response.data[i].voucheR_NO,   
      "Discount_Amount":response.data[i].voucheR_NO,    
      "Payment_Amount":,    
      "Open_Amount":0,    
      "Check_NO":161050,
      "Check_Amount":1216.88, 
      "Status":"Cashed",  
      "Currency":"USD",   
      "Payment_ID":145105,
      "Check_Print_Date":"2017-7-16",    
      "Check_Void_Date":"",   
      "Check_Clear_Date":"2017-7-16"
    }
    $scope.dataset.push(obj);
  }*/
})

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
    paginationPageSizes: [10,20,75],
    paginationPageSize: 10,
    columnDefs: [
       
        { field: 'Company',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:true,displayName: "Company", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Invoice_NO',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:true,displayName: "Invoice NO", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'PO_No',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:true,displayName: "PO No", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Pay_Reference',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Pay Reference", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Invoice_Due_Date',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Invoice Due Date", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Pay_Date',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Pay Date", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Invoice_Amount',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Invoice Amount", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Paid_Amount',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Paid Amount", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Discount_Amount',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Discount Amount ", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Payment_Amount',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Payment Amount", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Open_Amount',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Open Amount", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Check_NO',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Check NO", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Check_Amount',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Check Amount", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Status',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Status", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Currency',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Currency", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Payment_ID',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Payment ID", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Check_Print_Date',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Check Print Date   ", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Check_Void_Date',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Check Void Date", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Check_Clear_Date',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Check Clear Date", headerCellClass: $scope.highlightFilteredHeader,}
        
],

      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };

  /*$http.get('/data/500_complex.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      $scope.gridOptions.data[0].age = -5;
 
      data.forEach( function addDates( row, index ){
        row.mixedDate = new Date();
        row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
        row.gender = row.gender==='male' ? '1' : '2';
      });
    });
    */
    $scope.columnArray=[
        /*{'id':0,'title':'Pay Reference','value':false},   
        {'id':1,'title':'Invoice Due Date','value':false},    
        {'id':2,'title':'Pay Date','value':false},    
        {'id':3,'title':'Invoice Amount','value':false},  
        {'id':4,'title':'Paid Amount','value':false}, 
        {'id':5,'title':'Discount Amount','value':false}, 
        {'id':6,'title':'Payment Amount','value':false},  
        {'id':7,'title':'Open Amount','value':false}, 
        {'id':8,'title':'Check NO ','value':false},   
        {'id':9,'title':'Check Amount','value':false},    
        {'id':10,'title':'Status','value':false},  
        {'id':11,'title':' Currency','value':false},    
        {'id':12,'title':'Payment ID','value':false},  
        {'id':13,'title':'Check Print Date','value':false},    
        {'id':14,'title':'Check Void Date','value':false}, 
        {'id':15,'title':'Check Clear Date','value':false}*/
        {id:0,title:'Payment ID',value:false},
      {id:1,title:'Company',value:false},
      {id:2,title:'Payment Date',value:false},
      {id:3,title:'Series ID',value:false},
      {id:4,title:'Currency',value:false},
      {id:5,title:'Payment Amount',value:false},
      {id:6,title:'Payment Method',value:false},
      {id:7,title:'Bank Fee',value:false},
      {id:8,title:'Paid Amount in Paid Currency',value:false},
      {id:9,title:'Paid Amount in Acc Currency',value:false}
    ];
    $scope.hideColumn=function(){
      for(var i=0;i<$scope.columnArray.length;i++){
        if($scope.columnArray[i].value){
          $scope.gridOptions.columnDefs[i].visible = false;
      }
      else{
        $scope.gridOptions.columnDefs[i].visible = true;
        
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
      val.fromdate = new Date(val.Pay_Date);
    });
    _.forEach($scope.gridOptions.data, function (val) {
      val.enddate = new Date(val.Pay_Date);
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
                // var strSupplier_Id = $scope.dataset[i].Supplier_Id.toString();
               /* var strCompany = $scope.dataset[i].Company.toString();
                var strInvoice_NO = $scope.dataset[i].Invoice_NO.toString();
                var strPO_No = $scope.dataset[i].PO_No.toString();
                var strPay_Reference = $scope.dataset[i].Pay_Reference.toString();
                var strInvoice_Due_Date = $scope.dataset[i].Invoice_Due_Date.toString();
                var strPay_Date = $scope.dataset[i].Pay_Date.toString();
                var strInvoice_Amount = $scope.dataset[i].Invoice_Amount.toString();
                var strPaid_Amount = $scope.dataset[i].Paid_Amount.toString();
                var strDiscount_Amount = $scope.dataset[i].Discount_Amount.toString();
                var strPayment_Amount = $scope.dataset[i].Payment_Amount.toString();
                var strOpen_Amount = $scope.dataset[i].Open_Amount.toString();
                var strCheck_NO = $scope.dataset[i].Check_NO.toString();
                var strCheck_Amount = $scope.dataset[i].Check_Amount.toString();
                var strStatus = $scope.dataset[i].Status.toString();
                var strCurrency = $scope.dataset[i].Currency.toString();
                var strPayment_ID = $scope.dataset[i].Payment_ID.toString();
                var strCheck_Print_Date = $scope.dataset[i].Check_Print_Date.toString();
                var strCheck_Void_Date = $scope.dataset[i].Check_Void_Date.toString();
                var strCheck_Clear_Date = $scope.dataset[i].Check_Clear_Date.toString();*/
                var strPayment_ID = $scope.dataset[i].Payment_ID.toString();
                var strCompany = $scope.dataset[i].Company.toString();
                var strPayment_Date = $scope.dataset[i].Payment_Date.toString();
                var strSeries_ID = $scope.dataset[i].Series_ID.toString();
                var strCurrency = $scope.dataset[i].Currency.toString();
                var strPayment_Amount = $scope.dataset[i].Payment_Amount.toString();
                var strPayment_Method = $scope.dataset[i].Payment_Method.toString();
                var strBank_Fee = $scope.dataset[i].Bank_Fee.toString();
                var strPaid_Amount_in_Paid_Currency = $scope.dataset[i].Paid_Amount_in_Paid_Currency.toString();
                var strPaid_Amount_in_Acc_Currency = $scope.dataset[i].Paid_Amount_in_Acc_Currency.toString();
            
          if(
               /* strCompany.match(strSearchKeywords) ||   
                strInvoice_NO.match(strSearchKeywords) ||   
                strPO_No.match(strSearchKeywords) ||   
                strPay_Reference.match(strSearchKeywords) ||    
                strInvoice_Due_Date .match(strSearchKeywords) ||
                strPay_Date.match(strSearchKeywords) || 
                strInvoice_Amount.match(strSearchKeywords) ||   
                strPaid_Amount.match(strSearchKeywords) ||  
                strDiscount_Amount.match(strSearchKeywords) ||  
                strPayment_Amount.match(strSearchKeywords) ||   
                strOpen_Amount.match(strSearchKeywords) ||  
                strCheck_NO.match(strSearchKeywords) || 
                strCheck_Amount.match(strSearchKeywords) || 
                strStatus.match(strSearchKeywords) ||   
                strCurrency.match(strSearchKeywords) || 
                strPayment_ID.match(strSearchKeywords) ||   
                strCheck_Print_Date.match(strSearchKeywords) || 
                strCheck_Void_Date.match(strSearchKeywords) ||  
                strCheck_Clear_Date.match(strSearchKeywords)*/
                  strPayment_ID.match(strSearchKeywords) ||
                  strCompany.match(strSearchKeywords)  ||
                  strPayment_Date.match(strSearchKeywords) ||
                  strSeries_ID.match(strSearchKeywords) ||
                  strCurrency.match(strSearchKeywords) ||
                  strPayment_Amount.match(strSearchKeywords) ||
                  strPayment_Method.match(strSearchKeywords) ||
                  strBank_Fee.match(strSearchKeywords) ||
                  strPaid_Amount_in_Paid_Currency.match(strSearchKeywords) ||
                  strPaid_Amount_in_Acc_Currency.match(strSearchKeywords)
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
.filter('mapGender', function() {
  var genderHash = {
    1: 'male',
    2: 'female'
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash[input];
    }
  };

});

