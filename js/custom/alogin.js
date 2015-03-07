var LOGIN_MODULE = {
	
	// PUBLIC

	// PRIVATE

	context : "#login-page",

	init : (function() { 
		if (!goHomePage()) {
			$(document).ready(function() {
				LOGIN_MODULE.initApp();
			});
		}
	})(),

	initApp : function() {
		setAPageShowHide();
		configureShakeToGoBack();

		LOGIN_MODULE.login();
	},
	
	login : function() {
		$(LOGIN_MODULE.context).find("#login-form").submit(function() {
			
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