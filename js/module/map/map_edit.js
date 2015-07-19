var MAP_SETTINGS_MODULE = new function() {
    
    var context = "#map-settings-page";

    $(context).on('submit', "#map-filter-form", function() {
		
		// configure map form submit
        runAJAXSerial($(this).serialize(), {
            page : 'placement/getmapplacements'
        }, function(response) {
            MAP_MODULE.showOnMap(response);
			
			changePage(MAP_MODULE.getContext(),function(){});
        }, function(data,status,xhr) {
            
        });
        
        return false;
    });

    this.initSettings = function() {
		changePage(context,function(){});
        
        initDate();
    };

    this.getLocations = function() {
        $(context).find("#map-filter-form").submit();
    };
    
    var initDate = function() {
        var elements = $(context).find("#map-filter-form").find("input[type=date]");
        dateHandler(elements, true, MAP_MODULE.getLocations, true);
    };
};