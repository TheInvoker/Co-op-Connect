var GLOBAL_DATA = {
	user : null,                                                   // basic user object for who ever is logged in now
	server_link : '/Co-op-Connect/script/config/sqlhandler.php'    // main server link
};

function setUpLogout() {
	$(window).unbind("navigate").on("navigate", function (event, data) {
		var direction = data.state.direction;
		var id = data.state.hash;
		if (direction == 'back' && id == '') {
			//GLOBAL_DATA.user = null;
		} else if (direction == 'forward' && id == '#menu-page' && GLOBAL_DATA.user == null) {
			//history.back(); // <- doesn't work
		}
	});
}

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

function dateHandler(elements, putCurrentDate, changefunction) {
	var today = getDate();
	
	for(var i=0; i<elements.length; i+=1) {
		var picker = $(elements[i]);
		
		if (putCurrentDate) {
			picker.val(today);
		}

		picker.mobipick().unbind('change').on("change", function() {
			changefunction();
		});
	}
}




function runAJAXHTML5(formData, object, func) {
	for (var property in object) {
		if (object.hasOwnProperty(property)) {
			formData.append(property, object[property]);
		}
	}
	
	runAJAX(formData, func);
}

function runAJAXSerial(formData, object, func) {
	var serialized = $.param(object);
	
	if (formData == '') {
		formData = serialized;
	} else {
		formData += '&' + serialized
	}
	
	runAJAX(formData, func);
}

function runAJAX(formData, func) {
	$.ajax({
		type: 'POST',
		url: GLOBAL_DATA.server_link,
		data: formData,
		dataType: 'json',
		success: function(jsonData) {
			handleResponse(jsonData, func);
		},
		error: function(data,status,xhr) {
			alert('Error Occured!');
		}
	});
}

function handleResponse(jsonData, handler) {
	var response = jsonData['response'];

	if (jsonData['code'] == 200) {
		handler(response);
	} else {
		alert(response);
	}
}