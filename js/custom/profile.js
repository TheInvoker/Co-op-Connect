var PROFILE_MODULE = {
	
	// PUBLIC

	getProfile : function(user_id) {
		runAJAXSerial('', {
			page : 'user/getprofile',
			id : user_id
		}, function(response) {
			$.mobile.changePage(PROFILE_MODULE.context, { 
				transition: "slide"
			});
			
			PROFILE_MODULE.displayProfile(response, user_id);
			
			PROFILE_MODULE.editProfileHandler(response, user_id);
		}, function(data,status,xhr) {
			
		});
	},
	
	// PRIVATE

	context : "#profile-page",

	displayProfile : function(response, user_id) {
		var user = GLOBAL_DATA.user;
		
		$(PROFILE_MODULE.context).find("#profile-fullname").html(response['firstname'] + ' ' + response['lastname']);
		$(PROFILE_MODULE.context).find("#profile-avatar-image").attr("src", response['picURL']=='' ? GLOBAL_DATA.def_image_link : response['picURL']);

		if (response['status']) {
			$(PROFILE_MODULE.context).find("#profile-status").show().html(Autolinker.link(response['status']));
		} else {
			$(PROFILE_MODULE.context).find("#profile-status").hide();
		}
		$(PROFILE_MODULE.context).find("#profile-biotext").html(Autolinker.link(response['biotext']));
		
		$(PROFILE_MODULE.context).find("#profile-role").html(getColorCodeTag(response['role_name'], response['r_color']));
		$(PROFILE_MODULE.context).find("#profile-department").html(getColorCodeTag(response['department_name'], response['d_color']));
		$(PROFILE_MODULE.context).find("#profile-datejoined").html(response['datejoined']);
		
		$(PROFILE_MODULE.context).find("#profile-email").attr("href", "mailto:" + response['email']);
		$(PROFILE_MODULE.context).find("#profile-phone").attr("href", "tel:+" + response['phone']);
		$(PROFILE_MODULE.context).find("#profile-site").attr("href", $(Autolinker.link(response['website'])).attr("href"));
		$(PROFILE_MODULE.context).find("#profile-placements").unbind('click').click(function() {
			PLACEMENT_MODULE.getPlacements(user_id);
		});
		if (user['id'] == user_id) {
			$(PROFILE_MODULE.context).find("#profile-message").hide();
		} else {
			$(PROFILE_MODULE.context).find("#profile-message").show().unbind('click').click(function() {
				PROFILE_MODULE.createThread(user_id);
			});
		}
	},
	
	createThread : function(user_id) {
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
	},
	
	editProfileHandler : function(response, user_id) {
		var user = GLOBAL_DATA.user;
		
		if (user_id == user['id']) {
			$(PROFILE_MODULE.context).find("#profile-edit-button").show().unbind('click').click(function() {
				PROFILE_EDIT_MODULE.editProfileHandler(response, user_id);
			});
		} else {
			$(PROFILE_MODULE.context).find("#profile-edit-button").hide();
		}
	}
};