var CHECKLIST_MODULE = {
	
	// PUBLIC

	getChecklist : function(user_id, obj) {
		
		var user = GLOBAL_DATA.user;

		runAJAXSerial("", {
			id : obj['id'],
			page : "checklist/getchecklist",
			user_id : user['id'],
			department_id : user['department_id']
		}, function(response) {
			$.mobile.changePage("#checklist-page", { 
				transition: "slide"
			});
			
			// add checklist items
			CHECKLIST_MODULE.displayChecklist(obj['id'], response);
			
			// attach click handlers
			CHECKLIST_MODULE.attachHandlers();
			
			$("#done-checklist-button").unbind('click').click(function() {
				history.back();
			});
		}, function(data,status,xhr) {
			
		});
	},
	
	// PRIVATE

	displayChecklist : function(pid, response) {
		var field = $("#checklistCB");
		field.empty();
		
		var myListContent = "";
		for(var i=0; i<response.length; i+=1) {
			var obj = response[i];
			var tagid = 'checklist-' + i;
			
			myListContent += '<input name="' + tagid + '" id="' + tagid + '" ' + (obj['checked']=='0' ? '' : 'checked=""') + ' type="checkbox" data-pid="' + pid + '" data-tid="' + obj['task_id'] + '">';
			myListContent += '<label for="' + tagid + '">' + CHECKLIST_MODULE.formatChecklist(obj) + '</label>';
		}
		
		field.append(myListContent).trigger("create");
	},
	
	attachHandlers : function() {
		var checkboxes = $("#checklistCB").find("input[type='checkbox']");
		
		checkboxes.unbind('change').change(function() {
			if ($(this).is(":checked")) {
				CHECKLIST_MODULE.setChecklistState($(this), 1);
			} else {
				CHECKLIST_MODULE.setChecklistState($(this), 0);
			}
		});
	},

	formatChecklist : function(obj) {
		var str = '<table>';
		str += '<tr title="Name"><td valign="top"><span class="ui-icon-arrow-r ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['name'] + '</td></tr>';
		str += '<tr title="Description"><td valign="top"><span class="ui-icon-info ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + Autolinker.link(obj['description']) + '</td></tr>';
		str += '</table>';
		return str;
	},

	setChecklistState : function(me, state) {
		runAJAXSerial("", {
			state : state,
			page : "checklist/setchecklist",
			taskid : me.attr("data-tid"),
			placementid : me.attr("data-pid")
		}, function(response) {
			handleResponse(jsonData, function(response) {
				toast("Saved!");
			});
		}, function(data,status,xhr) {
			me.prop("checked", !state);
			me.checkboxradio("refresh");
		});
	}
};