var MENU_MODULE = {
	
	// PUBLIC

	initMenu : function() {
		$.mobile.changePage( "#menu-page", { 
			transition: "flip"
		});

		MENU_MODULE.setUserButton();
		MENU_MODULE.setResourceButton();
		MENU_MODULE.setTaskButton();
	},

	startAuto : function() {
		MENU_MODULE.serviceChecker = setInterval(function(){ 
		}, MENU_MODULE.serviceFrequency);
	},

	stopAuto : function() {
		clearInterval(MENU_MODULE.serviceChecker);
	},

	// PRIVATE

	serviceChecker : null,
	serviceFrequency : 1000 * 60 * 3,
	
	setUserButton : function() {
		$("#manage-users-button").unbind('click').click(function() {
			alert(1);
		});
	},
	
	setResourceButton : function() {
		$("#manage-resources-button").unbind('click').click(function() {
			alert(2);
		});
	},
	
	setTaskButton : function() {
		$("#manage-tasks-button").unbind('click').click(function() {
			alert(3);
		});
	}
};