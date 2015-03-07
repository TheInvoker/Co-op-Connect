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
			$.mobile.changePage(CHECKLIST_MODULE.context, { 
				transition: "slide"
			});
			
			// add checklist items
			CHECKLIST_MODULE.displayChecklist(obj['id'], response);
			
			// attach click handlers
			CHECKLIST_MODULE.attachHandlers();

		}, function(data,status,xhr) {
			
		});
	},
	
	// PRIVATE

	context : "#checklist-page",

	init : (function() { 
		$(document).ready(function() {
			$(CHECKLIST_MODULE.context).find("#done-checklist-button").unbind('click').click(function() {
				history.back();
			});
		});
	})(),

	displayChecklist : function(pid, response) {
		var field = $(CHECKLIST_MODULE.context).find("#checklistCB");
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

	formatChecklist : function(obj) {
		var str = '<table>';
		str += '<tr title="Name"><td valign="top"><span class="ui-icon-arrow-r ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['name'] + '</td></tr>';
		str += '<tr title="Description"><td valign="top"><span class="ui-icon-info ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + Autolinker.link(obj['description']) + '</td></tr>';
		str += '</table>';
		return str;
	},

	attachHandlers : function() {
		var checkboxes = $(CHECKLIST_MODULE.context).find("#checklistCB").find("input[type='checkbox']");
		
		checkboxes.change(function() {
			if ($(this).is(":checked")) {
				CHECKLIST_MODULE.setChecklistState($(this), 1);
			} else {
				CHECKLIST_MODULE.setChecklistState($(this), 0);
			}
		});
	},

	setChecklistState : function(me, state) {
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
	}
};