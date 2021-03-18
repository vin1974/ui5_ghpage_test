sap.ui.define([
  "vin/prj/routingTest/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("vin.prj.routingTest.controller.Employee", {
    onInit: function(){
      var oRouter = this.getRouter();

      oRouter.getRoute('employee').attachMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function(oEvent){
      var oArgs, oView;

      oArgs = oEvent.getParameter('arguments');
      oView = this.getView();

      oView.bindElement({
        path: "/Employees(" + oArgs.employeeId + ")",
        model: "north",
        events: {
          change: this._onBindingChange.bind(this),
          dataRequested: function(oEvent){
            oView.setBusy(true);
          },
          dataReceived: function(oEvent){
            oView.setBusy(false);
          }
        }
      });
    },

    _onBindingChange: function(oEvent){
      //no data for the binding
      if (!this.getView().getBindingContext("north")){
        this.getRouter().getTargets().display("notFound");
      }
    },

    onShowResume: function(oEvent){
      var oCtx = //this.getView().getElementBinding().getBoundContext("north");
                  this.getView().getBindingContext("north");
      this.getRouter().navTo("employeeResume", {
        employeeId: oCtx.getProperty("EmployeeID")
      });
    }
  });
});
