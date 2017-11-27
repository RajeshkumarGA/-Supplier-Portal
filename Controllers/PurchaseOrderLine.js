app.controller('purchaseOrderLineController', ['$scope','sessionService','$rootScope','$http','$location','uiGridConstants','$templateCache', 'uiGridExporterService','uiGridExporterConstants','sessionService',
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
dataURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/po/getpurchaseorderlines/'+ifsSupplierID;
var Headers = tokenType+' '+accessToken;
$http({
    method:'GET',
    url: dataURL,
    headers:{'Authorization':Headers}
 }).then(function(response){
    for (var i=0;i<response.data.length;i++){
       $scope.date_entered=response.data[i].datE_ENTERED.split('T');
      $scope.planned_Delivery_Date=response.data[i].planneD_DELIVERY_DATE.split('T');
        var obj = {
            "PO_Number":12536,
            "Line_No":response.data[i].linE_NO,
            "Release_No":response.data[i].releasE_NO,
            "PO_Status":response.data[i].pO_STATUS,
            "Payment_Term":response.data[i].paymenT_TERMS,
            "Payment_Term_Desc":response.data[i].paymenT_TERMS_DESC,
            "Address1":response.data[i].addresS1,
            "Address2":response.data[i].addresS2,
            "City":response.data[i].city,
            "State":response.data[i].state,
            "County":response.data[i].country,
            "Zip_Code":response.data[i].ziP_CODE,
            "Buyer_Name":response.data[i].buyer_Name,
            "Buyer_Phone":response.data[i].buyer_Phone,
            "Buyer_Email":response.data[i].buyer_Email,
            "Date_Entered":$scope.date_entered[0],
            "Ship_Via_Code_Desc":response.data[i].shiP_VIA_CODE,
            "Delivery_Term_Desc":response.data[i].deliverY_TERM_DESC,
            "Part_No":response.data[i].parT_NO,
            "Description_":response.data[i].description,
            "Vendor_Part_No":response.data[i].vendoR_PART_NO,
            "Vendor_Part_Description":response.data[i].vendoR_PART_DESC,
            "Buy_Qty_Due":response.data[i].buY_QTY_DUE,
            "Buy_UoM":response.data[i].buY_UNIT_MEAS,
            "Revised_Qty":response.data[i].reviseD_QTY,
            "Planned_Receipt_Date":response.data[i].planneD_RECEIPT_DATE,
            "Planned_Delivery_Date":$scope.planned_Delivery_Date[0],
            "Wanted_Delivery_Date":response.data[i].wanteD_DELIVERY_DATE,
            "Unit_Meas":response.data[i].uniT_MEAS,
            "Promised_Delivery_Date":response.data[i].promiseD_DELIVERY_DATE,
            "Latest_Order_Date":response.data[i].latesT_ORDER_DATE,
            "Price":response.data[i].price,
            "Price_With_Tax":response.data[i].pricE_WITH_TAX,
            "Base_Price":response.data[i].basE_PRICE,
            "Base_Price_With_Tax":response.data[i].basE_PRICE_WITH_TAX,
            "Currency_Rate":response.data[i].currencY_RATE,
            "Currency_Code":response.data[i].currencY_CODE,
            "Discount":response.data[i].discount,
            "Additional_Cost_Amount":response.data[i].additionaL_COST_AMOUNT,
            "Additional_Cost_Amount_with_Tax":response.data[i].additionaL_COST_AMT_WITH_TAX,
            "Net_Amount":response.data[i].neT_AMOUNT,
            "Gross_Amount":response.data[i].grosS_AMOUNT,
            "Tax_Amount":response.data[i].taX_AMOUNT,
            "Tax_Code":response.data[i].taX_CODE,
            "Tax_Code_Description":response.data[i].taX_CODE_DESC,
            "Tax_Ship_Address":response.data[i].taX_SHIP_ADDRESS,
            "Qty_Invoiced":response.data[i].qtY_INVOICED,
            "Invoice_Unit_Price":response.data[i].invoicE_UNIT_PRICE,
            "Invoice_Discount_Amount":response.data[i].invoicE_DISCOUNT_AMT,
            "Invoice_Additional_Cost_Amount":response.data[i].invoicE_ADDITIONAL_COST_AMT,
            "Invoicing_Supplier_Name":response.data[i].invoicinG_SUPPLIER_NAME       
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
    $scope.ungroupBy = function(){
    for(var i=0;i<5;i++){
      console.log($scope.gridOptions.columnDefs[i]);
     }
  }
   $scope.searchFilter = function(getValue,getIndex){
    $scope.spanTick=true;
    $scope.gridOptions.columnDefs[getIndex].filter.condition=getValue;
   $scope.activeBtn = getIndex;
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
      { field:'PO_Number',displayName: "PO Number", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:0},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Line_No',displayName: "Line NO", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:1},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Release_No',displayName: "Release NO", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:2},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'PO_Status',displayName: "PO Status", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:3},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Payment_Term',displayName: "Payment Terms", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Payment_Term_Desc',displayName: "Payment Terms Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:5},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Address1',displayName: "Address 1", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Address2',displayName: "Address 2", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:7},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'City',displayName: "City", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:8},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'State',displayName: "State", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:9},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'County',displayName: "Country", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:10},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Zip_Code',displayName: "Zip Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:11},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Buyer_Name',displayName: "buyer_Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:12},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Buyer_Phone',displayName: "Buyer Phone", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:13},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Buyer_Email',displayName: "Buyer Email", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:14},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Date_Entered',displayName: "Date Enterd", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:15},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Ship_Via_Code_Desc',displayName: "Ship Via Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:16},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Delivery_Term_Desc',displayName: "Delivery Term Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:17},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Part_No',displayName: "Part NO", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:18},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Description_',displayName: "Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:19},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Vendor_Part_No',displayName: "Vendor Part NO", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:20},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Vendor_Part_Description',displayName: "Vendor Part Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:21},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Buy_Qty_Due',displayName: "Buy Qty DUE", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:22},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Buy_UoM',displayName: "Buy Unit Meas", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:23},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Revised_Qty',displayName: "Revised Qty", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:24},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Planned_Receipt_Date',displayName: "Planned Receipt Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:25},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Planned_Delivery_Date',displayName: "Planned Delivery Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:26},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Wanted_Delivery_Date',displayName: "Wanted Delivery Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:27},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Unit_Meas',displayName: "Unit Meas", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:28},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Promised_Delivery_Date',displayName: "Promised Delivery Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:29},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Latest_Order_Date',displayName: "Latest Order Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:30},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Price',displayName: "Price", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:31},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Price_With_Tax',displayName: "Price With Tax", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:32},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Base_Price',displayName: "Base Price", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:33},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Base_Price_With_Tax',displayName: "Base Price With Tax", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:34},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Currency_Rate',displayName: "Currency Rate", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:35},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Currency_Code',displayName: "Currency Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:36},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Discount',displayName: "Discount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:37},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Additional_Cost_Amount',displayName: "Additional Cost Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:38},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Additional_Cost_Amount_with_Tax',displayName: "AdditionaL_COST_AMT_WITH_TAX", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:39},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Net_Amount',displayName: "Net Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:40},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Gross_Amount',displayName: "Gross Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:41},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Tax_Amount',displayName: "Tax Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:42},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Tax_Code',displayName: "Tax Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:43},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Tax_Code_Description',displayName: "Tax Code Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:44},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Tax_Ship_Address',displayName: "Tax Ship Address", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:45},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Qty_Invoiced',displayName: "Qty Invoiced", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:46},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Invoice_Unit_Price',displayName: "Invoice Unit Price", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:47},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Invoice_Discount_Amount',displayName: "Invoice Discount Amt", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:48},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Invoice_Additional_Cost_Amount',displayName: "Invoice Additional Cost Amt", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:49},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field:'Invoicing_Supplier_Name',displayName: "Invoicing Supplier Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:50},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.EXACT, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      }

      ],
      exporterCsvFilename: 'PurchaseOrderLine.csv',
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };
    $scope.columnArray=[  
          {'id':0,'title':'PO Status','value':false},
          {'id':1,'title':'Payment Term','value':false},
          {'id':2,'title':'Payment Term Desc','value':false},
          {'id':3,'title':'Address1','value':false},
          {'id':4,'title':'Address2','value':false},
          {'id':5,'title':'City','value':false},
          {'id':6,'title':'State','value':false},
          {'id':7,'title':'County','value':false},
          {'id':8,'title':'Zip Code','value':false},
          {'id':9,'title':'Buyer Name','value':false},
          {'id':10,'title':'Buyer Phone','value':false},
          {'id':11,'title':'Buyer Email','value':false},
          {'id':12,'title':'Date Entered','value':false},
          {'id':13,'title':'Ship Via Code Desc','value':false},
          {'id':14,'title':'Delivery Term Desc','value':false},
          {'id':15,'title':'Part No','value':false},
          {'id':16,'title':'Description','value':false},
          {'id':17,'title':'Vendor Part No','value':false},
          {'id':18,'title':'Vendor Part Description','value':false},
          {'id':19,'title':'Buy Qty','value':false},
          {'id':20,'title':'Buy UoM','value':false},
          {'id':21,'title':'Revised Qty','value':false},
          {'id':22,'title':'Planned Receipt Date','value':false},
          {'id':23,'title':'Planned Delivery Date','value':false},
          {'id':24,'title':'Wanted Delivery Date','value':false},
          {'id':25,'title':'Unit Meas','value':false},
          {'id':26,'title':'Promised Delivery Date','value':false},
          {'id':27,'title':'Latest Order Date','value':false},
          {'id':28,'title':'Price','value':false},
          {'id':29,'title':'Price With Tax','value':false},
          {'id':30,'title':'Base Price','value':false},
          {'id':31,'title':'Base Price With Tax','value':false},
          {'id':32,'title':'Currency Rate','value':false},
          {'id':33,'title':'Currency Code','value':false},
          {'id':34,'title':'Discount','value':false},
          {'id':35,'title':'Additional Cost Amount','value':false},
          {'id':36,'title':'Additional Cost Amount with Tax','value':false},
          {'id':37,'title':'Net Amount','value':false},
          {'id':38,'title':'Gross Amount','value':false},
          {'id':39,'title':'Tax Amount','value':false},
          {'id':40,'title':'Tax Code','value':false},
          {'id':41,'title':'Tax Code Description','value':false},
          {'id':42,'title':'Tax Ship Address','value':false},
          {'id':43,'title':'Qty Invoiced','value':false},
          {'id':44,'title':'Invoice Unit Price','value':false},
          {'id':45,'title':'Invoice Discount Amount','value':false},
          {'id':46,'title':'Invoice Additional Cost Amount','value':false},
          {'id':47,'title':'Invoicing Supplier Name','value':false}

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
    $scope.selectedColumn1 = '';
    $scope.selectedColumn2 = '';
    $scope.selectedCondition='';
    $scope.createFilterValue='';
    $scope.workingDatabase=$scope.dataset;
    data($scope.workingDatabase);
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

    ifsSupplierID = sessionService.get('ifsSupplierId');

  data($scope.dataset);
  function data(data) {
    $scope.gridOptions.data = data;
    _.forEach($scope.gridOptions.data, function (val) {
      val.Date_Entered = new Date(val.Date_Entered);
    });
    _.forEach($scope.gridOptions.data, function (val) {
      val.Planned_Delivery_Date = new Date(val.Planned_Delivery_Date);
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
    $scope.edate= new Date($scope.Planned_Delivery_Datesearch);
    if($scope.Date_Enteredsearch && $scope.Planned_Delivery_Datesearch){
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].Date_Entered.getDate() && $scope.fdate.getMonth()-1<=$scope.dataset[i].Date_Entered.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].Date_Entered.getFullYear() && $scope.edate.getDate()>=$scope.dataset[i].Planned_Delivery_Date.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Planned_Delivery_Date.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Planned_Delivery_Date.getFullYear()){
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
      
        if($scope.edate.getDate()>=$scope.dataset[i].Planned_Delivery_Date.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].Planned_Delivery_Date.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].Planned_Delivery_Date.getFullYear()){
           $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
    }
    data($scope.workingDatabase);

  }
    if(!$scope.Date_Enteredsearch && ! $scope.Planned_Delivery_Datesearch){
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
    
  }
  $scope.renderPieChart = function(){
     // console.log(PieTotal);
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
            
            var strPO_Number= $scope.dataset[i].PO_Number.toString();
            var strLine_No= $scope.dataset[i].Line_No.toString();
            var strRelease_No= $scope.dataset[i].Release_No.toString();
            var strPO_Status= $scope.dataset[i].PO_Status.toString();
            var strPayment_Term= $scope.dataset[i].Payment_Term.toString();
            var strPayment_Term_Desc= $scope.dataset[i].Payment_Term_Desc.toString();
            var strAddress1= $scope.dataset[i].Address1.toString();
            var strAddress2= $scope.dataset[i].Address2.toString();
            var strCity= $scope.dataset[i].City.toString();
            var strState= $scope.dataset[i].State.toString();
            var strCounty= $scope.dataset[i].County.toString();
            var strZip_Code= $scope.dataset[i].Zip_Code.toString();
            var strBuyer_Name= $scope.dataset[i].Buyer_Name.toString();
            var strBuyer_Phone= $scope.dataset[i].Buyer_Phone.toString();
            var strBuyer_Email= $scope.dataset[i].Buyer_Email.toString();
            var strDate_Entered= $scope.dataset[i].Date_Entered.toString();
            var strShip_Via_Code_Desc= $scope.dataset[i].Ship_Via_Code_Desc.toString();
            var strDelivery_Term_Desc= $scope.dataset[i].Delivery_Term_Desc.toString();
            var strPart_No= $scope.dataset[i].Part_No.toString();
            var strDescription_= $scope.dataset[i].Description_.toString();
            var strVendor_Part_No= $scope.dataset[i].Vendor_Part_No.toString();
            var strVendor_Part_Description= $scope.dataset[i].Vendor_Part_Description.toString();
            // var strBuy_Qty= $scope.dataset[i].Buy_Qty.toString();
            // var strBuy_UoM= $scope.dataset[i].Buy_UoM.toString();
            var strRevised_Qty= $scope.dataset[i].Revised_Qty.toString();
            var strPlanned_Receipt_Date= $scope.dataset[i].Planned_Receipt_Date.toString();
            var strPlanned_Delivery_Date= $scope.dataset[i].Planned_Delivery_Date.toString();
            var strWanted_Delivery_Date= $scope.dataset[i].Wanted_Delivery_Date.toString();
            var strUnit_Meas= $scope.dataset[i].Unit_Meas.toString();
            var strPromised_Delivery_Date= $scope.dataset[i].Promised_Delivery_Date.toString();
            var strLatest_Order_Date= $scope.dataset[i].Latest_Order_Date.toString();
            var strPrice= $scope.dataset[i].Price.toString();
            var strPrice_With_Tax= $scope.dataset[i].Price_With_Tax.toString();
            var strBase_Price= $scope.dataset[i].Base_Price.toString();
            var strBase_Price_With_Tax= $scope.dataset[i].Base_Price_With_Tax.toString();
            var strCurrency_Rate= $scope.dataset[i].Currency_Rate.toString();
            var strCurrency_Code= $scope.dataset[i].Currency_Code.toString();
            var strDiscount= $scope.dataset[i].Discount.toString();
            var strAdditional_Cost_Amount= $scope.dataset[i].Additional_Cost_Amount.toString();
            var strAdditional_Cost_Amount_with_Tax= $scope.dataset[i].Additional_Cost_Amount_with_Tax.toString();
            var strNet_Amount= $scope.dataset[i].Net_Amount.toString();
            var strGross_Amount= $scope.dataset[i].Gross_Amount.toString();
            var strTax_Amount= $scope.dataset[i].Tax_Amount.toString();
            var strTax_Code= $scope.dataset[i].Tax_Code.toString();
            var strTax_Code_Description= $scope.dataset[i].Tax_Code_Description.toString();
            var strTax_Ship_Address= $scope.dataset[i].Tax_Ship_Address.toString();
            var strQty_Invoiced= $scope.dataset[i].Qty_Invoiced.toString();
            var strInvoice_Unit_Price= $scope.dataset[i].Invoice_Unit_Price.toString();
            var strInvoice_Discount_Amount= $scope.dataset[i].Invoice_Discount_Amount.toString();
            var strInvoice_Additional_Cost_Amount= $scope.dataset[i].Invoice_Additional_Cost_Amount.toString();
            var strInvoicing_Supplier_Name= $scope.dataset[i].Invoicing_Supplier_Name.toString();

          if(
              strPO_Number.match(strSearchKeywords) ||
              strLine_No.match(strSearchKeywords) ||
              strRelease_No.match(strSearchKeywords) ||
              strPO_Status.match(strSearchKeywords) ||
              strPayment_Term.match(strSearchKeywords) ||
              strPayment_Term_Desc.match(strSearchKeywords) ||
              strAddress1.match(strSearchKeywords) ||
              strAddress2.match(strSearchKeywords) ||
              strCity.match(strSearchKeywords) ||
              strState.match(strSearchKeywords) ||
              strCounty.match(strSearchKeywords) ||
              strZip_Code.match(strSearchKeywords) ||
              strBuyer_Name.match(strSearchKeywords) ||
              strBuyer_Phone.match(strSearchKeywords) ||
              strBuyer_Email.match(strSearchKeywords) ||
              strDate_Entered.match(strSearchKeywords) ||
              strShip_Via_Code_Desc.match(strSearchKeywords) ||
              strDelivery_Term_Desc.match(strSearchKeywords) ||
              strPart_No.match(strSearchKeywords) ||
              strDescription_.match(strSearchKeywords) ||
              strVendor_Part_No.match(strSearchKeywords) ||
              strVendor_Part_Description.match(strSearchKeywords) ||
              // strBuy_Qty.match(strSearchKeywords) ||
              // strBuy_UoM.match(strSearchKeywords) ||
              strRevised_Qty.match(strSearchKeywords) ||
              strPlanned_Receipt_Date.match(strSearchKeywords) ||
              strPlanned_Delivery_Date.match(strSearchKeywords) ||
              strWanted_Delivery_Date.match(strSearchKeywords) ||
              strUnit_Meas.match(strSearchKeywords) ||
              strPromised_Delivery_Date.match(strSearchKeywords) ||
              strLatest_Order_Date.match(strSearchKeywords) ||
              strPrice.match(strSearchKeywords) ||
              strPrice_With_Tax.match(strSearchKeywords) ||
              strBase_Price.match(strSearchKeywords) ||
              strBase_Price_With_Tax.match(strSearchKeywords) ||
              strCurrency_Rate.match(strSearchKeywords) ||
              strCurrency_Code.match(strSearchKeywords) ||
              strDiscount.match(strSearchKeywords) ||
              strAdditional_Cost_Amount.match(strSearchKeywords) ||
              strAdditional_Cost_Amount_with_Tax.match(strSearchKeywords) ||
              strNet_Amount.match(strSearchKeywords) ||
              strGross_Amount.match(strSearchKeywords) ||
              strTax_Amount.match(strSearchKeywords) ||
              strTax_Code.match(strSearchKeywords) ||
              strTax_Code_Description.match(strSearchKeywords) ||
              strTax_Ship_Address.match(strSearchKeywords) ||
              strQty_Invoiced.match(strSearchKeywords) ||
              strInvoice_Unit_Price.match(strSearchKeywords) ||
              strInvoice_Discount_Amount.match(strSearchKeywords) ||
              strInvoice_Additional_Cost_Amount.match(strSearchKeywords) ||
              strInvoicing_Supplier_Name.match(strSearchKeywords)){
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


