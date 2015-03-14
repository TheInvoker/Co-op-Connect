var LOGIN_MODULE_OBJ = function() {
    
    var context = "#login-page";
	
	swipePanel(context, "#login-panel");
	
	// configure login button click
	$(context).on('submit', "#login-form", function() {
		
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

	// configure register button click
	$(context).on('click', "#register-button", function() {
		REGISTER_MODULE.register();
	});

	// configure forgot password button click
	$(context).on('click', "#forgot-button", function() {
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
};

var LOGIN_MODULE = new LOGIN_MODULE_OBJ();