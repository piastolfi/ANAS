sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"Z_GEST_FERIEZ_GEST_FERIE/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("Z_GEST_FERIEZ_GEST_FERIE.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			//ho provato a inserirlo nel manifest perché da home.controller non riesco ad accedere alle proprietà
			var myModel = new sap.ui.model.json.JSONModel();
			// myModel.loadData("./data/data.json");
			var oData = {
				selectedDates: [
					{
					dateFrom: new Date("2021-10-05"),
					dateTo: new Date("2021-10-07")
					}
				]
			};
			myModel.setData(oData);
			myModel.setDefaultBindingMode("TwoWay");
			this.setModel(myModel, "specialDates");
			
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.globalModel());
		}
	});
});