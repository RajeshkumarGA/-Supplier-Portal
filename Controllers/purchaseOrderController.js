app.controller('purchaseOrderController', ['$scope','sessionService','$rootScope','$http','$location','uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants','sessionService',
    function ($scope,sessionService, $rootScope,$http,$location,uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants,sessionService) {
$rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
$rootScope.userName = sessionService.get('UserName');
$scope.viewChange=function(getValue){
    if(getValue==0) $location.path('/PurchaseOrder'); 
    if(getValue==1) $location.path('/PurchaseOrderLine');
}
$scope.dataset =[];
$scope.pieData = [];
$scope.ApiDone= false;
 ifsSupplierID = sessionService.get('ifsSupplierNum');
 tokenType = sessionService.get('TokenType');
 accessToken = sessionService.get('AccessToken');
 apiEndPoint = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/po/getpurchaseorders/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: apiEndPoint,
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
    enablePinning: false,
    paginationPageSizes: [10,20,75],
    paginationPageSize: 10,
    columnDefs: [
      { field: 'PO_Number',  displayName: "PO Number", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:0},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Supplier_Id',  displayName: "Supplier Id", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:1},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Supplier_Name',  displayName: "Supplier Name", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:2},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Total_Tax_Amount', maxWidth: 130, minWidth: 130 , displayName: "Total Tax Amount",enableHiding:false,enablePinning:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:3},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        } },
      { field: 'Total_Net_Amount', maxWidth: 130, minWidth: 130 , displayName: "Total Net Amount",enableHiding:false,enablePinning:false, groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'Total_Gross_Amount', maxWidth: 130, minWidth: 130 , displayName: "Total Gross Amount",enableHiding:false,enablePinning:false, groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:5},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'Order_Total_Amount_Base',  displayName: "Order Total Amount Base", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Total_Gross_Incl_Charge',  displayName: "Total Gross Incl Charge", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:7},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Invoice_Net_Amount',  displayName: "Invoice Net Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:8},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Revision',  displayName: "Revision", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:9},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Currency_Code',  displayName: "Currency Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:10},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Date_Entered',  displayName: "Date Entered", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:11},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Wanted_Receipt_Date',  displayName: "Wanted Receipt Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:12},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Buyer_Name',  displayName: "Buyer Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:13},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Status',  displayName: "Status", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:14},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Company',  displayName: "Company", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:15},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Company_Name',  displayName: "Company Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:16},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Payment_Term',  displayName: "Payment Term", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:17},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Payment_Term_Description',  displayName: "Payment Term Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:18},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Cancel_Reason',  displayName: "Cancel Reason", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:19},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Cancel_Reason_Description',  displayName: "Cancel Reason Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:20},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }},
      { field: 'Ship_Via_Code_Description',  displayName: "Ship Via Code Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:21},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }}
      // pre-populated search field
      ],
      exporterCsvFilename: 'myFile.csv',
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };
    $scope.columnArray=[
    {'id':0,'title':'Total Tax Amount','value':false},
    {'id':1,'title':'Total Net Amount','value':false},
    {'id':2,'title':'Total Gross Amount','value':false},
    {'id':3,'title':'Order Total Amount Base','value':false},
    {'id':4,'title':'Total Gross Incl Charge','value':false},
    {'id':5,'title':'Invoice Net Amount','value':false},
    {'id':6,'title':'Revision','value':false},
    {'id':7,'title':'Currency Code','value':false},
    {'id':8,'title':'Date Entered','value':false},
    {'id':9,'title':'Wanted Receipt Date','value':false},
    {'id':10,'title':'Buyer Name','value':false},
    {'id':11,'title':'Status','value':false},
    {'id':12,'title':'Company','value':false},
    {'id':13,'title':'Company Name','value':false},
    {'id':14,'title':'Payment Term','value':false},
    {'id':15,'title':'Payment Term Description','value':false},
    {'id':16,'title':'Cancel Reason','value':false},
    {'id':17,'title':'Cancel Reason Description','value':false},
    {'id':18,'title':'Ship Via Code Description','value':false}
    ];
    $scope.conditions=['OR','AND'];
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
            debugger;
            for(var i=0;i<$scope.dataset.length;i++){
                debugger;
                if($scope.dataset[i][selectedcol1] == $scope.createFilterValue ||   $scope.dataset[i][selectedcol2] ==$scope.createFilterValue) {
                    $scope.workingDatabase.push($scope.dataset[i]);debugger;
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
  $scope.resetAllColumns = function(){
    for(var i=0;i<$scope.columnArray.length;i++){
          $scope.gridOptions.columnDefs[i+3].visible = true;
          $scope.columnArray[i].value=false;

      }
       $scope.gridApi.core.refresh();

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

    ifsSupplierID = sessionService.get('ifsSupplierId');

  data($scope.dataset);
  function data(data) {
    $scope.dateBarChart=[];
    $scope.gridOptions.data = data;
    _.forEach($scope.gridOptions.data, function (val) {
      val.Date_Entered = new Date(val.Date_Entered);
    });
    _.forEach($scope.gridOptions.data, function (val) {
      val.Wanted_Receipt_Date = new Date(val.Wanted_Receipt_Date);
    });

  }
   function dateChart(data){
     _.forEach(data, function (val) {
      $scope.dateBarChart.push({year:val.requisitionDate.getFullYear(),month:val.requisitionDate.getMonth()});
    });
    $scope.dateBarChartCount=[0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i=0;i<$scope.dateBarChart.length;i++){
      if($scope.dateBarChart[i].year==2017){
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
        if($scope.dataset[i].Status=='Planned')
          $scope.workingDatabase.push($scope.dataset[i]);

      }
      data($scope.workingDatabase);
      break;
      case 2:
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Closed')
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
    $scope.fdate= new Date($scope.Date_Enteredsearch);
    $scope.edate= new Date($scope.Wanted_Receipt_Datesearch);
    if($scope.Date_Enteredsearch && $scope.Wanted_Receipt_Datesearch){
      $scope.workingDatabase=[];
     /* var fdate= new Date($scope.Date_Enteredsearch);
      if(fdate.getMonth()+1>=10){
        strFDate=fdate.getFullYear()+'-'+parseInt(fdate.getMonth()+1)+'-'+fdate.getDate();
      }
      else{
        strFDate=fdate.getFullYear()+'-0'+parseInt(fdate.getMonth()+1)+'-'+fdate.getDate();
      }
      var edate= new Date($scope.Wanted_Receipt_Datesearch);
      if(edate.getMonth()+1>=10){
        strEDate=edate.getFullYear()+'-'+parseInt(edate.getMonth()+1)+'-'+edate.getDate();
      }
      else{
        strEDate=edate.getFullYear()+'-0'+parseInt(edate.getMonth()+1)+'-'+edate.getDate();
      }
      console.log(strEDate);
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Date_Entered.getMonth()+1>=10){
          datasetDate_Entered=$scope.dataset[i].Date_Entered.getFullYear()+'-'+parseInt($scope.dataset[i].Date_Entered.getMonth()+1)+'-'+$scope.dataset[i].Date_Entered.getDate();
        }
        else{
          datasetDate_Entered=$scope.dataset[i].Date_Entered.getFullYear()+'-'+parseInt($scope.dataset[i].Date_Entered.getMonth()+1)+'-'+$scope.dataset[i].Date_Entered.getDate();
        }
        if($scope.dataset[i].Wanted_Receipt_Date.getMonth()+1>=10){
          datasetWanted_Receipt_Date=$scope.dataset[i].Wanted_Receipt_Date.getFullYear()+'-'+parseInt($scope.dataset[i].Wanted_Receipt_Date.getMonth()+1)+'-'+$scope.dataset[i].Wanted_Receipt_Date.getDate();
        }
        else{
          datasetWanted_Receipt_Date=$scope.dataset[i].Wanted_Receipt_Date.getFullYear()+'-'+parseInt($scope.dataset[i].Wanted_Receipt_Date.getMonth()+1)+'-'+$scope.dataset[i].Wanted_Receipt_Date.getDate();
        }
        if(datasetDate_Entered.match(strFDate) && datasetWanted_Receipt_Date.match(strEDate) ){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }*/
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].Date_Entered.getDate() && $scope.fdate.getMonth()-1<=$scope.dataset[i].Date_Entered.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].Date_Entered.getFullYear() && $scope.edate.getDate()>=$scope.dataset[i].Date_Entered.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Date_Entered.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Date_Entered.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
      data($scope.workingDatabase);
    }
  else{
    if($scope.Date_Enteredsearch) {
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].Date_Entered.getDate() && $scope.fdate.getMonth()<=$scope.dataset[i].Date_Entered.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].Date_Entered.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
    }
    else{
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.edate.getDate()>=$scope.dataset[i].Wanted_Receipt_Date.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Wanted_Receipt_Date.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Wanted_Receipt_Date.getFullYear()){
           $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
    }
   /* var date= new Date($scope.Date_Enteredsearch);
    if(date.getMonth()+1>=10){
      strFDate=date.getFullYear()+'-'+parseInt(date.getMonth()+1)+'-'+date.getDate();
    }
    else{
      strFDate=date.getFullYear()+'-0'+parseInt(date.getMonth()+1)+'-'+date.getDate();
    }
    for(var i=0;i<$scope.dataset.length;i++){
      if($scope.dataset[i].Date_Entered.getMonth()+1>=10){
        datasetDate_Entered=$scope.dataset[i].Date_Entered.getFullYear()+'-'+parseInt($scope.dataset[i].Date_Entered.getMonth()+1)+'-'+$scope.dataset[i].Date_Entered.getDate();
      }
      else{
        datasetDate_Entered=$scope.dataset[i].Date_Entered.getFullYear()+'-'+parseInt($scope.dataset[i].Date_Entered.getMonth()+1)+'-'+$scope.dataset[i].Date_Entered.getDate();
      }
      if(datasetDate_Entered.match(strFDate)){
        $scope.workingDatabase.push($scope.dataset[i]);
      }
    }*/
    data($scope.workingDatabase);

  }
    if(!$scope.Date_Enteredsearch && ! $scope.Wanted_Receipt_Datesearch){
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
    dateChart($scope.dataset);
    
   
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

   function renderBarChart(){
   $scope.val = $scope.dateBarChartCount;
    //console.log($scope.val);
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
            
             var strShip_Via_Code_Description = $scope.dataset[i].Ship_Via_Code_Description.toString();
             var strCancel_Reason_Description = $scope.dataset[i].Cancel_Reason_Description.toString();
             var strCancel_Reason = $scope.dataset[i].Cancel_Reason.toString();
             var strPayment_Term = $scope.dataset[i].Payment_Term.toString();
             var strCompany_Name = $scope.dataset[i].Company_Name.toString();
             var strCompany = $scope.dataset[i].Company.toString();
             var strWanted_Receipt_Date = $scope.dataset[i].Wanted_Receipt_Date.toString();
             var strDate_Entered = $scope.dataset[i].Date_Entered.toString();
             var strCurrency_Code = $scope.dataset[i].Currency_Code.toString();
             var strRevision = $scope.dataset[i].Revision.toString();
             var strTotal_Tax_Amount = $scope.dataset[i].Total_Tax_Amount.toString();
             var strSupplier_Name = $scope.dataset[i].Supplier_Name.toString();
             var strTotal_Gross_Incl_Charge = $scope.dataset[i].Total_Gross_Incl_Charge.toString();
             var strTotal_Net_Amount = $scope.dataset[i].Total_Net_Amount.toString();
             var strSupplier_Id = $scope.dataset[i].Supplier_Id.toString();
             var strBuyer_Name=$scope.dataset[i].Buyer_Name.toString();
             var strStatus=$scope.dataset[i].Status.toString();
             var strPO_Number=$scope.dataset[i].PO_Number.toString();
             var strCompany=$scope.dataset[i].Company.toString();

          if(
            strShip_Via_Code_Description.match(strSearchKeywords) || 
            strCancel_Reason_Description.match(strSearchKeywords) || 
            strCancel_Reason.match(strSearchKeywords) || 
            strPayment_Term.match(strSearchKeywords) || 
            strCompany_Name.match(strSearchKeywords) || 
            strCompany.match(strSearchKeywords) || 
            strWanted_Receipt_Date.match(strSearchKeywords) || 
            strDate_Entered.match(strSearchKeywords) || 
            strCurrency_Code.match(strSearchKeywords) || 
            strRevision.match(strSearchKeywords) || 
            strTotal_Tax_Amount.match(strSearchKeywords) || 
            strSupplier_Name.match(strSearchKeywords) || 
            strTotal_Gross_Incl_Charge.match(strSearchKeywords) || 
            strTotal_Net_Amount.match(strSearchKeywords) || 
            strSupplier_Id.match(strSearchKeywords) || 
            strBuyer_Name.match(strSearchKeywords) || 
            strStatus.match(strSearchKeywords) || 
            strPO_Number.match(strSearchKeywords)||
            strCompany.match(strSearchKeywords)){
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


