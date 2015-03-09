var MAP_SETTINGS_MODULE_OBJ = function() {
	
	var context = "#map-settings-page";

	this.initSettings = function() {
		$.mobile.changePage(context, { 
			transition: "slide"
		});
		
		getLocations();
		
		initDate();
	};

	this.getLocations = function() {
		$(context).find("#map-filter-form").submit();
	};
	
	var initDate = function() {
		var elements = $(context).find("#map-filter-form").find("input[type=date]");
		dateHandler(elements, true, MAP_MODULE.getLocations, true);
	};
	
	var getLocations = function() {
		
		$(context).find("#map-filter-form").unbind('submit').submit(function() {
			
			var formData = $(this).serialize();

			runAJAXSerial(formData, {
				page : 'placement/getmapplacements'
			}, function(response) {
				MAP_MODULE.showOnMap(response);
				history.back();
			}, function(data,status,xhr) {
				
			});
			
			return false;
		});
	};
};

var MAP_SETTINGS_MODULE = new MAP_SETTINGS_MODULE_OBJ();