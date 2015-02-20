var MENU_MODULE = {
	
	serviceChecker : null,
	serviceFrequency : 1000 * 60 * 3,
	grid : null,
	
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

		MENU_MODULE.setGrid();
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
		if (MENU_MODULE.grid != null) {
			MENU_MODULE.grid.destroy();
			MENU_MODULE.grid = null;
		}
		
		$("#menu-page div.ui-content").empty().html('<div class="gridster"><ul></ul></div>');
		
		var browserWidth = $( window ).width();
		
		var c = 1;
		var r = 10;
		var m = 5;
		var w = 100;
		var s = 2;
		
		while ((c+s-1)*w + 2*m*c + 80 <= browserWidth) {
			c += 1;
		}
		c = Math.max(c-1, 1);
		
		var str = "";
		var grid = $(".gridster ul");
		
		for(var x=1; x<=c; x+=1) {
			for(var y=1; y<=r; y+=1) {
				str += '<li data-row="' + y + '" data-col="' + x + '" data-sizex="1" data-sizey="1"></li>';
			}
		}
		grid.html(str);
		
        var gridster = grid.gridster({
			widget_base_dimensions: [w, w],
			widget_margins: [m, m],
			helper: 'clone'
        }).data('gridster').disable();
		
		MENU_MODULE.grid = gridster,

        // resize widgets on hover
        gridster.$el.on('mouseenter', '> li', function() {
			gridster.resize_widget($(this), s, s);
		}).on('mouseleave', '> li', function() {
			gridster.resize_widget($(this), 1, 1);
		});
	},
	
	getCount : function() {
		var user = GLOBAL_DATA.user;
		
		var formData = 'page=user/checkcount&id=' + user['id'];
		
		$.ajax({
			type: 'POST',
			url: GLOBAL_DATA.server_link,
			data: formData,
			dataType: 'json',
			success: function(jsonData) {
				handleResponse(jsonData, function(response) {
					var rCount = response['new_news'];
					var mCount = response['new_messages'];
					MENU_MODULE.setButtonCount(mCount, rCount); 
				});
			},
			error: function(data,status,xhr) {

			}
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