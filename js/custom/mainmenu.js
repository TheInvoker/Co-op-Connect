var MENU_MODULE = {
	
	// PUBLIC
	
	initMenu : function() {
		$.mobile.changePage( MENU_MODULE.context, { 
			transition: "flip"
		});

		MENU_MODULE.setHomeButton();
		MENU_MODULE.setUserButton();
		MENU_MODULE.setPlacementButton();
		MENU_MODULE.setSearchButton();
		MENU_MODULE.setMapButton();
		MENU_MODULE.setMessageButton();
		MENU_MODULE.setResourceButton();
		MENU_MODULE.setAboutButton();

		MENU_MODULE.setGrid();
	},
	
	initAuto : function() {
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
	
	setHomeButton : function() {
		$("#home-button").unbind('click').click(function() {
			MENU_MODULE.initMenu();
		});
	},
	
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
			MESSAGE_MODULE.setMessageThreads();
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
	
	setGrid : function() {
		var grid = $(".mygrid");
		grid.empty();
		
		var items = 100;
		
		var str = "";
		for (var i=0; i<items; i+=1) {
			str += "<div class='grid-item'></div>";
		}
	
		grid.html(str);
	},
	
	getCount : function() {
		var user = GLOBAL_DATA.user;
		
		runAJAXSerial('', {
			page : 'user/checkcount',
			id : user['id']
		}, function(response) {
			var rCount = response['new_news'];
			var mCount = response['new_messages'];
			MENU_MODULE.setButtonCount(mCount, rCount); 
		});
	},
	
	setButtonCount : function(mCount, rCount) {
		if (mCount > 0) {
			$("#message-number").show().text(mCount);
		} else {
			$("#message-number").hide();
		}
		
		if (rCount > 0) {
			$("#resource-number").show().text(rCount);
		} else {
			$("#resource-number").hide();
		}
	}
};