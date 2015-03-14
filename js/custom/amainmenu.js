var MENU_MODULE_OBJ = function() {
    
    var context = "#menu-page";

	swipePanel(context, "#menu-panel");
	
	// set up users button click
	$(context).on('click', "#manage-users-button", function() {
		alert(1);
	});

	// set up resources button click
	$(context).on('click', "#manage-resources-button", function() {
		alert(2);
	});

	// set up tasks button click
	$(context).on('click', "#manage-tasks-button", function() {
		alert(3);
	});
	
    this.initMenu = function() {
        $.mobile.changePage( context, { 
            transition: "flip"
        });
    };
};

var MENU_MODULE = new MENU_MODULE_OBJ();