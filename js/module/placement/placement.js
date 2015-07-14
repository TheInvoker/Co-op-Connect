var PLACEMENT_MODULE = new function() {
    
    var context = "#placement-page",
        response = null,
        placement = null;
	
	$(context).on('click','#placement-list > div', function() {
		
		// set the right placement object
        var pid = $(this).attr('data-pid'), i=0, l=response.length;

        for(i=0; i<l; i+=1) {
            var obj = response[i];
            if (obj['id'] == pid) {
                placement = obj;
				openPanel("#placement-panel");
                return false;
            }
        }

        placement = null;
		
    }).on('click','#placement-edit-button',function() {
		
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
                $(context).find('#placement-panel').panel('close');
                $(context).find('#placement-list > li > a[data-pid=' + placement['id'] + ']').parent().remove();
				showNotification("Placement Deleted", placement["organization"], function() {
				});
            }, function(data,status,xhr) {

            });
        }
		
    }).on('click','#add-placement-button',function() {
		
		// set new placement button
        PLACEMENT_EDIT_MODULE.newPlacement();
		
    });

    this.getPlacements = function(uid) {
        var user = GLOBAL_DATA.user, me = uid == user['id'];
        
        runAJAXSerial('', {
            page : 'placement/getplacements',
            targetid : uid
        }, function(res) {

            // record response
            response = res;
            
            changePage(context);

            // add data to listview
            displayPlacements(me, res);
            
            // attach click handler on items
            menuHandler(me);

        }, function(data,status,xhr) {

        });
    };
	
	this.showPage = function() {
		changePage(context);
	};

    var displayPlacements = function(me, response) {
        var list = $(context).find("#placement-list"), myListContent = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            myListContent += formatLocation(me, obj);
        }
        
        list.html(myListContent);
    };
    
    var formatLocation = function(me, obj) {
        var str = '<div data-pid="' + obj['id'] + '">';
        str += '<div title="Address"><img src="images/site/svg/map.svg" class="small-image" />' + obj['address'] + ', ' + obj['city'] + ', ' + obj['country'] + '</div>';
        str += '<div title="Role"><img src="images/site/svg/profile.svg" class="small-image" />' + obj['topic'] + '</div>';
        str += '<div title="Company"><img src="images/site/svg/placement.svg" class="small-image" />' + obj['organization'] + '</div>';
        str += '<div title="Date Worked"><img src="images/site/svg/date.svg" class="small-image" />' + obj['date_started'] + ' to ' + obj['date_finished'] + '</div>';
        if (me) {
            var percentage = 100.0 * obj['percentage'];
            str += '<div title="Checklist Progress"><img src="images/site/svg/checklist.svg" class="small-image" />' + percentage + '% <progress value="' + percentage + '" max="100"></progress></div>';
            str += '<div title="State"><img src="images/site/svg/' + (obj['active']=='1' ? 'unlock' : 'lock') + '.svg" class="small-image" />' + (obj['active']=='1' ? 'Active' : 'Locked') + '</div>';
        }
        str += '</div>';
        
        return str;
    };

    var menuHandler = function(me) {
        var buttons = $(context).find("#placement-edit-button, #placement-checklist-button, #placement-delete-button, #add-placement-button");

        if (me) {
            buttons.show();
        } else {
            buttons.hide();
        }
    };
};