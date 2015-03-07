var GRID_MODULE = {
	
	// PUBLIC
	
	setGrid : function() {
		var grid = $(GRID_MODULE.context).find("#newsgrid");
		grid.empty();
		
		var items = 100;
		
		var str = "";
		for (var i=0; i<items; i+=1) {
			str += "<div class='grid-item'></div>";
		}
	
		grid.html(str);
	},

	// PRIVATE

	context : "#menu-page"

};