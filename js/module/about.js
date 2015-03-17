var ABOUT_MODULE = new function() {
    
    var context = "#about-page";

    this.setAbout = function() {
        $.mobile.changePage(context, { 
            transition: "slide"
        });
    };
};