sap.ui.define([
    'sap/ui/base/ManagedObject',
    'sap/ui/core/Fragment'

/**
 * 
 * @param {typeof sap.ui.base.ManagedObject}ManagedObject
 * @param {typeof sap.ui.core.Fragment}Fragment
 */
], function(ManagedObject, Fragment) {
    'use strict';

    return ManagedObject.extend("ns.HTML5Module.controller.HelloDialog", {

        constructor: function(oView){
            this._oView= oView;
 
         },
         
         exit: function(){
             delete this._oView;
 
         },
         //crear el dialogo
         open: function(){
                 const oView = this._oView
 
                 if (!oView.byId("helloDialog")){
 
                     let oFragmentController = {
 
                     OnCloseDialog: function(){
             
                         oView.byId("helloDialog").close();
                         
                         
                     }
                 };
 // se genera el fragmento segun la vista
                 Fragment.load({
                     id: oView.getId(),
                     name: "ns.HTML5Module.view.HelloDialog",
                     controller: oFragmentController
 
                 }).then(function (oDialog){
                     oView.addDependent(oDialog);
                     oDialog.open();
                 });
                
             }else {
                 oView.byId("helloDialog").open();
             }
 
         
         }
        
    });
    
});