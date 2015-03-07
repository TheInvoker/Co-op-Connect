var ABOUT_MODULE = {
	
	// PUBLIC

	setAbout : function() {
		$.mobile.changePage(ABOUT_MODULE.context, { 
			transition: "slide"
		});
	},

	// PRIVATE

	context : "#about-page",

	init : (function() { 
		$(document).ready(function() {
		});
	})()
};