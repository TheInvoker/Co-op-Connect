var PLACEMENT_EDIT_MODULE_OBJ = function() {
    
    var context = "#placement-edit-page";

    this.newPlacement = function() {
        switchPage();
        
        setFormFields(null);
        setDateFields(true);
        placementSubmit(null);
    };

    this.setPlacementForEdit = function(obj) {
        switchPage();
        
        setFormFields(obj);
        setDateFields(false);
        placementSubmit(obj['id']);
    };
    
    var switchPage = function() {
        $.mobile.changePage(context, { 
            transition: "slide"
        });
    };

    var setFormFields = function(obj) {

        var swt = $(context).find("#placement-edit-form").find("select[name=active]");
        var addr = $(context).find("#placement-edit-form").find("input[name=address]");

        if (obj) {
            addr.val(obj['address'] + ', ' + obj['city'] + ', ' + obj['country']);

            $(context).find("#placement-edit-form").find("input[name=lat]").val(obj['latitude']);
            $(context).find("#placement-edit-form").find("input[name=lng]").val(obj['longitude']);
            $(context).find("#placement-edit-form").find("input[name=name]").val(obj['address']);
            $(context).find("#placement-edit-form").find("input[name=locality]").val(obj['city']);
            $(context).find("#placement-edit-form").find("input[name=country]").val(obj['country']);
            
            $(context).find("#placement-edit-form").find("input[name=role]").val(obj['topic']);
            $(context).find("#placement-edit-form").find("input[name=company]").val(obj['organization']);
            $(context).find("#placement-edit-form").find("input[name=date_start]").val(obj['date_started']);
            $(context).find("#placement-edit-form").find("input[name=date_end]").val(obj['date_finished']);
            
            swt.val(obj['active']);
        } else {
            
            $(context).find("#placement-edit-form").find("input").val("");
            
            swt.val('1');
        }
        
        addr.geocomplete({ 
            details: "#placement-edit-form" 
        });

        swt.slider('refresh');
    };
    
    var setDateFields = function(setCurrentDate) {
        var elements = $(context).find("#placement-edit-form").find("input[type=date]");
        dateHandler(elements, setCurrentDate, function() {}, false);
    };

    var placementSubmit = function(pid) {
        $(context).find("#placement-edit-form").unbind('submit').submit(function() {

            var user = GLOBAL_DATA.user;

            if (pid == null) {    
                var obj = {
                    page : "placement/addplacements",
                    user_id : user['id']
                };
            } else {
                var obj = {
                    page : "placement/setplacements",
                    id : pid
                };
            }
            
            runAJAXSerial($(this).serialize(), obj, function(response) {
                history.back();
                PLACEMENT_MODULE.getPlacements(user['id']);
            }, function(data,status,xhr) {

            });

            return false;
        });
    };
};

var PLACEMENT_EDIT_MODULE = new PLACEMENT_EDIT_MODULE_OBJ();