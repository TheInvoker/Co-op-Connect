var MAP_MODULE = {
	
	map : null,
	
	showMap : function() {
		this.showMapPage();

		$("#map-setting-button").show().unbind('click').click(function() {
			$.mobile.changePage("#map-settings-page", { 
				transition: "slide"
			});
		});
		
		if ($('#map_canvas').prop('init')) {
			
			this.getLocations();
			
		} else {
			
			this.initMap();
			
		}
	},

	showPoint : function(obj) {
		this.showMapPage();
		
		$("#map-setting-button").hide();
		
		if ($('#map_canvas').prop('init')) {
			
			this.displayPointOnMap(obj);
			
		} else {
			
			$('#map_canvas').gmap().bind('init', function(ev, map) {
				
				MAP_MODULE.map = map;
				$(this).prop('init', true);
				
				this.displayPointOnMap(obj);
			});
		}
	},

	
	initMap : function() {
		
		$('#map_canvas').gmap().bind('init', function(ev, map) {
			
			MAP_MODULE.map = map;
			$(this).prop('init', true);
			
			var elements = $("#map-filter-form").find("input[type=date]");
			dateHandler(elements, true, this.getLocations, true);
			
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
				this.loadDefLocation();
			}
		});
	},
	
	
	
	getLocations : function() {
		
		$("#map-filter-form").unbind('submit').submit(function() {
			
			var formData = $(this).serialize();

			runAJAXSerial(formData, {
				page : 'placement/getmapplacements'
			}, function(response) {
				MAP_MODULE.showOnMap(response);
				history.back();
			});
			
			return false;
		});
	},

	displayPointOnMap : function(obj) {
		$('#map_canvas').gmap("option", "center", new google.maps.LatLng(obj['latitude'], obj['longitude']));
		this.showOnMap([obj]);
	},

	showOnMap : function(locations) {
		var map = this.map;
		
		// clear markers
		$('#map_canvas').gmap('clear', 'markers');
		
		// add new markers
		for (var i=0; i<locations.length; i+=1) {
			
			var loc = locations[i];
			var pos = {
				'position': new google.maps.LatLng(loc['latitude'], loc['longitude']), 
				'bounds': true,
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

	showMapPage : function() {
		$.mobile.changePage("#map-page", { 
			transition: "slide"
		});
	},

	loadDefLocation : function() {
		var defLoc = new google.maps.LatLng(43.784712, -79.185998); // UTSC default location
		$('#map_canvas').gmap("option", "center", defLoc);
	}
};