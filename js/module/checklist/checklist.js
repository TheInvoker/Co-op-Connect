var CHECKLIST_MODULE = new function () {

    var context = "#checklist-page",
		response = null;
	
	$(context).on("click", "#checklist-accept-button", function() {
		
		// configure back button
        var user = GLOBAL_DATA.user;
		PLACEMENT_MODULE.getPlacements(user['id']);
		
	}).on("change", "#checklistCB input[type='checkbox']", function() {
		
		// configure checkbox clicks
		setChecklistState($(this));
		
	});

    this.getChecklist = function(obj) {

        runAJAXSerial("", {
            id : obj['id'],
            page : "checklist/getchecklist"
        }, function(res) {
            changePage(context,function(){});
			
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

			myListContent += '<div>';
            myListContent += '<div><input name="' + tagid + '" id="' + tagid + '" ' + (obj['checked']=='0' ? '' : 'checked=""') + ' type="checkbox" data-pid="' + pid + '" data-tid="' + obj['task_id'] + '"></div>';
            myListContent += formatChecklist(obj);
			myListContent += '</div>';
        }

        field.html(myListContent);
    };

    var formatChecklist = function(obj) {
        var str = '<div title="Name">' + obj['name'] + '</div>';
        str += '<div title="Description">' + Autolinker.link(obj['description']) + '</div>';
        return str;
    };

    var setChecklistState = function(me) {
		var state = me.is(":checked") ? 1 : 0;
		
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
				});

				return;
			}
		}
    };
};