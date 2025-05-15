sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"dw/fiori/trng/lyg04/model/formatter"
], function(Controller, JSONModel, History, UIComponent, formatter) {
	"use strict";

	return Controller.extend("dw.fiori.trng.lyg04.controller.Detail", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf dw.fiori.trng.lyg04.view.Detail
		 */
		onInit: function() {
			this.oDataModel = this.getOwnerComponent().getModel();

			this.oView.setModel(new JSONModel({
				"bEditState": false
			}), "viewModel");
			this.oViewModel = this.oView.getModel("viewModel");
			this.getRouter().getRoute("Detail").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched : function (oEvent) {
			var oArgs, sID;
			oArgs = oEvent.getParameter("arguments");
			sID = oArgs.ID;
			this.sPath = "/Products(" + Number(sID) + ")";
			this.oView.byId("dynamicPageId").bindElement(this.sPath);
			// this._fetchJSONData(sProductPath);
		},

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		}

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf dw.fiori.trng.lyg04.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf dw.fiori.trng.lyg04.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});