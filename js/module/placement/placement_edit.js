var PLACEMENT_EDIT_MODULE = new function() {
    
    var context = "#placement-edit-page",
        pid = null;
    
    $(context).on('submit', '#placement-edit-form', function() {

		// set up placement edit form
        var user = GLOBAL_DATA.user;

        if (pid == null) {    
            var obj = {
                page : "placement/addplacements"
            };
        } else {
            var obj = {
                page : "placement/setplacements",
                id : pid
            };
        }
        
        runAJAXSerial($(this).serialize(), obj, function(response) {
            PLACEMENT_MODULE.getPlacements(user['id']);
			showNotification("Placement Saved", "", function() {
			});
        }, function(data,status,xhr) {

        });

        return false;
		
    }).on('click',"#placement-cancel-button",function() {
		
		changePage(PLACEMENT_MODULE.getContext());
		
    });

    this.newPlacement = function() {
        switchPage();
        
        setFormFields(null);

        pid = null;
    };

    this.setPlacementForEdit = function(obj) {
		switchPage();
        
        setFormFields(obj);

        pid = obj['id'];
    };
    
    var switchPage = function() {
        changePage(context,function(){});
    };

    var setFormFields = function(obj) {
		var context = $("#placement-edit-form", context);
		
        var swt = context.find("select[name=active]");
        var addr = context.find("input[name=address]");

        if (obj) {
            addr.val(obj['address'] + ', ' + obj['city'] + ', ' + obj['country']);

            context.find("input[name=lat]").val(obj['latitude']);
            context.find("input[name=lng]").val(obj['longitude']);
            context.find("input[name=name]").val(obj['address']);
            context.find("input[name=locality]").val(obj['city']);
            context.find("input[name=country]").val(obj['country']);
            
            context.find("input[name=role]").val(obj['topic']);
            context.find("input[name=company]").val(obj['organization']);
            context.find("input[name=date_start]").val(obj['date_started']);
            context.find("input[name=date_end]").val(obj['date_finished']);
            
            swt.val(obj['active']);
			
        } else {
            swt.val('1');
        }
        
        addr.geocomplete({ 
            details: "#placement-edit-form" 
        });
    };
};