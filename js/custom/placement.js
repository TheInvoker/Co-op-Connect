var PLACEMENT_MODULE_OBJ = function() {
    
    var context = "#placement-page",
        response = null,
        placement = null,
        user_id = null,
        thisOBJ = this;
    
    registerShowEvent(context, function(prev_id) {
        if (prev_id == CHECKLIST_MODULE.getContext()) {
            thisOBJ.getPlacements(user_id);
        }
    });

    // set the right placement object
    $(context).on('click','#placement-list > li > a', function() {
        var pid = $(this).attr('data-pid'), i=0, l=response.length;

        for(i=0; i<l; i+=1) {
            var obj = response[i];
            if (obj['id'] == pid) {
                placement = obj;
                return;
            }
        }

        placement = null;
    });

    // set edit button
    $(context).on('click','#placement-edit-button',function() {
        PLACEMENT_EDIT_MODULE.setPlacementForEdit(placement);
    });

    // set checklist button
    $(context).on('click','#placement-checklist-button',function() {
        CHECKLIST_MODULE.getChecklist(user_id, placement);
    });

    // set map button
    $(context).on('click','#placement-map-button',function() {
        MAP_MODULE.showPoint(placement);
    });

    // set delete button
    $(context).on('click','#placement-delete-button',function() {
        if (confirm("Are you sure you want to delete this placement?")) {
            runAJAXSerial('', {
                page : 'placement/deleteplacements',
                id : placement['id']
            }, function(response) {
                $(context).find('#placement-panel').panel('close');
                $(context).find('#placement-list > li > a[data-pid=' + placement['id'] + ']').parent().remove();
            }, function(data,status,xhr) {

            });
        }
    });

    // set new placement button
    $(context).on('click','#add-placement-button',function() {
        PLACEMENT_EDIT_MODULE.newPlacement();
    });

    this.getPlacements = function(uid) {
        var user = GLOBAL_DATA.user, me = uid == user['id'];
        
        runAJAXSerial('', {
            page : 'placement/getplacements',
            targetid : uid,
            id : user['id']
        }, function(res) {

            // record response
            response = res;

            // record the user id in context
            user_id = uid;
            
            $.mobile.changePage(context, { 
                transition: "slide"
            });

            // add data to listview
            displayPlacements(me, res);
            
            // attach click handler on items
            menuHandler(me);

        }, function(data,status,xhr) {

        });
    };

    var displayPlacements = function(me, response) {
        var list = $(context).find("#placement-list"), myListContent = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            myListContent += '<li>' + formatLocation(me, obj) + '</li>';
        }
        
        list.html(myListContent).listview().trigger('create');
        list.listview('refresh');
    };
    
    var formatLocation = function(me, obj) {
        var str = '<a href="#placement-panel" data-pid="' + obj['id'] + '">';
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

    var menuHandler = function(me) {
        var buttons = $(context).find("#placement-edit-button, #placement-checklist-button, #placement-delete-button, #add-placement-button");

        if (me) {
            buttons.show();
        } else {
            buttons.hide();
        }
    };
};

var PLACEMENT_MODULE = new PLACEMENT_MODULE_OBJ();