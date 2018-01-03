app.controller('NonPOInvoicesController', ['$scope','sessionService', '$rootScope','$http', '$location','uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http,$location,uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
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
$scope.getValue = 1;
$scope.viewChange=function(getValue){
    if(getValue==0) $location.path('/SupplierInvoice'); 
    if(getValue==1) $location.path('/NonPOInvoices');
}
$scope.dataset =[];
$scope.pieData = [];
$scope.ApiDone= false;
 ifsSupplierID =sessionService.get('ifsSupplierNum');
 console.log(sessionService.get('ifsSupplierNum'));
 tokenType = sessionService.get('TokenType');
 accessToken = sessionService.get('AccessToken');
 apiEndPoint = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/nonpoinvoice/getnonposupplierinvoices/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: apiEndPoint,
    headers:{'Authorization':Headers}
 }).then(function(response){
    console.log(response);
    for (var i=0;i<response.data.length;i++){
      var invoiceDate=response.data[i].invoiceDate.split('T');
      var createDate=response.data[i].createDate.split('T');
      var updateDate=response.data[i].updateDate.split('T');
      // var invoice_date=response.data[i].invoiceDate;
        var obj = {
          "Invoice_No":response.data[i].invoiceNo,
          "Supplier_Id":response.data[i].supplierID,
          "Company":response.data[i].company,
          "Currency":response.data[i].currency,
          "Invoice_Date":invoiceDate[0],
          "Invoice_Amount":response.data[i].invoiceAmount,
          "Comments":response.data[i].note,
          "No_of_Attachments":response.data[i].noOfAttachments,
          "File_Exists":response.data[i].fileExists,
          "Created_Date":createDate[0],
          "Updated_Date":updateDate[0],
          "Status":response.data[i].status
           
               }
      $scope.dataset.push(obj);
      $scope.linesPerPage = sessionService.get("linesPerPage")
      $scope.gridOptions.paginationPageSize = parseInt($scope.linesPerPage);
    }
   data($scope.dataset);
    $scope.ApiDone= true;
    var count = 0;
    var count1 = 0;
    for(var i=0;i<$scope.dataset.length;i++){
      if($scope.dataset[i].Status=='PaidPosted'){count++;}
      else if ($scope.dataset[i].Status=='PostedAuth') {count1++;}
    }
    $scope.PiePaidPosted = count;
    $scope.pieData.push(count);
    $scope.PiePostedAuth = count1;
    $scope.pieData.push(count1);
    var t = count+count1;
    $scope.PiePaidPostedPer = ((count*100)/t).toFixed(0);
    $scope.PiePostedAuthPer = ((count1*100)/t).toFixed(0);
    $scope.renderPieChart();
    dateChart($scope.dataset);
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
    paginationPageSizes: [20,50,100],
    // paginationPageSize: 10,
    enablePinning: false,
    columnDefs: [
       
        // { field: 'Invoice_Id', displayName: "Invoice Id", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        // filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        // filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
        //          options:[{index:0},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        // }},
        { field: 'Invoice_No', displayName: "Invoice No", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:1},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        },cellTemplate:
          '<a  ng-click="grid.appScope.supplierDetails(row.entity)" class="ui-grid-cell-contents" style="color:red">{{COL_FIELD}}</a>'
        },
        
        { field: 'Supplier_Id', displayName: "Supplier Id", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:2},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Company', displayName:"Company",width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Currency',  displayName: "Currency", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Invoice_Date',  displayName: "Invoice Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'',
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:5},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Invoice_Amount',  displayName: "Invoice Amount",cellFilter: 'currency:"USD " :2', width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
       
        { field: 'Comments',  displayName: "Comments", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:10},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'No_of_Attachments',  displayName: "No of Attachments", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:11},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'File_Exists',  displayName: "File Exists", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:12},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Created_Date',  displayName: "Created Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'',
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:13},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
        { field: 'Updated_Date',  displayName: "Updated Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'',
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
      $location.path('/NonPoInvoiceDetails');
    }
    $scope.columnArray=[
        // {'id':0,'title':'Invoice_Id','value':false},
        // {'id':1,'title':'Invoice_No','value':false},
        // {'id':2,'title':'Supplier_Id','value':false},
        {'id':0,'title':'Company','value':false},
        {'id':1,'title':'Currency','value':false},
        {'id':2,'title':'Invoice_Date','value':false},
        {'id':3,'title':'Invoice_Amount','value':false},
        {'id':4,'title':'Comments','value':false},
        {'id':5,'title':'No_of_Attachments','value':false},
        {'id':6,'title':'File_Exists','value':false},
        {'id':7,'title':'Created_Date','value':false},
        {'id':8,'title':'Updated_Date','value':false},
        {'id':9,'title':'Status','value':false}
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
  data($scope.dataset);
  function data(data) {
    $scope.dateBarChart=[];
    $scope.gridOptions.data = data;
   
  }
   function dateChart(data){
     _.forEach(data, function (val) {
       var date_chart=new Date(val.Invoice_Date);
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
    renderBarChart();
  }
  
  
  

  $scope.filter = function(getValue){
    var myE0 = angular.element( document.querySelector( '.active' ) );
    myE0.removeClass('active');
    var myEl = angular.element( document.querySelector( '#POSTATUS_'+getValue) );
    myEl.addClass('active');
    $scope.workingDatabase=$scope.dataset;
   switch (getValue){
      case 0:
      angular.element( document.querySelector('#POSTATUS_0')).addClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
      data($scope.workingDatabase);
      break;
      case 1:
      angular.element( document.querySelector('#POSTATUS_0')).removeClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).addClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='PaidPosted')
          $scope.workingDatabase.push($scope.dataset[i]);

      }
      data($scope.workingDatabase);
      break;
      case 2:
      angular.element( document.querySelector('#POSTATUS_0')).removeClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).addClass('active');
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='PostedAuth')
          $scope.workingDatabase.push($scope.dataset[i]);

      }
      data($scope.workingDatabase);
      break;
     
    }
  }
   $scope.selectdate=function(){
    $scope.fdate= new Date($scope.requisitionDatesearch);
    $scope.edate= new Date($scope.requisitionDateEndsearch);
    $scope.workingDatabase=[];
    if($scope.requisitionDatesearch && $scope.requisitionDateEndsearch){
      
      var date;
      for(var i=0;i<$scope.dataset.length;i++){
         date = new Date($scope.dataset[i].Invoice_Date);
        if($scope.fdate-date<=0 && $scope.edate-date>=0 )
          $scope.workingDatabase.push($scope.dataset[i]);
        
        }
        data($scope.workingDatabase);
      }
      else{

         if($scope.requisitionDatesearch){
           
            var date;
            for(var i=0;i<$scope.dataset.length;i++){
               date = new Date($scope.dataset[i].Invoice_Date);
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
               date = new Date($scope.dataset[i].Invoice_Date);
               if($scope.edate-date>=0){
                // console.log('in');
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
  $scope.pieData=[];
  
  $scope.renderPieChart = function(){
   
      var data = {datasets: [{data: $scope.pieData,
        backgroundColor: ["#f8e71c","#f5a800"]}],
        labels: ["PaidPosted","PostedAuth"],
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
      canvas.style.width = "900px";
      canvas.style.height = "150px";
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


