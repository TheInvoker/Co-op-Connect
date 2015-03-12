var MENU_MODULE_OBJ = function() {
    
    var context = "#menu-page";

	swipePanel(context, "#menu-panel");
	
    $(document).ready(function() {
        setUserButton();
        setResourceButton();
        setTaskButton();
    });
	
    this.initMenu = function() {
        $.mobile.changePage( context, { 
            transition: "flip"
        });
    };

    var setUserButton = function() {
        $(context).find("#manage-users-button").click(function() {
            alert(1);
        });
    };
    
    var setResourceButton = function() {
        $(context).find("#manage-resources-button").click(function() {
            alert(2);
        });
    };
    
    var setTaskButton = function() {
        $(context).find("#manage-tasks-button").click(function() {
            alert(3);
        });
    };
};

var MENU_MODULE = new MENU_MODULE_OBJ();