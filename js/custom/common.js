var GLOBAL_DATA = {
    user : null,                                      // basic user object for who ever is logged in now
    server_link : 'sqlhandler.php',    // main server link
    def_image_link : 'images/site/person.png',
	version: "v1.0.0",
    eventsShow : {},
    eventsHide : {}
};










// MISC CODE

function getColorCodeTag(text, color) {
    return "<span style='color:" + color + ";'>" + text + "</span>";
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.href;
    sPageURL = sPageURL.substr(sPageURL.indexOf("?")+1, sPageURL.length-1);
    
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}


function panelFix(context, panelID) {
    $( panelID ).panel();
    $( panelID ).find("ul[data-role=listview]").listview().trigger('create');
    swipePanel(context, panelID);
}




// DATE/TIME CODE

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = yyyy+"-"+mm+"-"+dd;
    return today;
}

function getTime() {
    var currentdate = new Date(); 
    var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
}

function dateHandler(elements, putCurrentDate, changefunction, showClearButton) {
    var today = getDate();
    
    for(var i=0; i<elements.length; i+=1) {
        var picker = $(elements[i]);
        
        if (putCurrentDate) {
            picker.val(today);
        }

        picker.pickadate({
            format: 'yyyy-mm-dd',
            clear: showClearButton ? 'Clear' : '',
            onSet: function(context) {
                changefunction();
            }
        });
    }
}





// AJAX CODE

function runAJAXHTML5(formData, object, sfunc, efunc) {
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            formData.append(property, object[property]);
        }
    }
    
    runAJAX(formData, sfunc, efunc, true);
}

function runAJAXSerial(formData, object, sfunc, efunc) {
    var serialized = $.param(object);
    
    if (formData == '') {
        formData = serialized;
    } else {
        formData += '&' + serialized
    }
    
    runAJAX(formData, sfunc, efunc, false);
}

function runAJAX(formData, sfunc, efunc, hasImage) {
    var obj = {
        type: 'POST',
        url: GLOBAL_DATA.server_link,
        data: formData,
        dataType: 'json',
		timeout: 10 * 1000,
        beforeSend: function( xhr ) {
            $.blockUI();
        },
        success: function(jsonData,status,xhr) {
            $.unblockUI();
            
            var response = jsonData['response'];

            if (jsonData['code'] == 200) {
				cleanResponse(response);
                sfunc(response);
			} else if (jsonData['code'] == 402) {
				alert(response);
				window.location.href = ".";
            } else {
                efunc(jsonData,status,xhr);

                alert(response);
            }
        },
        error: function(data,status,xhr) {
            $.unblockUI();

            efunc(data,status,xhr);

            alert(xhr);
        }
    };
    
    if (hasImage) {
        obj['contentType'] = false;      // The content type used when sending data to the server.
        obj['cache'] = false;            // To unable request pages to be cached
        obj['processData'] = false;      // To send DOMDocument or non processed data file it is set to false
    } 
    
    $.ajax(obj);
}

function cleanResponse(response) {
	if (Object.prototype.toString.call( response ) === '[object Array]') {
		var i = 0, l = response.length;
		for (i=0; i<l; i+=1) {
			response[i] = cleanResponse(response[i]);
		}
	} else if (Object.prototype.toString.call( response ) === '[object Object]') {
		for (var property in response) {
			if (response.hasOwnProperty(property)) {
				response[property] = cleanResponse(response[property]);
			}
		}
	} else {
		response = escapeHTML(response);
	}
	return response;
}

function escapeHTML(str) {
	return $("<p/>").text(str).html();
}

function unescapeHTML(str) {
    return $('<textarea/>').html(str).val();
}










// INITIALIZE


if (!goHomePage()) {
	$(document).ready(function() {
		setPageShowHide();
		//configureShakeToGoBack();
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
    $(document).on( "pagecontainershow", function( event, ui ) {
        var id = "#"+ui.toPage.prop("id"), prev_id = "#"+ui.prevPage.prop("id");
        
		if (GLOBAL_DATA.eventsShow.hasOwnProperty(id)) {
			var func = GLOBAL_DATA.eventsShow[id];
			func(prev_id);
		}
    });
	   
    // configure page hide
    $(document).on( "pagecontainerhide", function( event, ui ) {
        var id = "#"+ui.prevPage.prop("id"), to_id = "#"+ui.toPage.prop("id");
        
		if (GLOBAL_DATA.eventsHide.hasOwnProperty(id)) {
			var func = GLOBAL_DATA.eventsHide[id];
			func(to_id);
		}
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
		$( document ).on( "swiperight", pageId, function( e ) {
			var startX = e.swipestart.coords[0];

			if (startX <= 50) {
				if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
					$( leftPanelId ).panel( "open" );
				}
			}
		});
	});
}

function swipePanelLeft(pageId, rightPanelId) {
    $( document ).on( "pageinit", pageId, function() {
        $( document ).on( "swipeleft", pageId, function( e ) {
            var startX = e.swipestart.coords[0];
            var totalWidth = $(window).width();

            if (startX >= totalWidth - 50) {
                if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
                    $( rightPanelId ).panel( "open" );
                }
            }
        });
    });
}





// NOTIFICATIONS

function toast(msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>" + msg + "</h3></div>").css({ 
        display: "block",
        "background-color": "#1E1E1E",
        position: "fixed",
        padding: "7px",
        "text-align": "center",
        width: "270px",
        left: ($(window).width() - 284)/2,
        top: $(window).height()/2 
    }).appendTo( $.mobile.pageContainer ).delay( 1500 ).fadeOut( 400, function(){
        $(this).remove();
    });
}

function showNotification(title, body) {
	
	var showNotificationHelper = function(title, body) {
		var notification = new Notification(title, {
			body : body,
			dir : "rtl",
			icon : "images/site/favicon.png"
		});
		return notification;
	};
	
	// Let's check if the browser supports notifications
	if (!("Notification" in window)) {
		toast(title);
	}

	// Let's check if the user is okay to get some notification
	else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		//var notification = new Notification("Hi there!");
		var notification = showNotificationHelper(title, body);
	}

	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			// If the user is okay, let's create a notification
			if (permission === "granted") {
				var notification = showNotificationHelper(title, body);
			} else {
				toast(title);
			}
		});
	}

	// At last, if the user already denied any notification, and you 
	// want to be respectful there is no need to bother them any more.
}