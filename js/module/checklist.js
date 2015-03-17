var CHECKLIST_MODULE = new function () {

    var context = "#checklist-page",
		user_id = null;
	
	$(context).on("click", "#done-checklist-button", function() {
		
		// configure back button
		PLACEMENT_MODULE.getPlacements(user_id);
		
	}).on("change", "#checklistCB input[type='checkbox']", function() {
		
		// configure checkbox clicks
		if ($(this).is(":checked")) {
			setChecklistState($(this), 1);
		} else {
			setChecklistState($(this), 0);
		}
		
	});

    this.getChecklist = function(uid, obj) {

        var user = GLOBAL_DATA.user;
		user_id = uid;

        runAJAXSerial("", {
            id : obj['id'],
            page : "checklist/getchecklist",
            user_id : user['id']
        }, function(response) {
            $.mobile.changePage(context, {
                transition: "slide"
            });

            // add checklist items
            displayChecklist(obj['id'], response);

        }, function(data,status,xhr) {

        });
    };

    this.getContext = function() {
        return context;
    };

    var displayChecklist = function(pid, response) {
        var field = $(context).find("#checklistCB"), i=0, l=response.length, myListContent="";

        for(i=0; i<l; i+=1) {
            var obj = response[i];
            var tagid = 'checklist-' + i;

            myListContent += '<input name="' + tagid + '" id="' + tagid + '" ' + (obj['checked']=='0' ? '' : 'checked=""') + ' type="checkbox" data-pid="' + pid + '" data-tid="' + obj['task_id'] + '">';
            myListContent += '<label for="' + tagid + '">' + formatChecklist(obj) + '</label>';
        }

        field.html(myListContent).trigger("create");
    };

    var formatChecklist = function(obj) {
        var str = '<table>';
        str += '<tr title="Name"><td valign="top"><span class="ui-icon-arrow-r ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['name'] + '</td></tr>';
        str += '<tr title="Description"><td valign="top"><span class="ui-icon-info ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + Autolinker.link(obj['description']) + '</td></tr>';
        str += '</table>';
        return str;
    };

    var setChecklistState = function(me, state) {
        runAJAXSerial("", {
            state : state,
            page : "checklist/setchecklist",
            taskid : me.attr("data-tid"),
            placementid : me.attr("data-pid")
        }, function(response) {
            toast("Saved!");
        }, function(data,status,xhr) {
            me.prop("checked", !state);
            me.checkboxradio("refresh");
        });
    };
};