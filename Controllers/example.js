app.controller('supplierController',['$rootScope','$scope',function($rootScope,$scope){
	//console.log('supplierController');
	//console.log($rootScope.loggedIn);
	$scope.showHideColumn = false;
	$scope.showPOID=true;
	$scope.showPOSTATUS=true;
	$scope.showFROMDATE=true;
	$scope.showENDDATE=true;
	$scope.selectedRow=5;
	$scope.assendingPOID=true;
	$scope.Operators=['AND','OR'];
	console.log($rootScope.userName);
	$scope.columnArray = [
		{'id':0,title:'POID',value:false},
		{'id':1,title:'POSTATUS',value:false},
		{'id':2,title:'FROMDATE',value:false},
		{'id':3,title:'ENDDATE',value:false},
		{'id':4,title:'GROSS AMOUNT',value:false},
		{'id':5,title:'NET AMOUNT',value:false},
		{'id':6,title:'INVOICE STATUS',value:false},
		{'id':7,title:'PAYMENT',value:false},
		{'id':8,title:'PAYMENT',value:false},

	];
	$scope.workingDataset=[];
	$scope.Sortby = '';
	$scope.reverse=false;
	$scope.filterbypostatus ='';
	$scope.filterbyfromdate = '';
	$scope.filterbyenddate='';
	$scope.dataset =[
	{'POID' : 0011 ,'POSTATUS': 'paid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 0012 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-14'},
	{'POID' : 0013 ,'POSTATUS': 'current','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 0014 ,'POSTATUS': 'paid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 0015 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 0016 ,'POSTATUS': 'current','FROMDATE':'2017-03-04','ENDDATE':'2017-05-14'},
	{'POID' : 0017 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 0018 ,'POSTATUS': 'paid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 0019 ,'POSTATUS': 'paid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-14'},
	{'POID' : 0020 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 0021 ,'POSTATUS': 'current','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 0022 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 0023 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 0024 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 0025 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 00111 ,'POSTATUS': 'paid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 00112 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-14'},
	{'POID' : 00113 ,'POSTATUS': 'current','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 00114 ,'POSTATUS': 'paid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 00115 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 00116 ,'POSTATUS': 'current','FROMDATE':'2017-03-04','ENDDATE':'2017-05-14'},
	{'POID' : 00117 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 00118 ,'POSTATUS': 'paid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 00119 ,'POSTATUS': 'paid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-14'},
	{'POID' : 00210 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 00211 ,'POSTATUS': 'current','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 00212 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 00213 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 00214 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 00215 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 001112 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-14'},
	{'POID' : 001113 ,'POSTATUS': 'current','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 001114 ,'POSTATUS': 'paid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 001115 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 001116 ,'POSTATUS': 'current','FROMDATE':'2017-03-04','ENDDATE':'2017-05-14'},
	{'POID' : 001117 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 001118 ,'POSTATUS': 'paid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 001119 ,'POSTATUS': 'paid','FROMDATE':'2017-03-04','ENDDATE':'2017-05-14'},
	{'POID' : 002110 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 002111 ,'POSTATUS': 'current','FROMDATE':'2017-03-04','ENDDATE':'2017-05-08'},
	{'POID' : 002112 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 002113 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 002114 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'},
	{'POID' : 002115 ,'POSTATUS': 'unpaid','FROMDATE':'2017-03-06','ENDDATE':'2017-05-08'}];
	$scope.workingDataset=$scope.dataset;
	$scope.rowArray=[5,10];
	$scope.rowCount=10;
	$scope.currentPage=0;
	$scope.pagesArray=[];
	$scope.nextPageClick =0;
	$scope.prePageClick=0;
	$scope.showPrePage=false;
	$scope.showNextPage=true;
	$scope.consolidateData = $scope.workingDataset.slice(0,$scope.rowCount);
	console.log($scope.consolidateData);
	$scope.changeRow=function(getValue){
		$scope.rowCount=parseInt(getValue);
		$scope.totalPageCount();
		$scope.currentPage=0;
		$scope.pagination($scope.currentPage);
	}
	$scope.showPageCountNext =function(){
		$scope.prePageClick++;
		$scope.nextPageClick++;
		$scope.showPrePage=true;
		
		$scope.pagesArray=[];
		var getValue=$scope.nextPageClick*5;
		if(getValue==$scope.totalPagesArray.length-9) $scope.showNextPage=false;
		$scope.pagesArray=$scope.totalPagesArray.slice(getValue,getValue+5);
		console.log($scope.pagesArray);
	}
	$scope.showPageCountPre =function(){
		$scope.prePageClick--;
		$scope.nextPageClick--;
		$scope.showNextPage=true;
		if($scope.prePageClick==0){
			$scope.showPrePage=false;
		}
		$scope.pagesArray=[];
		var getValue=$scope.prePageClick*5;
		$scope.pagesArray=$scope.totalPagesArray.slice(getValue,getValue+5);
	}
	$scope.totalPageCount=function(){
		$scope.totalPagesArray=[]; 
		var workingDatasetLength= parseInt($scope.workingDataset.length);
		var count=parseInt($scope.rowCount);
		console.log(workingDatasetLength);
		console.log(count);
		$scope.pagesCount = workingDatasetLength/count;
		console.log($scope.pagesCount);
		for(var i =0;i<$scope.pagesCount;i++){
			$scope.totalPagesArray[i]=i;
		}
		if($scope.pagesCount<=5) $scope.showNextPage=false;
		else $scope.showNextPage=true;
		$scope.pagesArray=$scope.totalPagesArray.slice(0,5);
	}
	$scope.totalPageCount();
	$scope.pagination=function(getValue){
		$scope.currentPage=getValue;
		$scope.consolidateData=[];
		startIndex = $scope.rowCount*getValue;
		lastIndex = parseInt(startIndex)+$scope.rowCount;
		$scope.consolidateData = $scope.workingDataset.slice(startIndex,lastIndex);
		console.log($scope.consolidateData);
	}
	$scope.showHideColumnDiv = function(){
		if(!$scope.showHideColumn)
			$scope.showHideColumn = true;
		else $scope.showHideColumn = false;
	}
	$scope.filter=function(getElement){
		var myE0 = angular.element( document.querySelector( '.active' ) );
		myE0.removeClass('active');
		var myEl = angular.element( document.querySelector( '#POSTATUS_'+getElement ) );
		myEl.addClass('active');
			$scope.workingDataset=[];
			switch(getElement){
				case 0 :
				$scope.workingDataset=$scope.dataset;
					$scope.totalPageCount();
					$scope.consolidateData=[];
					$scope.consolidateData = $scope.workingDataset.slice(0,$scope.rowCount);
					console.log($scope.consolidateData);
					break;
				case 1 :
				for(var i=0;i<$scope.dataset.length;i++){
					if($scope.dataset[i].POSTATUS=='paid'){
						$scope.workingDataset.push($scope.dataset[i]);
					}
				}
				$scope.totalPageCount();
				$scope.consolidateData=[];
				$scope.consolidateData = $scope.workingDataset.slice(0,$scope.rowCount);
				console.log($scope.consolidateData);
				break;
				case 2 :
				for(var i=0;i<$scope.dataset.length;i++){
					if($scope.dataset[i].POSTATUS=='unpaid'){
						$scope.workingDataset.push($scope.dataset[i]);
					}
				}
				$scope.totalPageCount();
				$scope.consolidateData=[];
				$scope.consolidateData = $scope.workingDataset.slice(0,$scope.rowCount);
				console.log($scope.consolidateData);
				break;
				case 3 :
				for(var i=0;i<$scope.dataset.length;i++){
					if($scope.dataset[i].POSTATUS=='current'){
						$scope.workingDataset.push($scope.dataset[i]);
					}
				}
				$scope.totalPageCount();
				$scope.consolidateData=[];
				$scope.consolidateData = $scope.workingDataset.slice(0,$scope.rowCount);
				console.log($scope.consolidateData);
					break;
			}	
	}
	$scope.sortBy = function(getElement){
		switch(getElement){
			case 1:
			$scope.Sortby ='POID';
			if($scope.reverse){ 
				$scope.reverse=false;
				$scope.assendingPOID=true;
			}
			else{
			 $scope.reverse = true;
			 $scope.assendingPOID=false;
			}
			console.log($scope.reverse);
			break; 
			case 2:
			$scope.Sortby ='POSTATUS';
			if($scope.reverse) $scope.reverse=false;
			else $scope.reverse = true;
			break; 
			case 3:
			$scope.Sortby ='FROMDATE';
			if($scope.reverse) $scope.reverse=false;
			else $scope.reverse = true;
			break; 
			case 4:
			$scope.Sortby ='ENDDATE';
			if($scope.reverse) $scope.reverse=false;
			else $scope.reverse = true;
			break; 
		}

	}
	$scope.selectdate=function(){
		$scope.filterbyfromdate = $scope.fromdate;
		$scope.filterbyenddate=$scope.enddate;
	}
	
		
		
	$scope.doFiltering = function(){
		for(var i=0;i<$scope.columnArray.length;i++){
			if($scope.columnArray[i].value){
				switch (i){
					case 0 :
					$scope.showPOID = false;
					break;
					case 1 :
					$scope.showPOSTATUS = false;
					break;
					case 2 :
					$scope.showFROMDATE = false;
					break;
					case 3 :
					$scope.showENDDATE = false;
					break;
				}
			}
			else{
				switch (i){
					case 0 :
					$scope.showPOID = true;
					break;
					case 1 :
					$scope.showPOSTATUS = true;
					break;
					case 2 :
					$scope.showFROMDATE = true;
					break;
					case 3 :
					$scope.showENDDATE = true;
					break;
				}
				$scope.showHideColumn=false;
			}
		}
		
	}
	$scope.searchInColumn=function(getvalue){
		
		$scope.workingDataset=[];
		if($scope.searchPOID || $scope.searchPOSTATUS || $scope.searchFROMDATE || $scope.searchENDDATE){
			if($scope.searchPOID){
				if($scope.searchPOSTATUS){
					if($scope.searchFROMDATE){
						if($scope.searchENDDATE){ 
							for(var i=0;i<$scope.dataset.length;i++){
								if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS && $scope.dataset[i].FROMDATE==$scope.searchFROMDATE && $scope.dataset[i].ENDDATE==$scope.searchENDDATE)
								$scope.workingDataset.push($scope.dataset[i]);
							}
						}
						else{
							for(var i=0;i<$scope.dataset.length;i++){
								if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS && $scope.dataset[i].FROMDATE==$scope.searchFROMDATE)
								$scope.workingDataset.push($scope.dataset[i]);
							}
						}
					}
					for(var i=0;i<$scope.dataset.length;i++){
						if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS)
						$scope.workingDataset.push($scope.dataset[i]);
					}
				}
				else{
					for(var i=0;i<$scope.dataset.length;i++){
						var str = $scope.dataset[i].POID.toString(); 
						var searchingEle = $scope.searchPOID.toString();
						if(str.match(searchingEle)){
							$scope.workingDataset.push($scope.dataset[i]);
						}
					}
				}
			}
			else{
				if($scope.searchPOSTATUS){
					if($scope.searchFROMDATE){
						if($scope.searchENDDATE){ 
							for(var i=0;i<$scope.dataset.length;i++){
								if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS && $scope.dataset[i].FROMDATE==$scope.searchFROMDATE && $scope.dataset[i].ENDDATE==$scope.searchENDDATE)
								$scope.workingDataset.push($scope.dataset[i]);
							}
						}
						else{
							for(var i=0;i<$scope.dataset.length;i++){
								if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS && $scope.dataset[i].FROMDATE==$scope.searchFROMDATE)
								$scope.workingDataset.push($scope.dataset[i]);
							}
						}
					}
					for(var i=0;i<$scope.dataset.length;i++){
						if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS)
						$scope.workingDataset.push($scope.dataset[i]);
					}
				}
				else{
					if($scope.searchFROMDATE){
						if($scope.searchENDDATE){ 
							for(var i=0;i<$scope.dataset.length;i++){
								if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS && $scope.dataset[i].FROMDATE==$scope.searchFROMDATE && $scope.dataset[i].ENDDATE==$scope.searchENDDATE)
								$scope.workingDataset.push($scope.dataset[i]);
							}
						}
						else{
							for(var i=0;i<$scope.dataset.length;i++){
								if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS && $scope.dataset[i].FROMDATE==$scope.searchFROMDATE)
								$scope.workingDataset.push($scope.dataset[i]);
							}
						}
					}
					else{
						if($scope.searchENDDATE){ 
							for(var i=0;i<$scope.dataset.length;i++){
								if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS && $scope.dataset[i].FROMDATE==$scope.searchFROMDATE && $scope.dataset[i].ENDDATE==$scope.searchENDDATE)
								$scope.workingDataset.push($scope.dataset[i]);
							}
						}
						else{
							for(var i=0;i<$scope.dataset.length;i++){
								if($scope.dataset[i].POID==$scope.searchPOID && $scope.dataset[i].POSTATUS==$scope.searchPOSTATUS && $scope.dataset[i].FROMDATE==$scope.searchFROMDATE)
								$scope.workingDataset.push($scope.dataset[i]);
							}
						}
					}
				}
			}
			$scope.totalPageCount();
			$scope.consolidateData=[];
			$scope.consolidateData = $scope.workingDataset.slice(0,$scope.rowCount);
			console.log($scope.consolidateData);
		}
		else{
			$scope.consolidateData=[];
			$scope.consolidateData=$scope.dataset;
		}
	}
	$scope.search=function(){
		$scope.searchKeyword = $scope.searchKeywords;
	}
}]);