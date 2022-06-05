sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../model/InvoicesFormatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'


], function (Controller, JSONModel, InvoicesFormatter, Filter, FilterOperator ) {
    'use strict';

    return Controller.extend("ns.HTML5Module.controller.InvoicesLIst", {  
        
        formatter: InvoicesFormatter,

        onInit: function(){
             let oViewModel = new JSONModel({
                    USD: "USD",
                    EUR: "EUR"

             });
             this.getView().setModel(oViewModel, "currency");
        },

        onFilterInvoices: function (oEvent){
             const aFilter = [];
             const sQuery = oEvent.getParameter("query");   

             if (sQuery){
                aFilter.push(new Filter("ProductName", 
                                        FilterOperator.Contains, 
                                        sQuery ));

             };

            const oList= this.getView().byId("List1Invoices1");
            const oBinding= oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        NavigateToDetails: function (oEvent){
            const oItem = oEvent.getSource();
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Details", {
                invoicePath: window.encodeURIComponent(
                    oItem.getBindingContext("northwind").getPath().substr(1))});


        }
        
    });
});