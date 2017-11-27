app.controller('SupplierInvoiceController', ['$scope','sessionService', '$rootScope','$http', '$location','uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http,$location,uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
$rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
$rootScope.userName = sessionService.get('UserName');
$scope.dataset =[];
$scope.pieData = [];
$scope.ApiDone= false;
 ifsSupplierID = sessionService.get('ifsSupplierNum');
 tokenType = sessionService.get('TokenType');
 accessToken = sessionService.get('AccessToken');
 apiEndPoint = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/invoice/getsupplierinvoices/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: apiEndPoint,
    headers:{'Authorization':Headers}
 }).then(function(response){
    for (var i=0;i<response.data.length;i++){
      var due_date=response.data[i].dueDate.split('T');
      var invoice_date=response.data[i].invoiceDate;
        var obj = {
          "Invoice_Id":response.data[i].invoiceId,
          "Invoice_No":response.data[i].invoiceNo,
          "Supplier_Id":response.data[i].supplier,
          "Supplier_Name":response.data[i].supplierName,
          "Company":response.data[i].company,
          "PO_Reference":response.data[i].poReference,
          "Payment_Date":response.data[i].paymentDate,
          "Invoice_Date":invoice_date[0],
          "Due_Date":due_date[0],
          "Gross_Amount":response.data[i].grossAmount,
          "Net_Amount":response.data[i].netAmount,
          "Tax_Amount":response.data[i].taxAmount,
          "Payment_Terms_Description":response.data[i].paymentTermsDesc,
          "Payment_Reference":response.data[i].paymentReference,
          "Currency":response.data[i].currency,
          "Status":response.data[i].status
           
               }
      $scope.dataset.push(obj);
    }
   data($scope.dataset);
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
  $scope.searchFilter = function(getValue,getIndex){
    $scope.spanTick=true;
    $scope.gridOptions.columnDefs[getIndex].filter.condition=getValue;
   $scope.activeBtn = getIndex;
  }
  $scope.showDatePopup = [];
  $scope.showDatePopup.push({ opened: false });
  $scope.showDatePopup.push({ opened: false });

  $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
    if( col.filters[0].term ){
      return 'header-filtered';
    } else {
      return '';
    }
  };
  $scope.gridOptions = {
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    paginationPageSizes: [10,20,75],
    paginationPageSize: 10,
    enablePinning: false,
    columnDefs: [
       
        { field: 'Invoice_Id', displayName: "Invoice Id", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:0},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Invoice_No', displayName: "Invoice No", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:1},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        },cellTemplate:
          '<a  ng-click="grid.appScope.supplierDetails(row.entity)" class="ui-grid-cell-contents" style="color:red">{{COL_FIELD}}</a>'},
        { field: 'Supplier_Id', displayName: "Supplier Id", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:2},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Supplier_Name', displayName: "Supplier Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:3},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Company', displayName:"Company",width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'PO_Reference',  displayName: "PO Reference", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Payment_Date',  displayName: "Payment Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:5},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Invoice_Date',  displayName: "Invoice Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Due_Date',  displayName: "Due Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:7},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Gross_Amount',  displayName: "Gross Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:8},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Net_Amount',  displayName: "Net Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:9},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Tax_Amount',  displayName: "Tax Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:10},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Payment_Terms_Description',  displayName: "Payment Terms Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:11},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Payment_Reference',  displayName: "Payment Reference", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:12},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Currency',  displayName: "Currency", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:13},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Status',  displayName: "Status", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:14},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }}

        ],

      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };

    $scope.supplierDetails =function(getObject){
      sessionService.destroy('invoiceDetails');
      sessionService.set('invoiceDetails',JSON.stringify(getObject));
      $location.path('/SupplierInvoiceDetails');
    }
    $scope.columnArray=[
        {'id':0,'title':'Company','value':false},
        {'id':1,'title':'PO_Reference','value':false},
        {'id':2,'title':'Payment_Date','value':false},
        {'id':3,'title':'Invoice_Date','value':false},
        {'id':4,'title':'Due_Date','value':false},
        {'id':5,'title':'Gross_Amount','value':false},
        {'id':6,'title':'Net_Amount','value':false},
        {'id':7,'title':'Tax_Amount','value':false},
        {'id':8,'title':'Payment_Terms_Description','value':false},
        {'id':9,'title':'Payment_Reference','value':false},
        {'id':10,'title':'Currency','value':false},
        {'id':11,'title':'Status','value':false}
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
          $scope.columnArray[i].value=false;

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
    dateBarChart=[];
    $scope.gridOptions.data = data;
    _.forEach($scope.gridOptions.data, function (val) {
      val.Invoice_Date = new Date(val.Invoice_Date);
    });
    _.forEach($scope.gridOptions.data, function (val) {
      val.Due_Date = new Date(val.Due_Date);
    });

  }
  
   function dateChart(data){
     for(var i=0;i<data.length;i++){

      dateBarChart.push({year:data[i].Due_Date.getFullYear(),month:data[i].Due_Date.getMonth()});
    };
     console.log(dateBarChart);
    $scope.dateBarChartCount=[0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i=0;i<dateBarChart.length;i++){
      if(dateBarChart[i].year==2017){
        var month = $scope.dateBarChart[i].month;
        switch (month) {
          case 1:
          $scope.dateBarChartCount[0]++;
          break;
          case 2:
          $scope.dateBarChartCount[1]++;
          break;
          case 3:
          $scope.dateBarChartCount[2]++;
          break;
          case 4:
          $scope.dateBarChartCount[3]++;
          break;
          case 5:
          $scope.dateBarChartCount[4]++;
          break;
          case 6:
          $scope.dateBarChartCount[5]++;
          break;
          case 7:
          $scope.dateBarChartCount[6]++;
          break;
          case 8:
          $scope.dateBarChartCount[7]++;
          break;
          case 9:
          $scope.dateBarChartCount[8]++;
          break;
          case 10:
          $scope.dateBarChartCount[9]++;
          break;
          case 11:
          $scope.dateBarChartCount[10]++;
          break;
        }
      }
    }
    renderBarChart();
    console.log($scope.dateBarChartCount);
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
    $scope.fdate= new Date($scope.Due_Datesearch);
    $scope.edate= new Date($scope.Due_DateEndsearch);
    if($scope.Due_Datesearch && $scope.Due_DateEndsearch){
      $scope.workingDatabase=[];
     
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].Due_Date.getDate() && $scope.fdate.getMonth()-1<=$scope.dataset[i].Due_Date.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].Due_Date.getFullYear() && $scope.edate.getDate()>=$scope.dataset[i].Due_Date.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Due_Date.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Due_Date.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
      data($scope.workingDatabase);
    }
  else{
    if($scope.Due_Datesearch) {
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].Due_Date.getDate() && $scope.fdate.getMonth()<=$scope.dataset[i].Due_Date.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].Due_Date.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
    }
    else{
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.edate.getDate()>=$scope.dataset[i].Due_Date.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Due_Date.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Due_Date.getFullYear()){
           $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
    }
   
    data($scope.workingDatabase);

  }
    if(!$scope.Due_Datesearch && ! $scope.Due_DateEndsearch){
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
    //$scope.renderBarChart();
    
   
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

   function renderBarChart() {
   $scope.val = $scope.dateBarChartCount;
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
                var strInvoice_No = $scope.dataset[i].Invoice_No.toString();
                var strCompany = $scope.dataset[i].Company.toString();
                var strPO_Reference = $scope.dataset[i].PO_Reference.toString();
                // var strPayment_Date = $scope.dataset[i].Payment_Date.toString();
                var strInvoice_Date = $scope.dataset[i].Invoice_Date.toString();
                var strDue_Date = $scope.dataset[i].Due_Date.toString();
                var strGross_Amount = $scope.dataset[i].Gross_Amount.toString();
                var strNet_Amount = $scope.dataset[i].Net_Amount.toString();
                var strTax_Amount = $scope.dataset[i].Tax_Amount.toString();
                var strPayment_Terms_Description = $scope.dataset[i].Payment_Terms_Description.toString();
                // var strPayment_Reference = $scope.dataset[i].Payment_Reference.toString();
                var strCurrency = $scope.dataset[i].Currency.toString();
                var strStatus = $scope.dataset[i].Status .toString();
                
            
          if(
                strInvoice_No.match(strSearchKeywords) ||
                strCompany.match(strSearchKeywords) ||
                strPO_Reference.match(strSearchKeywords) ||
                // strPayment_Date.match(strSearchKeywords) ||
                strInvoice_Date.match(strSearchKeywords) ||
                strDue_Date.match(strSearchKeywords) ||
                strGross_Amount.match(strSearchKeywords) ||
                strNet_Amount.match(strSearchKeywords) ||
                strTax_Amount.match(strSearchKeywords) ||
                strPayment_Terms_Description.match(strSearchKeywords) ||
                // strPayment_Reference.match(strSearchKeywords) ||
                strCurrency.match(strSearchKeywords) ||
                strStatus.match(strSearchKeywords)
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


