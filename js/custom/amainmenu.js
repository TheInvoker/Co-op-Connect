var MENU_MODULE_OBJ = function() {
    
    var context = "#menu-page";

	swipePanel(context, "#menu-panel");
	
	$(context).find("#manage-users-button").click(function() {
		alert(1);
	});

	$(context).find("#manage-resources-button").click(function() {
		alert(2);
	});

	$(context).find("#manage-tasks-button").click(function() {
		alert(3);
	});
	
    this.initMenu = function() {
        $.mobile.changePage( context, { 
            transition: "flip"
        });
    };
};

var MENU_MODULE = new MENU_MODULE_OBJ();