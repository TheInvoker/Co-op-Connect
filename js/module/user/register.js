var REGISTER_MODULE = new function() {
    
    var context = "#register-page";

    $(context).on('submit', "#register-form", function() {
        
        runAJAXSerial($(this).serialize(), {
            page : 'user/register'
        }, function(response) {
			changePage(LOGIN_MODULE.getContext(), function(){});
			showNotification("Registered", "", function() {
			});
        }, function(data,status,xhr) {

        });

        return false;
		
    }).on('click', "#register-cancel-button", function() {
		changePage(LOGIN_MODULE.getContext(), function(){});
	});

    this.register = function() {
        $(context).find("#register-form").trigger("reset");
		changePage(context,function(){});
    };
    
    var resetForm = function() {
        $(context).find("#register-form").find("input").val("");
    };
};