if (!goHomePage()) {
	$(document).ready(function() {
		setPageShowHide();
		//configureShakeToGoBack();

		LOGIN_MODULE.initApp();
	});
}

function goHomePage() {
    var i = document.location.href.indexOf("#");
    if (i != -1) {
        document.location.href = document.location.href.substring(0, i);
        return true;
    }
    return false;
}

function setPageShowHide() {
    
    // configure page show
    $(document).unbind("pagecontainershow").on( "pagecontainershow", function( event, ui ) {
        var id = "#"+ui.toPage.prop("id"), prev_id = "#"+ui.prevPage.prop("id");
        
        for (var property in GLOBAL_DATA.eventsShow) {
            if (GLOBAL_DATA.eventsShow.hasOwnProperty(property)) {
                if (property == id) {
                    var func = GLOBAL_DATA.eventsShow[property];
                    func(prev_id);
                    break;
                }
            }
        }
    });
	   
    // configure page hide
    $(document).unbind("pagecontainerhide").on( "pagecontainerhide", function( event, ui ) {
        var id = "#"+ui.prevPage.prop("id"), to_id = "#"+ui.toPage.prop("id");
        
        for (var property in GLOBAL_DATA.eventsHide) {
            if (GLOBAL_DATA.eventsHide.hasOwnProperty(property)) {
                if (property == id) {
                    var func = GLOBAL_DATA.eventsHide[property];
                    func(to_id);
                    break;
                }
            }
        }
    });
}

function configureShakeToGoBack() {
    var myShakeEvent = new Shake({
        threshold: 10, // optional shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
    });    
    myShakeEvent.start();
    window.addEventListener('shake', function() {
        history.back();
    }, false);
}

function swipePanel(pageId, leftPanelId) {
	$( document ).on( "pageinit", pageId, function() {
		$( document ).on( "swipeleft swiperight", pageId, function( e ) {
			// We check if there is no open panel on the page because otherwise
			// a swipe to close the left panel would also open the right panel (and v.v.).
			// We do this by checking the data that the framework stores on the page element (panel: open).
			if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
				if ( e.type === "swiperight" ) {
					$( leftPanelId ).panel( "open" );
				}
			}
		});
	});
}

function registerShowEvent(pageID, func) {
    GLOBAL_DATA.eventsShow[pageID] = func;
}

function deleteShowEvent(pageID) {
    delete GLOBAL_DATA.eventsShow[pageID];
}

function registerHideEvent(pageID, func) {
    GLOBAL_DATA.eventsHide[pageID] = func;
}

function deleteHideEvent(pageID) {
    delete GLOBAL_DATA.eventsHide[pageID];
}