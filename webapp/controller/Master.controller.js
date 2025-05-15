sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/Device",
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], (Controller, Device, History, UIComponent, JSONModel, Filter, FilterOperator, Fragment) => {
    "use strict";

    return Controller.extend("dw.fiori.trng.lyg04.controller.MasterView", {
        onInit() {
            this.oDataModel = this.getOwnerComponent().getModel();
		
			
			this.oView.setModel(new JSONModel({
                Unit: "EUR",
				"sQueryStr": ""
			}), "viewModel");
			this.oViewModel = this.oView.getModel("viewModel");
			this.oView.setModel(new JSONModel({
				"Products": []
			}), "businessModel");
			this.oBusinessModel = this.oView.getModel("businessModel");
			this.getRouter().getRoute("Master").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {},

        /**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf fiori.training.masterdetail.view.Master
		 */
		onAfterRendering: function() {
			this._fetchEmployeeData();
		},

        getRouter : function () {
			return UIComponent.getRouterFor(this);
		},
		
		handleRefreshPress: function() {
			// this.oViewModel.setProperty("/sQueryStr", "");
			this._fetchEmployeeData();
		},
		
		_fetchEmployeeData: function() {
			var aFilter = [];
			var sQueryStr = this.oViewModel.getProperty("/sQueryStr").trim();
			if (sQueryStr && sQueryStr.length) {
				var	oFilter = new Filter({
					filters: [
						new Filter({
							path: "ID",
							operator: FilterOperator.EQ,
							value1: sQueryStr
						}),
						new Filter({
							path: "Name",
							operator: FilterOperator.EQ,
							value1: sQueryStr
						})
					],
					and: false
				});
				aFilter.push(oFilter);
			}
			this.oBusinessModel.setProperty("/Products", []);
			this.oView.byId("masterListId").setBusy(true);
			this.oDataModel.read("/Products", {
				groupId: "productsData",
				filters: aFilter,
				success: function(oData) {
					this.oView.byId("masterListId").setBusy(false);
					this.oBusinessModel.setProperty("/Products", oData.results);
				}.bind(this),
				error: function() {
					this.oView.byId("masterListId").setBusy(false);
					sap.m.MessageBox.error("Load data failed.");
				}.bind(this)
			});
		},

		handleListUpdateFinished: function(oEvent) {
			this.oView.byId("masterListId").removeSelections(true);
			if (!Device.system.phone) {
				this._selectFirstItem();
			}
		},

        _selectFirstItem: function() {
			var oList = this.oView.byId("masterListId"),
				aItem = oList.getItems() ? oList.getItems() : [];
			if (aItem && aItem.length > 0) {
				oList.setSelectedItem(aItem[0]);
				oList.fireSelectionChange({
					listItem: aItem[0],
					listItems: [aItem[0]],
					selected: true,
					selectAll: false
				});
			} else if (!Device.system.phone && !aItem.length) {
				// this.getRouter().navTo("notFound", {}, true);
			}
		},

		handleListSelectionChange: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("listItem"),
				oSelectedItemData = oSelectedItem.getBindingContext("businessModel").getProperty();
			this.getRouter().navTo("Detail", {
				ID: oSelectedItemData.ID
			}, Device.system.desktop);
		},
    });
});