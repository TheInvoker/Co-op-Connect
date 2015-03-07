var REGISTER_MODULE = {
	
	// PUBLIC

	register : function() {
		$.mobile.changePage( REGISTER_MODULE.context, { 
			transition: "slideup"
		});	
		
		$(REGISTER_MODULE.context).find("#register-form").unbind('submit').submit(function() {
			
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
		$(REGISTER_MODULE.context).find("#register-form").find("input").val("");
	},

	// PRIVATE

	context : "#register-page"
};