var PROFILE_EDIT_MODULE = {
	
	// PUBLIC

	editProfileHandler : function(response, user_id) {
		$.mobile.changePage(PROFILE_EDIT_MODULE.context, { 
			transition: "slide"
		});
		
		PROFILE_EDIT_MODULE.setProfileForEdit(response);
		PROFILE_EDIT_MODULE.profileSubmit(user_id);
	},
	
	// PRIVATE
	
	context : "#profile-edit-page",

	setProfileForEdit : function(user) {
		var input = $(PROFILE_EDIT_MODULE.context).find("#profile-edit-form").find("input[name=file]");
		
		input.val('');
		
		$(PROFILE_EDIT_MODULE.context).find("#profile-edit-form").find("input[name=firstname]").val(user['firstname']);
		$(PROFILE_EDIT_MODULE.context).find("#profile-edit-form").find("input[name=lastname]").val(user['lastname']);
		$(PROFILE_EDIT_MODULE.context).find("#profile-edit-form").find("input[name=email]").val(user['email']);
		$(PROFILE_EDIT_MODULE.context).find("#profile-edit-form").find("input[name=phone]").val(user['phone']);
		$(PROFILE_EDIT_MODULE.context).find("#profile-edit-form").find("input[name=website]").val(user['website']);
		$(PROFILE_EDIT_MODULE.context).find("#profile-edit-form").find("textarea[name=status]").html(user['status']);
		$(PROFILE_EDIT_MODULE.context).find("#profile-edit-form").find("textarea[name=biotext]").html(user['biotext']);
		
		var all = $(PROFILE_EDIT_MODULE.context).find("#profile_edit_department_rb").find("input");
		var e = $(PROFILE_EDIT_MODULE.context).find("#profile_edit_department_rb").find("input[value='"+user['department_name']+"']");	
		all.prop("checked", false);
		e.prop("checked", true);
		all.checkboxradio( "refresh" );
	},
	
	profileSubmit : function(user_id) {
		$(PROFILE_EDIT_MODULE.context).find("#profile-edit-form").unbind('submit').submit(function() {
			
			// this html5 way supports attaching images 
			var formData = new FormData(this);

			runAJAXHTML5(formData, {
				id : user_id,
				page : 'user/setprofile'
			}, function(response) {
				history.back();
				PROFILE_MODULE.getProfile(user_id);
			}, function(data,status,xhr) {
				
			});

			return false;
		});
	}
};