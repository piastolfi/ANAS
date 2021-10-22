sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		globalModel: function() {
            var sRootPath = jQuery.sap.getModulePath("Z_GEST_FERIEZ_GEST_FERIE");
            var filepath = sRootPath + "/data/data.json";
            var oModel = new JSONModel();
            oModel.setDefaultBindingMode("TwoWay");
            oModel.loadData(filepath, true);
            return oModel;
        }
        

	};
});