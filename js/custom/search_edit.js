var SEARCH_SETTINGS_MODULE = {
	
	// PUBLIC
	
	initSettings : function() {
		$.mobile.changePage(SEARCH_SETTINGS_MODULE.context, { 
			transition: "slide"
		});
		
		$(SEARCH_SETTINGS_MODULE.context).find("#search-settings-page").find(".clear-cb-button").unbind('click').click(function() {
			$(this).parent().find("input").prop("checked", false).checkboxradio( "refresh" );
		});
		$(SEARCH_SETTINGS_MODULE.context).find("#search-settings-page").find(".selectall-cb-button").unbind('click').click(function() {
			$(this).parent().find("input").prop("checked", true).checkboxradio( "refresh" );
		});
		$(SEARCH_SETTINGS_MODULE.context).find("#search-settings-page").find("#done-search-settings-button").unbind('click').click(function() {
			history.back();
		});
		
		var elements = $(SEARCH_SETTINGS_MODULE.context).find("#search-settings-page").find("#search-settings-form").find("input[type=date]");
		dateHandler(elements, false, function() {}, true);
	},
	
	resetForm : function() {
		$(SEARCH_SETTINGS_MODULE.context).find("#search-settings-form").find("input[type=text],input[type=date]").val("");
		
		try {
			$(SEARCH_SETTINGS_MODULE.context).find("#search-settings-form").find("input[type=checkbox]").prop("checked", true).checkboxradio( "refresh" );
		} catch(err) {}
	},
	
	getFormData : function() {
		return $(SEARCH_SETTINGS_MODULE.context).find("#search-settings-form").serialize();
	},
	
	// PRIVATE
	
	context : "#search-settings-page"
};