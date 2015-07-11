var GRID_MODULE = new function() {
    
    var context = "#grid-page";
    
    $(context).on("click", "div.grid-item", function() {
		
		// configure click grid item
        alert(1);
		
    });

    this.setGrid = function() {
        changePage(context);
		
		setGrid();
    };
	
	var setGrid = function() {
        var grid = $("#newsgrid", context);
        grid.empty();
        
        var items = 100;
        
        var str = "";
        for (var i=0; i<items; i+=1) {
            str += "<div class='grid-item'></div>";
        }
    
        grid.html(str);
	};
};