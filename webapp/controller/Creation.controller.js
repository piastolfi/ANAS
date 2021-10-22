sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Z_GEST_FERIEZ_GEST_FERIE.controller.Creation", {
		onInit: function() {
		

			var oOwnerComponent = this.getOwnerComponent(),
				oRouter = oOwnerComponent.getRouter();
			oRouter.getRoute("creation").attachPatternMatched(this._onCreateRouteMatched, this);
			oRouter.getRoute("creationWithParams").attachPatternMatched(this._onCreateRouteMatched, this);
		},

		_onCreateRouteMatched: function(oEvent) {
			var oRouteArgs = oEvent.getParameter("arguments");

			var dateFrom = oRouteArgs.dateFrom;
			dateFrom = new Date(dateFrom);
			var dateTo = oRouteArgs.dateTo;
			dateTo = new Date(dateTo);
			this.getView().byId("dateRange").setDateValue(dateFrom);
			this.getView().byId("dateRange").setSecondDateValue(dateTo);

		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onNavBack: function() {
			//check for model changes and ask for cancel confirmation
			this.getRouter().navTo("home", {}, true /*no history*/ );
		},
		
		onCancel: function() {
			//check for model changes and ask for cancel confirmation
			this.getRouter().navTo("home", {}, true /*no history*/ );
		},
		
		formatDate: function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
},
		
		onSendRequest: function(){
			var dateStart = this.getView().byId("dateRange").getDateValue();
			var dateTo = this.getView().byId("dateRange").getSecondDateValue();
			// var oModel = this.getView().getModel();

			/*oModel.getData().Dati.dateFrom = this.formatDate(dateStart);
			oModel.getData().Dati.dateTo = this.formatDate(dateTo);*/
			
			var start = this.formatDate(dateStart);
			var end = this.formatDate(dateTo);
			//alert(oModel.dateTo);
			
			var oData = {
				selectedDates: []
			};
			oData.selectedDates.push({
				dateFrom: new Date(start),
				dateTo: new Date(end)
			});

			

			var oModelCal = this.getOwnerComponent().getModel("specialDates").getData().selectedDates;
			oModelCal.push(oData.selectedDates[0]);
			// oModelCal.setData(oData);
			this.onNavBack();
		}
		


		/**
		 * 
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Z_GEST_FERIEZ_GEST_FERIE.view.Creation
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Z_GEST_FERIEZ_GEST_FERIE.view.Creation
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Z_GEST_FERIEZ_GEST_FERIE.view.Creation
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Z_GEST_FERIEZ_GEST_FERIE.view.Creation
		 */
		//	onExit: function() {
		//
		//	}

	});

});