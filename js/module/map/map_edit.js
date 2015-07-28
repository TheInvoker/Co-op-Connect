var MAP_SETTINGS_MODULE = new function() {
    
    var context = "#map-settings-page";

    $(context).on('click', "#map-accept-button", function() {
		
		makeRequest();
		
	}).on('click', "#map-cancel-button", function() {
		changePage(MAP_MODULE.getContext(),function(){});
	});

    this.initSettings = function() {
		changePage(context,function(){});
    };

    this.getLocations = function() {
        makeRequest();
    };
    
    this.initDate = function() {
        var elements = $(context).find("#map-filter-form").find("input[type=date]");
        dateHandler(elements, true, MAP_MODULE.getLocations, true);
    };
	
	var makeRequest = function() {
        runAJAXSerial($("#map-filter-form").serialize(), {
            page : 'placement/getmapplacements'
        }, function(response) {
            MAP_MODULE.showOnMap(response, false);
			
			changePage(MAP_MODULE.getContext(),function(){});
        }, function(data,status,xhr) {
            
        });
	};
};