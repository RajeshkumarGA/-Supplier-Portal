app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller: 'homeLoginController'
    })
    .when("/Signup",{
         templateUrl : "views/signup.html",
        controller: 'signupController'
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
        templateUrl : "views/PurchaseOrder.html",
        controller: 'purchaseOrderController'
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
        templateUrl : "views/PurchaseOrderLine.html",
        controller: 'purchaseOrderLineController'
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
        templateUrl : "views/MyDashboard.html",
        controller: 'MyDashboardController'
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
        templateUrl : "views/PurchaseRequisitionsMain.html",
        controller: 'PurchaseRequisitions'
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
        templateUrl :"views/SupplierShipment.html",
        controller: 'SupplierShipmentController'
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
        templateUrl :"views/Payments.html",
        controller: 'PaymentsController'
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
        templateUrl :"views/AutomaticPayment.html",
        controller: 'AutomaticPaymentController'
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
        templateUrl :"views/checkPayment.html",
        controller: 'checkPaymentController'
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
        templateUrl :"views/SupplierInvoice.html",
        controller: 'SupplierInvoiceController'
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
        templateUrl :"views/CreateInvoice.html",
        controller: 'CreateInvoiceController'
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
        templateUrl :"views/SupplierInvoiceDetails.html",
        controller: 'SupplierInvoiceDetailsController'
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
        templateUrl :"views/ViewMyprofile.html",
        controller: 'ViewMyprofileController'
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
        templateUrl :"views/Settings.html",
        controller: 'SettingsController'
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
        templateUrl : "views/adminHome.html",
        controller: 'adminHomeController'
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
        templateUrl : "views/AppConfiguration.html",
        controller: 'AppConfigurationController'
    })
     //  .when("/PurchaseOrder",{
     //    templateUrl :"views/PurchaseOrder.html",
     //    controller: 'PurchaseOrderController'
     // })
});
