// @ts-nocheck
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'sap/base/Log'
    
    

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.MessageToast} MessageToast
     * @param {typeof sap.base.console.Log} Log
     */
    
], function(Controller, MessageToast, Log) {
    'use strict';
    return Controller.extend("ns.HTML5Module.controller.HelloPanel", {   

            onInit: function(){
               
            },

            onBeforeRendering: function(){
                // @ts-ignore
                window.message = "Log Message - onBeforeRendering"
                //Log.info( window.message);
                //Log.error( window.message);
                
            },
        
            onAfterRendering: function (){

                //debugger;
            },

            onShowHello: function () {
                //lectura del nombre en el i18n
                var oBundle = this.getView().getModel("i18n").getResourceBundle();

                //lectura del modelo json 
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
               MessageToast.show(sMsg);

           },

           onOpenDialog: function () {

            this.getOwnerComponent().onOpenHelloDialog();
              
           }

        
    });
});