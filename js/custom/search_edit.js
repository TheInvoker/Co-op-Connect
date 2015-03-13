var SEARCH_SETTINGS_MODULE_OBJ = function() {
    
    var context = "#search-settings-page";
	
	$(document).ready(function() {
		// configure back button
		$(context).find("#done-search-settings-button").click(function() {
			history.back();
		});
	});
		
    this.initSettings = function() {
        $.mobile.changePage(context, { 
            transition: "slide"
        });
        
        $(context).find(".clear-cb-button").unbind('click').click(function() {
            $(this).parent().find("input").prop("checked", false).checkboxradio( "refresh" );
        });
        $(context).find(".selectall-cb-button").unbind('click').click(function() {
            $(this).parent().find("input").prop("checked", true).checkboxradio( "refresh" );
        });

        var elements = $(context).find("#search-settings-form").find("input[type=date]");
        dateHandler(elements, false, function() {}, true);
    };
    
    this.getContext = function() {
        return context;
    };
    
    this.resetForm = function() {
        $(context).find("#search-settings-form").find("input[type=text],input[type=date]").val("");
        
        try {
            $(context).find("#search-settings-form").find("input[type=checkbox]").prop("checked", true).checkboxradio( "refresh" );
        } catch(err) {
			
		}
    };
    
    this.getFormData = function() {
        return $(context).find("#search-settings-form").serialize();
    };
};

var SEARCH_SETTINGS_MODULE = new SEARCH_SETTINGS_MODULE_OBJ();