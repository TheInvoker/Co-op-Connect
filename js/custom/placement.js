var PLACEMENT_MODULE = {
	
	placement : null,
	
	getPlacements : function(user_id) {
		var user = GLOBAL_DATA.user;
		var me = user_id == user['id'];
		
		var formData = 'page=placement/getplacements&id=' + user['id'] + '&targetid=' + user_id;
		
		$.ajax({
			type: 'POST',
			url: GLOBAL_DATA.server_link,
			data: formData,
			dataType: 'json',
			success: function(jsonData) {
				handleResponse(jsonData, function(response) {
					$.mobile.changePage("#placement-page", { 
						transition: "slide"
					});
					
					// add data to listview
					PLACEMENT_MODULE.displayPlacements(me, response);
					
					// attach click handler on items
					PLACEMENT_MODULE.menuHandler(me, response, user_id);
					
					// handle new placement
					PLACEMENT_MODULE.newPlacement(me, user_id);
				});
			},
			error: function(data,status,xhr) {
				alert('Error Occured!');
			}
		});
	},
	
	displayPlacements : function(me, response) {
		var list = $("#placement-list");
		list.empty();
		
		var myListContent = "";
		for(var i=0; i<response.length; i+=1) {
			var obj = response[i];
			myListContent += '<li>' + PLACEMENT_MODULE.formatLocation(obj, me) + '</li>';
		}
		
		list.append(myListContent).listview().trigger('create');
		list.listview('refresh');
	},
	
	
	
	menuHandler : function(me, response, user_id) {
		
		var list = $("#placement-list");
		var items = list.find('a[data-rel=popup]');
		var options = $("#placementMenu").find("li");
		
		// when clicked, store the obj reference
		items.unbind('click').click(function() {
			var index = items.index(this);
			PLACEMENT_MODULE.placement = response[index];
		});

		// set up menu handler
		var editButton = options.eq(1);
		var checklistButton = options.eq(2);
		var mapButton = options.eq(3);
		var deleteButton = options.eq(4);
		
		if (me) {
			this.editPlacement(editButton, user_id);
			this.checklistPlacement(checklistButton, user_id);
			this.deletePlacement(deleteButton, user_id);
		} else {
			editButton.hide();
			checklistButton.hide();
			deleteButton.hide();
		}
		
		mapButton.unbind('click').click(function() { 
			var obj = PLACEMENT_MODULE.placement;
			MAP_MODULE.showPoint(obj);
		});
	},
	
	editPlacement : function(button, user_id) {
		button.show().unbind('click').click(function() { 
			$.mobile.changePage("#placement-edit-page", { 
				transition: "slide"
			});
			
			var obj = PLACEMENT_MODULE.placement;

			PLACEMENT_MODULE.setDateFields(false);
			PLACEMENT_MODULE.setPlacementForEdit(obj, user_id);
			PLACEMENT_MODULE.placementSubmit(obj, user_id);
		});
	},
	
	checklistPlacement : function(button, user_id) {
		button.show().unbind('click').click(function() { 
			var obj = PLACEMENT_MODULE.placement;
			CHECKLIST_MODULE.getChecklist(user_id, obj);
		});
	},
	
	deletePlacement : function(button, user_id) {
		button.show().unbind('click').click(function() {
			var obj = PLACEMENT_MODULE.placement;

			if (confirm("Are you sure you want to delete this placement?")) {
				var	formData = 'page=placement/deleteplacements&id=' + obj['id'];

				$.ajax({
					type: 'POST',
					url: GLOBAL_DATA.server_link,
					data: formData,
					dataType: 'json',
					success: function(jsonData) {
						handleResponse(jsonData, function(response) {
							$('#placementMenu').popup('close');
							
							PLACEMENT_MODULE.getPlacements(user_id);
						});
					},
					error: function(data,status,xhr) {
						alert('Error Occured!');
					}
				});
			}
		});
	},
	
	
	
	newPlacement : function(me, user_id) {
		var button = $("#add-placement-button");
		
		if (me) {
			button.show().unbind('click').click(function() {
				$.mobile.changePage("#placement-edit-page", { 
					transition: "slide"
				});
				
				PLACEMENT_MODULE.setPlacementForEdit(null, user_id);
				PLACEMENT_MODULE.setDateFields(true);
				PLACEMENT_MODULE.placementSubmit(null, user_id);
			});
		} else {
			button.hide();
		}
	},

	formatLocation : function(obj, me) {
		var str = '<a href="#placementMenu" data-rel="popup" data-transition="slideup">';
		str += '<table>';
		str += '<tr><td title="Address" valign="top"><span class="ui-icon-location ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['address'] + ', ' + obj['city'] + ', ' + obj['country'] + '</td></tr>';
		str += '<tr><td title="Role" valign="top"><span class="ui-icon-star ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['topic'] + '</td></tr>';
		str += '<tr><td title="Company" valign="top"><span class="ui-icon-shop ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['organization'] + '</td></tr>';
		str += '<tr><td title="Date Worked" valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['date_started'] + ' to ' + obj['date_finished'] + '</td></tr>';
		if (me) {
			var percentage = 100.0 * obj['percentage'];
			str += '<tr><td title="Checklist Progress" valign="top"><span class="ui-icon-bullets ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + percentage + '% <progress value="' + percentage + '" max="100"></progress></td></tr>';
			str += '<tr><td title="State" valign="top"><span class="ui-icon-' + (obj['active']=='1' ? 'check' : 'lock') + ' ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + (obj['active']=='1' ? 'Active' : 'Locked') + '</td></tr>';
		}
		str += '</table>';
		str += '</a>';
		
		return str;
	},
	
	setDateFields : function(setCurrentDate) {
		var elements = $("#placement-edit-form").find("input[type=date]");
		dateHandler(elements, setCurrentDate, function() {});
	},
	
	setPlacementForEdit : function(obj, user_id) {
		$("#placement-edit-form").find("input[name=address]").val(obj==null ? '' : obj['address'] + ', ' + obj['city'] + ', ' + obj['country']).geocomplete({ 
			details: "#placement-edit-form" 
		});

		$("#placement-edit-form").find("input[name=lat]").val(obj==null ? '' : obj['latitude']);
		$("#placement-edit-form").find("input[name=lng]").val(obj==null ? '' : obj['longitude']);
		$("#placement-edit-form").find("input[name=name]").val(obj==null ? '' : obj['address']);
		$("#placement-edit-form").find("input[name=locality]").val(obj==null ? '' : obj['city']);
		$("#placement-edit-form").find("input[name=country]").val(obj==null ? '' : obj['country']);
		
		$("#placement-edit-form").find("input[name=role]").val(obj==null ? '' : obj['topic']);
		$("#placement-edit-form").find("input[name=company]").val(obj==null ? '' : obj['organization']);
		$("#placement-edit-form").find("input[name=date_start]").val(obj==null ? '' : obj['date_started']);
		$("#placement-edit-form").find("input[name=date_end]").val(obj==null ? '' : obj['date_finished']);

		var swt = $("#placement-edit-form").find("select[name=active]");
		swt.val(obj == null || obj['active']=='1' ? '1' : '0');
		swt.slider('refresh');
	},
	
	placementSubmit : function(obj, user_id) {
		$("#placement-edit-form").unbind('submit').submit(function() {
			
			var formData = $(this).serialize();
			
			if (obj == null) {
				var user = GLOBAL_DATA.user;
				formData += '&page=placement/addplacements&user_id=' + user['id'];
			} else {
				formData += '&page=placement/setplacements&id=' + obj['id'];
			}
			
			$.ajax({
				type: 'POST',
				url: GLOBAL_DATA.server_link,
				data: formData,
				dataType: 'json',
				success: function(jsonData) {
					handleResponse(jsonData, function(response) {
						history.back();
						PLACEMENT_MODULE.getPlacements(user_id);
					});
				},
				error: function(data,status,xhr) {
					alert('Error Occured!');
				}
			});

			return false;
		});
	}
};