/*global QUnit*/

sap.ui.define([
	"dwfioritrng/lyg04/controller/MasterView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MasterView Controller");

	QUnit.test("I should test the MasterView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
