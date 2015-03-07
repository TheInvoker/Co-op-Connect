var RESET_MODULE = {
	
	// PUBLIC
	
	initReset : function() {

		$(RESET_MODULE.context).find("#reset-form").unbind('submit').submit(function() {
			
			var token = getUrlParameter('token');
			var id = getUrlParameter('id');
	
			runAJAXSerial($(this).serialize(), {
				token : token,
				id : id,
				page : "user/reset"
			}, function(response) {
				alert('Password has been updated.');
			}, function(data,status,xhr) {
				
			});
				
			return false;
		});
	},
	
	// PRIVATE
	
	context : "#reset-page"
};