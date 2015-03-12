var GRID_MODULE_OBJ = function() {
    
    var context = "#newsgrid";
    
    this.setGrid = function() {
        var grid = $(context);
        grid.empty();
        
        var items = 100;
        
        var str = "";
        for (var i=0; i<items; i+=1) {
            str += "<div class='grid-item'></div>";
        }
    
        grid.html(str);
    };
};

var GRID_MODULE = new GRID_MODULE_OBJ();