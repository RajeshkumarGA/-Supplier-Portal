app.controller('AutomaticPaymentController', ['$scope','sessionService', '$rootScope','$http','$location', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http,$location, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
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
 tokenType = sessionService.get('TokenType');
 accessToken = sessionService.get('AccessToken');
 $scope.viewChange=function(getValue){
    if(getValue==0) $location.path('/Payments'); 
    if(getValue==1) $location.path('/AutomaticPayment'); 
    if(getValue==2) $location.path('/CheckPayment');
}
 $scope.dataset=[];
 dataURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/payments/getautomaticpaymentsforsupplier/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: dataURL,
    headers:{'Authorization':Headers}
 }).then(function(response){
    console.log(response);
    for (var i=0;i<response.data.length;i++){
      $scope.Payment_Date=response.data[i].payDate.split('T');
    var obj={
      'Payment_ID':response.data[i].paymentId,
      'Company' : response.data[i].company,
      'Payment_Date' : response.data[i].payDate,
      'Series_ID' : response.data[i].seriesId,
      'Currency' : response.data[i].currency,
      'Payment_Amount' : response.data[i].curramount,
      'Payment_Method':response.data[i].paymenttypE_CODE,
      'Bank_Fee' : response.data[i].bankFee,
      'Paid_Amount_in_Paid_Currency' :response.data[i].bankfeE2CURR_AMOUNT,
      'Paid_Amount_in_Acc_Currency' :response.data[i].bankfeE2DOM_AMOUNT
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
  $scope.searchFilter = function(getValue,getIndex){
    $scope.spanTick=true;
    // alert(getValue+" --- "+getIndex);
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
    paginationPageSizes: [20,50,100],
    
    enablePinning:false,
    columnDefs: [
       
        { field: 'Payment_ID',displayName: "Payment ID",width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:0},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Company',displayName: "Company",width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:1},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Payment_Date',displayName: "Payment Date",width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'',
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:2},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Series_ID',displayName: "Series ID",width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:3},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Currency',displayName: "Currency",width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Payment_Amount',displayName: "Payment Amount",cellFilter: 'currency:"USD " :2',width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:5},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Payment_Method',displayName: "Payment Method",width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Bank_Fee',displayName: "Bank Fee",width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:7},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Paid_Amount_in_Paid_Currency',displayName: "Paid Amount in Paid Currency",width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:8},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
        { field: 'Paid_Amount_in_Acc_Currency',displayName: "Paid Amount in Acc Currency",width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:9},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      }
],
      exporterCsvFilename: 'AutomaticPayment.csv',
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };

  
    $scope.columnArray=[
      
      // {id:0,title:'Payment ID',value:false},
      // {id:1,title:'Company',value:false},
      // {id:2,title:'Payment Date',value:false},
      {id:3,title:'Series ID',value:false},
      {id:4,title:'Currency',value:false},
      {id:5,title:'Payment Amount',value:false},
      {id:6,title:'Payment Method',value:false},
      {id:7,title:'Bank Fee',value:false},
      {id:8,title:'Paid Amount in Paid Currency',value:false},
      {id:9,title:'Paid Amount in Acc Currency',value:false}
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
    $scope.dateBarChart=[];
    $scope.gridOptions.data = data;
  }
  function dateChart(data){
     _.forEach(data, function (val) {
       var date_chart=new Date(val.Payment_Date);
      $scope.dateBarChart.push({year:date_chart.getFullYear(),month:date_chart.getMonth()});
    });
    var thisYear = new Date();
    // console.log("year is ");
    // console.log(thisYear.getFullYear());
    $scope.dateBarChartCount=[0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i=0;i<$scope.dateBarChart.length;i++){
      if($scope.dateBarChart[i].year==thisYear.getFullYear()){
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

  // $scope.filter = function(getValue){
  //   var myE0 = angular.element( document.querySelector( '.active' ) );
  //   myE0.removeClass('active');
  //   var myEl = angular.element( document.querySelector( '#POSTATUS_'+getValue) );
  //   myEl.addClass('active');
  //   $scope.workingDatabase=$scope.dataset;
  //   switch (getValue){
  //     case 0:
  //     data($scope.workingDatabase);
  //     break;
  //     case 1:
  //     $scope.workingDatabase=[];
  //     for(var i=0;i<$scope.dataset.length;i++){
  //       if($scope.dataset[i].Status=='Cashed')
  //         $scope.workingDatabase.push($scope.dataset[i]);

  //     }
  //     data($scope.workingDatabase);
  //     break;
  //     case 2:
  //     $scope.workingDatabase=[];
  //     for(var i=0;i<$scope.dataset.length;i++){
  //       if($scope.dataset[i].Status=='Printed')
  //         $scope.workingDatabase.push($scope.dataset[i]);

  //     }
  //     data($scope.workingDatabase);
  //     break;
  //     case 3:
  //     $scope.workingDatabase=[];
  //     for(var i=0;i<$scope.dataset.length;i++){
  //       if($scope.dataset[i].Status=='Released')
  //         $scope.workingDatabase.push($scope.dataset[i]);

  //     }
  //     data($scope.workingDatabase);
  //     break;

  //   }
  // }

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
                date = new Date($scope.dataset[i].Payment_Date);
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

  $scope.selectdate=function(){
    $scope.fdate= new Date($scope.requisitionDatesearch);
    $scope.edate= new Date($scope.requisitionDateEndsearch);
    $scope.workingDatabase=[];
    if($scope.requisitionDatesearch && $scope.requisitionDateEndsearch){
      
      var date;
      for(var i=0;i<$scope.dataset.length;i++){
         date = new Date($scope.dataset[i].Payment_Date);
        if($scope.fdate-date<=0 && $scope.edate-date>=0 )
          $scope.workingDatabase.push($scope.dataset[i]);
        
        }
        data($scope.workingDatabase);
      }
      else{

         if($scope.requisitionDatesearch){
           
            var date;
            for(var i=0;i<$scope.dataset.length;i++){
               date = new Date($scope.dataset[i].Payment_Date);
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
               date = new Date($scope.dataset[i].Payment_Date);
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
    //If DIV is visible it will be hidden and vice versa.
   $scope.toggle = true;
    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'Hide Widget' : 'Show Widget';

    })
 
 
  // $scope.renderPieChart = function(){
  //    var PieTotal = parseInt($scope.PieActive) + parseInt($scope.PieClosed) + parseInt($scope.PieCancelled);
  //    console.log(PieTotal);
  //    // $scope.PieActivePer = ((33*100)/(33+231+44)).toFixed(0);
  //    // $scope.PieClosedPer = ((231*100)/(33+231+44)).toFixed(0);
  //    // $scope.PieCancelledPer = ((44*100)/(33+231+44)).toFixed(0);
  //     var data = {datasets: [{data: [33,231,44],
  //       backgroundColor: ["#f8e71c","#f5a800","#bd10e0"]}],
  //       labels: ["Active","Closed","Current"],
  //     };
  //     var canvas = document.getElementById("myPieChart");
  //     var ctx = canvas.getContext("2d");
  //     var myNewChart = new Chart(ctx, {
  //       type: 'pie',
  //       data: data,
  //       options:{legend:{display:false,
  //                        position:"right",
  //                         labels:{              
  //                                 boxWidth:10,
  //                               }
                         
  //                       },
  //               },

  //     });
  //     $scope.addOnClickOnPie = function(evt) {
  //       var activePoints = myNewChart.getElementsAtEvent(evt);
  //       if (activePoints[0]) {
  //         var chartData = activePoints[0]['_chart'].config.data;
  //         var idx = activePoints[0]['_index'];
  //         var label = chartData.labels[idx];
  //         var value = chartData.datasets[0].data[idx];
  //         var url = "http://example.com/?label=" + label + "&value=" + value;
  //        $scope.pievalue = idx;
  //      }
  //    };
  //  }

   $scope.renderBarChart = function() {
   $scope.val =$scope.dateBarChartCount;
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
      // canvas.style.width = "1200px";
      //canvas.style.height = "150px";
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

