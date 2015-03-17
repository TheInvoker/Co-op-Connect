var PROFILE_EDIT_MODULE = new function() {
    
    var context = "#profile-edit-page",
        user_id = null;

    $(context).on('submit', "#profile-edit-form", function() {
        
        // this html5 way supports attaching images 
        var formData = new FormData(this);

        runAJAXHTML5(formData, {
            id : user_id,
            page : 'user/setprofile'
        }, function(response) {
            PROFILE_MODULE.getProfile(user_id);
        }, function(data,status,xhr) {
            
        });

        return false;
		
    });

    this.editProfileHandler = function(response, uid) {
        user_id = uid;

        $.mobile.changePage(context, { 
            transition: "slide"
        });
        
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
        
        context.find("#profile_edit_department_rb").find("input").prop("checked", false).checkboxradio( "refresh" );
        context.find("#profile_edit_department_rb").find("input[value='" + unescapeHTML(user['department_name']) + "']").prop("checked", true).checkboxradio( "refresh" );
    };
};