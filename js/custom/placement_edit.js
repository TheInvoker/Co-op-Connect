var PLACEMENT_EDIT_MODULE = {
	
	// PUBLIC

	newPlacement : function() {
		$.mobile.changePage("#placement-edit-page", { 
			transition: "slide"
		});
		
		PLACEMENT_EDIT_MODULE.setFormFields(null);
		PLACEMENT_EDIT_MODULE.setDateFields(true);
		PLACEMENT_EDIT_MODULE.placementSubmit(null);
	},

	setPlacementForEdit : function(obj) {
		$.mobile.changePage("#placement-edit-page", { 
			transition: "slide"
		});
		

		PLACEMENT_EDIT_MODULE.setFormFields(obj);
		PLACEMENT_EDIT_MODULE.setDateFields(false);
		PLACEMENT_EDIT_MODULE.placementSubmit(obj);
	},
	
	// PRIVATE
	
	setFormFields : function(obj) {
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