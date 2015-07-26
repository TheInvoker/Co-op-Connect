var PLACEMENT_MODULE = new function() {
    
    var context = "#placement-page",
        response = null,
        placement = null;

	$(context).on('click','#placement-list > div', function() {

		// set the right placement object
        var pid = $(this).attr('data-pid');
		var index = getPlacementObjectIndex(pid);

		if (index >= 0) {
			placement = response[index];
			openPanel("#placement-panel");
		} else {
			placement = null;
		}
		
		return false;
		
    }).on('click','#placement-add-button',function() {
		
		// set new placement button
        PLACEMENT_EDIT_MODULE.newPlacement();
		
    });
	
	$("#placement-panel").on('click','#placement-edit-button',function() {

		// set edit button
        PLACEMENT_EDIT_MODULE.setPlacementForEdit(placement);
		
    }).on('click','#placement-checklist-button',function() {
		
		// set checklist button
        CHECKLIST_MODULE.getChecklist(placement);
		
    }).on('click','#placement-map-button',function() {
		
		// set map button
        MAP_MODULE.showPoint(placement);
		
    }).on('click','#placement-delete-button',function() {
		
		// set delete button
        if (confirm("Are you sure you want to delete this placement?")) {
            runAJAXSerial('', {
                page : 'placement/deleteplacements',
                id : placement['id']
            }, function(response) {
				PLACEMENT_MODULE.MVC.deleteLocation(placement['id']);
				showNotification("Placement Deleted", placement["organization"], function() {
				});
            }, function(data,status,xhr) {

            });
        }
		
    });

    this.getPlacements = function(uid) {
        var user = GLOBAL_DATA.user, me = uid == user['id'];
        
        runAJAXSerial('', {
            page : 'placement/getplacements',
            targetid : uid
        }, function(res) {

            // record response
            response = res;
            
            changePage(context,function(){});

            // add data to listview
            displayPlacements(me, res);
            
            // attach click handler on items
            menuHandler(me);

        }, function(data,status,xhr) {

        });
    };
	
	this.getContext = function() {
		return context;
	};
	
	this.MVC = {
		formatLocation : function(me, obj) {
			var str = '<div data-pid="' + obj['id'] + '">';
			str += '<div title="Address"><img src="images/site/svg/map.svg" class="placement-small-icon myicon" /><span>' + obj['address'] + ', ' + obj['city'] + ', ' + obj['country'] + '</span></div>';
			str += '<div title="Role"><img src="images/site/svg/profile.svg" class="placement-small-icon myicon" /><span>' + obj['topic'] + '</span></div>';
			str += '<div title="Company"><img src="images/site/svg/placement.svg" class="placement-small-icon myicon" /><span>' + obj['organization'] + '</span></div>';
			str += '<div title="Date Worked"><img src="images/site/svg/date.svg" class="placement-small-icon myicon" /><span>' + PLACEMENT_MODULE.MVC.getDateTag(obj['date_started'], obj['date_finished']) + '</span></div>';
			if (me) {
				var percentage = 100.0 * obj['percentage'];
				str += '<div title="Checklist Progress"><img src="images/site/svg/checklist.svg" class="placement-small-icon myicon" /><span>' + PLACEMENT_MODULE.MVC.getProgressTag(percentage) + '</span></div>';
				str += '<div title="State">' + PLACEMENT_MODULE.MVC.getStateTag(obj['active']) + '</div>';
			}
			str += '</div>';
			
			return str;
		},
		deleteLocation : function(pid) {
			var index = getPlacementObjectIndex(pid);
			response.splice(index, 1);
			$(context).find("div[data-pid='"+pid+"']").remove();	
		},
		getProgressTag : function(percentage) {
			return percentage + '% <progress value="' + percentage + '" max="100"></progress>';
		},
		getStateTag : function(state) {
			return '<img src="images/site/svg/' + (state=='1' ? 'unlock' : 'lock') + '.svg" class="placement-small-icon myicon" />' + (state=='1' ? 'Active' : 'Locked');
		},
		getDateTag : function(datestarted, dateended) {
			return datestarted + ' to ' + dateended;
		},
		setAddress : function(pid, address, city, country) {
			var index = getPlacementObjectIndex(pid);
			var obj = response[index];
			var htmltag = $(context).find("div[data-pid='"+pid+"'] > div[title='Address'] > span");
			obj['address'] = address;
			obj['city'] = city;
			obj['country'] = country;
			htmltag.text(address + ", " + city + ", " + country);
		},
		setTopic : function(pid, topic) {
			var index = getPlacementObjectIndex(pid);
			var obj = response[index];
			var htmltag = $(context).find("div[data-pid='"+pid+"'] > div[title='Role'] > span");
			obj['topic'] = topic;
			htmltag.text(topic);
		},
		setCompany : function(pid, company) {
			var index = getPlacementObjectIndex(pid);
			var obj = response[index];
			var htmltag = $(context).find("div[data-pid='"+pid+"'] > div[title='Company'] > span");
			obj['organization'] = company;
			htmltag.text(company);
		},
		setDate : function(pid, datestarted, dateended) {
			var index = getPlacementObjectIndex(pid);
			var obj = response[index];
			var htmltag = $(context).find("div[data-pid='"+pid+"'] > div[title='Date Worked'] > span");
			obj['date_started'] = datestarted;
			obj['date_finished'] = dateended;
			htmltag.text(PLACEMENT_MODULE.MVC.getDateTag(datestarted, dateended));
		},
		setProgress : function(pid, percentage) {
			var htmltag = $(context).find("div[data-pid='"+pid+"'] > div[title='Checklist Progress'] > span");
			if (htmltag.length > 0) {
				var index = getPlacementObjectIndex(pid);
				var obj = response[index];
				obj['percentage'] = percentage;
				htmltag.html(PLACEMENT_MODULE.MVC.getProgressTag(percentage));
			}
		},
		setActive : function(pid, active) {
			var htmltag = $(context).find("div[data-pid='"+pid+"'] > div[title='State']");
			if (htmltag.length > 0) {
				var index = getPlacementObjectIndex(pid);
				var obj = response[index];
				obj['active'] = active;
				htmltag.html(PLACEMENT_MODULE.MVC.getStateTag(active));
			}
		}
	};

	var getPlacementObjectIndex = function(pid) {
        var i, l=response.length;
		for(i=0; i<l; i+=1) {
            var obj = response[i];
            if (obj['id'] == pid) {
                return i;
            }
        }
		return -1;
	};
	
    var displayPlacements = function(me, response) {
        var list = $(context).find("#placement-list"), myListContent = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            myListContent += PLACEMENT_MODULE.MVC.formatLocation(me, obj);
        }
        
        list.html(myListContent);
    };
    


    var menuHandler = function(me) {
        var buttons = $(context).find("#placement-edit-button, #placement-checklist-button, #placement-delete-button, #placement-add-button");

        if (me) {
            buttons.show();
        } else {
            buttons.hide();
        }
    };
};