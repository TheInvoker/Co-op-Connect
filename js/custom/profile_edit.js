var PROFILE_EDIT_MODULE = {
	
	// PUBLIC

	editProfileHandler : function(response, user_id) {
		$.mobile.changePage("#profile-edit-page", { 
			transition: "slide"
		});
		
		PROFILE_EDIT_MODULE.setProfileForEdit(response);
		PROFILE_EDIT_MODULE.profileSubmit(user_id);
	},
	
	// PRIVATE
	
	setProfileForEdit : function(user) {
		var input = $("#profile-edit-form").find("input[name=file]");
		if (input.val()) { 
			input.val('');
		}
		
		$("#profile-edit-form").find("input[name=firstname]").val(user['firstname']);
		$("#profile-edit-form").find("input[name=lastname]").val(user['lastname']);
		$("#profile-edit-form").find("input[name=email]").val(user['email']);
		$("#profile-edit-form").find("input[name=phone]").val(user['phone']);
		$("#profile-edit-form").find("input[name=website]").val(user['website']);
		$("#profile-edit-form").find("textarea[name=status]").html(user['status']);
		$("#profile-edit-form").find("textarea[name=biotext]").html(user['biotext']);
		
		var all = $("#profile_edit_department_rb").find("input");
		var e = $("#profile_edit_department_rb").find("input[value='"+user['department_name']+"']");	
		all.prop("checked", false);
		e.prop("checked", true);
		all.checkboxradio( "refresh" );
	},
	
	profileSubmit : function(user_id) {
		$("#profile-edit-form").unbind('submit').submit(function() {
			
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