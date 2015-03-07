var MENU_MODULE = {
	
	// PUBLIC

	initMenu : function() {
		$.mobile.changePage( MENU_MODULE.context, { 
			transition: "flip"
		});
	},

	startAuto : function() {
		MENU_MODULE.serviceChecker = setInterval(function(){ 
		}, MENU_MODULE.serviceFrequency);
	},

	stopAuto : function() {
		clearInterval(MENU_MODULE.serviceChecker);
	},

	// PRIVATE

	context : "#menu-page",
	serviceChecker : null,
	serviceFrequency : 1000 * 60 * 3,
	
	init : (function() { 
		$(document).ready(function() {
			MENU_MODULE.setUserButton();
			MENU_MODULE.setResourceButton();
			MENU_MODULE.setTaskButton();
		});
	})(),

	setUserButton : function() {
		$(MENU_MODULE.context).find("#manage-users-button").click(function() {
			alert(1);
		});
	},
	
	setResourceButton : function() {
		$(MENU_MODULE.context).find("#manage-resources-button").click(function() {
			alert(2);
		});
	},
	
	setTaskButton : function() {
		$(MENU_MODULE.context).find("#manage-tasks-button").click(function() {
			alert(3);
		});
	}
};