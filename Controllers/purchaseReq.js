app.controller('purchaseReq',['$scope',function($scope){
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


}])