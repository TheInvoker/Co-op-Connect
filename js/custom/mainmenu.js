var MENU_MODULE = {
	
	// PUBLIC
	
	initMenu : function() {
		$.mobile.changePage( "#menu-page", { 
			transition: "flip"
		});
		
		MENU_MODULE.setUserButton();
		MENU_MODULE.setPlacementButton();
		MENU_MODULE.setSearchButton();
		MENU_MODULE.setMapButton();
		MENU_MODULE.setMessageButton();
		MENU_MODULE.setResourceButton();
		MENU_MODULE.setAboutButton();

		GRID_MODULE.setGrid();
	},
	
	startAuto : function() {
		MENU_MODULE.getCount();
		
		MENU_MODULE.serviceChecker = setInterval(function(){ 
			MENU_MODULE.getCount();
		}, MENU_MODULE.serviceFrequency);
	},

	stopAuto : function() {
		clearInterval(MENU_MODULE.serviceChecker);
	},

	// PRIVATE

	serviceChecker : null,
	serviceFrequency : 1000 * 60 * 3,

	setUserButton : function() {
		$("#profile-button").unbind('click').click(function() {
			var user = GLOBAL_DATA.user;
			PROFILE_MODULE.getProfile(user['id']);
		});
	},

	setPlacementButton : function() {
		$("#placement-button").unbind('click').click(function() {
			var user = GLOBAL_DATA.user;
			PLACEMENT_MODULE.getPlacements(user['id']);
		});
	},
	
	setSearchButton : function() {
		$("#search-button").unbind('click').click(function() {
			SEARCH_MODULE.initSearch();
		});
	},
	
	setMapButton : function() {
		$("#map-button").unbind('click').click(function() {
			MAP_MODULE.showMap();
		});
	},
	
	setMessageButton : function() {
		$("#message-button").unbind('click').click(function() {
			THREAD_MODULE.setMessageThreads();
		});
	},
	
	setResourceButton : function() {
		$("#resource-button").unbind('click').click(function() {
			RESOURCE_MODULE.setResource();
		});
	},
	
	setAboutButton : function() {
		$("#about-button").unbind('click').click(function() {
			ABOUT_MODULE.setAbout();
		});
	},
	
	getCount : function() {
		var user = GLOBAL_DATA.user;
		
		runAJAXSerial("", {
			id : user['id'],
			page : "user/checkcount"
		}, function(response) {
			var mCount = response['new_messages'];
			var rCount = response['new_news'];
			
			MENU_MODULE.setCount("message-number", mCount); 
			MENU_MODULE.setCount("resource-number", rCount); 
		}, function(data,status,xhr) {
			
		});
	},
	
	setCount : function(id, count) {
		if (mCount > 0) {
			$("#" + id).show().text(count);
		} else {
			$("#" + id).hide();
		}
	}
};