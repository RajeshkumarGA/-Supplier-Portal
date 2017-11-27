app.controller('PurchaseRequisitions', function ($scope,sessionService, $rootScope,$http, uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants) {
  $rootScope.UserloggedIn=sessionService.get('UserLoggedIn');
  $rootScope.userName = sessionService.get('UserName'); 
  $scope.dataset =[];
  $scope.pieData = [];
  $scope.ApiDone= false;
  ifsSupplierID = sessionService.get('ifsSupplierNum');
  tokenType = sessionService.get('TokenType');
  accessToken = sessionService.get('AccessToken');
  dataURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/purchaserequisition/getpurchaserequisitions/'+ifsSupplierID;
  var Headers = tokenType+' '+accessToken;
  $http({
    method:'GET',
    url: dataURL,
    headers:{'Authorization':Headers}
  })
  .then(function(response){
    for (var i=0;i<response.data.length;i++){
      $scope.Arrival_date=response.data[i].requisitionDate.split('T');
      $scope.Approved_date=response.data[i].latestOrderDate.split('T');
      var obj = {
        "index":i,
        "additionalCostAmountGross":response.data[i].additionalCostAmountGross,
        "addituonalCostAmount":response.data[i].addituonalCostAmount,
        "authReq":response.data[i].authReq,
        "buyUnitMeas":response.data[i].buyUnitMeas,
        "buyUnitPrice":response.data[i].buyUnitPrice,
        "contact":response.data[i].contact,
        "contactName":response.data[i].contactName,
        "contract":response.data[i].contract,
        "contractDescription":response.data[i].contractDescription,
        "conversionFac":response.data[i].conversionFac,
        "currencyCode":response.data[i].currencyCode,
        "currencyRate":response.data[i].currencyRate,
        "demandCode":response.data[i].demandCode,
        "description":response.data[i].description,
        "discount":response.data[i].discount,
        "fbuyUnitPrice":response.data[i].fbuyUnitPrice,
        "grossAmountBase":response.data[i].grossAmountBase,
        "grossAmountCurr":response.data[i].grossAmountCurr,
        "headState":response.data[i].headState,
        "id":response.data[i].id,
        "latestOrderDate":$scope.Approved_date[0],
        "lineNoPR":response.data[i].lineNoPR,
        "netAmountBase":response.data[i].netAmountBase,
        "netAmountBaseCurr":response.data[i].netAmountBaseCurr,
        "noteText":response.data[i].noteText,
        "orderCode":response.data[i].orderCode,
        "orderDate":response.data[i].orderDate,
        "orderFor":response.data[i].orderFor,
        "originalQuantity":response.data[i].originalQuantity,
        "parentVendorDescription":response.data[i].parentVendorDescription,
        "parentVendorNo":response.data[i].parentVendorNo,
        "partNo":response.data[i].partNo,
        "price":response.data[i].price,
        "priceBase":response.data[i].priceBase,
        "priceCurr":response.data[i].priceCurr,
        "priceInclTaxBase":response.data[i].priceInclTaxBase,
        "priceInclTaxCurr":response.data[i].priceInclTaxCurr,
        "program":response.data[i].program,
        "programdesc":response.data[i].programdesc,
        "projectDesc":response.data[i].projectDesc,
        "projectId":response.data[i].projectId,
        "purchaseCode":response.data[i].purchaseCode,
        "purchaseCodeDescription":response.data[i].purchaseCodeDescription,
        "purchaseGroup":response.data[i].purchaseGroup,
        "purchaseGroupDesc":response.data[i].purchaseGroupDesc,
        "qtyPurchaseUnit":response.data[i].qtyPurchaseUnit,
        "quantity":response.data[i].quantity,
        "receiver":response.data[i].receiver,
        "releaseNo":response.data[i].releaseNo,
        "reqNo":response.data[i].reqNo,
        "requestType":response.data[i].requestType,
        "requisitionDate":$scope.Arrival_date[0],
        "requisitioner":response.data[i].requisitioner,
        "requisitionerName":response.data[i].requisitionerName,
        "state":response.data[i].state,
        "status":response.data[i].status,
        "supplierId":response.data[i].supplierId,
        "unitMeas":response.data[i].unitMeas,
        "vendoePartDescription":response.data[i].vendoePartDescription,
        "vendorName":response.data[i].vendorName,
        "vendorNo":response.data[i].vendorNo,
        "vendorPartNo":response.data[i].vendorPartNo,
        "wantedReceiptDate":response.data[i].wantedReceiptDate
      }
      $scope.dataset.push(obj);
    }
    data($scope.dataset);
    $scope.ApiDone= true;
    var count = 0;
    var count1 = 0;
    var count2 = 0;
    for(var i=0;i<$scope.dataset.length;i++){
      if($scope.dataset[i].status=='Planned'){count++;}
      else if ($scope.dataset[i].status=='Released') {count1++;}
      else{count2++;}
    }
    $scope.PieActive = count;
    $scope.pieData.push(count);
    $scope.PieClosed = count1;
    $scope.pieData.push(count1);
    $scope.PieCancelled = count2;
    $scope.pieData.push(count2);
    var t = count+count1+count2;
    $scope.PieActivePer = ((count*100)/t).toFixed(0);
    $scope.PieClosedPer = ((count1*100)/t).toFixed(0);
    $scope.PieCancelledPer = ((count2*100)/t).toFixed(0);
    renderPieChart();
    dateChart($scope.dataset);
  },
  function errorCallback(response){
        console.log(response);
  });  
  $scope.spanTick=false;
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
  $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
    if( col.filters[0].term ){
      return 'header-filtered';
    } 
    else {
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
     { field: 'supplierId',displayName:'Supplier Id', width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:0},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'orderFor', displayName: "Order For", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:1},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'reqNo',displayName:"Req No", width: 150,pinnedLeft:true,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:2},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'releaseNo', displayName: "Release No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:3},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'partNo', displayName: "Part No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:4},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'state', displayName: "State", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:5},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'originalQuantity', displayName: "Original Quantity", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:6},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'unitMeas', displayName: "Unit Meas", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:7},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'qtyPurchaseUnit', displayName: "Qty Purchase Unit", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:8},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'buyUnitMeas' , displayName: "Buy Unit Meas", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:9},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'purchaseCode', displayName: "Purchase Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:10},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'purchaseCodeDescription', displayName: "Purchase Code Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:11},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'vendorPartNo', displayName: "Vendor Part No", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:12},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'vendoePartDescription', displayName: "Vendoe Part Description", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:13},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'authReq' , displayName: "Auth Req", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:14},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'wantedReceiptDate', displayName: "Wanted Receipt Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:15},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'requisitionDate', displayName: "Requisition Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:16},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'latestOrderDate', displayName: "Latest Order Date", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:17},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'status', displayName: "Status", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:18},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'noteText', displayName: "Note Text", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:19},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'requestType', displayName: "Request Type", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:20},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'priceBase', displayName: "Price Base", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:21},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'priceInclTaxCurr', displayName: "Price Incl Tax Curr", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:22},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'currencyRate' , displayName: "Currency Rate", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:23},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'buyUnitPrice' , displayName: "Buy Unit Price", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:24},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'addituonalCostAmount' , displayName: "Addituonal Cost Amount", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:25},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'additionalCostAmountGross' , displayName: "Additional Cost Amount Gross", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:26},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'netAmountBase', displayName: "Net Amount Base", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:27},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'grossAmountBase' , displayName: "Gross Amount Base", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:28},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'grossAmountCurr' , displayName: "Gross Amount Curr", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:29},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'purchaseGroup', displayName: "Purchase Group", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:30},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'purchaseGroupDesc', displayName: "Purchase Group Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:31},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'requisitioner', displayName: "Requisitioner", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:32},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'requisitionerName', displayName: "Requisitioner Name", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:33},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'receiver', displayName: "Receiver", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:34},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'orderCode', displayName: "Order Code", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:35},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'program', displayName: "Program", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:36},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'programdesc', displayName: "Program Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:37},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'projectId', displayName: "Project Id", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:38},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'projectDesc', displayName: "Project Desc", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:39},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      },
      { field: 'conversionFac' , displayName: "Conversion Fac", width: 150,pinnedLeft:false,groupingShowAggregationMenu: false,enableHiding:false,
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-filter></div></div>',
        filter: {term: '',condition: uiGridConstants.filter.STARTS_WITH,
                 options:[{index:40},[ {id: uiGridConstants.filter.STARTS_WITH, value: 'Begins with'}, {id: uiGridConstants.filter.CONTAINS, value: 'Contains'},{id: uiGridConstants.filter.ENDS_WITH, value: 'Ends With'},{id: uiGridConstants.filter.EXACT, value: 'Equals'},{id: uiGridConstants.filter.NOT_EQUAL, value: "Doesn't Equals"}]]      // custom attribute that goes with custom directive above 
        }
      }
    ],
    exporterCsvFilename: 'PurchaseRequisitions.csv',
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };
  $scope.columnArray=[
    {'id':0,'title': ' Release No' ,'value':false},
    {'id':1,'title': ' Part No','value':false},
    {'id':2,'title': ' State' ,'value':false},
    {'id':3,'title': ' Original Quantity' ,'value':false},
    {'id':4,'title': ' Unit Meas' ,'value':false},
    {'id':5,'title': ' Qty Purchase Unit' ,'value':false},
    {'id':6,'title':  ' Buy Unit Meas' ,'value':false},
    {'id':7,'title': ' Purchase Code' ,'value':false},
    {'id':8,'title': ' Purchase Code Description','value':false},
    {'id':9,'title': ' Vendor No' ,'value':false},
    {'id':10,'title': ' Vendoe Part Description' ,'value':false},
    {'id':11,'title': 'authReq' ,'value':false},
    {'id':12,'title': ' Wanted Receipt Date' ,'value':false},
    {'id':13,'title': ' Requisition Date' ,'value':false},
    {'id':14,'title': ' Latest Order Date' ,'value':false},
    {'id':15,'title': ' Status' ,'value':false},
    {'id':16,'title': ' NoteText','value':false},
    {'id':17,'title': ' Request Type' ,'value':false},
    {'id':18,'title': ' Price Base','value':false},
    {'id':19,'title': ' Price Incl Tax Curr' ,'value':false},
    {'id':20,'title': ' Currency Rate'  ,'value':false},
    {'id':21,'title':  ' Buy Unit Price' ,'value':false},
    {'id':22,'title': 'addituonalCostAmount','value':false}, 
    {'id':23,'title': 'additionalCostAmountGross','value':false},
    {'id':24,'title': ' Net Amount Base','value':false},
    {'id':25,'title': ' Gross Amount Base' ,'value':false},
    {'id':26,'title': ' Gross Amount Curr' ,'value':false},
    {'id':27,'title': ' Purchase Group','value':false},
    {'id':28,'title': ' Purchase Group Desc' ,'value':false},
    {'id':29,'title': ' Requisitioner' ,'value':false},
    {'id':30,'title': ' Requisitioner Name' ,'value':false},
    {'id':31,'title': ' Receiver','value':false}, 
    {'id':32,'title': ' Order Code' ,'value':false},
    {'id':33,'title': ' Program' ,'value':false},
    {'id':34,'title': ' Program Desc' ,'value':false},
    {'id':35,'title': ' Project Id' ,'value':false}, 
    {'id':36,'title': ' Project Desc' ,'value':false},
    {'id':37,'title':  ' Conversion Fac' ,'value':false},
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
    _.forEach($scope.gridOptions.data, function (val) {
      val.requisitionDate = new Date(val.requisitionDate);
    });
    _.forEach($scope.gridOptions.data, function (val) {
      val.latestOrderDate = new Date(val.latestOrderDate);
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
          case 12:
          $scope.dateBarChartCount[11]++;
          break;
        }
      }
    }
    renderBarChart();
  }
  $scope.filter = function(getValue){
    $scope.workingDatabase=$scope.dataset;
    switch (getValue){
      case 0:
      angular.element( document.querySelector('#POSTATUS_0')).addClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_3')).removeClass('active');
      data($scope.workingDatabase);
      break;
      case 1:
      $scope.workingDatabase=[];
      angular.element( document.querySelector('#POSTATUS_0')).removeClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).addClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_3')).removeClass('active');
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].status=='Planned'){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
      data($scope.workingDatabase);
      break;
      case 2:
      $scope.workingDatabase=[];
      angular.element( document.querySelector('#POSTATUS_0')).removeClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).addClass('active');
      angular.element( document.querySelector('#POSTATUS_3')).removeClass('active');
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].status=='Released')
        $scope.workingDatabase.push($scope.dataset[i]);
      }
      data($scope.workingDatabase);
      break;
      case 3:
      $scope.workingDatabase=[];
      angular.element( document.querySelector('#POSTATUS_0')).removeClass('active'); 
      angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
      angular.element( document.querySelector('#POSTATUS_3')).addClass('active');
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.dataset[i].status=='PO Created')
        $scope.workingDatabase.push($scope.dataset[i]);
      }
      data($scope.workingDatabase);
      break;
    }
  }
  $scope.selectdate=function(){
    $scope.fdate= new Date($scope.requisitionDatesearch);
    $scope.edate= new Date($scope.latestOrderDatesearch);
    if($scope.requisitionDatesearch && $scope.latestOrderDatesearch){
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        if($scope.fdate.getDate()<=$scope.dataset[i].requisitionDate.getDate() && $scope.fdate.getMonth()-1<=$scope.dataset[i].requisitionDate.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].requisitionDate.getFullYear() && $scope.edate.getDate()>=$scope.dataset[i].latestOrderDate.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].latestOrderDate.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].latestOrderDate.getFullYear()){
          $scope.workingDatabase.push($scope.dataset[i]);
        }
      }
      data($scope.workingDatabase);
    }
    else{
      if($scope.requisitionDatesearch) {
        $scope.workingDatabase=[];
        for(var i=0;i<$scope.dataset.length;i++){
          if($scope.fdate.getDate()<=$scope.dataset[i].requisitionDate.getDate() && $scope.fdate.getMonth()<=$scope.dataset[i].requisitionDate.getMonth() && $scope.fdate.getFullYear()<=$scope.dataset[i].requisitionDate.getFullYear()){
            $scope.workingDatabase.push($scope.dataset[i]);
          }
        }
      }
      else{
        for(var i=0;i<$scope.dataset.length;i++){
          if($scope.edate.getDate()>=$scope.dataset[i].latestOrderDate.getDate() && $scope.edate.getMonth()>=$scope.dataset[i].latestOrderDate.getMonth() && $scope.edate.getFullYear()>=$scope.dataset[i].latestOrderDate.getFullYear()){
             $scope.workingDatabase.push($scope.dataset[i]);
          }
        }
      }
      data($scope.workingDatabase);
    }
    if(!$scope.requisitionDatesearch && ! $scope.latestOrderDatesearch){
      $scope.workingDatabase=[];
      $scope.workingDatabase=$scope.dataset;
      data($scope.workingDatabase);
    }
  }
  $scope.toggle = true;
  $scope.$watch('toggle', function(){
    $scope.toggleText = $scope.toggle ? 'Hide Widget' : 'Show Widget';
  })
  function renderPieChart(){
    var data = {
      datasets: [
        { data:$scope.pieData,
          backgroundColor: ["#f8e71c","#f5a800","#bd10e0"]
        }
      ],
      labels: ["Planned","Released","PO Created"],
    };
    var canvas = document.getElementById("myPieChart");
    var ctx = canvas.getContext("2d");
    var myNewChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options:{
        legend:{
          display:false,
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
    var data = {
      labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
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
  $scope.toggleClick = function () {
  }; 
  $scope.search=function(){
    if($scope.searchKeywords){
      var strSearchKeywords=$scope.searchKeywords.toString();
      $scope.workingDatabase=[];
      for(var i=0;i<$scope.dataset.length;i++){
        var strsupplierId= $scope.dataset[i].supplierId.toString();
        var strorderFor= $scope.dataset[i].orderFor.toString();
        var strreqNo= $scope.dataset[i].reqNo.toString();
        var strreleaseNo= $scope.dataset[i].releaseNo.toString();
        var strpartNo= $scope.dataset[i].partNo.toString();
        var strstate= $scope.dataset[i].state.toString();
        var stroriginalQuantity= $scope.dataset[i].originalQuantity.toString();
        var strunitMeas= $scope.dataset[i].unitMeas.toString();
        var strqtyPurchaseUnit= $scope.dataset[i].qtyPurchaseUnit.toString();
        var strbuyUnitMeas= $scope.dataset[i].buyUnitMeas.toString();
        var strpurchaseCode= $scope.dataset[i].purchaseCode.toString();
        var strpurchaseCodeDescription= $scope.dataset[i].purchaseCodeDescription.toString();
        var strvendorPartNo= $scope.dataset[i].vendorPartNo.toString();
        var strvendoePartDescription= $scope.dataset[i].vendoePartDescription.toString();
        var strauthReq= $scope.dataset[i].authReq.toString();
        var strwantedReceiptDate= $scope.dataset[i].wantedReceiptDate.toString();
        var strrequisitionDate= $scope.dataset[i].requisitionDate.toString();
        var strlatestOrderDate= $scope.dataset[i].latestOrderDate.toString();
        var strstatus= $scope.dataset[i].status.toString();
        var strnoteText= $scope.dataset[i].noteText.toString();
        var strrequestType= $scope.dataset[i].requestType.toString();
        // var strpriceBase= $scope.dataset[i].priceBase.toString();
        var strpriceInclTaxCurr= $scope.dataset[i].priceInclTaxCurr.toString();
        var strcurrencyRate= $scope.dataset[i].currencyRate.toString();
        var strbuyUnitPrice= $scope.dataset[i].buyUnitPrice.toString();
        var straddituonalCostAmount= $scope.dataset[i].addituonalCostAmount.toString();
        var stradditionalCostAmountGross= $scope.dataset[i].additionalCostAmountGross.toString();
        var strnetAmountBase= $scope.dataset[i].netAmountBase.toString();
        var strgrossAmountBase= $scope.dataset[i].grossAmountBase.toString();
        var strgrossAmountCurr= $scope.dataset[i].grossAmountCurr.toString();
        var strpurchaseGroup= $scope.dataset[i].purchaseGroup.toString();
        var strpurchaseGroupDesc= $scope.dataset[i].purchaseGroupDesc.toString();
        // var strrequisitioner= $scope.dataset[i].requisitioner.toString();
        // var strrequisitionerName= $scope.dataset[i].requisitionerName.toString();
        // var strreceiver= $scope.dataset[i].receiver.toString();
        // var strorderCode= $scope.dataset[i].orderCode.toString();
        var strprogram= $scope.dataset[i].program.toString();
        // var strprogramdesc= $scope.dataset[i].programDesc.toString();
        var strprojectId= $scope.dataset[i].projectId.toString();
        var strprojectDesc= $scope.dataset[i].projectDesc.toString();
        var strconversionFac= $scope.dataset[i].conversionFac.toString();    
        if(
         strsupplierId.match(strSearchKeywords) ||
         strorderFor.match(strSearchKeywords) ||
         strreqNo.match(strSearchKeywords) ||
         strreleaseNo.match(strSearchKeywords) ||
         strpartNo.match(strSearchKeywords) ||
         strstate.match(strSearchKeywords) ||
         stroriginalQuantity.match(strSearchKeywords) ||
         strunitMeas.match(strSearchKeywords) ||
         strqtyPurchaseUnit.match(strSearchKeywords) ||
         strbuyUnitMeas.match(strSearchKeywords) ||
         strpurchaseCode.match(strSearchKeywords) ||
         strpurchaseCodeDescription.match(strSearchKeywords) ||
         strvendorPartNo.match(strSearchKeywords) ||
         strvendoePartDescription.match(strSearchKeywords) ||
         strauthReq.match(strSearchKeywords) ||
         strwantedReceiptDate.match(strSearchKeywords) ||
         strrequisitionDate.match(strSearchKeywords) ||
         strlatestOrderDate.match(strSearchKeywords) ||
         strstatus.match(strSearchKeywords) ||
         strnoteText.match(strSearchKeywords) ||
         strrequestType.match(strSearchKeywords) ||
         // strpriceBase.match(strSearchKeywords) ||
         strpriceInclTaxCurr.match(strSearchKeywords) ||
         strcurrencyRate.match(strSearchKeywords) ||
         strbuyUnitPrice.match(strSearchKeywords) ||
         straddituonalCostAmount.match(strSearchKeywords) ||
         stradditionalCostAmountGross.match(strSearchKeywords) ||
         strnetAmountBase.match(strSearchKeywords) ||
         strgrossAmountBase.match(strSearchKeywords) ||
         strgrossAmountCurr.match(strSearchKeywords) ||
         strpurchaseGroup.match(strSearchKeywords) ||
         strpurchaseGroupDesc.match(strSearchKeywords) ||
         // strrequisitioner.match(strSearchKeywords) ||
         // strrequisitionerName.match(strSearchKeywords) ||
         // strreceiver.match(strSearchKeywords) ||
         // strorderCode.match(strSearchKeywords) ||
         strprogram.match(strSearchKeywords) ||
         // strprogramdesc.match(strSearchKeywords) ||
         strprojectId.match(strSearchKeywords) ||
         strprojectDesc.match(strSearchKeywords) ||
         strconversionFac.match(strSearchKeywords)){
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
})
.directive('myCustomFilter', function() {
  return {
     // templateUrl: 'http://localhost/Khaga_SVN/Controllers/my-custom-filter.html'
    templateUrl: 'http://localhost/Khaga/SupplierPortal/Controllers/my-custom-filter.html'
  };
})

