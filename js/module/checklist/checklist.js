var CHECKLIST_MODULE = new function () {

    var context = "#checklist-page",
		response = null;
	
	$(context).on("click", "#checklist-accept-button", function() {
		
		// configure back button
        var user = GLOBAL_DATA.user;
		PLACEMENT_MODULE.getPlacements(user['id']);
		
	}).on("change", "#checklistCB input[type='checkbox']", function() {
		
		// configure checkbox clicks
		setChecklistState($(this), $(this).is(":checked") ? 1 : 0);
		
	});

    this.getChecklist = function(obj) {

        runAJAXSerial("", {
            id : obj['id'],
            page : "checklist/getchecklist"
        }, function(res) {
            changePage(context);
			
			// save the data
			response = res;
			
            // add checklist items
            displayChecklist(obj['id']);

        }, function(data,status,xhr) {

        });
    };

    this.getContext = function() {
        return context;
    };

    var displayChecklist = function(pid) {
        var field = $(context).find("#checklistCB"), i=0, l=response.length, myListContent="";

        for(i=0; i<l; i+=1) {
            var obj = response[i];
            var tagid = 'checklist-' + i;

            myListContent += '<input name="' + tagid + '" id="' + tagid + '" ' + (obj['checked']=='0' ? '' : 'checked=""') + ' type="checkbox" data-pid="' + pid + '" data-tid="' + obj['task_id'] + '">';
            myListContent += '<label for="' + tagid + '">' + formatChecklist(obj) + '</label>';
        }

        field.html(myListContent);
    };

    var formatChecklist = function(obj) {
        var str = '<table>';
        str += '<tr title="Name"><td valign="top"><span class="ui-icon-arrow-r ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['name'] + '</td></tr>';
        str += '<tr title="Description"><td valign="top"><span class="ui-icon-info ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + Autolinker.link(obj['description']) + '</td></tr>';
        str += '</table>';
        return str;
    };

    var setChecklistState = function(me, state) {
		var i, l=response.length;
		for(i=0; i<l; i+=1) {
			var task = response[i];
			if (me.attr("data-tid") == task["task_id"]) {

				runAJAXSerial("", {
					state : state,
					page : "checklist/setchecklist",
					taskid : me.attr("data-tid"),
					placementid : me.attr("data-pid")
				}, function(response) {
					showNotification("Changed to " + (state ? "Complete!" : "Incomplete!"), task["name"] + "\n" + task["description"], function() {
					});
				}, function(data,status,xhr) {
					me.prop("checked", !state);
					me.checkboxradio("refresh");
				});

				return;
			}
		}
    };
};