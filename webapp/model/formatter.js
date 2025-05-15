sap.ui.define([], function () {
	"use strict";
	return {
		jonitDetailTitle: function(title1, title2) {
			if (title1 && title2) {
				return title1.trim() + " " + title2;
			} else if (title2) {
				return title2;
			} else if (title1) {
				return title1.trim();
			}
			return "";
		}
	};
});