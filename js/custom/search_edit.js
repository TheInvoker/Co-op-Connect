var SEARCH_SETTINGS_MODULE = {
	
	// PUBLIC
	
	initSettings : function() {
		$.mobile.changePage("#search-settings-page", { 
			transition: "slide"
		});
		
		$("#search-settings-page").find(".clear-cb-button").unbind('click').click(function() {
			$(this).parent().find("input").prop("checked", false).checkboxradio( "refresh" );
		});
		$("#search-settings-page").find(".selectall-cb-button").unbind('click').click(function() {
			$(this).parent().find("input").prop("checked", true).checkboxradio( "refresh" );
		});
		$("#search-settings-page").find("#done-search-settings-button").unbind('click').click(function() {
			history.back();
		});
		
		var elements = $("#search-settings-page").find("#search-settings-form").find("input[type=date]");
		dateHandler(elements, false, function() {}, true);
	},
	
	resetForm : function() {
		$("#search-settings-form").find("input[type=text],input[type=date]").val("");
		
		try {
			$("#search-settings-form").find("input[type=checkbox]").prop("checked", true).checkboxradio( "refresh" );
		} catch(err) {}
	},
	
	getFormData : function() {
		return $("#search-settings-form").serialize();
	}
	
	// PRIVATE
	

};