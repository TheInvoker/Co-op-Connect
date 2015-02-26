var LOGIN_MODULE = {
	
	// PUBLIC

	appLoad : function () {
		if (!goHomePage()) {
			this.initApp();
		}
	},
	
	// PRIVATE

	initApp : function() {
		setAPageShowHide();
		
		$(document).ready(function() {
			LOGIN_MODULE.login();
		});
	},
	
	login : function() {
		$("#login-form").unbind('submit').submit(function() {
			
			var formData = $(this).serialize();

			runAJAXSerial(formData, {
				ad : 1,
				page : "user/login"
			}, function(response) {
				GLOBAL_DATA.user = response;

				MENU_MODULE.initMenu();	
			}, function(data,status,xhr) {
				
			});

			return false;
		});
	}
};

LOGIN_MODULE.appLoad();