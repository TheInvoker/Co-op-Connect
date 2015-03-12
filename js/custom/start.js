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
        var id = ui.toPage.prop("id"), prev_id = ui.prevPage.prop("id");
        
        if (id == "thread-page") {
            THREAD_MODULE.startAuto(prev_id == "message-page");
        } else if (id == "message-page") {
            MESSAGE_MODULE.scrollBot();
            MESSAGE_MODULE.startAuto();
        } else if (id == "menu-page") {
            MENU_MODULE.startAuto();
        } else if (id == "placement-page" && prev_id == "checklist-page") {
            PLACEMENT_MODULE.reload();
        } else if (id == "search-page" && prev_id != "search-settings-page") {
            SEARCH_SETTINGS_MODULE.resetForm();
        } else if (id == "register-page") {
            REGISTER_MODULE.resetForm();
        }
    });
	   
    // configure page hide
    $(document).unbind("pagecontainerhide").on( "pagecontainerhide", function( event, ui ) {
        var id = ui.prevPage.prop("id"), to_id = ui.toPage.prop("id");
        
        if (id == "thread-page") {
            THREAD_MODULE.stopAuto();
        } else if (id == "message-page") {
            MESSAGE_MODULE.stopAuto();
        } else if (id == "menu-page") {
            MENU_MODULE.stopAuto();
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