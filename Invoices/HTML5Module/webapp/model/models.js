sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

        createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

        createRecipient: function() {
            let oData = {
           recipient: {
               name:"world asdasdasdasd"
           }
       };   
       return new JSONModel(oData);
           }

	};
});