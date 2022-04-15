//@ts-nocheck
sap.ui.define([
    'sap/ui/core/UIComponent',
    'Logaligroup/invoices/model/Models',
    'sap/ui/model/resource/ResourceModel'
    
/**
 * @param {typeof sap.ui.core.UIComponent } UIComponent
 * @param {typeof Logaligroup.invoices.model.Models} Models
 * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
 */

], function(UIComponent, Models, ResourceModel ) {
    
    return UIComponent.extend("Logaligroup.invoices.Component", {

        metadata:{
               manifest: "json"
         

        },

        init: function () {
            //llamada de la funcion init del padre
            UIComponent.prototype.init.apply(this, arguments);

             // establecer modelo de datos
             this.setModel(Models.createRecipient());
             //establecer modelo de internacionalizacion i18n
             var i81nModel = new ResourceModel ({bundleName:"Logaligroup.invoices.i18n.i18n"});
             this.setModel(i81nModel,"i18n");


        }


    });


    
}); 