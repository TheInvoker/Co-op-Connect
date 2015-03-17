var LOGIN_MODULE = new function() {

    var context = "#login-page";

	$(context).on('submit', "#login-form", function() {
		
		// set up login button click
		runAJAXSerial($(this).serialize(), {
			ad : 1,
			page : "user/login"
		}, function(response) {
			GLOBAL_DATA.user = response;

			GRID_MODULE.setGrid();
		}, function(data,status,xhr) {
			
		});

		return false;
		
	});
};