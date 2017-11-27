app.controller('SupplierShipmentController', ['$scope','sessionService', '$rootScope','$http', 'uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants',function ($scope,sessionService, $rootScope,$http, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
$rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
$rootScope.userName = sessionService.get('UserName'); 
ifsSupplierID = sessionService.get('ifsSupplierNum');
$scope.ApiDone= false;
 tokenType = sessionService.get('TokenType');
 accessToken = sessionService.get('AccessToken');
 $scope.dataset=[];
 dataURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/suppliershipment/getsuppliershipmentsbysupplier/'+ifsSupplierID;
 var Headers = tokenType+' '+accessToken;
 $http({
    method:'GET',
    url: dataURL,
    headers:{'Authorization':Headers}
 }).then(function(responce){
        for(var i=0;i<responce.data.length;i++){
            $scope.Arrival_date=responce.data[i].arrivaL_DATE.split('T');
            $scope.Approved_date=responce.data[i].approveD_DATE.split('T');
            var obj = {
                "Supplier_Id":ifsSupplierID,
                "Line_No":responce.data[i].linE_NO,
                "Order_No":responce.data[i].ordeR_NO,
                "Description":responce.data[i].description,
                "Supplier_Name":"UNITED CENTRAL INDUSTRIAL SUPPLY",
                "Release_No":responce.data[i].releasE_NO,
                "Receipt_No":responce.data[i].receipT_NO,
                "Part_No":responce.data[i].parT_NO,
                "State":responce.data[i].state,
                "Qty_Arrived":responce.data[i].qtY_ARRIVED,
                "Buy_Unit_Meas":responce.data[i].buY_UNIT_MEAS,
                "Inventory_Part":responce.data[i].inventorY_PART,
                "Invoice_Qty_Arrived":responce.data[i].inV_QTY_ARRIVED,
                "Catch_Qty_Arrived":responce.data[i].catcH_QTY_ARRIVED,
                "Catch_UOM":responce.data[i].catcH_UOM,
                "Qty_Inspected":responce.data[i].qtY_INSPECTED,
                "Qty_To_Inspect":responce.data[i].qtY_TO_INSPECT,
                "Arrival_Date":$scope.Arrival_date[0],
                "Approved_Date":$scope.Approved_date[0],
                "Final_Invoice_Date":responce.data[i].finallY_INVOICED_DATE,
                "Qty_Invoiced":responce.data[i].qtY_INVOICED,
                "Qty_Scrapped_Credit":responce.data[i].qtY_SCRAPPED_CREDIT,
                "Qty_Scrapped_No_Credit":responce.data[i].qtY_SCRAPPED_NO_CREDIT,
                "Qty_Returned_Credit":responce.data[i].qtY_RETURNED_CREDIT,
                "Qty_Returned_No_Credit":responce.data[i].qtY_RETURNED_NO_CREDIT,
                "Qty_Consignment":responce.data[i].qtY_CONSIGNMENT,
                "Notified_Consumed_Qty":responce.data[i].notifieD_CONSUMED_QTY,
                "Receiver":responce.data[i].receiver,
                "Receipt_Reference":responce.data[i].receipT_REFERENCE,
                "Note_Text":responce.data[i].notE_TEXT,
                "Reqisition_No":responce.data[i].requisitioN_NO,
                "Requsition_Line":responce.data[i].reQ_LINE,
                "Project_ID":responce.data[i].projecT_ID,
                "Project_Name":responce.data[i].projecT_NAME,
                "Total_Qty":responce.data[i].totaL_QTY
            }
            $scope.dataset.push(obj);
        }
        data($scope.dataset);
        $scope.ApiDone= true;
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
    enablePinning: false,
    columnDefs: [
       
        { field: 'Supplier_Id',displayName: "Supplier Id", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:0},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Line_No',displayName: "Line No", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:1},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Order_No',displayName: "Order No", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:2},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Description',displayName: "Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:3},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Supplier_Name',displayName: "Supplier Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Release_No',displayName: "Release No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:5},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Receipt_No',displayName: "Receipt No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Part_No ',displayName: "Part No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:7},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'State',displayName: "State", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:8},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Qty_Arrived',displayName: "Qty Arrived", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:9},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Buy_Unit_Meas',displayName: "Buy Unit Meas", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:10},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Inventory_Part',displayName: "Inventory Part", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:11},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Invoice_Qty_Arrived',displayName: "Invoice Qty Arrived", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:12},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Catch_Qty_Arrived',displayName: "Catch Qty Arrived", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:13},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Catch_UOM',displayName: "Catch UOM", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:14},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Qty_Inspected',displayName: "Qty Inspected", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:15},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: ' Qty_To_Inspect',displayName: "Qty To Inspect", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:16},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Arrival_Date',displayName: "Arrival Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:17},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Approved_Date',displayName: "Approved Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:18},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Final_Invoice_Date',displayName: "Final Invoice Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:19},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Qty_Invoiced',displayName: "Qty Invoiced", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:20},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Qty_Scrapped_Credit',displayName: "Qty Scrapped Credit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:21},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Qty_Scrapped_No_Credit',displayName: "Qty Scrapped No Credit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:22},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Qty_Returned_Credit',displayName: "Qty Returned Credit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:23},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Qty_Returned_No_Credit',displayName: "Qty Returned No Credit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:24},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Qty_Consignment',displayName: "Qty Consignment", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:25},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Notified_Consumed_Qty',displayName: "Notified Consumed Qty", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:26},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Receiver',displayName: "Receiver", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:27},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Receipt_Reference',displayName: "Receipt Reference", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:28},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Note_Text',displayName: "Note Text", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:29},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Reqisition_No',displayName: "Reqisition No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:30},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Requsition_Line',displayName: "Requsition Line", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:31},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Project_ID',displayName: "Project ID", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:32},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Project_Name',displayName: "Project Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:33},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        },
        { field: 'Total_Qty',displayName: "Total Qty", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:34},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
          }
        }
      ],
      exporterCsvFilename: 'SupplierShipment.csv',
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };

    $scope.columnArray=[
       
        {'id':3,'title':'Description','value':false},
        {'id':4,'title':'Supplier Name','value':false},
        {'id':5,'title':'Release No','value':false},
        {'id':6,'title':'Receipt No','value':false},
        {'id':7,'title':'Part No','value':false},
        {'id':8,'title':'State','value':false},
        {'id':9,'title':'Qty Arrived','value':false},
        {'id':10,'title':'Buy Unit Meas','value':false},
        {'id':11,'title':'Inventory Part','value':false},
        {'id':12,'title':'Invoice Qty Arrived','value':false},
        {'id':13,'title':'Catch Qty Arrived','value':false},
        {'id':14,'title':'Catch UOM','value':false},
        {'id':15,'title':'Qty Inspected','value':false},
        {'id':16,'title':'Qty To Inspect','value':false},
        {'id':17,'title':'Arrival Date','value':false},
        {'id':18,'title':'Approved Date','value':false},
        {'id':19,'title':'Final Invoice Date','value':false},
        {'id':20,'title':'Qty Invoiced','value':false},
        {'id':21,'title':'Qty Scrapped Credit','value':false},
        {'id':22,'title':'Qty Scrapped No Credit','value':false},
        {'id':23,'title':'Qty Returned Credit','value':false},
        {'id':24,'title':'Qty Returned No Credit','value':false},
        {'id':25,'title':'Qty Consignment','value':false},
        {'id':26,'title':'Notified Consumed Qty','value':false},
        {'id':27,'title':'Receiver','value':false},
        {'id':28,'title':'Receipt Reference','value':false},
        {'id':29,'title':'Note Text','value':false},
        {'id':30,'title':'Reqisition No','value':false},
        {'id':31,'title':'Requsition Line','value':false},
        {'id':32,'title':'Project ID','value':false},
        {'id':33,'title':'Project Name','value':false},
        {'id':34,'title':'Total Qty','value':false}
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
  
  function data(data) {
    $scope.gridOptions.data = data;
    _.forEach($scope.gridOptions.data, function (val) {
      val.Arrival_Date = new Date(val.Arrival_Date);
    });
    _.forEach($scope.gridOptions.data, function (val) {
      val.Approved_Date = new Date(val.Approved_Date);
    });

  }
  data($scope.dataset);

  $scope.filter = function(getValue){
    var myE0 = angular.element( document.querySelector( '.active' ) );
    myE0.removeClass('active');
    var myEl = angular.element( document.querySelector( '#POSTATUS_'+getValue) );
    myEl.addClass('active');
    $scope.workingDatabase=$scope.dataset;
    switch (getValue){
      case 0  :    data($scope.workingDatabase);
      break;
      case 1  :    $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Planned')
          $scope.workingDatabase.push($scope.dataset[i]);

      }
      data($scope.workingDatabase);
      break;
      case 2 :     $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Closed')
          $scope.workingDatabase.push($scope.dataset[i]);

      }
      data($scope.workingDatabase);
      break;
      case 3 :     $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Status=='Released')
          $scope.workingDatabase.push($scope.dataset[i]);

      }
      data($scope.workingDatabase);
      break;

    }
  }
  $scope.selectdate=function(){
    $scope.fdate= new Date($scope.Arrival_Date_Search);
    $scope.edate= new Date($scope.Approved_Date_Search);
    debugger;
    if($scope.Arrival_Date_Search && $scope.Approved_Date_Search){
      $scope.workingDatabase=[];
     /* var fdate= new Date($scope.Arrival_Datesearch);
      if(fdate.getMonth()+1>=10){
        strFDate=fdate.getFullYear()+'-'+parseInt(fdate.getMonth()+1)+'-'+fdate.getDate();
      }
      else{
        strFDate=fdate.getFullYear()+'-0'+parseInt(fdate.getMonth()+1)+'-'+fdate.getDate();
      }
      var edate= new Date($scope.Approved_Date_Search);
      if(edate.getMonth()+1>=10){
        strEDate=edate.getFullYear()+'-'+parseInt(edate.getMonth()+1)+'-'+edate.getDate();
      }
      else{
        strEDate=edate.getFullYear()+'-0'+parseInt(edate.getMonth()+1)+'-'+edate.getDate();
      }
      console.log(strEDate);
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].Arrival_Date.getMonth()+1>=10){
          datasetArrival_Date=$scope.dataset[i].Arrival_Date.getFullYear()+'-'+parseInt($scope.dataset[i].Arrival_Date.getMonth()+1)+'-'+$scope.dataset[i].Arrival_Date.getDate();
        }
        else{
          datasetArrival_Date=$scope.dataset[i].Arrival_Date.getFullYear()+'-'+parseInt($scope.dataset[i].Arrival_Date.getMonth()+1)+'-'+$scope.dataset[i].Arrival_Date.getDate();
        }
        if($scope.dataset[i].Approved_Date.getMonth()+1>=10){
          datasetApproved_Date=$scope.dataset[i].Approved_Date.getFullYear()+'-'+parseInt($scope.dataset[i].Approved_Date.getMonth()+1)+'-'+$scope.dataset[i].Approved_Date.getDate();
        }
        else{
          datasetApproved_Date=$scope.dataset[i].Approved_Date.getFullYear()+'-'+parseInt($scope.dataset[i].Approved_Date.getMonth()+1)+'-'+$scope.dataset[i].Approved_Date.getDate();
        }
        if(datasetArrival_Date.match(strFDate) && datasetApproved_Date.match(strEDate) ){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }*/
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].Arrival_Date.getDate() && $scope.fdate.getMonth()-1<=$scope.dataset[i].Arrival_Date.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].Arrival_Date.getFullYear() && $scope.edate.getDate()>=$scope.dataset[i].Approved_Date.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Approved_Date.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Approved_Date.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
      data($scope.workingDatabase);
    }
  else{
    if($scope.Arrival_Date_Search) {
        debugger;
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].Arrival_Date.getDate() && $scope.fdate.getMonth()<=$scope.dataset[i].Arrival_Date.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].Arrival_Date.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
          debugger;
        }
      }
    }
    else{
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.edate.getDate()>=$scope.dataset[i].Approved_Date.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Approved_Date.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Approved_Date.getFullYear()){
           $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
    }
   /* var date= new Date($scope.Arrival_Datesearch);
    if(date.getMonth()+1>=10){
      strFDate=date.getFullYear()+'-'+parseInt(date.getMonth()+1)+'-'+date.getDate();
    }
    else{
      strFDate=date.getFullYear()+'-0'+parseInt(date.getMonth()+1)+'-'+date.getDate();
    }
    for(var i=0;i<$scope.dataset.length;i++){
      if($scope.dataset[i].Arrival_Date.getMonth()+1>=10){
        datasetArrival_Date=$scope.dataset[i].Arrival_Date.getFullYear()+'-'+parseInt($scope.dataset[i].Arrival_Date.getMonth()+1)+'-'+$scope.dataset[i].Arrival_Date.getDate();
      }
      else{
        datasetArrival_Date=$scope.dataset[i].Arrival_Date.getFullYear()+'-'+parseInt($scope.dataset[i].Arrival_Date.getMonth()+1)+'-'+$scope.dataset[i].Arrival_Date.getDate();
      }
      if(datasetArrival_Date.match(strFDate)){
        $scope.workingDatabase.push($scope.dataset[i]);
      }
    }*/
    data($scope.workingDatabase);

  }
    if(!$scope.Arrival_Date_Search && ! $scope.Approved_Date_Search){
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
                var strSupplier_Id = $scope.dataset[i].Supplier_Id.toString();
                var strLine_No = $scope.dataset[i].Line_No.toString();
                var strOrder_No = $scope.dataset[i].Order_No.toString();
                var strDescription= $scope.dataset[i].Description.toString();
                var strSupplier_Name = $scope.dataset[i].Supplier_Name.toString();
                var strRelease_No = $scope.dataset[i].Release_No.toString();
                var strReceipt_No = $scope.dataset[i].Receipt_No.toString();
                var strPart_No= $scope.dataset[i].Part_No.toString();
                var strState= $scope.dataset[i].State.toString();
                var strQty_Arrived= $scope.dataset[i].Qty_Arrived.toString();
                var strBuy_Unit_Meas= $scope.dataset[i].Buy_Unit_Meas.toString();
                var strInventory_Part= $scope.dataset[i].Inventory_Part.toString();
                var strInvoice_Qty_Arrived= $scope.dataset[i].Invoice_Qty_Arrived.toString();
                var strCatch_Qty_Arrived= $scope.dataset[i].Catch_Qty_Arrived.toString();
                var strCatch_UOM = $scope.dataset[i].Catch_UOM.toString();
                var strQty_Inspected= $scope.dataset[i].Qty_Inspected.toString();
                var strQty_To_Inspect= $scope.dataset[i].Qty_To_Inspect.toString();
                var strArrival_Date= $scope.dataset[i].Arrival_Date.toString();
                var strApproved_Date= $scope.dataset[i].Approved_Date.toString();
                var strFinal_Invoice_Date= $scope.dataset[i].Final_Invoice_Date.toString();
                var strQty_Invoiced = $scope.dataset[i].Qty_Invoiced.toString();
                var strQty_Scrapped_Credit = $scope.dataset[i].Qty_Scrapped_Credit.toString();
                var strQty_Scrapped_No_Credit= $scope.dataset[i].Qty_Scrapped_No_Credit.toString();
                var strQty_Returned_Credit= $scope.dataset[i].Qty_Returned_Credit.toString();
                var strQty_Returned_No_Credit= $scope.dataset[i].Qty_Returned_No_Credit.toString();
                var strQty_Consignment= $scope.dataset[i].Qty_Consignment.toString();
                var strNotified_Consumed_Qty= $scope.dataset[i].Notified_Consumed_Qty.toString();
                var strReceiver= $scope.dataset[i].Receiver.toString();
                var strReceipt_Reference = $scope.dataset[i].Receipt_Reference.toString();
                var strNote_Text = $scope.dataset[i].Note_Text.toString();
                var strReqisition_No= $scope.dataset[i].Reqisition_No.toString();
                var strRequsition_Line= $scope.dataset[i].Requsition_Line.toString();
                var strProject_ID= $scope.dataset[i].Project_ID.toString();
                var strProject_Name = $scope.dataset[i].Project_Name.toString();
                var strTotal_Qty= $scope.dataset[i].Total_Qty.toString();

            
          if(strSupplier_Id.match(strSearchKeywords) ||
             strLine_No.match(strSearchKeywords) ||
                strOrder_No.match(strSearchKeywords) ||
                strDescription.match(strSearchKeywords) ||
                strSupplier_Name.match(strSearchKeywords) ||
                strRelease_No.match(strSearchKeywords) ||
                strReceipt_No.match(strSearchKeywords) ||
                strPart_No.match(strSearchKeywords) ||
                strState.match(strSearchKeywords) ||
                strQty_Arrived.match(strSearchKeywords) ||
                strBuy_Unit_Meas.match(strSearchKeywords) ||
                strInventory_Part.match(strSearchKeywords) ||
                strInvoice_Qty_Arrived.match(strSearchKeywords) ||
                strCatch_Qty_Arrived.match(strSearchKeywords) ||
                strCatch_UOM.match(strSearchKeywords) ||
                strQty_Inspected.match(strSearchKeywords) ||
                strQty_To_Inspect.match(strSearchKeywords) ||
                strArrival_Date.match(strSearchKeywords) ||
                strApproved_Date.match(strSearchKeywords) ||
                strFinal_Invoice_Date.match(strSearchKeywords) ||
                strQty_Invoiced.match(strSearchKeywords) ||
                strQty_Scrapped_Credit.match(strSearchKeywords) ||
                strQty_Scrapped_No_Credit.match(strSearchKeywords) ||
                strQty_Returned_Credit.match(strSearchKeywords) ||
                strQty_Returned_No_Credit.match(strSearchKeywords) ||
                strQty_Consignment.match(strSearchKeywords) ||
                strNotified_Consumed_Qty.match(strSearchKeywords) ||
                strReceiver.match(strSearchKeywords) ||
                strReceipt_Reference.match(strSearchKeywords) ||
                strNote_Text.match(strSearchKeywords) ||
                strReqisition_No.match(strSearchKeywords) ||
                strRequsition_Line.match(strSearchKeywords) ||
                strProject_ID.match(strSearchKeywords) ||
                strProject_Name.match(strSearchKeywords) ||
                strTotal_Qty.match(strSearchKeywords)
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

