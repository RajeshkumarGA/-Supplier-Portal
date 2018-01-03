app.controller('adminHomeController',
  function ($scope,$rootScope,sessionService,$http,$route,uiGridConstants,$templateCache,uiGridExporterService,uiGridExporterConstants){
  $rootScope.AdminloggedIn=sessionService.get('AdminLoggedIn');
  $rootScope.userName = sessionService.get('UserName'); 

  var access_token=sessionService.get('AccessToken');
  var token_type=sessionService.get('TokenType');
  //console.log('adminHomeController');
  $scope.dataset =[];
  $scope.ApiDone= false;
  var URL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/users';
  var Headers = token_type +' '+ access_token;
    $http({
    method: 'GET',
    url: URL,
    headers: {'Authorization': Headers},
  })
  .then(function(response){
    console.log(response);
    for (var i=0;i<response.data.length;i++){
      if(response.data[i].isActive==1)  status='Active';
      else if(response.data[i].isActive==0) status='New';
      else status ='InActive';
       var obj = {
        "index":i,
        "id":response.data[i].id,
        "User_Name":response.data[i].userName,
        "Full_Name":response.data[i].fullName,
        "First_Name":response.data[i].firstName,
        "Last_Name":response.data[i].lastName,
        "Email_ID":response.data[i].email,
        "Company":response.data[i].companyName,
        "Default_Comp_ID":response.data[i].defaultCompanyId,
        "Currency":response.data[i].currency,
        "Status":status,
        "isActive":response.data[i].isActive,
        "Address":response.data[i].address,
        "isFISEnabled":response.data[i].isFISEnabled,
        "isPRSEnabled":response.data[i].isPRSEnabled,
        "isSubmissionNonPOInvoiceEnabled":response.data[i].isSubmissionNonPOInvoiceEnabled,
        "Phone":response.data[i].phoneNumber,
        "ifsSupplierNum":response.data[i].ifsSupplierNum,
        'roles':response.data[i].roles
      }
      $scope.dataset.push(obj);
    }
    $scope.ApiDone= true;
  });
  $scope.gridOptions = {
    enableFiltering:false,
    enableColumnMenus: false,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    paginationPageSizes: [10,20,75],
    paginationPageSize: 10,
    rowHeight:40,
    columnDefs: [
        { field: 'User_Name',   minWidth:170, width:170, enableColumnResizing: false, pinnedLeft:false,displayName: "User Name", headerCellClass: $scope.highlightFilteredHeader,cellTemplate: 
        '<div class="ui-grid-cell-contents">{{COL_FIELD}}<span ng-if="row.entity.Status === \'New\'" class="glyphicon glyphicon-log-in"  data-toggle="modal" data-target="#ActivateUser" style="float:right;" ng-click="grid.appScope.ActiveUser(row.entity.index)"></span><span ng-if="row.entity.Status === \'InActive\' " class="glyphicon glyphicon-download"  data-toggle="modal" data-target="#ActivateUseragain" style="float:right;" ng-click="grid.appScope.ActiveUseragain(row.entity.index)"></span><span ng-if="row.entity.Status === \'Active\'" class="glyphicon glyphicon-pencil"  data-toggle="modal" data-target="#EditUser" style="float:right; " ng-click="grid.appScope.EditUser(row.entity.index)"></span></div>'},
        { field: 'Full_Name',   minWidth:160, width:160, enableColumnResizing: false, pinnedLeft:false,displayName: "Full Name", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Email_ID',   minWidth:170, width:170, enableColumnResizing: false, pinnedLeft:false,displayName: "Email ID", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Company',   minWidth:150, width:160, enableColumnResizing: false, pinnedLeft:false,displayName: "Company", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Default_Comp_ID',   minWidth:160, width:160, enableColumnResizing: false, pinnedLeft:false,displayName: "Default Comp ID", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Currency',   minWidth:150, width:160, enableColumnResizing: false, pinnedLeft:false,displayName: "Currency", headerCellClass: $scope.highlightFilteredHeader,},
        { field: 'Status',   minWidth:160, width:160, enableColumnResizing: false, pinnedLeft:false,displayName: "Status", headerCellClass: $scope.highlightFilteredHeader,enableRowHashing:false,sort:{direction:'desc'}},
        ],
         rowStyle: function(row){
                if(row.entity.Status=='InActive'){
                  return 'InActive';
                }else if(row.entity.Status=='Active'){
                  return 'Active';
                }
                else if(row.entity.Status=='New'){
                  return 'New';
                }
              },
            rowTemplate : `<div ng-class="grid.options.rowStyle(row)"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + '-' + col.uid + '-cell'" 
              ng-class="{ 'ui-grid-row-header-cell': col.isRowHeader}" class="ui-grid-cell"
              role="{{col.isRowHeader ? 'rowheader' : 'gridcell'}}" ui-grid-cell>
            </div></div>`,

      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };


    $scope.search=function(){

      if($scope.searchKeywords){
        var strSearchKeywords=$scope.searchKeywords.toString();
        $scope.workingDatabase=[];
        for(var i=0;i<$scope.dataset.length;i++){
               
                var strUser_Name = $scope.dataset[i].User_Name.toString();
                var strFull_Name = $scope.dataset[i].Full_Name.toString();
                var strEmail_ID = $scope.dataset[i].Email_ID.toString();
                // alert(strCompany);
                // var strCompany = $scope.dataset[i].Company.toString();
                // var strDefault_Comp_ID = $scope.dataset[i].Default_Comp_ID.toString();
                // var strCurrency = $scope.dataset[i].Currency.toString();
                var strStatus = $scope.dataset[i].Status.toString(); 

            
          if(
                strUser_Name.match(strSearchKeywords) ||
                strFull_Name.match(strSearchKeywords) ||
                strEmail_ID.match(strSearchKeywords) ||
                // strCompany.match(strSearchKeywords) ||
                // strDefault_Comp_ID.match(strSearchKeywords) ||
                // strCurrency.match(strSearchKeywords) ||
                strStatus.match(strSearchKeywords))

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



    $scope.filter = function(getValue){
      $scope.workingDataset=[];
      if(getValue==0){
        $scope.workingDataset=$scope.dataset;
        angular.element( document.querySelector('#POSTATUS_0')).addClass('active');
        angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
        angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
        angular.element( document.querySelector('#POSTATUS_3')).removeClass('active');
      }
      if(getValue==1){
        for(var i=0;i<$scope.dataset.length;i++){
          if($scope.dataset[i].Status=='Active'){
            $scope.workingDataset.push($scope.dataset[i]);
            angular.element( document.querySelector('#POSTATUS_0')).removeClass('active');
            angular.element( document.querySelector('#POSTATUS_1')).addClass('active');
            angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
            angular.element( document.querySelector('#POSTATUS_3')).removeClass('active');
          }
        }
      }
      if(getValue==2){
        for(var i=0;i<$scope.dataset.length;i++){
          if($scope.dataset[i].Status=='InActive'){
            $scope.workingDataset.push($scope.dataset[i]);
            angular.element( document.querySelector('#POSTATUS_0')).removeClass('active');
            angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
            angular.element( document.querySelector('#POSTATUS_2')).addClass('active');
            angular.element( document.querySelector('#POSTATUS_3')).removeClass('active');
          }
        }
      }
      if(getValue==3){
        for(var i=0;i<$scope.dataset.length;i++){
          if($scope.dataset[i].Status=='New'){
            $scope.workingDataset.push($scope.dataset[i]);
            angular.element( document.querySelector('#POSTATUS_0')).removeClass('active');
            angular.element( document.querySelector('#POSTATUS_1')).removeClass('active');
            angular.element( document.querySelector('#POSTATUS_2')).removeClass('active');
            angular.element( document.querySelector('#POSTATUS_3')).addClass('active');
          }
        }
      }
      data($scope.workingDataset);
    }

    $scope.ActiveUser= function (getIndex){
      $scope.activeModalUserId=getIndex;
      $scope.UserName = $scope.dataset[getIndex].User_Name;
      $scope.FullName = $scope.dataset[getIndex].Full_Name;
       $scope.FirstName = $scope.dataset[getIndex].First_Name;
      $scope.LastName = $scope.dataset[getIndex].Last_Name;
      $scope.Email = $scope.dataset[getIndex].Email_ID;
      $scope.Address = $scope.dataset[getIndex].Address;
      $scope.isFISEnabled = $scope.dataset[getIndex].isFISEnabled;
      $scope.isPRSEnabled = $scope.dataset[getIndex].isPRSEnabled;
      $scope.isSubmissionNonPOInvoiceEnabled = $scope.dataset[getIndex].isSubmissionNonPOInvoiceEnabled;
      $scope.Phone = $scope.dataset[getIndex].Phone;
      $scope.CompanyName =$scope.dataset[getIndex].Company;
      $scope.Currency =$scope.dataset[getIndex].Currency;
      $scope.DefaultCompanyId = $scope.dataset[getIndex].Default_Comp_ID;
      $scope.ifsSupplierNum=$scope.dataset[getIndex].ifsSupplierNum;
      if($scope.dataset[getIndex].roles.indexOf('Admin') !== -1){
        $scope.role='Admin';
      }
      else $scope.role='User';

      if($scope.dataset[getIndex].isActive==1){
        var myEl = angular.element( document.querySelector( '#ActiveactiveButton' ) );
        myEl.addClass('btn-primary');
      }
      else{
        var myEl = angular.element( document.querySelector( '#ActiveinactiveButton' ) );
        myEl.addClass('btn-primary');
      }
    }
    $scope.ActiveUseragain= function (getIndex){
      $scope.againactiveModalUserId=getIndex;
      $scope.againUserName = $scope.dataset[getIndex].User_Name;
      $scope.againFullName = $scope.dataset[getIndex].Full_Name;
       $scope.againFirstName = $scope.dataset[getIndex].First_Name;
      $scope.againLastName = $scope.dataset[getIndex].Last_Name;
      $scope.againEmail = $scope.dataset[getIndex].Email_ID;
      $scope.againAddress = $scope.dataset[getIndex].Address;
      $scope.againisFISEnabled = $scope.dataset[getIndex].isFISEnabled;
      $scope.againisPRSEnabled = $scope.dataset[getIndex].isPRSEnabled;
      $scope.againisSubmissionNonPOInvoiceEnabled = $scope.dataset[getIndex].isSubmissionNonPOInvoiceEnabled;
      $scope.againPhone = $scope.dataset[getIndex].Phone;
      $scope.againCompanyName =$scope.dataset[getIndex].Company;
      $scope.againCurrency =$scope.dataset[getIndex].Currency;
      $scope.againDefaultCompanyId = $scope.dataset[getIndex].Default_Comp_ID;
      $scope.againifsSupplierNum=$scope.dataset[getIndex].ifsSupplierNum;
      if($scope.dataset[getIndex].roles.indexOf('Admin') !== -1){
        $scope.againrole='Admin';
      }
      else $scope.againrole='User';

      if($scope.dataset[getIndex].isActive==1){
        var myEl = angular.element( document.querySelector( '#againActiveactiveButton' ) );
        myEl.addClass('btn-primary');
      }
      else{
        var myEl = angular.element( document.querySelector( '#againActiveinactiveButton' ) );
        myEl.addClass('btn-primary');
      }
    }
    $scope.EditUser= function (getIndex){
      $scope.editModalUserId=getIndex;
      $scope.EditUserName = $scope.dataset[getIndex].User_Name;
      $scope.EditFullName = $scope.dataset[getIndex].Full_Name;
      $scope.EditFirstName = $scope.dataset[getIndex].First_Name;
      $scope.EditLastName = $scope.dataset[getIndex].Last_Name;
      $scope.EditEmail = $scope.dataset[getIndex].Email_ID;
      $scope.EditAddress = $scope.dataset[getIndex].Address;
      $scope.EditisFISEnabled = $scope.dataset[getIndex].isFISEnabled;
      $scope.EditisPRSEnabled = $scope.dataset[getIndex].isPRSEnabled;
      $scope.EditisSubmissionNonPOInvoiceEnabled = $scope.dataset[getIndex].isSubmissionNonPOInvoiceEnabled;
      $scope.EditPhone = $scope.dataset[getIndex].Phone;
      $scope.EditCompanyName =$scope.dataset[getIndex].Company;
      $scope.EditCurrency =$scope.dataset[getIndex].Currency;
      $scope.EditDefaultCompanyId = $scope.dataset[getIndex].Default_Comp_ID;
      $scope.EditifsSupplierNum=$scope.dataset[getIndex].ifsSupplierNum;
      if($scope.dataset[getIndex].roles.indexOf('Admin') !== -1){
        $scope.Editrole='Admin';
      }
      else $scope.Editrole='User';
      if($scope.dataset[getIndex].isActive==1){
        var myEl = angular.element( document.querySelector( '#EditactiveButton' ) );
        myEl.addClass('btn-primary');
        var myE2 = angular.element( document.querySelector( '#EditinactiveButton' ) );
        myE2.removeClass('btn-primary');
      }
      else{
        var myE2 = angular.element( document.querySelector( '#EditinactiveButton' ) );
        myE2.addClass('btn-primary');
        var myEl = angular.element( document.querySelector( '#EditactiveButton' ) );
        myEl.removeClass('btn-primary');
      }
    }

    $scope.StatusUpdate=function (getElement,value){
      $scope.updatedStatus=value;
      if(value==1){
        var myEl = angular.element( document.querySelector( '#'+getElement+'activeButton' ) );
        myEl.addClass('btn-primary');
        var myE2 = angular.element( document.querySelector( '#'+getElement+'inactiveButton' ) );
        myE2.removeClass('btn-primary');
      }
      else{
        var myEl = angular.element( document.querySelector( '#'+getElement+'inactiveButton' ) );
        myEl.addClass('btn-primary');
        var myE2 = angular.element( document.querySelector( '#'+getElement+'activeButton' ) );
        myE2.removeClass('btn-primary');
      }
    }
    $scope.UpdateStatus = function(getIndex){
      if($scope.role=='undefined'){
        alert('Please Assign User Role');
      }
      else{
        var roleURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/assignroles';
        console.log(roleURL);
        $http({
          method: 'PUT',
          url: roleURL,
          headers: {'Authorization': Headers,'Content-Type':'application/json'},
          data: {"id":$scope.dataset[getIndex].id,"role" : $scope.role}
           })
      .then(function(response){
        var URL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/UpdateUser';
      var Headers = token_type +' '+ access_token;
        $http({
        method: 'POST',
        url: URL,
        headers: {'Authorization': Headers,'Content-Type':'application/json'},
        data: {"Email" : $scope.dataset[getIndex].Email_ID,
        "UserName" : $scope.dataset[getIndex].User_Name,
        "FirstName":$scope.dataset[getIndex].First_Name,
        "LastName":$scope.dataset[getIndex].Last_Name,
        "CompanyName":$scope.dataset[getIndex].Company,
        "PhoneNumber":$scope.dataset[getIndex].Phone,
        "DefaultCompanyId":$scope.dataset[getIndex].Default_Comp_ID,
        "IFSSupplierNum":$scope.ifsSupplierNum,
        "Currency":$scope.dataset[getIndex].Currency,
        "isFISEnabled":$scope.isFISEnabled,
        "isPRSEnabled":$scope.isPRSEnabled,
        "isSubmissionNonPOInvoiceEnabled":$scope.isSubmissionNonPOInvoiceEnabled,
        "isActive":$scope.updatedStatus,
      }
      })
      .then(function(response){
        if(response.status==200){
          $scope.dataset[getIndex].isActive=$scope.updatedStatus;
          $route.reload();
          
        }
      })

      });
    }
    }
     $scope.UpdateStatusagain = function(getIndex){
      if($scope.againrole=='undefined'){
        alert('Please Assign User Role');
      }
      else{
        var roleURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/assignroles';
        console.log(roleURL);
        $http({
          method: 'PUT',
          url: roleURL,
          headers: {'Authorization': Headers,'Content-Type':'application/json'},
          data: {"id":$scope.dataset[getIndex].id,"role" : $scope.againrole}
           })
      .then(function(response){
        var URL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/UpdateUser';
      var Headers = token_type +' '+ access_token;
        $http({
        method: 'POST',
        url: URL,
        headers: {'Authorization': Headers,'Content-Type':'application/json'},
        data: {"Email" : $scope.dataset[getIndex].Email_ID,
        "UserName" : $scope.dataset[getIndex].User_Name,
        "FirstName":$scope.dataset[getIndex].First_Name,
        "LastName":$scope.dataset[getIndex].Last_Name,
        "CompanyName":$scope.dataset[getIndex].Company,
        "PhoneNumber":$scope.dataset[getIndex].Phone,
        "DefaultCompanyId":$scope.dataset[getIndex].Default_Comp_ID,
        "IFSSupplierNum":$scope.againifsSupplierNum,
        "Currency":$scope.dataset[getIndex].Currency,
        "isFISEnabled":$scope.againisFISEnabled,
        "isPRSEnabled":$scope.againisPRSEnabled,
        "isSubmissionNonPOInvoiceEnabled":$scope.againisSubmissionNonPOInvoiceEnabled,
        "isActive":$scope.updatedStatus,
      }
      })
      .then(function(response){
        if(response.status==200){
          $scope.dataset[getIndex].isActive=$scope.updatedStatus;
          $route.reload();
          
        }
      })

      });
    }
    }
      $scope.EditUserFunction = function(getIndex){
        if(document.getElementById("EditactiveButton").getAttribute("class")=='btn-primary'){
          var Status=1;
        }
        else{
          Status=2;
        }
        var roleURL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/assignroles';
        $http({
          method: 'PUT',
          url: roleURL,
          headers: {'Authorization': Headers,'Content-Type':'application/json'},
          data: {"id":$scope.dataset[getIndex].id,"role" : $scope.Editrole}
           })
      .then(function(response){
        if(response.status==200){
           var URL = 'http://khagawebbackendwebapi20171031062850.azurewebsites.net/api/accounts/UpdateUser';
      var Headers = token_type +' '+ access_token;
        $http({
        method: 'POST',
        url: URL,
        headers: {'Authorization': Headers,'Content-Type':'application/json'},
        data: {
        "Email" : $scope.EditEmail,
        "UserName" : $scope.EditUserName,
        "FirstName":$scope.EditFirstName,
        "LastName":$scope.EditLastName,
        "CompanyName":$scope.EditCompany,
        "PhoneNumber":$scope.EditPhone,
        "DefaultCompanyId":$scope.EditDefaultCompanyId,
        "IFSSupplierNum":$scope.EditifsSupplierNum,
        "Currency":$scope.EditCurrency,
        "isFISEnabled":$scope.EditisFISEnabled,
         "isPRSEnabled":$scope.EditisPRSEnabled,
          "isSubmissionNonPOInvoiceEnabled":$scope.EditisSubmissionNonPOInvoiceEnabled,
        "IsActive":Status}
      })
      .then(function(response){
        if(response.status==200){
          console.log(response);
          $scope.dataset[getIndex].isActive=Status;
          data($scope.dataset);
         $route.reload();
        }
      })

        }
      });
     
    }

  data($scope.dataset);
  function data(data) {
    $scope.gridOptions.data = data;
    _.forEach($scope.gridOptions.data, function (val) {
    });
    _.forEach($scope.gridOptions.data, function (val) {
    });
  }	
});