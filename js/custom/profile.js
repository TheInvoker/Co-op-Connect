var PROFILE_MODULE = {
	
	// PUBLIC

	getProfile : function(user_id) {
		runAJAXSerial('', {
			page : 'user/getprofile',
			id : user_id
		}, function(response) {
			$.mobile.changePage("#profile-page", { 
				transition: "slide"
			});
			
			PROFILE_MODULE.displayProfile(response, user_id);
			
			PROFILE_MODULE.editProfileHandler(response, user_id);
		}, function(data,status,xhr) {
			
		});
	},
	
	// PRIVATE

	displayProfile : function(response, user_id) {
		var user = GLOBAL_DATA.user;
		
		$("#profile-fullname").html(response['firstname'] + ' ' + response['lastname']);
		$("#profile-avatar-image").attr("src", response['picURL']=='' ? GLOBAL_DATA.def_image_link : response['picURL']);

		if (response['status']) {
			$("#profile-status").show().html(Autolinker.link(response['status']));
		} else {
			$("#profile-status").hide();
		}
		$("#profile-biotext").html(Autolinker.link(response['biotext']));
		
		$("#profile-role").html(getColorCodeTag(response['role_name'], response['r_color']));
		$("#profile-department").html(getColorCodeTag(response['department_name'], response['d_color']));
		$("#profile-datejoined").html(response['datejoined']);
		
		$("#profile-email").attr("href", "mailto:" + response['email']);
		$("#profile-phone").attr("href", "tel:+" + response['phone']);
		$("#profile-site").attr("href", $(Autolinker.link(response['website'])).attr("href"));
		$("#profile-placements").unbind('click').click(function() {
			PLACEMENT_MODULE.getPlacements(user_id);
		});
		if (user['id'] == user_id) {
			$("#profile-message").hide();
		} else {
			$("#profile-message").show().unbind('click').click(function() {
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
			$("#profile-edit-button").show().unbind('click').click(function() {
				$.mobile.changePage("#profile-edit-page", { 
					transition: "slide"
				});
				
				PROFILE_MODULE.setProfileForEdit(response);
				PROFILE_MODULE.profileSubmit(user, user_id);
			});
		} else {
			$("#profile-edit-button").hide();
		}
	},
	
	
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
	
	profileSubmit : function(user, user_id) {
		$("#profile-edit-form").unbind('submit').submit(function() {
			
			// this html5 way supports attaching images 
			var formData = new FormData(this);

			runAJAXHTML5(formData, {
				id : user['id'],
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