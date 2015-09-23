var GLOBAL_DATA = {
    user : null,          // basic user object for who ever is logged in now
    server_link : '/',    // main server link
    def_image_link : 'images/site/person.png',
	version: "v1.0.0",
    eventsShow : {},
    eventsHide : {},
	clientID : null
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

function getFormData(id) {
	return $(id).serializeArray().reduce(function(obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});
}

function getCurrentPage() {
	return "#"+$("div.page:visible").attr("id");
}



// CLIENT ID

function getClientID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);
	});
}

if (localStorage.getItem("clientID") === null) {
	var myClientID = getClientID();
	GLOBAL_DATA.clientID = myClientID;
	localStorage.setItem("clientID", myClientID);
} else {
	GLOBAL_DATA.clientID = localStorage.getItem("clientID");
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
    }
}





// AJAX CODE

function runAJAXHTML5(url, formData, object, sfunc, efunc) {
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            formData.append(property, object[property]);
        }
    }
    
    runAJAX(url, formData, sfunc, efunc, true);
}

function runAJAXSerial(url, formData, object, sfunc, efunc) {
    var serialized = $.param(object);
    
    if (formData == '') {
        formData = serialized;
    } else {
        formData += '&' + serialized
    }
    
    runAJAX(url, formData, sfunc, efunc, false);
}

function runAJAX(url, formData, sfunc, efunc, hasImage) {

    var obj = {
        type: 'POST',
        url: GLOBAL_DATA.server_link + url,
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







// PAGE CHANGE

function changePage(pageID, callback) {
	var curPage = $("body > div.page:visible");
	if (curPage.length == 0) {
		$("body > " + pageID).fadeIn(500);
	} else if ("#" + curPage.attr("id") != pageID) {
		curPage.fadeOut(500,function() {
			$("body > " + pageID).fadeIn(500, function() {
				callback();
			});
		});
	}
}







// NAV DRAWER
function openPanel(panelID) {
	closePanel("div.panel");
	$(panelID).css({
		left:'0px'
	});
}
function closePanel(panelID) {
	$(panelID).css({
		left:''
	});
}
$(document).ready(function() {
	$("div.panel").on('click',function() {
		return false;
	});
	$("div.panel > div").on('click',function() {
		closePanel($(this).parent());
	});
	$("body").on('click',function() {
		closePanel("div.panel");
	});
	$("body > div.page > div.header > div[data-panel]").click(function() {
		var panelID = $(this).attr("data-panel");
		openPanel(panelID);
		return false;
	});
});




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

function showNotification(title, body, onclick) {
	
	var showNotificationHelper = function() {
		var notification = new Notification(title, {
			body : body,
			icon : "images/site/favicon.png"
		});
		notification.onclick = onclick;
		return notification;
	};
	
	// Let's check if the browser supports notifications
	if (!("Notification" in window)) {
		toast(title);
	}

	// Let's check if the user is okay to get some notification
	else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		var notification = showNotificationHelper();
	}

	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			// If the user is okay, let's create a notification
			if (permission === "granted") {
				var notification = showNotificationHelper();
			} else {
				toast(title);
			}
		});
	} else {
		toast(title);
	}

	// At last, if the user already denied any notification, and you 
	// want to be respectful there is no need to bother them any more.
}








// VISIBILITY

function isPageActive() {
	var prefix = getPrefix();
	if (prefix === null) {
		return true;
	} else if (document.hidden === false || document[prefix + "Hidden"] === false) {
		return true;
	}
	return false;
}

function getPrefix() {
	var prefix = null;
	if (document.hidden !== undefined) {
		prefix = "";
	} else {
		var browserPrefixes = ["webkit", "moz", "ms", "o"];
		// Test all vendor prefixes
		for (var i = 0; i < browserPrefixes.length; i++) {
			if (document[browserPrefixes[i] + "Hidden"] != undefined) {
				prefix = browserPrefixes[i];
				break;
			}
		}
	}
	return prefix;
}