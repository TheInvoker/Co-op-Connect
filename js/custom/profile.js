var PROFILE_MODULE_OBJ = function() {
    
    var context = "#profile-page";

    this.getProfile = function(user_id) {
        runAJAXSerial('', {
            page : 'user/getprofile',
            id : user_id
        }, function(response) {
            $.mobile.changePage(context, { 
                transition: "slide"
            });
            
            displayProfile(response, user_id);
            
            editProfileHandler(response, user_id);
        }, function(data,status,xhr) {
            
        });
    };
    
    var displayProfile = function(response, user_id) {
        var user = GLOBAL_DATA.user;
        
        $(context).find("#profile-fullname").html(response['firstname'] + ' ' + response['lastname']);
        $(context).find("#profile-avatar-image").attr("src", response['picURL']=='' ? GLOBAL_DATA.def_image_link : response['picURL']);

        if (response['status']) {
            $(context).find("#profile-status").show().html(Autolinker.link(response['status']));
        } else {
            $(context).find("#profile-status").hide();
        }
        $(context).find("#profile-biotext").html(Autolinker.link(response['biotext']));
        
        $(context).find("#profile-role").html(getColorCodeTag(response['role_name'], response['r_color']));
        $(context).find("#profile-department").html(getColorCodeTag(response['department_name'], response['d_color']));
        $(context).find("#profile-datejoined").html(response['datejoined']);
        
        $(context).find("#profile-email").attr("href", "mailto:" + response['email']);
        $(context).find("#profile-phone").attr("href", "tel:+" + response['phone']);
        $(context).find("#profile-site").attr("href", $(Autolinker.link(response['website'])).attr("href"));
        $(context).find("#profile-placements").unbind('click').click(function() {
            PLACEMENT_MODULE.getPlacements(user_id);
        });
        if (user['id'] == user_id) {
            $(context).find("#profile-message").hide();
        } else {
            $(context).find("#profile-message").show().unbind('click').click(function() {
                createThread(user_id);
            });
        }
    };
    
    var createThread = function(user_id) {
        var user = GLOBAL_DATA.user;
        
        runAJAXSerial('', {
            page : 'message/setthread',
            target_ids : user_id,
            user_id : user['id']
        }, function(response) {
            var thread_id = response['id'];
            MESSAGE_MODULE.gotoMessage(thread_id);
        }, function(data,status,xhr) {
            
        });
    };
    
    var editProfileHandler = function(response, user_id) {
        var user = GLOBAL_DATA.user;
        
        if (user_id == user['id']) {
            $(context).find("#profile-edit-button").show().unbind('click').click(function() {
                PROFILE_EDIT_MODULE.editProfileHandler(response, user_id);
            });
        } else {
            $(context).find("#profile-edit-button").hide();
        }
    };
};

var PROFILE_MODULE = new PROFILE_MODULE_OBJ();