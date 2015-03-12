var MENU_MODULE_OBJ = function() {
    
    var context = "#menu-page",
        serviceChecker = null,
        serviceFrequency = 1000 * 60 * 3;
	
	swipePanel(context, "#menu-panel");
    
    this.initMenu = function() {
        $.mobile.changePage( context, { 
            transition: "flip"
        });

        GRID_MODULE.setGrid();
    };
    
    this.startAuto = function() {
        getCount();
        
        serviceChecker = setInterval(function(){ 
            getCount();
        }, serviceFrequency);
    };

    this.stopAuto = function() {
        clearInterval(serviceChecker);
    };

    $(document).ready(function() {
        setUserButton();
        setPlacementButton();
        setSearchButton();
        setMapButton();
        setMessageButton();
        setResourceButton();
        setAboutButton();
    });

    var setUserButton = function() {
        $(context).find("#profile-button").click(function() {
            var user = GLOBAL_DATA.user;
            PROFILE_MODULE.getProfile(user['id']);
        });
    };

    var setPlacementButton = function() {
        $(context).find("#placement-button").click(function() {
            var user = GLOBAL_DATA.user;
            PLACEMENT_MODULE.getPlacements(user['id']);
        });
    };
    
    var setSearchButton = function() {
        $(context).find("#search-button").click(function() {
            SEARCH_MODULE.initSearch();
        });
    };
    
    var setMapButton = function() {
        $(context).find("#map-button").click(function() {
            MAP_MODULE.showMap();
        });
    };
    
    var setMessageButton = function() {
        $(context).find("#message-button").click(function() {
            THREAD_MODULE.setMessageThreads();
        });
    };
    
    var setResourceButton = function() {
        $(context).find("#resource-button").click(function() {
            RESOURCE_MODULE.setResource();
        });
    };
    
    var setAboutButton = function() {
        $(context).find("#about-button").click(function() {
            ABOUT_MODULE.setAbout();
        });
    };
    
    var getCount = function() {
        var user = GLOBAL_DATA.user;
        
        runAJAXSerial("", {
            id : user['id'],
            page : "user/checkcount"
        }, function(response) {
            var mCount = response['new_messages'];
            var rCount = response['new_news'];
            
            setCount("#message-number", mCount); 
            setCount("#resource-number", rCount); 
        }, function(data,status,xhr) {
            
        });
    };
    
    var setCount = function(id, count) {
        if (count > 0) {
            $(context).find(id).show().text(count);
        } else {
            $(context).find(id).hide();
        }
    };
};

var MENU_MODULE = new MENU_MODULE_OBJ();