var PLACEMENT_EDIT_MODULE = {
	
	// PUBLIC

	newPlacement : function() {
		PLACEMENT_EDIT_MODULE.switchPage();
		
		PLACEMENT_EDIT_MODULE.setFormFields(null);
		PLACEMENT_EDIT_MODULE.setDateFields(true);
		PLACEMENT_EDIT_MODULE.placementSubmit(null);
	},

	setPlacementForEdit : function(obj) {
		PLACEMENT_EDIT_MODULE.switchPage();
		
		PLACEMENT_EDIT_MODULE.setFormFields(obj);
		PLACEMENT_EDIT_MODULE.setDateFields(false);
		PLACEMENT_EDIT_MODULE.placementSubmit(obj['id']);
	},
	
	// PRIVATE
	
	context : "#placement-edit-page",

	switchPage : function() {
		$.mobile.changePage(PLACEMENT_EDIT_MODULE.context, { 
			transition: "slide"
		});
	},

	setFormFields : function(obj) {

		var swt = $(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("select[name=active]");
		var addr = $(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=address]");

		if (obj) {
			addr.val(obj['address'] + ', ' + obj['city'] + ', ' + obj['country']);

			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=lat]").val(obj['latitude']);
			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=lng]").val(obj['longitude']);
			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=name]").val(obj['address']);
			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=locality]").val(obj['city']);
			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=country]").val(obj['country']);
			
			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=role]").val(obj['topic']);
			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=company]").val(obj['organization']);
			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=date_start]").val(obj['date_started']);
			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[name=date_end]").val(obj['date_finished']);
			
			swt.val(obj['active']);
		} else {
			
			$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input").val("");
			
			swt.val('1');
		}
		
		addr.geocomplete({ 
			details: "#placement-edit-form" 
		});

		swt.slider('refresh');
	},
	
	setDateFields : function(setCurrentDate) {
		var elements = $(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").find("input[type=date]");
		dateHandler(elements, setCurrentDate, function() {}, false);
	},

	placementSubmit : function(pid) {
		$(PLACEMENT_EDIT_MODULE.context).find("#placement-edit-form").unbind('submit').submit(function() {

			var user = GLOBAL_DATA.user;

			if (pid == null) {	
				var obj = {
					page : "placement/addplacements",
					user_id : user['id']
				};
			} else {
				var obj = {
					page : "placement/setplacements",
					id : pid
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