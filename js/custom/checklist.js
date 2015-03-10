var CHECKLIST_MODULE_OBJ = function () {

    var context = "#checklist-page";
	
	$(document).ready(function() {
		// configure back button
		$(context).find("#done-checklist-button").click(function() {
			history.back();
		});
	});

    this.getChecklist = function(user_id, obj) {

        var user = GLOBAL_DATA.user;

        runAJAXSerial("", {
            id : obj['id'],
            page : "checklist/getchecklist",
            user_id : user['id'],
            department_id : user['department_id']
        }, function(response) {
            $.mobile.changePage(context, {
                transition: "slide"
            });

            // add checklist items
            displayChecklist(obj['id'], response);

            // attach click handlers
            attachHandlers();
			
        }, function(data,status,xhr) {

        });
    };

    var displayChecklist = function(pid, response) {
        var field = $(context).find("#checklistCB");
        field.empty();

        var myListContent = "";
        for(var i=0; i<response.length; i+=1) {
            var obj = response[i];
            var tagid = 'checklist-' + i;

            myListContent += '<input name="' + tagid + '" id="' + tagid + '" ' + (obj['checked']=='0' ? '' : 'checked=""') + ' type="checkbox" data-pid="' + pid + '" data-tid="' + obj['task_id'] + '">';
            myListContent += '<label for="' + tagid + '">' + formatChecklist(obj) + '</label>';
        }

        field.append(myListContent).trigger("create");
    };

    var formatChecklist = function(obj) {
        var str = '<table>';
        str += '<tr title="Name"><td valign="top"><span class="ui-icon-arrow-r ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + escapeHTML(obj['name']) + '</td></tr>';
        str += '<tr title="Description"><td valign="top"><span class="ui-icon-info ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + Autolinker.link(escapeHTML(obj['description'])) + '</td></tr>';
        str += '</table>';
        return str;
    };

    var attachHandlers = function() {
        var checkboxes = $(context).find("#checklistCB").find("input[type='checkbox']");

        checkboxes.change(function() {
            if ($(this).is(":checked")) {
                setChecklistState($(this), 1);
            } else {
                setChecklistState($(this), 0);
            }
        });
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

var CHECKLIST_MODULE = new CHECKLIST_MODULE_OBJ();