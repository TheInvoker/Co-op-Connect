var MAP_MODULE_OBJ = function() {
    
    var map = null,
        context = "#map-page";
    
    $(context).on('click', "#map-setting-button", function() {
		
		// set map settings button click
        MAP_SETTINGS_MODULE.initSettings();
		
    });

    this.showMap = function() {
        showMapPage();

        handleSettingsButton(true);
        
        if ($(context).find('#map_canvas').prop('init')) {
            MAP_SETTINGS_MODULE_OBJ.getLocations();
        } else {
            initMap();
        }
    };

    this.showPoint = function(obj) {
        showMapPage();
        
        handleSettingsButton(false);
        
        if ($(context).find('#map_canvas').prop('init')) {
            displayPointOnMap(obj);
        } else {
            initPointMap(obj);
        }
    };

    this.showOnMap = function(locations) {

        // clear markers
        $(context).find('#map_canvas').gmap('clear', 'markers');
        
        var i=0, l=locations.length;

        // add new markers
        for (i=0; i<l; i+=1) {
            
            var loc = locations[i];

            var pos = {
                'position': new google.maps.LatLng(loc['latitude'], loc['longitude']), 
                'bounds': false,
                'icon': 'http://maps.google.com/mapfiles/ms/icons/' + loc['color'] + '-dot.png'
            };
            
            $(context).find('#map_canvas').gmap('addMarker', pos).on('click', function() {
                $(context).find('#map_canvas').gmap('openInfoWindow', {'content': loc['address']}, this);
            });
        }
        
        // set zoom
        $(context).find('#map_canvas').gmap('option', 'zoom', 10);
        
        // cluster markers
        $(context).find('#map_canvas').gmap('set', 'MarkerClusterer', new MarkerClusterer(map, $(context).find('#map_canvas').gmap('get', 'markers')));
    };

    var showMapPage = function() {
        $.mobile.changePage(context, { 
            transition: "slide"
        });
    };

    var handleSettingsButton = function(state) {
        if (state) {
            $(context).find("#map-setting-button").show();
        } else {
            $(context).find("#map-setting-button").hide();
        }
    };

    var initMap = function() {
        
        $(context).find('#map_canvas').gmap().bind('init', function(ev, thismap) {
            
            map = thismap;
            $(this).prop('init', true);
            
            if ( navigator.geolocation ) {

                // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
                navigator.geolocation.getCurrentPosition(function (pos) {

                    $(context).find('#map_canvas').gmap("option", "center", new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                    
                    MAP_SETTINGS_MODULE_OBJ.getLocations();

                }, function (error) {

                    loadDefLocation();
                    
                    MAP_SETTINGS_MODULE_OBJ.getLocations();
                    
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            alert("Could not get your location. User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("Could not get your location. Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            alert("Could not get your location. The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            alert("Could not get your location. An unknown error occurred.");
                            break;
                        default:
                            alert("Could not get your location. An unknown error occurred.");
                    }
                }, {
                    maximumAge: 500000, 
                    enableHighAccuracy:true, 
                    timeout: 6000
                });
            } else {
                loadDefLocation();
            }
            
            $(context).find('#map_canvas').gmap('addControl', 'map-setting-button', google.maps.ControlPosition.RIGHT_TOP);
        });
    };
    
    var loadDefLocation = function() {
        var defLoc = new google.maps.LatLng(43.784712, -79.185998); // UTSC default location
        $(context).find('#map_canvas').gmap("option", "center", defLoc);
    };
    
    var initPointMap = function(obj) {
        $(context).find('#map_canvas').gmap().bind('init', function(ev, thismap) {

            map = thismap;
            $(this).prop('init', true);
                    
            displayPointOnMap(obj);
        });
    };

    var displayPointOnMap = function(obj) {
        $(context).find('#map_canvas').gmap("option", "center", new google.maps.LatLng(obj['latitude'], obj['longitude']));
        showOnMap([obj]);
    };
};

var MAP_MODULE = new MAP_MODULE_OBJ();