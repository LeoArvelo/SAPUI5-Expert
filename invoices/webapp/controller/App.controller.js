//@ts-nocheck
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast'
    
/**
 * 
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 * @param {typeof sap.m.MessageToast} MessageToast
 */
], function(Controller, MessageToast) {
    'use strict';
    
    return Controller.extend("Logaligroup.invoices.controller.App",{
        onInit: function(){
           

        },

        onShowHello: function (){
            //lectura del texto en el modelo i18n
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            //Lectura del Json 
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);

            MessageToast.show(sMsg);
        }
    });
    
});