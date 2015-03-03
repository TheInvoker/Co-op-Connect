var MAP_MODULE = {
	
	// PUBLIC
	
	showMap : function() {
		MAP_MODULE.showMapPage();

		MAP_MODULE.handleSettingsButton(true);
		
		if (!$('#map_canvas').prop('init')) {
			MAP_MODULE.initMap();
		}
	},

	showPoint : function(obj) {
		MAP_MODULE.showMapPage();
		
		MAP_MODULE.handleSettingsButton(false);
		
		if ($('#map_canvas').prop('init')) {
			MAP_MODULE.displayPointOnMap(obj);
		} else {
			MAP_MODULE.initPointMap();
		}
	},

	// PRIVATE

	map : null,

	initMap : function() {
		
		$('#map_canvas').gmap().bind('init', function(ev, map) {
			
			MAP_MODULE.map = map;
			$(this).prop('init', true);
			
			if ( navigator.geolocation ) {

				// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
				navigator.geolocation.getCurrentPosition(function (pos) {
					$('#map_canvas').gmap("option", "center", new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
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
			
			$('#map_canvas').gmap('addControl', 'map-setting-button', google.maps.ControlPosition.RIGHT_TOP);
		});
	},
	
	initPointMap : function() {
		$('#map_canvas').gmap().bind('init', function(ev, map) {

			MAP_MODULE.map = map;
			$(this).prop('init', true);
					
			MAP_MODULE.displayPointOnMap(obj);
		});
	},

	displayPointOnMap : function(obj) {
		$('#map_canvas').gmap("option", "center", new google.maps.LatLng(obj['latitude'], obj['longitude']));
		MAP_MODULE.showOnMap([obj]);
	},

	showOnMap : function(locations) {
		var map = MAP_MODULE.map;
		
		// clear markers
		$('#map_canvas').gmap('clear', 'markers');
		
		// add new markers
		for (var i=0; i<locations.length; i+=1) {
			
			var loc = locations[i];

			var pos = {
				'position': new google.maps.LatLng(loc['latitude'], loc['longitude']), 
				'bounds': false,
				'icon': 'http://maps.google.com/mapfiles/ms/icons/' + loc['color'] + '-dot.png'
			};
			
			$('#map_canvas').gmap('addMarker', pos).click(function() {
				$('#map_canvas').gmap('openInfoWindow', {'content': loc['address']}, this);
			});
		}
		
		// set zoom
		$('#map_canvas').gmap('option', 'zoom', 10);
		
		// cluster markers
		$('#map_canvas').gmap('set', 'MarkerClusterer', new MarkerClusterer(map, $('#map_canvas').gmap('get', 'markers')));
	},

	loadDefLocation : function() {
		var defLoc = new google.maps.LatLng(43.784712, -79.185998); // UTSC default location
		$('#map_canvas').gmap("option", "center", defLoc);
	},

	handleSettingsButton : function(state) {
		if (state) {
			$("#map-setting-button").show().unbind('click').click(function() {
				MAP_SETTINGS_MODULE.initSettings();
			});
		} else {
			$("#map-setting-button").hide();
		}
	},

	showMapPage : function() {
		$.mobile.changePage("#map-page", { 
			transition: "slide"
		});
	}
};