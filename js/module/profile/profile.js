var PROFILE_MODULE = new function() {
    
    var context = "#profile-page",
        response = null,
        user_id = null,
		callerContext = null;

    $(context).on('click',"#profile-edit-button",function() {
		
        PROFILE_EDIT_MODULE.editProfileHandler(response);
		
    }).on('click',"#profile-back-button",function() {
		
        changePage(callerContext, function(){});
		
    }).on('click',"#profile-placements",function() {
		
        PLACEMENT_MODULE.getPlacements(user_id);
		
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
			callerContext = getCurrentPage();
			
            changePage(context,function(){});
            
            displayProfile();
            
            editProfileHandler();
			
        }, function(data,status,xhr) {
            
        });
    };
	
	this.getContext = function() {
		return context;
	};
    
	this.MVC = {
		setFullName : function(firstname, lastname) {
			response['firstname'] = firstname;
			response['lastname'] = lastname;
			$(context).find("#profile-fullname").html(firstname + ' ' + lastname);
		},
		setImage : function(url) {
			response['picURL'] = url;
			$(context).find("#profile-avatar-image").attr("src", url=='' ? GLOBAL_DATA.def_image_link : url);
		},
		setStatus : function(status) {
			response['status'] = status;
			if (status) {
				$(context).find("#profile-status").show().html(Autolinker.link(status));
			} else {
				$(context).find("#profile-status").hide();
			}
		},
		setBioText : function(biotext) {
			response['biotext'] = biotext;
			$(context).find("#profile-biotext").html(Autolinker.link(biotext));
		},
		setRole : function(role) {
			response['role_name'] = role;
			$(context).find("#profile-role").html(getColorCodeTag(role, response['r_color']));
		},
		setDepartment : function(department) {
			response['department_name'] = department;
			$(context).find("#profile-department").html(getColorCodeTag(department, response['d_color']));
		},
		setDateJoined : function(date) {
			response['datejoined'] = date;
			$(context).find("#profile-datejoined").html(date);
		},
		setEmail : function(email) {
			response['email'] = email;
			$(context).find("#profile-email").attr("href", "mailto:" + email);
		},
		setPhone : function(phone) {
			response['phone'] = phone;
			$(context).find("#profile-phone").attr("href", "tel:+" + phone);
		},
		setSite : function(url) {
			response['website'] = url;
			$(context).find("#profile-site").attr("href", $(Autolinker.link(url)).attr("href"));
		}
	};
	
    var displayProfile = function() {
        var user = GLOBAL_DATA.user;
        
		PROFILE_MODULE.MVC.setFullName(response['firstname'], response['lastname']);
		PROFILE_MODULE.MVC.setImage(response['picURL']);
		PROFILE_MODULE.MVC.setStatus(response['status']);
		PROFILE_MODULE.MVC.setBioText(response['biotext']);
		PROFILE_MODULE.MVC.setRole(response['role_name']);
		PROFILE_MODULE.MVC.setDepartment(response['department_name']);
		PROFILE_MODULE.MVC.setDateJoined(response['datejoined']);
		PROFILE_MODULE.MVC.setEmail(response['email']);
		PROFILE_MODULE.MVC.setPhone(response['phone']);
		PROFILE_MODULE.MVC.setSite(response['website']);

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