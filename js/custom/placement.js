var PLACEMENT_MODULE = {
	
	// PUBLIC
	
	getPlacements : function(user_id) {
		var user = GLOBAL_DATA.user;
		var me = user_id == user['id'];
		
		runAJAXSerial('', {
			page : 'placement/getplacements',
			targetid : user_id,
			id : user['id']
		}, function(response) {
			// record the user id in context
			PLACEMENT_MODULE.user_id = user_id;
			
			$.mobile.changePage("#placement-page", { 
				transition: "slide"
			});

			// add data to listview
			PLACEMENT_MODULE.displayPlacements(me, response);
			
			// attach click handler on items
			PLACEMENT_MODULE.menuHandler(me, response);
			
			// handle new placement
			PLACEMENT_MODULE.newPlacement(me);
		}, function(data,status,xhr) {

		});
	},

	reload : function() {
		PLACEMENT_MODULE.getPlacements(PLACEMENT_MODULE.user_id);
	},

	// PRIVATE
	
	placement : null,
	user_id : null,

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
	
	formatLocation : function(obj, me) {
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
	},


	menuHandler : function(me, response) {
		
		var items = $("#placement-list > li > a");
		
		// when clicked, store the obj reference
		items.unbind('click').click(function() {
			var index = items.index(this);
			PLACEMENT_MODULE.placement = response[index];
			return false;
		});

		// set up menu handler
		var editButton = $("#placement-edit-button");
		var checklistButton = $("#placement-checklist-button");
		var mapButton = $("#placement-map-button");
		var deleteButton = $("#placement-delete-button");
		
		if (me) {
			PLACEMENT_MODULE.editPlacement(editButton);
			PLACEMENT_MODULE.checklistPlacement(checklistButton);
			PLACEMENT_MODULE.deletePlacement(deleteButton);
		} else {
			editButton.hide();
			checklistButton.hide();
			deleteButton.hide();
		}
		
		PLACEMENT_MODULE.mapPlacement(mapButton);
	},
	
	editPlacement : function(button) {
		button.show().unbind('click').click(function() { 
			$.mobile.changePage("#placement-edit-page", { 
				transition: "slide"
			});
			
			var obj = PLACEMENT_MODULE.placement;

			PLACEMENT_MODULE.setDateFields(false);
			PLACEMENT_MODULE.setPlacementForEdit(obj);
			PLACEMENT_MODULE.placementSubmit(obj);
		});
	},
	
	checklistPlacement : function(button) {
		button.show().unbind('click').click(function() { 
			var obj = PLACEMENT_MODULE.placement;

			CHECKLIST_MODULE.getChecklist(PLACEMENT_MODULE.user_id, obj);
		});
	},
	
	mapPlacement : function(button) {
		button.unbind('click').click(function() { 
			var obj = PLACEMENT_MODULE.placement;

			MAP_MODULE.showPoint(obj);
		});
	},

	deletePlacement : function(button) {
		button.show().unbind('click').click(function() {
			var obj = PLACEMENT_MODULE.placement;

			if (confirm("Are you sure you want to delete this placement?")) {
				runAJAXSerial('', {
					page : 'placement/deleteplacements',
					id : obj['id']
				}, function(response) {
					$('#placementMenu').popup('close');
					
					PLACEMENT_MODULE.reload();
				}, function(data,status,xhr) {

				});
			}
		});
	},
	


	newPlacement : function(me) {
		var button = $("#add-placement-button");
		
		if (me) {
			button.show().unbind('click').click(function() {
				$.mobile.changePage("#placement-edit-page", { 
					transition: "slide"
				});
				
				PLACEMENT_MODULE.setPlacementForEdit(null);
				PLACEMENT_MODULE.setDateFields(true);
				PLACEMENT_MODULE.placementSubmit(null);

				return false;
			});
		} else {
			button.hide();
		}
	},

	setPlacementForEdit : function(obj) {
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
	
	setDateFields : function(setCurrentDate) {
		var elements = $("#placement-edit-form").find("input[type=date]");
		dateHandler(elements, setCurrentDate, function() {}, false);
	},

	placementSubmit : function(obj) {
		$("#placement-edit-form").unbind('submit').submit(function() {

			var user = GLOBAL_DATA.user;

			if (obj == null) {	
				var obj = {
					page : "placement/addplacements",
					user_id : user['id']
				};
			} else {
				var obj = {
					page : "placement/setplacements",
					id : obj['id']
				};
			}
			
			runAJAXSerial($(this).serialize(), obj, function(response) {
				history.back();
				PLACEMENT_MODULE.getPlacements(user['id']);
			}, function(data,status,xhr) {

			});

			return false;
		});
	}
};