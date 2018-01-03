app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/home.html"
    })
    .when("/dd", {
        templateUrl : "index.html"
    })
    .when("/Signup",{
         templateUrl : "views/signup.html"
    })
     .when("/PurchaseOrder",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    // alert($rootScope.UserloggedIn);
                    $location.path("/");
                }
            }
         
        },
        templateUrl : "views/PurchaseOrder.html"
    })
     .when("/PurchaseOrderLine",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    // alert($rootScope.UserloggedIn);
                    $location.path("/");
                }
            }
         
        },
        templateUrl : "views/PurchaseOrderLine.html"
    })
     .when("/Dashboard",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl : "views/MyDashboard.html"
     })
     .when("/PurchaseRequisitions",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl : "views/PurchaseRequisitionsMain.html"
     })
     .when("/SupplierShipment",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/SupplierShipment.html"
     })
     .when("/Payments",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/Payments.html"
     })
     .when("/AutomaticPayment",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/AutomaticPayment.html"
     })
        .when("/CheckPayment",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/checkPayment.html"
     })
      .when("/SupplierInvoice",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/SupplierInvoice.html"
     })
       .when("/NonPOInvoices",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/NonPOInvoices.html"
     })
      .when("/CreateInvoice",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/CreateInvoice.html"
     })
       .when("/CreateNonPoInvoice",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/CreateNonPoInvoice.html"
     })
      .when("/SupplierInvoiceDetails",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/SupplierInvoiceDetails.html"
     })
      .when("/NonPoInvoiceDetails",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/NonPoInvoiceDetails.html"
     })
      .when("/ViewMyprofile",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/ViewMyprofile.html"
     })
       .when("/Settings",{
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('UserLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl :"views/Settings.html"
     })
       .when("/AdminHome", {
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('AdminLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl : "views/adminHome.html"
    })
    .when("/AppConfiguration", {
         resolve:{
            "check":function($location,$rootScope,sessionService)
            {
                if (!sessionService.get('AdminLoggedIn')) {
                    $location.path("/");
                }
            }
         
        },
        templateUrl : "views/AppConfiguration.html"
    })
    /*$locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');*/
});
