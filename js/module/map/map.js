var MAP_MODULE = new function() {
    
    var map = null,
        context = "#map-page",
		DEFAULT_LOCATION = [43.784712, -79.185998];
    
    $(context).on('click', "#map-settings-button", function() {
		
		// set map settings button click
        MAP_SETTINGS_MODULE.initSettings();
    });

    this.showMap = function() {
        showMapPage();

        if ($(context).find('#map_canvas').prop('init')) {
            MAP_SETTINGS_MODULE.getLocations();
        } else {
            initMap();
        }
    };

    this.showPoint = function(obj) {
        showMapPage();
        
        if ($(context).find('#map_canvas').prop('init')) {
            displayPointOnMap(obj);
        } else {
            initPointMap(obj);
        }
    };

    this.showOnMap = function(locations) {

        // clear markers
		$(context).find('#map_canvas').gmap3({
			clear: {
				name:"marker"
			}
		});

        var i=0, l=locations.length;

        // add new markers
		var markerArray = [];
        for (i=0; i<l; i+=1) {
            
            var loc = locations[i];

			markerArray.push({
				latLng: [loc['latitude'], loc['longitude']], 
				data:loc["address"],  
				options: {
					icon:'http://maps.google.com/mapfiles/ms/icons/' + loc['color'] + '-dot.png'
				}
			});
        }
		
		$(context).find('#map_canvas').gmap3({
			marker:{
				values : markerArray,
				cluster:{
					radius:100,
					0: {
						content: "<div class='cluster cluster-1'>CLUSTER_COUNT</div>",
						width: 53,
						height: 52
					},
					20: {
						content: "<div class='cluster cluster-2'>CLUSTER_COUNT</div>",
						width: 56,
						height: 55
					},
					50: {
						content: "<div class='cluster cluster-3'>CLUSTER_COUNT</div>",
						width: 66,
						height: 65
					}
				},
				options : {
					draggable: false
				},
				events:{
					mouseover: function(marker, event, context){
						var map = $(this).gmap3("get"),
							infowindow = $(this).gmap3({get:{name:"infowindow"}});
						if (infowindow){
							infowindow.open(map, marker);
							infowindow.setContent(context.data);
						} else {
							$(this).gmap3({
								infowindow:{
									anchor:marker, 
									options:{content: context.data}
								}
							});
						}
					},
					mouseout: function(){
						var infowindow = $(this).gmap3({get:{name:"infowindow"}});
						if (infowindow){
							infowindow.close();
						}
					}
				}
			}
		});
    };
	
	this.getContext = function() {
		return context;
	};

	
	
    var showMapPage = function() {
        changePage(context);
    };

    var initMap = function() {
		if ( navigator.geolocation ) {
			// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
			navigator.geolocation.getCurrentPosition(function (pos) {
				startMap([pos.coords.latitude, pos.coords.longitude]);
				MAP_SETTINGS_MODULE.getLocations();
			}, function (error) {
				startMap(DEFAULT_LOCATION);
				MAP_SETTINGS_MODULE.getLocations();
				
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
			startMap(DEFAULT_LOCATION);
			MAP_SETTINGS_MODULE.getLocations();
		}
    };
	
	var startMap = function(startLocation) {
		$(context).find('#map_canvas').gmap3({
		 map:{
			options:{
			 center:startLocation,
			 zoom:10,
			 mapTypeId: google.maps.MapTypeId.TERRAIN,
			 mapTypeControl: true,
			 mapTypeControlOptions: {
			   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
			 },
			 navigationControl: true,
			 scrollwheel: true,
			 streetViewControl: true
			}
		 }
		});
		$(context).find('#map_canvas').prop('init', true);
	};
    
    var initPointMap = function(obj) {
        $(context).find('#map_canvas').gmap().bind('init', function(ev, thismap) {

            map = thismap;
            $(this).prop('init', true);
                    
            displayPointOnMap(obj);
        });
    };
};