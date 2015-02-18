var PROFILE_MODULE = {
	
	getProfile : function(user_id) {

		var formData = 'page=user/getprofile&id=' + user_id;
		
		$.ajax({
			type: 'POST',
			url: GLOBAL_DATA.server_link,
			data: formData,
			dataType: 'json',
			success: function(jsonData) {
				handleResponse(jsonData, function(response) {
					$.mobile.changePage("#profile-page", { 
						transition: "slide"
					});
					
					PROFILE_MODULE.displayProfile(response, user_id);
					PROFILE_MODULE.editProfileHandler(response, user_id);
				});
			},
			error: function(data,status,xhr) {
				alert('Error Occured!');
			}
		});
	},
	
	displayProfile : function(response, user_id) {
		var user = GLOBAL_DATA.user;
		
		$("#profile-fullname").html(response['firstname'] + ' ' + response['lastname']);
		$("#profile-avatar-image").attr("src", response['picURL']);

		$("#profile-status").html(Autolinker.link(response['status']));
		$("#profile-biotext").html(Autolinker.link(response['biotext']));
		
		$("#profile-email").attr("href", "mailto:" + response['email']);
		$("#profile-phone").attr("href", "tel:+" + response['phone']);
		$("#profile-site").html(Autolinker.link(response['website'])).find("a").html("Website");
		
		if (user['id'] == user_id) {
			$("#profile-message").hide();
		} else {
			$("#profile-message").show().unbind('click').click(function() {
				PROFILE_MODULE.createThread(user_id);
			});
		}
		
		$("#profile-placements").unbind('click').click(function() {
			PLACEMENT_MODULE.getPlacements(user_id);
		});
		
		var info = "I am a " + response['role_name'] + " from the " + response['department_name'] + " co-op department who joined in " + response['datejoined'] + ".";
		info += " My account is currently " + (response['active'] ? "Active" : "Inactive") + ".";
		$("#profile-info").html(info);
	},
	
	createThread : function(user_id) {
		var user = GLOBAL_DATA.user;
		
		runAJAXSerial('', {
			page : 'message/setthread',
			target_id : user_id,
			user_id : user['id']
		}, function(response) {
			var thread_id = response['id'];
			MESSAGE_MODULE.gotoMessage(thread_id);
		});
	},

	editProfileHandler : function(response, user_id) {
		var user = GLOBAL_DATA.user;
		
		if (user_id == user['id']) {
			$("#profile-edit-button").show().unbind('click').click(function() {
				$.mobile.changePage("#profile-edit-page", { 
					transition: "slide"
				});
				
				PROFILE_MODULE.setProfileForEdit(response, user_id);
				PROFILE_MODULE.profileSubmit(user, user_id);
			});
		} else {
			$("#profile-edit-button").hide();
		}
	},
	
	
	setProfileForEdit : function(user, user_id) {
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
			formData.append('id', user['id']);
			formData.append('page','user/setprofile');

			
			$.ajax({
				type: 'POST',
				url: GLOBAL_DATA.server_link,
				data: formData,
				dataType: 'json',
				contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false
				success: function(jsonData) {
					handleResponse(jsonData, function(response) {
						history.back();
						PROFILE_MODULE.getProfile(user_id);
					});
				},
				error: function(data,status,xhr) {
					alert('Error Occured!');
				}
			});

			return false;
		});
	}
};