var MENU_MODULE_OBJ = function() {
    
    var context = "#menu-page";

	swipePanel(context, "#menu-panel");
	
    this.initMenu = function() {
        $.mobile.changePage( context, { 
            transition: "flip"
        });
    };

    this.startAuto = function() {

    };

    this.stopAuto = function() {

    };
    
    $(document).ready(function() {
        setUserButton();
        setResourceButton();
        setTaskButton();
    });

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