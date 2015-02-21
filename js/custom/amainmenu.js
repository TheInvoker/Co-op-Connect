var MENU_MODULE = {
	
	initMenu : function() {
		$.mobile.changePage( "#menu-page", { 
			transition: "flip"
		});

		MENU_MODULE.setUserButton();
		MENU_MODULE.setResourceButton();
		MENU_MODULE.setTaskButton();
	},
	
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