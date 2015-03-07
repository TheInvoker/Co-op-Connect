var MAP_SETTINGS_MODULE = {
	
	// PUBLIC
	
	initSettings : function() {
		$.mobile.changePage(MAP_SETTINGS_MODULE.context, { 
			transition: "slide"
		});
		
		MAP_SETTINGS_MODULE.getLocations();
		
		MAP_SETTINGS_MODULE.initDate();
	},
	
	// PRIVATE

	context : "#map-settings-page",
	
	initDate : function() {
		var elements = $(MAP_SETTINGS_MODULE.context).find("#map-filter-form").find("input[type=date]");
		dateHandler(elements, true, MAP_MODULE.getLocations, true);
	},
	
	getLocations : function() {
		
		$(MAP_SETTINGS_MODULE.context).find("#map-filter-form").unbind('submit').submit(function() {
			
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