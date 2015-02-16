var CHECKLIST_MODULE = {
	
	getChecklist : function(user_id, obj) {
		
		var user = GLOBAL_DATA.user;
		var formData = 'page=checklist/getchecklist&id=' + obj['id'] + '&user_id=' + user['id'];
		
		$.ajax({
			type: 'POST',
			url: GLOBAL_DATA.server_link,
			data: formData,
			dataType: 'json',
			success: function(jsonData) {
				handleResponse(jsonData, function(response) {
					$.mobile.changePage("#checklist-page", { 
						transition: "slide"
					});
					
					// add checklist items
					CHECKLIST_MODULE.displayChecklist(response);
					
					// attach click handlers
					CHECKLIST_MODULE.attachHandlers(obj, response);
				});
			},
			error: function(data,status,xhr) {
				alert('Error Occured!');
			}
		});
		
		this.pageEndHandler(user_id);
	},
	
	displayChecklist : function(response) {
		var field = $("#checklistCB");
		field.empty();
		
		var myListContent = "";
		for(var i=0; i<response.length; i+=1) {
			var obj2 = response[i];
			var tagid = 'checklist-' + i;
			
			myListContent += '<input name="' + tagid + '" id="' + tagid + '" ' + (obj2['checked']=='0' ? '' : 'checked=""') + ' type="checkbox">';
			myListContent += '<label for="' + tagid + '">' + this.formatChecklist(obj2) + '</label>';
		}
		
		field.append(myListContent).trigger("create");
	},
	
	attachHandlers : function(obj, response) {
		var items = $("#checklistCB").find("input[type='checkbox']");
		
		items.unbind('change').change(function() {
			var index = items.index(this);
			
			if ($(this).is(":checked")) {
				CHECKLIST_MODULE.setChecklistState($(this), obj['id'], response[index], '1');
			} else {
				CHECKLIST_MODULE.setChecklistState($(this), obj['id'], response[index], '0');
			}
		});
	},
	
	pageEndHandler : function(user_id) {
		$(document).unbind("pagebeforehide").on("pagebeforehide","#checklist-page",function(){
			PLACEMENT_MODULE.getPlacements(user_id);
		});
	},

	formatChecklist : function(obj) {
		var str = '<table>';
		str += '<tr title="Name"><td valign="top"><span class="ui-icon-arrow-r ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['name'] + '</td></tr>';
		str += '<tr title="Description"><td valign="top"><span class="ui-icon-info ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['description'] + '</td></tr>';
		str += '<tr title="Last Updated"><td valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">Updated: ' + obj['last_updated'] + '</td></tr>';
		str += '</table>';
		return str;
	},

	setChecklistState : function(me, pid, obj, state) {
		var formData = 'page=checklist/setchecklist&taskid=' + obj['task_id'] + '&placementid=' + pid + '&state=' + state;
		
		$.ajax({
			type: 'POST',
			url: GLOBAL_DATA.server_link,
			data: formData,
			dataType: 'json',
			success: function(jsonData) {
				handleResponse(jsonData, function(response) {
					toast("Saved!");
				});
			},
			error: function(data,status,xhr) {
				me.prop("checked", state!='1');
				me.checkboxradio("refresh");
				
				alert('Error Occured!');
			}
		});
	}
};