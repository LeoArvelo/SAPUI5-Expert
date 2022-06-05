sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ns/HTML5Module/model/models",
    './controller/HelloDialog'
   
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.Device} Device
     * 
     */

], function (UIComponent, Device, models, HelloDialog) {
	"use strict";

	return UIComponent.extend("ns.HTML5Module.Component", {

		metadata: {
			manifest: "json"
		},


		 
        init: function () {
            //llamada de la funcion init del padre
            UIComponent.prototype.init.apply(this, arguments);

             // establecer modelo de datos
             this.setModel(models.createRecipient());
             //establecer modelo de internacionalizacion i18n
             //var i81nModel = new ResourceModel ({bundleName:"ns.HTML5Module.i18n.i18n"});
             //this.setModel(i81nModel,"i18n");

             this._helloDialog = new HelloDialog(this.getRootControl());
            
            //activar las rutas del manifes.json
             this.getRouter().initialize();

             // set the device model, estableciendo el modelo del dispositivo
			this.setModel(models.createDeviceModel(), "device");

        },

        exit: function(){
            this._helloDialog.distroy();
            delete this._helloDialog;
        },

        onOpenHelloDialog: function (){

            this._helloDialog.open();
        },

        getContentDensityClass : function (){
            if (!Device.support.touch){
                this._sContentDesityClass = "sapUiSizeCompact";
            }else {
                this._sContentDesityClass = "sapUiSizeCozy";
            }
            return this._sContentDesityClass
        }
       
	});
});
 /* init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			
		}*/