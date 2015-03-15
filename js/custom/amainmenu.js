var MENU_MODULE_OBJ = function() {
    
    var context = "#menu-page";

	swipePanel(context, "#menu-panel");
	
	$(context).on('click', "#manage-users-button", function() {
		
		// set up users button click
		alert(1);
		
	}).on('click', "#manage-resources-button", function() {
		
		// set up resources button click
		alert(2);
		
	}).on('click', "#manage-tasks-button", function() {
		
		// set up tasks button click
		alert(3);
		
	});
	
    this.initMenu = function() {
        $.mobile.changePage( context, { 
            transition: "flip"
        });
    };
};

var MENU_MODULE = new MENU_MODULE_OBJ();