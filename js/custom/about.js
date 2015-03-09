var ABOUT_MODULE_OBJ = function() {
	
	var context = "#about-page";

	this.setAbout = function() {
		$.mobile.changePage(context, { 
			transition: "slide"
		});
	};
};

var ABOUT_MODULE = new ABOUT_MODULE_OBJ();