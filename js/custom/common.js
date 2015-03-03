var GLOBAL_DATA = {
	user : null,                                                    // basic user object for who ever is logged in now
	server_link : '/Co-op-Connect/script/config/sqlhandler.php',    // main server link
	def_image_link : 'images/site/person.png' 
};



// PAGE SHOW/HIDE EVENTS

function setPageShowHide() {
	
	// configure page show
	$(document).unbind("pagecontainershow").on( "pagecontainershow", function( event, ui ) {
		var id = ui.toPage.prop("id");
		var prev_id = ui.prevPage.prop("id");
		
		if (id == "thread-page") {
			if (prev_id == "message-page") {
				THREAD_MODULE.setMessageThreads();
			}

			THREAD_MODULE.startAuto();
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
		var id = ui.prevPage.prop("id");
		var to_id = ui.toPage.prop("id");
		
		if (id == "thread-page") {
			THREAD_MODULE.stopAuto();
		} else if (id == "message-page") {
			MESSAGE_MODULE.stopAuto();
		} else if (id == "menu-page") {
			MENU_MODULE.stopAuto();
		}
	});
}

function setAPageShowHide() {
	// configure page show
	$(document).unbind("pagecontainershow").on( "pagecontainershow", function( event, ui ) {
		var id = ui.toPage.prop("id");
		
		if (id == "menu-page") {
			MENU_MODULE.startAuto();
		}
	});
	
	// configure page end
	$(document).unbind("pagecontainerhide").on( "pagecontainerhide", function( event, ui ) {
		var id = ui.prevPage.prop("id");
		
		if (id == "menu-page") {
			MENU_MODULE.stopAuto();
		}
	});
}




// MISC CODE

function toast(msg) {
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>").css({ 
		display: "block",
		opacity: 0.90,
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

function getColorCodeTag(text, color) {
	return "<span style='color:" + color + ";'>" + text + "</span>";
}

function goHomePage() {
	var i = document.location.href.indexOf("#");
	if (i != -1) {
		document.location.href = document.location.href.substring(0, i);
		return true;
	}
	return false;
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
		success: function(jsonData) {
			var response = jsonData['response'];

			if (jsonData['code'] == 200) {
				sfunc(response);
			} else {
				alert(response);
			}
		},
		error: function(data,status,xhr) {
			efunc(data,status,xhr);

			alert('An error occured when connecting to the server.');
		}
	};
	
	if (hasImage) {
		obj['contentType'] = false;      // The content type used when sending data to the server.
		obj['cache'] = false;            // To unable request pages to be cached
		obj['processData'] = false;      // To send DOMDocument or non processed data file it is set to false
	} 
	
	$.ajax(obj);
}