var SEARCH_SETTINGS_MODULE = new function() {
    
    var context = "#search-settings-page";
	
	$(context).on('click', "#search-accept-button", function() {
		
		changePage(SEARCH_MODULE.getContext(), function(){});
		
	}).on('click', ".clear-cb-button", function() {
		
        $(this).closest("fieldset").find("input").prop("checked", false);
		
    }).on('click', ".selectall-cb-button", function() {
		
        $(this).closest("fieldset").find("input").prop("checked", true);
		
    });
		
    this.initSettings = function() {
        changePage(context,function(){});
        
        var elements = $(context).find("#search-settings-form").find("input[type=date]");
        dateHandler(elements, false, function() {}, true);
    };
    
    this.getContext = function() {
        return context;
    };

    this.getFormData = function() {
        return $(context).find("#search-settings-form").serialize();
    };
};