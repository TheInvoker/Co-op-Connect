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
			
			$.mobile.changePage(PLACEMENT_MODULE.context, { 
				transition: "slide"
			});

			// add data to listview
			PLACEMENT_MODULE.displayPlacements(me, response);
			
			// handle clicks
			PLACEMENT_MODULE.clickHandler(response);
			
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
	
	context : "#placement-page",
	placement : null,
	user_id : null,

	init : (function() { 
		$(document).ready(function() {
		});
	})(),

	displayPlacements : function(me, response) {
		var list = $(PLACEMENT_MODULE.context).find("#placement-list");
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

	clickHandler : function(response) {
		var items = $(PLACEMENT_MODULE.context).find("#placement-list > li > a");
		
		// when clicked, store the obj reference
		items.unbind('click').click(function() {
			var index = items.index(this);
			PLACEMENT_MODULE.placement = response[index];
		});
	},

	menuHandler : function(me, response) {

		// set up menu handler
		var editButton = $(PLACEMENT_MODULE.context).find("#placement-edit-button");
		var checklistButton = $(PLACEMENT_MODULE.context).find("#placement-checklist-button");
		var mapButton = $(PLACEMENT_MODULE.context).find("#placement-map-button");
		var deleteButton = $(PLACEMENT_MODULE.context).find("#placement-delete-button");
		
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
			var obj = PLACEMENT_MODULE.placement;

			PLACEMENT_EDIT_MODULE.setPlacementForEdit(obj);
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
					$(PLACEMENT_MODULE.context).find('#placement-panel').panel('close');
					PLACEMENT_MODULE.reload();
				}, function(data,status,xhr) {

				});
			}
		});
	},
	
	newPlacement : function(me) {
		var button = $(PLACEMENT_MODULE.context).find("#add-placement-button");
		
		if (me) {
			button.show().unbind('click').click(function() {
				PLACEMENT_EDIT_MODULE.newPlacement();
			});
		} else {
			button.hide();
		}
	}
};