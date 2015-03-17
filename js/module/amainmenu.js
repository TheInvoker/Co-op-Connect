var MENU_MODULE = new function() {
    
    var context = "body";
	
	panelFix(context, "#menu-panel");

	$(context).on('click', '#home-button',function() {

        // configure search button click
        GRID_MODULE.changePage();

    }).on('click', "#manage-users-button", function() {
		
		// set up users button click
		alert(1);
		
	}).on('click', "#manage-resources-button", function() {
		
		// set up resources button click
		alert(2);
		
	}).on('click', "#manage-tasks-button", function() {
		
		// set up tasks button click
		alert(3);
		
	});
};