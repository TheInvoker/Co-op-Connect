var MENU_MODULE = {
	
	// PUBLIC
	
	initMenu : function() {
		$.mobile.changePage( MENU_MODULE.context, { 
			transition: "flip"
		});

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

	context : "#menu-page",
	serviceChecker : null,
	serviceFrequency : 1000 * 60 * 3,

	init : (function() { 
		$(document).ready(function() {
			MENU_MODULE.setUserButton();
			MENU_MODULE.setPlacementButton();
			MENU_MODULE.setSearchButton();
			MENU_MODULE.setMapButton();
			MENU_MODULE.setMessageButton();
			MENU_MODULE.setResourceButton();
			MENU_MODULE.setAboutButton();
		});
	})(),

	setUserButton : function() {
		$(MENU_MODULE.context).find("#profile-button").click(function() {
			var user = GLOBAL_DATA.user;
			PROFILE_MODULE.getProfile(user['id']);
		});
	},

	setPlacementButton : function() {
		$(MENU_MODULE.context).find("#placement-button").click(function() {
			var user = GLOBAL_DATA.user;
			PLACEMENT_MODULE.getPlacements(user['id']);
		});
	},
	
	setSearchButton : function() {
		$(MENU_MODULE.context).find("#search-button").click(function() {
			SEARCH_MODULE.initSearch();
		});
	},
	
	setMapButton : function() {
		$(MENU_MODULE.context).find("#map-button").click(function() {
			MAP_MODULE.showMap();
		});
	},
	
	setMessageButton : function() {
		$(MENU_MODULE.context).find("#message-button").click(function() {
			THREAD_MODULE.setMessageThreads();
		});
	},
	
	setResourceButton : function() {
		$(MENU_MODULE.context).find("#resource-button").click(function() {
			RESOURCE_MODULE.setResource();
		});
	},
	
	setAboutButton : function() {
		$(MENU_MODULE.context).find("#about-button").click(function() {
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
			
			MENU_MODULE.setCount("#message-number", mCount); 
			MENU_MODULE.setCount("#resource-number", rCount); 
		}, function(data,status,xhr) {
			
		});
	},
	
	setCount : function(id, count) {
		if (count > 0) {
			$(MENU_MODULE.context).find(id).show().text(count);
		} else {
			$(MENU_MODULE.context).find(id).hide();
		}
	}
};