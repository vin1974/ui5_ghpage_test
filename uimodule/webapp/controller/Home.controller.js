sap.ui.define([
    "vin/prj/routingTest/controller/BaseController"
], function(BaseController){
    "use strict";

    return BaseController.extend("vin.prj.routingTest.controller.Home", {
        onNotFound: function(){
            this.getRouter()
                .getTargets()
                .display('notFound', {
                            fromTarget: "appHome"
                        });
        },

        onNavToEmployee: function(){
            this.getRouter().navTo("employeeList");
        }
    });
});