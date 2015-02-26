var MESSAGE_MODULE = {
	
	// PUBLIC

	gotoMessage : function(thread_id) {
		var user = GLOBAL_DATA.user;
		MESSAGE_MODULE.page = 0;
		
		runAJAXSerial('', {
			page : 'message/getmessages',
			thread_id : thread_id,
			id : user['id'],
			pageindex : MESSAGE_MODULE.page
		}, function(response) {
			// update global vars
			MESSAGE_MODULE.page += 1;
			MESSAGE_MODULE.thread_id = thread_id;
			
			$.mobile.changePage("#message-page", { 
				transition: "slide"
			});
			
			// clear screen
			MESSAGE_MODULE.clearScreen();
			
			// display messages
			MESSAGE_MODULE.displayMessages(response, true);
			
			// handle sending messages
			MESSAGE_MODULE.handleSend(thread_id);
			
			// handle getting more messages
			MESSAGE_MODULE.handleGetMore(thread_id);
		}, function(data,status,xhr) {

		});
	},

	startAuto : function() {
		MESSAGE_MODULE.serviceChecker = setInterval(function(){ 
			MESSAGE_MODULE.getNewMessages(MESSAGE_MODULE.thread_id);
		}, MESSAGE_MODULE.serviceFrequency);
	},

	stopAuto : function() {
		clearInterval(MESSAGE_MODULE.serviceChecker);
	},

	// PRIVATE

	page : 0,
	thread_id : null,
	serviceChecker : null,
	serviceFrequency : 1000 * 60 * 3,
	
	clearScreen : function() {
		$("#message-list").empty();
	},

	displayMessages : function(response, onBottom) {
		var user = GLOBAL_DATA.user;
		
		var acc = '';
		for(var i=0; i<response.length; i+=1) {
			var obj = response[i];
			
			var acc_temp = "";
			acc_temp += '<div class="message ' + (obj['user_id']==user['id'] ? 'message-left' : 'message-right') + '">';
			acc_temp += '<div>' + Autolinker.link(obj['message']) + '</div>';
			if (obj['user_id']!=user['id']) {
				acc_temp += '<div class="message-details">' + obj['first_name'] + ' ' + obj['last_name'] + '</div>';
			}
			acc_temp += '<div class="message-details">' + obj['date_sent'] + '</div>';
			acc_temp += '</div>';
			
			acc = acc_temp + acc;
		}
		
		MESSAGE_MODULE.addMessage(acc, onBottom);
	},

	addMessage : function(html, onBottom) {
		var list = $("#message-list");
		if (onBottom) {
			list.append(html);
			MESSAGE_MODULE.scrollBot();
		} else {
			list.prepend(html);
		}
	},

	handleSend : function(thread_id) {
		var user = GLOBAL_DATA.user;
		
		$("#message-form").unbind('submit').submit(function() {
		
			var field = $(this).find("input[type=text]");
		
			runAJAXSerial($(this).serialize(), {
				page : 'message/setmessage',
				id : user['id'],
				thread_id : thread_id
			}, function(response) {
				var user = GLOBAL_DATA.user;
				
				var obj = {
					user_id : user['id'],
					message : field.val(),
					date_sent : getDate() + ' ' + getTime(),
					first_name : null,
					last_name : null
				};
				
				field.val("").focus();
				
				MESSAGE_MODULE.displayMessages([obj], true);
			}, function(data,status,xhr) {
				
			});
			
			return false;
		});
	},
	
	handleGetMore : function(thread_id) {
		var user = GLOBAL_DATA.user;
		
		$("#more-message-button").unbind('click').click(function() {
			runAJAXSerial('', {
				page : 'message/getmessages',
				thread_id : thread_id,
				id : user['id'],
				pageindex : MESSAGE_MODULE.page
			}, function(response) {
				if (response.length > 0) {
					MESSAGE_MODULE.page += 1;
					
					MESSAGE_MODULE.displayMessages(response, false);
				} else {
					alert("No more messages.");
				}
			}, function(data,status,xhr) {
				
			});

			return false;
		});
	},
	
	getNewMessages : function(thread_id) {
		var user = GLOBAL_DATA.user;
		
		runAJAXSerial('', {
			page : 'message/getnewmessages',
			thread_id : thread_id,
			id : user['id']
		}, function(response) {
			if (response.length > 0) {
				MESSAGE_MODULE.displayMessages(response, true);
			}
		}, function(data,status,xhr) {
			
		});
	},
	
	scrollBot : function() {
		$('html, body').animate({
			scrollTop:$(document).height()
		}, 'slow');
	}
};