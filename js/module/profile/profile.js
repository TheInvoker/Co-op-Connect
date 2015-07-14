var PROFILE_MODULE = new function() {
    
    var context = "#profile-page",
        response = null,
        user_id = null;

    $(context).on('click',"#profile-edit-button",function() {
		
        PROFILE_EDIT_MODULE.editProfileHandler(response);
		
    }).on('click',"#profile-placements",function() {
		
        PLACEMENT_MODULE.getPlacements(GLOBAL_DATA.user["id"]);
		
    }).on('click',"#profile-message",function() {
		
        createThread();
		
    });

    this.getProfile = function(uid) {
        runAJAXSerial('', {
            page : 'user/getprofile',
            id : uid
        }, function(res) {
            response = res;
            user_id = uid;

            changePage(context);
            
            displayProfile();
            
            editProfileHandler();
            
        }, function(data,status,xhr) {
            
        });
    };
	
	this.showPage = function() {
		changePage(context);
	};
    
    var displayProfile = function() {
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

        var button = $(context).find("#profile-message");
        if (user['id'] == user_id) {
            button.hide();
        } else {
            button.show();
        }
    };

    var editProfileHandler = function() {
        var user = GLOBAL_DATA.user, button = $(context).find("#profile-edit-button");
        
        if (user_id == user['id']) {
            button.show();
        } else {
            button.hide();
        }
    };

    var createThread = function() {
        runAJAXSerial('', {
            page : 'message/setthread',
            target_ids : user_id
        }, function(response) {
            var thread_id = response['id'];
            MESSAGE_MODULE.gotoMessage(thread_id);
        }, function(data,status,xhr) {
            
        });
    };
};