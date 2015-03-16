var LOGIN_MODULE_OBJ = function() {
    
    var context = "#login-page";
	
	swipePanel(context, "#login-panel");
	
	$(context).on('submit', "#login-form", function() {
		
		// configure login button click
		runAJAXSerial($(this).serialize(), {
			ad : 0,
			page : "user/login"
		}, function(response) {
			GLOBAL_DATA.user = response;

			GRID_MODULE.setGrid();  
		}, function(data,status,xhr) {
			
		});

		return false;
		
	}).on('click', "#register-button", function() {
		
		// configure register button click
		REGISTER_MODULE.register();
		
	}).on('click', "#forgot-button", function() {
		
		// configure forgot password button click
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