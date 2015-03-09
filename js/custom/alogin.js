var LOGIN_MODULE_OBJ = function() {

    var context = "#login-page";

    this.initApp = function() {
        login();
    };
    
    var login = function() {
        $(context).find("#login-form").submit(function() {
            
            var formData = $(this).serialize();

            runAJAXSerial(formData, {
                ad : 1,
                page : "user/login"
            }, function(response) {
                GLOBAL_DATA.user = response;

                MENU_MODULE.initMenu();    
            }, function(data,status,xhr) {
                
            });

            return false;
        });
    };
};

var LOGIN_MODULE = new LOGIN_MODULE_OBJ();