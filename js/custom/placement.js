var PLACEMENT_MODULE_OBJ = function() {
    
    var context = "#placement-page",
        placement = null,
        user_id = null,
        thisOBJ = this;
    
    registerShowEvent(context, function(prev_id) {
        if (prev_id == CHECKLIST_MODULE.getContext()) {
            thisOBJ.getPlacements(user_id);
        }
    });

    this.getPlacements = function(uid) {
        var user = GLOBAL_DATA.user, me = uid == user['id'];
        
        runAJAXSerial('', {
            page : 'placement/getplacements',
            targetid : uid,
            id : user['id']
        }, function(response) {
            // record the user id in context
            user_id = uid;
            
            $.mobile.changePage(context, { 
                transition: "slide"
            });

            // add data to listview
            displayPlacements(me, response);
            
            // handle clicks
            clickHandler(response);
            
            // attach click handler on items
            menuHandler(me, response);
            
            // handle new placement
            newPlacement(me);

        }, function(data,status,xhr) {

        });
    };

    var displayPlacements = function(me, response) {
        var list = $(context).find("#placement-list"), myListContent = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            myListContent += '<li>' + formatLocation(obj, me) + '</li>';
        }
        
        list.html(myListContent).listview().trigger('create');
        list.listview('refresh');
    };
    
    var formatLocation = function(obj, me) {
        var str = '<a href="#placement-panel">';
        str += '<table>';
        str += '<tr title="Address"><td valign="top"><span class="ui-icon-location ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['address'] + ', ' + obj['city'] + ', ' + obj['country'] + '</td></tr>';
        str += '<tr title="Role"><td valign="top"><span class="ui-icon-star ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['topic'] + '</td></tr>';
        str += '<tr title="Company"><td valign="top"><span class="ui-icon-shop ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['organization'] + '</td></tr>';
        str += '<tr title="Date Worked"><td valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['date_started'] + ' to ' + obj['date_finished'] + '</td></tr>';
        if (me) {
            var percentage = 100.0 * obj['percentage'];
            str += '<tr title="Checklist Progress"><td valign="top"><span class="ui-icon-bullets ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + percentage + '% <progress value="' + percentage + '" max="100"></progress></td></tr>';
            str += '<tr title="State"><td valign="top"><span class="ui-icon-' + (obj['active']=='1' ? 'check' : 'lock') + ' ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + (obj['active']=='1' ? 'Active' : 'Locked') + '</td></tr>';
        }
        str += '</table>';
        str += '</a>';
        
        return str;
    };

    var clickHandler = function(response) {
        var items = $(context).find("#placement-list > li > a");
        
        // when clicked, store the obj reference
        items.click(function() {
            var index = items.index(this);
            placement = response[index];
        });
    };

    var menuHandler = function(me, response) {

        // set up menu handler
        var editButton = $(context).find("#placement-edit-button");
        var checklistButton = $(context).find("#placement-checklist-button");
        var mapButton = $(context).find("#placement-map-button");
        var deleteButton = $(context).find("#placement-delete-button");
        
        if (me) {
            editPlacement(editButton);
            checklistPlacement(checklistButton);
            deletePlacement(deleteButton);
        } else {
            editButton.hide();
            checklistButton.hide();
            deleteButton.hide();
        }
        
        mapPlacement(mapButton);
    };
    
    var editPlacement = function(button) {
        button.show().unbind('click').click(function() {             
            PLACEMENT_EDIT_MODULE.setPlacementForEdit(placement);
        });
    };
    
    var checklistPlacement = function(button) {
        button.show().unbind('click').click(function() { 
            CHECKLIST_MODULE.getChecklist(user_id, placement);
        });
    };
    
    var mapPlacement = function(button) {
        button.unbind('click').click(function() { 
            MAP_MODULE.showPoint(placement);
        });
    };

    var deletePlacement = function(button) {
        button.show().unbind('click').click(function() {

            var obj = placement;

            if (confirm("Are you sure you want to delete this placement?")) {
                runAJAXSerial('', {
                    page : 'placement/deleteplacements',
                    id : obj['id']
                }, function(response) {
                    $(context).find('#placement-panel').panel('close');
                    reload();
                }, function(data,status,xhr) {

                });
            }
        });
    };
    
    var newPlacement = function(me) {
        var button = $(context).find("#add-placement-button");
        
        if (me) {
            button.show().unbind('click').click(function() {
                PLACEMENT_EDIT_MODULE.newPlacement();
            });
        } else {
            button.hide();
        }
    };
};

var PLACEMENT_MODULE = new PLACEMENT_MODULE_OBJ();