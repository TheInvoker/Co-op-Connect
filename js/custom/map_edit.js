var MAP_SETTINGS_MODULE = {
	
	// PUBLIC
	
	initSettings : function() {
		$.mobile.changePage("#map-settings-page", { 
			transition: "slide"
		});
		
		MAP_SETTINGS_MODULE.getLocations();
		
		MAP_SETTINGS_MODULE.initDate();
	},
	
	// PRIVATE
	
	initDate : function() {
		var elements = $("#map-filter-form").find("input[type=date]");
		dateHandler(elements, true, MAP_MODULE.getLocations, true);
	},
	
	getLocations : function() {
		
		$("#map-filter-form").unbind('submit').submit(function() {
			
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
	}
};