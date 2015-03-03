var REGISTER_MODULE = {
	
	// PUBLIC

	register : function() {
		$.mobile.changePage( "#register-page", { 
			transition: "slideup"
		});	
		
		$("#register-form").unbind('submit').submit(function() {
			
			runAJAXSerial($(this).serialize(), {
				page : 'user/register'
			}, function(response) {
				history.back();
			}, function(data,status,xhr) {

			});

			return false;
		});
	},
	
	resetForm : function() {
		$("#register-form").find("input").val("");
	}

	// PRIVATE
};