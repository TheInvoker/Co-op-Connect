var LOGIN_MODULE_OBJ = function() {
    
    var context = "#login-page";
	
	swipePanel(context, "#login-panel");
	
    this.initApp = function() {
        login();
        register();
        forgot();
    };
    
    var login = function() {
        $(context).find("#login-form").submit(function() {
            
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
    };
    
    var register = function() {
        $(context).find("#register-button").click(function(){
            REGISTER_MODULE.register();
        });
    };
    
    var forgot = function() {
        $(context).find("#forgot-button").click(function(){
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
};

var LOGIN_MODULE = new LOGIN_MODULE_OBJ();