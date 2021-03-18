sap.ui.define([
  "vin/prj/routingTest/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("vin.prj.routingTest.controller.EmployeeList", {
    onListItemPressed: function(oEvent){
      var oItem, oCtx;
      //test
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext("north");

			this.getRouter().navTo("employee",{
				employeeId : oCtx.getProperty("EmployeeID")
			});

    }
  });
});
