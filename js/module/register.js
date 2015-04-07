var REGISTER_MODULE = new function() {
    
    var context = "#register-page";

    registerShowEvent(context, function(prev_id) {
        resetForm();
    });

    $(context).on('submit', "#register-form", function() {
        
        runAJAXSerial($(this).serialize(), {
            page : 'user/register'
        }, function(response) {
			$.mobile.changePage( LOGIN_MODULE.getContext(), { 
				transition: "slideup",
				reverse: true
			});    
			showNotification("Registered", "");
        }, function(data,status,xhr) {

        });

        return false;
		
    });

    this.register = function() {
        $.mobile.changePage( context, { 
            transition: "slideup"
        });    
    };
    
    var resetForm = function() {
        $(context).find("#register-form").find("input").val("");
    };
};