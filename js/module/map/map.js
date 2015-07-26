var MAP_MODULE = new function() {
    
    var context = "#map-page",
		DEFAULT_LOCATION = [43.784712, -79.185998]; // UTSC
    
    $(context).on('click', "#map-settings-button", function() {
		
		// set map settings button click
        MAP_SETTINGS_MODULE.initSettings();
		
    }).on('click', "#map-cancel-button", function() {
		
		changePage(PLACEMENT_MODULE.getContext(), function() {});
		
	}).on('click', "div.map-person-box > img", function() {
		
		PROFILE_MODULE.getProfile($(this).attr("data-id"));
		
	});

    this.showMap = function() {
		prepareButtons(false);
		
        changePage(context, function() {
			if ($(context).find('#map_canvas').prop('init')) {
				MAP_SETTINGS_MODULE.getLocations();
			} else {
				startMap(false, DEFAULT_LOCATION, function() {
					MAP_SETTINGS_MODULE.getLocations();
				});
			}
		});
    };

    this.showPoint = function(obj) {
        prepareButtons(true);

		changePage(context, function() {
			if ($(context).find('#map_canvas').prop('init')) {
				MAP_MODULE.showOnMap([obj]);
				setLocation([obj["latitude"],obj["longitude"]]);
			} else {
				startMap(true, [obj["latitude"],obj["longitude"]], function() {
					MAP_MODULE.showOnMap([obj]);
				});
			}	
		});
    };

    this.showOnMap = function(locations) {

        // clear markers
		$(context).find('#map_canvas').gmap3({
			clear: {
				name:"marker",
				callback : function() {
					
					// add new markers
					var i=0, l=locations.length, markerArray = [];
					for (i=0; i<l; i+=1) {
						var loc = locations[i];
						markerArray.push({
							latLng: [loc['latitude'], loc['longitude']], 
							data:loc,  
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
								},
								events: {
									click:function(cluster, event, data) {
										var markers = data.data.markers;
										showPeople(markers);
									}
								}
							},
							options : {
								draggable: false
							},
							events:{
								click: function(marker, event, context){
									showPeople([context]);
								}
							}
						}
					});
				}
			}
		});
    };
	
	this.getContext = function() {
		return context;
	};

	
	var prepareButtons = function(showPoint) {
		if (showPoint) {
			$(context).find("#map-settings-button").hide();
			$(context).find("#map-cancel-button").show();
		} else {
			$(context).find("#map-settings-button").show();
			$(context).find("#map-cancel-button").hide();
			MAP_SETTINGS_MODULE.initDate();
		}
		$(context).find("#map-people-panel").html("");
		$(context).find("#map-people-panel-wrapper").hide();
	};
	
	var startMap = function(showMyLocation, setLocation, callback) {
		$(context).find('#map_canvas').gmap3({
			map:{
				options:{
					center:setLocation,
					zoom:10,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					mapTypeControl: true,
					mapTypeControlOptions: {
						style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
					},
					navigationControl: true,
					scrollwheel: true,
					streetViewControl: true
				},
				callback : function() {
					$(context).find('#map_canvas').prop('init', true);
					if (!showMyLocation) getMyLocation();
					callback();
				},
				events:{
					click: function(){
						$(context).find("#map-people-panel").html("");
						$(context).find("#map-people-panel-wrapper").hide();
					}
				}
			}
		});
	};
	
	var getMyLocation = function() {
		if (navigator.geolocation) {
			// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
			navigator.geolocation.getCurrentPosition(function (pos) {
				setLocation([pos.coords.latitude, pos.coords.longitude]);
			}, function (error) {
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
		}
	};
	
	var setLocation = function(location) {
		$(context).find('#map_canvas').gmap3({
			map:{
				options:{
					center:location
				}
			}
		});
	};

	var showPeople = function(dataList) {
		var acc = "";
		
		for(var i=0; i<dataList.length; i+=1) {
			var marker_data = dataList[i].data;
			
			var tag = "<div class='map-person-box'>";
			tag += "<img data-id='" + marker_data["user_id"] + "' src='" + (marker_data["picURL"]=='' ? GLOBAL_DATA.def_image_link : marker_data["picURL"]) + "' title='" + (marker_data["firstname"] + " " + marker_data["lastname"]) + "'/>";
			tag += "<div>";
			tag += marker_data["firstname"] + " " + marker_data["lastname"] + "<br/>";
			tag += marker_data["address"] + ", " + marker_data["city"] + ", " + marker_data["country"] + "<br/>";
			tag += marker_data["topic"] + ", " + marker_data["organization"] + "<br/>";
			tag += marker_data["date_started"] + " to " + marker_data["date_finished"];
			tag += "</div>";
			tag += "</div>";
			
			acc += tag;
		}
		
		$(context).find("#map-people-panel").html(acc);
		$(context).find("#map-people-panel-wrapper").show();
	};
};