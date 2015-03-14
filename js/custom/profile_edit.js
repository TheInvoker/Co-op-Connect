var PROFILE_EDIT_MODULE_OBJ = function() {
    
    var context = "#profile-edit-page",
        user_id = null;

    $(context).on('submit', "#profile-edit-form", function() {
        
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

    this.editProfileHandler = function(response, uid) {
        user_id = uid;

        $.mobile.changePage(context, { 
            transition: "slide"
        });
        
        setProfileForEdit(response);
    };
    
    var setProfileForEdit = function(user) {
        var input = $(context).find("#profile-edit-form").find("input[name=file]");
        
        input.val('');
        
        $(context).find("#profile-edit-form").find("input[name=firstname]").val(user['firstname']);
        $(context).find("#profile-edit-form").find("input[name=lastname]").val(user['lastname']);
        $(context).find("#profile-edit-form").find("input[name=email]").val(user['email']);
        $(context).find("#profile-edit-form").find("input[name=phone]").val(user['phone']);
        $(context).find("#profile-edit-form").find("input[name=website]").val(user['website']);
        $(context).find("#profile-edit-form").find("textarea[name=status]").html(user['status']);
        $(context).find("#profile-edit-form").find("textarea[name=biotext]").html(user['biotext']);
        
        var all = $(context).find("#profile_edit_department_rb").find("input");
        var e = $(context).find("#profile_edit_department_rb").find("input[value='" + unescapeHTML(user['department_name']) + "']");
        all.prop("checked", false);
        e.prop("checked", true);
        all.checkboxradio( "refresh" );
    };
};

var PROFILE_EDIT_MODULE = new PROFILE_EDIT_MODULE_OBJ();