var LOGIN_MODULE = {
	
	// PUBLIC

	appLoad : function () {
		if (!goHomePage()) {
			this.initApp();
		}
	},
	
	// PRIVATE
	
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
		$("#register-button").unbind('click').click(function(){
			REGISTER_MODULE.register();
		});
	},
	
	forgot : function() {
		$("#forgot-button").unbind('click').click(function(){
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

LOGIN_MODULE.appLoad();