sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/unified/CalendarLegendItem",
	"sap/ui/unified/DateTypeRange",
	"sap/ui/unified/library",
	"sap/ui/unified/DateRange",
	'sap/ui/core/format/DateFormat'

], function(Controller, CalendarLegendItem, DateTypeRange, library, DateRange, DateFormat) {
	"use strict";

	return Controller.extend("Z_GEST_FERIEZ_GEST_FERIE.controller.Home", {
		onInit: function() {

				var oOwnerComponent = this.getOwnerComponent(),
				oRouter = oOwnerComponent.getRouter();
			oRouter.getRoute("home").attachPatternMatched(this._onHomeRouteMatched, this);

			// var oModel = this.getView().getModel();

			// var startDate = myModel.dateFrom;
			// var endDate = myModel.dateTo;

			//secondo tentativo
			/*var oCal = this.getView().byId("calendar");

			var oItemTemplate = new DateTypeRange({
				startDate: "{dateFrom}",
				endDate: "{dateTo}"
			});
			
			oCal.bindAggregation("specialDates", "myModel", oItemTemplate);*/

			//primo tentativo - non funziona
			/*var startDate = myModel.dateFrom;
			var endDate = myModel.dateTo;
			var oCal = this.getView().byId("calendar");
			if (startDate !== undefined || endDate !== undefined ){
				
				oCal.addSpecialDate(new DateTypeRange({
						startDate : new Date(startDate),
						endDate : new Date(endDate),
						type : "Type08",
						color: "#6e8c1f"
					}));
			}		*/
			// this.addSpecialDate();
		},
		_onHomeRouteMatched: function(){
			if(this.getOwnerComponent().getModel()) {
			
			var specialDates = this.getOwnerComponent().getModel("specialDates").getData().selectedDates;
			var addNewDates = this.getOwnerComponent().getModel().getData().selectedDates;
			for(var date in specialDates){
			addNewDates.push(specialDates[date]);
			}
			this.getOwnerComponent().getModel().refresh(true);
			}
		},

		_setCalendar: function() {
			var oData = {
				selectedDates: []
			};
			oData.selectedDates.push({
				dateFrom: new Date("2021-10-25"),
				dateTo: new Date("2021-10-26")
			});

			oData.selectedDates.push({
				dateFrom: new Date("2021-10-11"),
				dateTo: new Date("2021-10-11")
			});
			
			var specialDates = this.getOwnerComponent().getModel("specialDates").getData().selectedDates;
			for(var date in specialDates){
			oData.selectedDates.push(specialDates[date]);
			}
			var oModelCal = this.getOwnerComponent().getModel();
			oModelCal.setData(oData);

			var oCal = this.getView().byId("calendar").bindAggregation("specialDates", {
				path: "/selectedDates",
				template: new DateTypeRange({
					startDate: "{dateFrom}",
					endDate: "{dateTo}",
					color:"#6e8c1f",
					type: "Type08"
				})
			});
            // alert('finito di leggere il model');
			//	oCal.setModel(oModelCal);
		},
		onBeforeRendering: function() {

			var oGlobalModel = this.getOwnerComponent().getModel();
			oGlobalModel.attachRequestCompleted(this._setCalendar, this);
			var oReqModel = this.getOwnerComponent().getModel("specialDates");
			oReqModel.attachRequestCompleted(this._setCalendar, this);
			// var that = this;
			// var oModel = this.getView().getModel();

			//Primo tentativo binding (Non funziona perché il datetimerange vuole un js date object e restituisce errore)
			/*
			var oCal = this.getView().byId("calendar");
			oCal.bindElement("/selectedDates");
			*/

			//Secondo tentativo - aggiunta aggregation specialdate da controller 
			//(Non funziona perché non si riesce ad accedere alle proprietà del model, sempre undefined. 
			//Sia se messo nel component che nel manifest)

			/*			var oData = {
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
						var oModelCal = new sap.ui.model.json.JSONModel();
					//	var oModelCal = this.getOwnerComponent().getModel();
						oModelCal.setData(oData);

						var oCal = this.getView().byId("calendar").bindAggregation("selectedDates", {
							path: "myDates>/selectedDates",
							template: new DateRange({
								startDate: "{myDates>dateFrom}",
								endDate: "{myDates>dateTo}"
							})
						});
						oCal.setModel(oModelCal, "myDates");
						alert("ho caricato il calendario!");*/

			//	var 	template: oCalendar.getRows()[0].clone()
			//		oCal.bindAggregation("specialDates",{path:"/selectedDates"});

			//in teoria questo metodo dovrebbe funzionare, 
			//nel creation controller lo uso per settare le proprietà e funziona correttamente, qui no

			/*		var oCal = this.getView().byId("calendar");

					oCal.addSpecialDate(new DateTypeRange({
						startDate: new Date(),
						endDate: new Date(),
						type: "Type08",
						color: "#6e8c1f"
					}));*/
			/*this.addSpecialDate();*/

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

		_onCreateRouteMatched: function(oEvent) {

			//	var oModel = this.getOwnerComponent().getModel();

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