var MENU_MODULE = new function() {
    
    var context = "body",
        serviceChecker = null,
        serviceFrequency = 1000 * 60 * 1;

	// prepare some things
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
		
	}).on('click', "#logout-button", function() {
		
		// configure logout button click
        runAJAXSerial("", {
            page : "user/logout"
        }, function(response) {
            
			window.location.href = ".";

        }, function(data,status,xhr) {
            
        });
		
	});

	this.runGetCount = function() {
		getCount();
	};
	
    var getCount = function() {

        runAJAXSerial("", {
            page : "user/checkcount"
        }, function(response) {
            var mCount = response['new_messages'];
            var rCount = response['new_news'];
            
            setCount("#message-number", mCount, "Mesages", "#message-button"); 
            setCount("#resource-number", rCount, "Resources", "#resource-button"); 
        }, function(data,status,xhr) {
            
        });
    };
    
    var setCount = function(id, count, name, buttonID) {
        if (count > 0) {
            $(context).find(id).show().text(count);
			showNotification(count + " Unread " + name, "", function() {
				$(buttonID).trigger("click");
			});
        } else {
            $(context).find(id).hide();
        }
    };
	
	// set global interval
	getCount();
	serviceChecker = setInterval(function(){ 
		getCount();
	}, serviceFrequency);
};