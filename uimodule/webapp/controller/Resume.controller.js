sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "vin/prj/routingTest/controller/BaseController"
], function(JSONModel, Controller) {
  "use strict";

  var _aValidTabKeys = ['Info', 'Projects', 'Hobbies', 'Skills'];

  return Controller.extend("vin.prj.routingTest.controller.Resume", {
    onInit: function(){
      // this._oModel = JSONModel();
      this.getView().setModel(new JSONModel(), "view");

      var oRouter = this.getRouter();
      oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);

    },

    _onRouteMatched: function(oEvent){
      var oArgs, oView, oQuery;

      oView = this.getView();
      oArgs = oEvent.getParameter('arguments');

      oView.bindElement({
        path: "/Employees(" + oArgs.employeeId + ")",
        model: "north",
        parameters: {
          expand: "Orders"
        },
        events: {
          change: this._onBindingChange.bind(this),
          dataRequested: function(oEvent){
            oView.setBusy(true)
          },
          dataReceived: function(ovent){
            oView.setBusy(false)
          }
        }
      });

      var oModel = new sap.ui.model.json.JSONModel();
      var that = this;
      var aData = jQuery.ajax({
          type: "GET",
          contentType: "application/json",
          url: "/Northwind/V2/Northwind/Northwind.svc/Employees(" + oArgs.employeeId +  ")/Territories",
          dataType: "json",
          async: false,
          success: function(data, textStatus, jqXHR) {
              oModel.setData(data);
              console.log('success... get...')
          }
      });

      this.getView().setModel(oModel, "Terr");

      oQuery = oArgs["?query"];
      if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
        oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab)
      }else{
        this.getRouter().navTo("employeeResume", {
          employeeId: oArgs.employeeId,
          "?query" : {
            tab: _aValidTabKeys[0]
          }
        }, true /*no history*/);
      }
    
    },

    _onBindingChange: function(oEvent){
      //no data for the binding
      if (!this.getView().getBindingContext("north")){
        this.getRouter().getTargets().display('notFound', {
          fromTarget: "employees"
        });
      // }else{
      //   var oData = new JSONModel("north");
      //   this.getView().setModel(oData, "vv")
      }
    },

    onTabSelect: function(oEvent){
      var oContext = this.getView().getBindingContext('north');
      this.getRouter().navTo("employeeResume", {
        employeeId: oContext.getProperty("EmployeeID"),
        "?query": {
          tab: oEvent.getParameter("selectedKey")
        }
      }, true /*without history*/);
    }
  });
});
