var MAP_MODULE = {
	
	// PUBLIC
	
	showMap : function() {
		MAP_MODULE.showMapPage();

		MAP_MODULE.handleSettingsButton(true);
		
		if (!$(MAP_MODULE.context).find('#map_canvas').prop('init')) {
			MAP_MODULE.initMap();
		}
	},

	showPoint : function(obj) {
		MAP_MODULE.showMapPage();
		
		MAP_MODULE.handleSettingsButton(false);
		
		if ($(MAP_MODULE.context).find('#map_canvas').prop('init')) {
			MAP_MODULE.displayPointOnMap(obj);
		} else {
			MAP_MODULE.initPointMap(obj);
		}
	},

	// PRIVATE

	map : null,
	context : "#map-page",

	init : (function() { 
		$(document).ready(function() {
		});
	})(),

	initMap : function() {
		
		$(MAP_MODULE.context).find('#map_canvas').gmap().bind('init', function(ev, map) {
			
			MAP_MODULE.map = map;
			$(this).prop('init', true);
			
			if ( navigator.geolocation ) {

				// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
				navigator.geolocation.getCurrentPosition(function (pos) {
					$(MAP_MODULE.context).find('#map_canvas').gmap("option", "center", new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
					MAP_MODULE.getLocations();
				}, function (error) {
					MAP_MODULE.loadDefLocation();
					MAP_MODULE.getLocations();
					
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
					}
				}, {
					maximumAge: 500000, 
					enableHighAccuracy:true, 
					timeout: 6000
				});
			} else {
				MAP_MODULE.loadDefLocation();
			}
			
			$(MAP_MODULE.context).find('#map_canvas').gmap('addControl', 'map-setting-button', google.maps.ControlPosition.RIGHT_TOP);
		});
	},
	
	initPointMap : function(obj) {
		$(MAP_MODULE.context).find('#map_canvas').gmap().bind('init', function(ev, map) {

			MAP_MODULE.map = map;
			$(this).prop('init', true);
					
			MAP_MODULE.displayPointOnMap(obj);
		});
	},

	displayPointOnMap : function(obj) {
		$(MAP_MODULE.context).find('#map_canvas').gmap("option", "center", new google.maps.LatLng(obj['latitude'], obj['longitude']));
		MAP_MODULE.showOnMap([obj]);
	},

	showOnMap : function(locations) {
		var map = MAP_MODULE.map;
		
		// clear markers
		$(MAP_MODULE.context).find('#map_canvas').gmap('clear', 'markers');
		
		// add new markers
		for (var i=0; i<locations.length; i+=1) {
			
			var loc = locations[i];

			var pos = {
				'position': new google.maps.LatLng(loc['latitude'], loc['longitude']), 
				'bounds': false,
				'icon': 'http://maps.google.com/mapfiles/ms/icons/' + loc['color'] + '-dot.png'
			};
			
			$(MAP_MODULE.context).find('#map_canvas').gmap('addMarker', pos).click(function() {
				$(MAP_MODULE.context).find('#map_canvas').gmap('openInfoWindow', {'content': loc['address']}, this);
			});
		}
		
		// set zoom
		$(MAP_MODULE.context).find('#map_canvas').gmap('option', 'zoom', 10);
		
		// cluster markers
		$(MAP_MODULE.context).find('#map_canvas').gmap('set', 'MarkerClusterer', new MarkerClusterer(map, $(MAP_MODULE.context).find('#map_canvas').gmap('get', 'markers')));
	},

	loadDefLocation : function() {
		var defLoc = new google.maps.LatLng(43.784712, -79.185998); // UTSC default location
		$(MAP_MODULE.context).find('#map_canvas').gmap("option", "center", defLoc);
	},

	handleSettingsButton : function(state) {
		if (state) {
			$(MAP_MODULE.context).find("#map-setting-button").show().unbind('click').click(function() {
				MAP_SETTINGS_MODULE.initSettings();
			});
		} else {
			$(MAP_MODULE.context).find("#map-setting-button").hide();
		}
	},

	showMapPage : function() {
		$.mobile.changePage(MAP_MODULE.context, { 
			transition: "slide"
		});
	}
};