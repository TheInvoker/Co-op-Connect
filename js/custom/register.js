var REGISTER_MODULE_OBJ = function() {
    
    var context = "#register-page";

    this.register = function() {
        $.mobile.changePage( context, { 
            transition: "slideup"
        });    
        
        $(context).find("#register-form").unbind('submit').submit(function() {
            
            runAJAXSerial($(this).serialize(), {
                page : 'user/register'
            }, function(response) {
                history.back();
            }, function(data,status,xhr) {

            });

            return false;
        });
    };
    
    this.resetForm = function() {
        $(context).find("#register-form").find("input").val("");
    };
};

var REGISTER_MODULE = new REGISTER_MODULE_OBJ();