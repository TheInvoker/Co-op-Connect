var LOGIN_MODULE = {
	
	appLoad : function () {
		var i = document.location.href.indexOf("#");
		if (i != -1) {
			document.location.href = document.location.href.substring(0, i);
		} else {
			this.initApp();
		}
	},
	
	initApp : function() {
		setPageShowHide();

		$(document).ready(function() {
			LOGIN_MODULE.login();
			
			LOGIN_MODULE.register();
			
			LOGIN_MODULE.forgot();
		});
	},
	
	login : function() {
		$("#login-form").unbind('submit').submit(function() {
			
			var formData = $(this).serialize();
			formData += '&ad=0&page=user/login';
			
			$.ajax({
				type: 'POST',
				url: GLOBAL_DATA.server_link,
				data: formData,
				dataType: 'json',
				success: function(jsonData) {
					handleResponse(jsonData, function(response) {
						GLOBAL_DATA.user = response;
						
						$.mobile.changePage( "#menu-page", { 
							transition: "flip"
						});

						MENU_MODULE.initMenu();					
					});
				},
				error: function(data,status,xhr) {
					alert('Error Occured!');
				}
			});

			return false;
		});
	},
	
	register : function() {
		$("#register-button").unbind('click').click(function(){
			REGISTER_MODULE.register();
		});
	},
	
	forgot : function() {
		$("#forgot-button").unbind('click').click(function(){
			var email = prompt("Please enter your email adress:", "");
			
			if (email != null) {
				email = email.trim();
				
				$.ajax({
					type: 'POST',
					url: GLOBAL_DATA.server_link,
					data: 'page=user/forgot&email=' + email,
					dataType: 'json',
					success: function(jsonData) {
						handleResponse(jsonData, function(response) {
							alert('Password Sent!');
						});
					},
					error: function(data,status,xhr) {
						alert('Error Occured!');
					}
				});
			}
		});
	}
};

LOGIN_MODULE.appLoad();