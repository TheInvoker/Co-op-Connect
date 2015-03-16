var MENU_MODULE_OBJ = function() {
    
    var context = "body",
        serviceChecker = null,
        serviceFrequency = 1000 * 60 * 3;
    
    registerShowEvent(context, function(prev_id) {
        startAuto();
    });

    registerHideEvent(context, function(to_id) {
        stopAuto();
    });

    panelFix(context, "#menu-panel");

	$(context).on('click', '#home-button',function() {

        // configure search button click
        GRID_MODULE.changePage();

    }).on('click', "#profile-button", function() {
		
		// configure profile button click
		var user = GLOBAL_DATA.user;
		PROFILE_MODULE.getProfile(user['id']);
		
	}).on('click', "#placement-button", function() {
		
		// configure placement button click
		var user = GLOBAL_DATA.user;
		PLACEMENT_MODULE.getPlacements(user['id']);
		
	}).on('click', "#search-button", function() {
		
		// configure search button click
		SEARCH_MODULE.initSearch();
		
	}).on('click', "#map-button", function() {
		
		// configure map button click
		MAP_MODULE.showMap();
		
	}).on('click', "#message-button", function() {
		
		// configure message button click
		THREAD_MODULE.setMessageThreads();
		
	}).on('click', "#resource-button", function() {
		
		// configure resource button click
		RESOURCE_MODULE.setResource();
		
	}).on('click', "#about-button", function() {
		
		// configure about button click
		ABOUT_MODULE.setAbout();
		
	});

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