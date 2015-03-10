var RESET_MODULE_OBJ = function() {
    
    var context = "#reset-page";
    
    $(document).ready(function() {

        $(context).find("#reset-form").unbind('submit').submit(function() {
            
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
    });
};

var RESET_MODULE = new RESET_MODULE_OBJ();