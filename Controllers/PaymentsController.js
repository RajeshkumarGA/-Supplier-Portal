app.controller('PaymentsController', ['$scope','sessionService', '$rootScope','$http','$location', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http,$location, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
 $rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
$rootScope.userName = sessionService.get('UserName'); 
ifsSupplierID = sessionService.get('ifsSupplierNum');
 tokenType = sessionService.get('TokenType');
 accessToken = sessionService.get('AccessToken');
 $scope.viewChange=function(getValue){
    if(getValue==0) $location.path('/Payments'); 
    if(getValue==1) $location.path('/AutomaticPayment'); 
    if(getValue==2) $location.path('/ChequePayment');
}
 $scope.dataset=[];
 dataURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/payments/getpaymentsforsupplier/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: dataURL,
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
    $scope.dataset.push(obj);
  }
  data($scope.dataset);
    
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
  $scope.searchFilter = function(getValue,getIndex){
    $scope.spanTick=true;
    $scope.gridOptions.columnDefs[getIndex].filter.condition=getValue;
   $scope.activeBtn = getIndex;
  }
  $scope.ungroupBy = function(){
    for(var i=0;i<5;i++){
      console.log($scope.gridOptions.columnDefs[i]);
     }
  }
  $scope.gridOptions = {
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    paginationPageSizes: [10,20,75],
    paginationPageSize: 10,
    enablePinning:false,
    columnDefs: [
       
        {field:'Company',displayName:'Company' ,width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:0},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Invoice_NO' ,displayName:'Invoice NO' ,width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:1},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'PO_No' ,displayName:'PO No' ,width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:2},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Pay_Reference',displayName:'Pay Reference' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:3},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Invoice_Due_Date',displayName:'Invoice Due Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Pay_Date' ,displayName:'Pay Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:5},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Paid_Amount'  ,displayName:'Paid Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Discount_Amount' ,displayName:'Discount Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:7},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Payment_Amount',displayName:'Payment Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:8},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Open_Amount'   ,displayName:'Open Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:9},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Cheque_Amount'  ,displayName:'Cheque Amount' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:10},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Status'        ,displayName:'Status' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:11},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Payment_ID'    ,displayName:'Payment ID' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:12},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Cheque_Print_Date'   ,displayName:'Cheque Print Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:13},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Cheque_Void_Date'    ,displayName:'Cheque Void Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:14},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        {field:'Cheque_Clear_Date'   ,displayName:'Cheque Clear Date' ,width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:15},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      }

        ],
        exporterCsvFilename: 'Payments.csv',
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };
    $scope.columnArray=[
        // {'id':0,'title':'Company','value':false},   
        // {'id':1,'title':'Invoice NO','value':false},    
        // {'id':2,'title':'PO No','value':false},    
        {'id':3,'title':'Pay Reference','value':false},  
        {'id':4,'title':'Invoice Due Date','value':false}, 
        {'id':5,'title':'Pay Date','value':false}, 
        {'id':6,'title':'Paid Amount','value':false},  
        {'id':7,'title':'Discount Amount','value':false}, 
        {'id':8,'title':'Payment Amount','value':false},   
        {'id':9,'title':'Open Amount','value':false},    
        {'id':10,'title':'Cheque Amount','value':false},  
        {'id':11,'title':' Status','value':false},    
        {'id':12,'title':'Payment ID','value':false},  
        {'id':13,'title':'Cheque Print Date','value':false},    
        {'id':14,'title':'Cheque Void Date','value':false}, 
        {'id':15,'title':'Cheque Clear Date','value':false}
    ];
    $scope.resetAllColumns = function(){
    for(var i=0;i<$scope.columnArray.length;i++){
      $scope.gridOptions.columnDefs[i+3].visible = true;
      $scope.columnArray[i].value=false;
    }
    $scope.gridApi.core.refresh();
  }
  
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
  }
  $scope.conditions=['OR','AND'];
  $scope.selectedCondition='OR';
  $scope.selectedColumn1=0;
  $scope.selectedColumn2=1;
  if(!$scope.createFilterValue) $scope.error=true;
  else $scope.error=false;
  $scope.createFilterReset = function(){
    $scope.workingDatabase=[];
    $scope.selectedColumn1 = 0;
    $scope.selectedColumn2 = 0;
    $scope.selectedCondition='OR';
    $scope.createFilterValue='';
    $scope.workingDatabase=$scope.dataset;
    data($scope.workingDatabase);
  }
  $scope.createFilterApply = function(){
    $scope.workingDatabase=[];
    selectedIndex1=parseInt($scope.selectedColumn1)+3;
    selectedIndex2=parseInt($scope.selectedColumn2)+3;
     selectedcol1 = $scope.gridOptions.columnDefs[selectedIndex1].field;
     selectedcol2 =$scope.gridOptions.columnDefs[selectedIndex2].field;
    if($scope.selectedCondition=='OR'){
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i][selectedcol1] == $scope.createFilterValue ||   $scope.dataset[i][selectedcol2] ==$scope.createFilterValue) {
            $scope.workingDatabase.push($scope.dataset[i]);
        }   
      }
      data($scope.workingDatabase);
    }
    else{
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i][selectedcol1]==$scope.createFilterValue && $scope.dataset[i][selectedcol2]==$scope.createFilterValue) {
            $scope.workingDatabase.push($scope.dataset[i]);
        }   
      }
      data($scope.workingDatabase);
    }
  }
  $scope.exportArray=[{id:0,name:'Select Export'},{id:1,name:'Export as CSV'},{id:2,name:'Visible Export as CSV'}];
  $scope.update = function(getId){
    if(getId==0){}
    if(getId==1){ $scope.export();}
    if(getId==2){ $scope.exportVisible();}
  }
  $scope.export = function() {
    var grid = $scope.gridApi.grid;
    var rowTypes = uiGridExporterConstants.ALL;
    var colTypes = uiGridExporterConstants.ALL;
    uiGridExporterService.csvExport(grid, rowTypes, colTypes);
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
      val.Pay_Date = new Date(val.Pay_Date);
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
    debugger;
    $scope.fdate= new Date($scope.Pay_Datesearch);
    $scope.edate= new Date($scope.Pay_Dateendsearch);
    if($scope.Pay_Datesearch && $scope.Pay_Dateendsearch){
      $scope.workingDatabase=[];
     
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].Pay_Date.getDate() && $scope.fdate.getMonth()-1<=$scope.dataset[i].Pay_Date.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].Pay_Date.getFullYear() && $scope.edate.getDate()>=$scope.dataset[i].Pay_Date.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Pay_Date.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Pay_Date.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
      data($scope.workingDatabase);
    }
  else{
    debugger;
    if($scope.Pay_Datesearch) {
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].Pay_Date.getDate() && $scope.fdate.getMonth()<=$scope.dataset[i].Pay_Date.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].Pay_Date.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
          debugger;
        }
      }
    }
    else{
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.edate.getDate()>=$scope.dataset[i].Pay_Date.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Pay_Date.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Pay_Date.getFullYear()){
           $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
    }
   
    data($scope.workingDatabase);

  }
    if(!$scope.Pay_Datesearch && ! $scope.Pay_Datesearch){
      $scope.workingDatabase=[];
      $scope.workingDatabase=$scope.dataset;
      data($scope.workingDatabase);
    }
  }
 
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

  $scope.conditions=['OR','AND'];
  $scope.selectedCondition='OR';
  $scope.selectedColumn1=0;
  $scope.selectedColumn2=1;
  if(!$scope.createFilterValue) $scope.error=true;
  else $scope.error=false;
  $scope.createFilterReset = function(){
    $scope.workingDatabase=[];
    $scope.selectedColumn1 = 0;
    $scope.selectedColumn2 = 0;
    $scope.selectedCondition='OR';
    $scope.createFilterValue='';
    $scope.workingDatabase=$scope.dataset;
    data($scope.workingDatabase);
  }
  $scope.createFilterApply = function(){
    $scope.workingDatabase=[];
    selectedIndex1=parseInt($scope.selectedColumn1)+3;
    selectedIndex2=parseInt($scope.selectedColumn2)+3;
     selectedcol1 = $scope.gridOptions.columnDefs[selectedIndex1].field;
     selectedcol2 =$scope.gridOptions.columnDefs[selectedIndex2].field;
    if($scope.selectedCondition=='OR'){
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i][selectedcol1] == $scope.createFilterValue ||   $scope.dataset[i][selectedcol2] ==$scope.createFilterValue) {
            $scope.workingDatabase.push($scope.dataset[i]);
        }   
      }
      data($scope.workingDatabase);
    }
    else{
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i][selectedcol1]==$scope.createFilterValue && $scope.dataset[i][selectedcol2]==$scope.createFilterValue) {
            $scope.workingDatabase.push($scope.dataset[i]);
        }   
      }
      data($scope.workingDatabase);
    }
  }
  
    $scope.search=function(){
      if($scope.searchKeywords){
        var strSearchKeywords=$scope.searchKeywords.toString();
        $scope.workingDatabase=[];
        for(var i=0;i<$scope.dataset.length;i++){
            var strCompany = $scope.dataset[i].Company.toString();
            var strInvoice_NO = $scope.dataset[i].Invoice_NO.toString();
            var strPO_No = $scope.dataset[i].PO_No.toString();
            var strPay_Reference = $scope.dataset[i].Pay_Reference.toString();
            //var strInvoice_Due_Date = $scope.dataset[i].Invoice_Due_Date.toString();
            var strPay_Date = $scope.dataset[i].Pay_Date.toString();
            //var strPaid_Amount = $scope.dataset[i].Paid_Amount.toString();
            var strDiscount_Amount = $scope.dataset[i].Discount_Amount.toString();
            var strPayment_Amount = $scope.dataset[i].Payment_Amount.toString();
            var strOpen_Amount = $scope.dataset[i].Open_Amount.toString();
            //var strCheque_Amount=$scope.dataset[i].Cheque_Amount.toString();
            //var strStatus = $scope.dataset[i].Status.toString();
            //var strCheque_Print_Date = $scope.dataset[i].Cheque_Print_Date.toString();
            //var strCheque_Void_Date = $scope.dataset[i].Cheque_Void_Date.toString();
            //var strCheque_Clear_Date = $scope.dataset[i].Cheque_Clear_Date.toString();
            
          if(
                strCompany.match(strSearchKeywords) ||   
                strInvoice_NO.match(strSearchKeywords) ||   
                strPO_No.match(strSearchKeywords) ||   
                strPay_Reference.match(strSearchKeywords) ||    
                /*strInvoice_Due_Date .match(strSearchKeywords) ||*/
                strPay_Date.match(strSearchKeywords) || 
                strPay_Date.match(strSearchKeywords) ||   
                /*strPaid_Amount.match(strSearchKeywords) ||  */
                strDiscount_Amount.match(strSearchKeywords) ||  
                strPayment_Amount.match(strSearchKeywords) ||   
                strOpen_Amount.match(strSearchKeywords)  
                /*strCheque_Amount.match(strSearchKeywords) || 
                strStatus.match(strSearchKeywords) ||      
                strCheque_Print_Date.match(strSearchKeywords) || 
                strCheque_Void_Date.match(strSearchKeywords) ||  
                strCheque_Clear_Date.match(strSearchKeywords)*/
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

