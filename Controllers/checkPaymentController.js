app.controller('checkPaymentController', ['$scope','sessionService', '$rootScope','$http','$location', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http,$location,uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
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
 ifsSupplierID =sessionService.get('ifsSupplierNum');
 console.log(ifsSupplierID);
 tokenType = sessionService.get('TokenType');
 accessToken = sessionService.get('AccessToken');
 $scope.viewChange=function(getValue){
    if(getValue==0) $location.path('/Payments'); 
    if(getValue==1) $location.path('/AutomaticPayment'); 
    if(getValue==2) $location.path('/CheckPayment');
}

 $scope.dataset=[];
 URL1 = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/payments/getcheckpaymentsforsupplier/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 console.log("in checkPaymentController");
 console.log(URL);
 $http({
    method:'GET',
    url: URL1,
    headers:{'Authorization':Headers}
 }).then(function(response){
     console.log(response);
  
    for (var i=0;i<response.data.length;i++){
       $scope.Payment_Date=response.data[i].printDate.split('T');
    var obj={
      "Payment_ID":response.data[i].paymentId,
      "Supplier_Id":response.data[i].supplierId,
      "Supplier_Name":response.data[i].name,
      "Company":response.data[i].company , 
      "Check_NO":response.data[i].checkId,
      "Check_Amount":response.data[i].checkAmount,
      "CashCheckAmount":response.data[i].cashCheckAmount,
      "Check_Status":response.data[i].objState,
      "Print_Date":response.data[i].printDate,
      "clearDate":response.data[i].clearDate,
      "ledgerItemSeriesId":response.data[i].ledgerItemSeriesId,   

    }
    $scope.dataset.push(obj);
  }
  dateChart($scope.dataset);
  $scope.linesPerPage = sessionService.get("linesPerPage")
  $scope.gridOptions.paginationPageSize = parseInt($scope.linesPerPage);
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
    
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    paginationPageSizes: [20,50,100],
    enablePinning:false,
    columnDefs: [
       
        { field: 'Payment_ID',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:true,displayName: "Payment ID",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader,
           filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }

      },
        { field: 'Supplier_Id',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:true,displayName: "Supplier Id",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Supplier_Name',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:true,displayName: "Supplier Name",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Company',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Company",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Check_NO',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Check NO",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Check_Amount', cellFilter: 'currency:"USD " :2',  minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Check Amount", groupingShowAggregationMenu: false,enableHiding:false,headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'CashCheckAmount',cellFilter: 'currency:"USD " :2',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Cash Check Amount",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Check_Status',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Check Status",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Print_Date', type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'',  minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Print Date",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'clearDate',  type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Clear Date",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'ledgerItemSeriesId',   minWidth:130, width:130, enableColumnResizing: false, pinnedLeft:false,displayName: "Ledger Item SeriesId",groupingShowAggregationMenu: false,enableHiding:false, headerCellClass: $scope.highlightFilteredHeader, filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
       
],
      exporterCsvFilename: 'CheckPayment.csv',
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };

    $scope.columnArray=[
       
        // {id:0,title:'Payment ID',value:false},
        // {id:1,title:'Supplier Id',value:false},
        // {id:2,title:'Supplier Name',value:false},
       
        {id:0,title:'Company',value:false},
        {id:1,title:'Check NO',value:false},
        {id:2,title:'Check Amount',value:false},
        {id:3,title:'Cash Check Amount',value:false},
        {id:4,title:'Check Status',value:false},
        {id:5,title:'Print Date',value:false},
        {id:6,title:'Clear Date',value:false},
        {id:7,title:'Ledger Item SeriesId',value:false}
    ];

    $scope.selectdate=function(){
    $scope.fdate= new Date($scope.requisitionDatesearch);
    $scope.edate= new Date($scope.requisitionDateEndsearch);
    $scope.workingDatabase=[];
    if($scope.requisitionDatesearch && $scope.requisitionDateEndsearch){
      
      var date;
      for(var i=0;i<$scope.dataset.length;i++){
         date = new Date($scope.dataset[i].Print_Date);
        if($scope.fdate-date<=0 && $scope.edate-date>=0 )
          $scope.workingDatabase.push($scope.dataset[i]);
        
        }
        data($scope.workingDatabase);
      }
      else{

         if($scope.requisitionDatesearch){
           
            var date;
            for(var i=0;i<$scope.dataset.length;i++){
               date = new Date($scope.dataset[i].Print_Date);
               if($scope.fdate-date<=0){
                  $scope.workingDatabase.push($scope.dataset[i]);
               }
            }
            data($scope.workingDatabase);

      }
      else{
          if($scope.requisitionDateEndsearch){
            
            var date;
            for(var i=0;i<$scope.dataset.length;i++){
               date = new Date($scope.dataset[i].Print_Date);
               if($scope.edate-date>=0){
                console.log('in');
                  $scope.workingDatabase.push($scope.dataset[i]);
               }
            }
            console.log($scope.workingDatabase);
            

           }

           data($scope.workingDatabase);
      }
     
    }
    
    if(!$scope.requisitionDatesearch && ! $scope.latestOrderDatesearch){
      
      $scope.workingDatabase=$scope.dataset;
      data($scope.workingDatabase);
    }
  }
  
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

  $scope.selectDateByDays=function(getdays){
    $scope.workingDatabase=[];
    if(getdays==7){
      angular.element( document.querySelector('#POSTATUS_0')).addClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
      $scope.workingDatabase=$scope.dataset;
      
    }else if(getdays==30){
      angular.element( document.querySelector('#POSTATUS_0')).removeClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).addClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
    }else if(getdays==90){
      angular.element( document.querySelector('#POSTATUS_0')).removeClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).addClass('active');
    }
    if(getdays>7){
       var today = new Date();
              var nextWeek = new Date();
              nextWeek.setDate(nextWeek.getDate() - getdays);
             
               $scope.fdate =new Date(nextWeek);
               $scope.edate= today;
              
              var date;
              for(var i=0;i<$scope.dataset.length;i++){
                date = new Date($scope.dataset[i].Print_Date);
                if($scope.fdate.getFullYear()<=date.getFullYear()){
                  if($scope.fdate.getMonth()<date.getMonth() ){
                    $scope.workingDatabase.push($scope.dataset[i]);
                  }
                  else if($scope.fdate.getMonth()==date.getMonth()){
                    if($scope.fdate.getDate()<=date.getDate()){
                  $scope.workingDatabase.push($scope.dataset[i]);
                    }

                  }

                }
              }

    }
             
              data($scope.workingDatabase);
            
        }

  data($scope.dataset);
  function data(data) {
    $scope.dateBarChart=[];
    $scope.gridOptions.data = data;
  }
  function dateChart(data){
     _.forEach(data, function (val) {
       var date_chart=new Date(val.Print_Date);

      $scope.dateBarChart.push({year:date_chart.getFullYear(),month:date_chart.getMonth()});
    });
      var thisYear = new Date();
    // console.log("year is ");
    // console.log(thisYear.getFullYear());
    $scope.dateBarChartCount=[0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i=0;i<$scope.dateBarChart.length;i++){
      if($scope.dateBarChart[i].year == thisYear.getFullYear() ){
        var month = $scope.dateBarChart[i].month;
        switch (month+1) {
          case 1:
          $scope.dateBarChartCount[0]++;
          console.log(month);
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
          case 12:
          $scope.dateBarChartCount[11]++;
          break;
        }
      }
    }
   $scope.renderBarChart();
  }
 
    //If DIV is visible it will be hidden and vice versa.
   $scope.toggle = true;
    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'Hide Widget' : 'Show Widget';

    })
  

   $scope.renderBarChart = function() {
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
      // canvas.style.width = "300px";
      // canvas.style.height = "50px";
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
             
                var strPayment_ID = $scope.dataset[i].Payment_ID.toString();
                var strSupplier_Id = $scope.dataset[i].Supplier_Id.toString();
                var strSupplier_Name = $scope.dataset[i].Supplier_Name.toString();
                var strCompany = $scope.dataset[i].Company.toString();
                var strCheck_NO = $scope.dataset[i].Check_NO.toString();
                var strCheck_Amount = $scope.dataset[i].Check_Amount.toString();
                var strCashCheckAmount = $scope.dataset[i].CashCheckAmount.toString();
                var strCheck_Status = $scope.dataset[i].Check_Status.toString();
                var strPrint_Date = $scope.dataset[i].Print_Date.toString();
                // var strclearDate = $scope.dataset[i].clearDate.toString();
                var strledgerItemSeriesId = $scope.dataset[i].ledgerItemSeriesId.toString();
            
          if(
              
                  strPayment_ID.match(strSearchKeywords) ||
                  strSupplier_Id.match(strSearchKeywords)  ||
                  strSupplier_Name.match(strSearchKeywords) ||
                  strCompany.match(strSearchKeywords) ||
                  strCheck_NO.match(strSearchKeywords) ||
                  strCheck_Amount.match(strSearchKeywords) ||
                  strCashCheckAmount.match(strSearchKeywords) ||
                  strCheck_Status.match(strSearchKeywords) ||
                  strPrint_Date.match(strSearchKeywords) ||
                  // strclearDate.match(strSearchKeywords) ||
                  strledgerItemSeriesId.match(strSearchKeywords)
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

