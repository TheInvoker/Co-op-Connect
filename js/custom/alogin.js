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
		$(document).ready(function() {
			LOGIN_MODULE.login();
		});
	},
	
	login : function() {
		$("#login-form").unbind('submit').submit(function() {
			
			var formData = $(this).serialize();
			formData += '&ad=1&page=user/login';
			
			$.ajax({
				type: 'POST',
				url: GLOBAL_DATA.server_link,
				data: formData,
				dataType: 'json',
				success: function(jsonData) {
					handleResponse(jsonData, function(response) {
						GLOBAL_DATA.user = response;
						
						$.mobile.changePage( "#menu-page", { 
							transition: "slide"
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
	}
};

LOGIN_MODULE.appLoad();