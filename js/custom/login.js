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
		setPageShowHide();
		configureShakeToGoBack();

		LOGIN_MODULE.login();
		LOGIN_MODULE.register();
		LOGIN_MODULE.forgot();
	},
	
	login : function() {
		$(LOGIN_MODULE.context).find("#login-form").submit(function() {
			
			runAJAXSerial($(this).serialize(), {
				ad : 0,
				page : "user/login"
			}, function(response) {
				GLOBAL_DATA.user = response;

				MENU_MODULE.initMenu();	
			}, function(data,status,xhr) {
				
			});

			return false;
		});
	},
	
	register : function() {
		$(LOGIN_MODULE.context).find("#register-button").click(function(){
			REGISTER_MODULE.register();
		});
	},
	
	forgot : function() {
		$(LOGIN_MODULE.context).find("#forgot-button").click(function(){
			var email = prompt("Please enter your email adress:", "");
			
			if (email != null) {
				email = email.trim();
				
				runAJAXSerial("", {
					email : email,
					page : "user/forgot"
				}, function(response) {
					alert('A confirmation email has been sent to you.');
				}, function(data,status,xhr) {
					
				});
			}
		});
	}
};