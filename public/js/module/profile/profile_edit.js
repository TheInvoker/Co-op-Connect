var PROFILE_EDIT_MODULE = new function() {
    
    var context = "#profile-edit-page";

    $(context).on('submit', "#profile-edit-form", function() {
        
        // this html5 way supports attaching images 
        var formData = new FormData(this);

        runAJAXHTML5(formData, {
            page : 'user/setprofile'
        }, function(response) {
			var data = getFormData('#profile-edit-form');
			
			PROFILE_MODULE.MVC.setFullName(data['firstname'], data['lastname']);
			if (data['file']) PROFILE_MODULE.MVC.setImage(data['file']);
			PROFILE_MODULE.MVC.setStatus(data['status']);
			PROFILE_MODULE.MVC.setBioText(data['biotext']);
			PROFILE_MODULE.MVC.setDepartment(data['department']);
			PROFILE_MODULE.MVC.setEmail(data['email']);
			PROFILE_MODULE.MVC.setPhone(data['phone']);
			PROFILE_MODULE.MVC.setSite(data['website']);
			
			changePage(PROFILE_MODULE.getContext(),function(){});
			
			showNotification("Profile Saved", "", function() {
			});
        }, function(data,status,xhr) {
            
        });

        return false;
		
    }).on('click',"#profile-edit-cancel-button",function() {
		
		changePage(PROFILE_MODULE.getContext(),function(){});
		
    });

    this.editProfileHandler = function(response) {
		changePage(context,function(){});
        
        setProfileForEdit(response);
    };
    
    var setProfileForEdit = function(user) {
		var context = $("#profile-edit-form", context);
		
		context.find("input[name=file]").val('');

        context.find("input[name=firstname]").val(user['firstname']);
        context.find("input[name=lastname]").val(user['lastname']);
        context.find("input[name=email]").val(user['email']);
        context.find("input[name=phone]").val(user['phone']);
        context.find("input[name=website]").val(user['website']);
        context.find("textarea[name=status]").html(user['status']);
        context.find("textarea[name=biotext]").html(user['biotext']);
        
        context.find("#profile_edit_department_rb").find("input").prop("checked", false);
        context.find("#profile_edit_department_rb").find("input[value='" + unescapeHTML(user['department_name']) + "']").prop("checked", true);
    };
};