sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/unified/CalendarLegendItem",
	"sap/ui/unified/DateTypeRange",
	"sap/ui/unified/DateRange",
	"sap/ui/unified/library"

], function(Controller, CalendarLegendItem, DateTypeRange, DateRange, library) {
	"use strict";

	return Controller.extend("Z_GEST_FERIEZ_GEST_FERIE.controller.Home", {
		onInit: function() {

		},

		addSpecialDates: function() {
			/*var oModel = this.getOwnerComponent().getModel();
			var start, end;
				oModel.getData().Dati.dateFrom = start;
				oModel.getData().Dati.dateTo = end;
			
			var oCal = this.getView().byId("calendar");

			oCal.addSpecialDate(new sap.ui.unified.DateTypeRange({
				startDate: new Date(start),
				endDate: new Date(end),
				type: "Type08",
				color: "#6e8c1f"
			}));*/
		},
		_setCalendar: function() {
			var oData = {
				selectedDates: []
			};
			oData.selectedDates.push({
				dateFrom: new Date("2021-10-20"),
				dateTo: new Date("2021-10-30")
			});

			oData.selectedDates.push({
				dateFrom: new Date("2021-10-11"),
				dateTo: new Date("2021-10-11")
			});

			var oModelCal = this.getOwnerComponent().getModel();
			oModelCal.setData(oData);

			var oCal = this.getView().byId("calendar").bindAggregation("selectedDates", {
				path: "/selectedDates",
				template: new DateRange({
					startDate: "{dateFrom}",
					endDate: "{dateTo}"
				})
			});
            alert('finito di leggere il model');
			//	oCal.setModel(oModelCal);
		},
		onBeforeRendering: function() {

			var oGlobalModel = this.getOwnerComponent().getModel();
			oGlobalModel.attachRequestCompleted(this._setCalendar, this);
			
			/*var oGlobalModel = this.getOwnerComponent().getModel();
			oGlobalModel.attachRequestCompleted(this._setCalendar, this);*/
			
			// var that = this;
			// var oModel = this.getView().getModel();

			//Primo tentativo binding (Non funziona perché il datetimerange vuole un js date object e restituisce errore)
			/*
			var oCal = this.getView().byId("calendar");
			oCal.bindElement("/Dati");
			*/

			//Secondo tentativo - aggiunta aggregation specialdate da controller 
			//(Non funziona perché non si riesce ad accedere alle proprietà del model, sempre undefined. 
			//Sia se messo nel component che nel manifest)

			/*	var start, end;
			var oModel = this.getOwnerComponent().getModel();
			oModel.dateFrom = start;
			oModel.dateTo = end;
			//console.log(start);
	//in teoria questo metodo dovrebbe funzionare, 
	//nel creation controller lo uso per settare le proprietà e funziona correttamente, qui no
		
			var oCal = this.getView().byId("calendar");
			
			oCal.addSpecialDate(new sap.ui.unified.DateTypeRange({
					startDate: new Date("2021-10-20"),
					endDate: new Date("2021-10-22"), 
					type: "Type08",
					color: "#6e8c1f"
				}));*/

			//Secondo tentativo con controllo if 

			/*
			var myModel = this.getView().getModel();
			
			var startDate = myModel.dateFrom;
			var endDate = myModel.dateTo;
			var oCal = this.getView().byId("calendar");
			
			if (startDate !== undefined || endDate !== undefined) {

				oCal.addSpecialDate(new DateTypeRange({
					startDate: new Date(startDate),
					endDate: new Date(endDate),
					type: "Type08",
					color: "#6e8c1f"
				}));
					this.addSpecialDate();
			}
			*/

			//Terzo tentativo - con binding aggregation - aggiunta binding aggregation da controller
			//error: DateTypeRange is not a constructor
			/*
				var myModel = this.getView().getModel();
				var oCal = this.getView().byId("calendar");

				var oItemTemplate = new DateTypeRange({
					startDate: "{dateFrom}",
					endDate: "{dateTo}"
				});
			
				oCal.bindAggregation("specialDates", "myModel", oItemTemplate);
				*/
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onCreateLeave: function() {
			this.getRouter().navTo("creation", {}, true);
		},

		onCalendarDateSelect: function(oEvent) {
			var that = this;
			var oCalendar = oEvent.getSource(),
				oRouter = this.getOwnerComponent().getRouter(),
				oSelectedDateRange = oCalendar.getSelectedDates()[0],
				// oStartDateUTC = DateUtil.convertToUTC(oSelectedDateRange.getStartDate()),
				oStartDateUTC = oSelectedDateRange.getStartDate(),
				// oEndDateUTC = DateUtil.convertToUTC(oSelectedDateRange.getEndDate());
				oEndDateUTC = oSelectedDateRange.getEndDate();
			// Start AND end date selected: Navigate to create screen and pass selected dates
			oCalendar.destroySelectedDates();
			oRouter.navTo("creationWithParams", {
				dateFrom: "" + oStartDateUTC,
				dateTo: "" + oEndDateUTC,
				absenceType: "default"
					// sEmployeeID: this.getModel("global").getProperty("/sEmployeeNumber")
			});

		}

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Z_GEST_FERIEZ_GEST_FERIE.view.Home
		 
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Z_GEST_FERIEZ_GEST_FERIE.view.Home
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Z_GEST_FERIEZ_GEST_FERIE.view.Home
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Z_GEST_FERIEZ_GEST_FERIE.view.Home
		 */
		//	onExit: function() {
		//
		//	}

	});

});