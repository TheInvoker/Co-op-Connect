var MENU_MODULE_OBJ = function() {
    
    var context = "#menu-page",
        serviceChecker = null,
        serviceFrequency = 1000 * 60 * 3;
	
	swipePanel(context, "#menu-panel");
    
    registerShowEvent(context, function(prev_id) {
        startAuto();
    });

    registerHideEvent(context, function(to_id) {
        stopAuto();
    });

    // configure profile button click
	$(context).on('click', "#profile-button", function() {
		var user = GLOBAL_DATA.user;
		PROFILE_MODULE.getProfile(user['id']);
	});

    // configure placement button click
	$(context).on('click', "#placement-button", function() {
		var user = GLOBAL_DATA.user;
		PLACEMENT_MODULE.getPlacements(user['id']);
	});

    // configure search button click
	$(context).on('click', "#search-button", function() {
		SEARCH_MODULE.initSearch();
	});

    // configure map button click
	$(context).on('click', "#map-button", function() {
		MAP_MODULE.showMap();
	});

    // configure message button click
	$(context).on('click', "#message-button", function() {
		THREAD_MODULE.setMessageThreads();
	});

    // configure resource button click
	$(context).on('click', "#resource-button", function() {
		RESOURCE_MODULE.setResource();
	});

    // configure about button click
	$(context).on('click', "#about-button", function() {
		ABOUT_MODULE.setAbout();
	});
    
    this.initMenu = function() {
        $.mobile.changePage( context, { 
            transition: "flip"
        });

        GRID_MODULE.setGrid();
    };

    var startAuto = function() {
        getCount();
        
        serviceChecker = setInterval(function(){ 
            getCount();
        }, serviceFrequency);
    };

    var stopAuto = function() {
        clearInterval(serviceChecker);
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