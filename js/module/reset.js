var RESET_MODULE = new function() {
    
    var context = "#reset-page";
    
    $(context).on('submit', "#reset-form", function() {
        
        var token = getUrlParameter('token'), id = getUrlParameter('id');

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
};