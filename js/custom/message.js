var MESSAGE_MODULE = {
	
	page : 0,
	threadChecker : null,
	serviceChecker : null,
	serviceFrequency : 1000 * 60 * 3,
	thread_id : null,
	
	setMessageThreads : function() {
		var user = GLOBAL_DATA.user;
		var formData = 'page=message/getthreads&id=' + user['id'];
		
		$.ajax({
			type: 'POST',
			url: GLOBAL_DATA.server_link,
			data: formData,
			dataType: 'json',
			success: function(jsonData) {
				handleResponse(jsonData, function(response) {
					$.mobile.changePage("#thread-page", { 
						transition: "slide"
					});
					
					// add thread items
					MESSAGE_MODULE.displayThreads(response);
					
					// handle clicks
					MESSAGE_MODULE.clickHandler(response);
				});
			},
			error: function(data,status,xhr) {
				alert('Error Occured!');
			}
		});
	},
	
	displayThreads : function(response) {
		var list = $("#thread-list");
		list.empty();
		
		var myListContent = "";
		for(var i=0; i<response.length; i+=1) {
			var obj = response[i];
			myListContent += '<li' + MESSAGE_MODULE.checkNew(obj) + '>' + MESSAGE_MODULE.formatThread(obj) + '</li>';
		}
		
		list.append(myListContent).listview().trigger('create');
		list.listview('refresh');
		
		$(".add-member-button").click(function() {
			var thread_id = $(this).attr("data-thread-id");
			var email = prompt("Please enter email adress of member to add:", "");
			
			if (email != null) {
				email = email.trim();
				
				runAJAXSerial('', {
					page : 'message/addmember',
					thread_id : thread_id,
					email : email
				}, function(response) {
					MESSAGE_MODULE.gotoMessage(thread_id);
				});
			}
			
			return false;
		});
	},
	
	checkNew : function(obj) {
		if (obj['new']=='1') {
			return ' class="new_item"'; 
		}
		return '';
	},
	
	formatThread : function(obj) {
		var str = '<a href="#"><table>';
		
		var nameList = obj['member_names'];

		var picList = '';
		for(var i=0; i<nameList.length; i+=1) {
			var nameObj = nameList[i];
			var thisname = nameObj['first_name'] + ' ' + nameObj['last_name'];
			picList += '<span class="thread-image"><div><img title="' + thisname + '" alt="' + thisname + '" src="' + nameObj['picURL'] + '" class="small-image"/></div><div>' + thisname + '</div></span>';
		}
		
		if (obj['extra'] > 0) {
			picList += " (" + obj['extra'] + " more...)";
		}

		if (obj['message'] != null) {
			str += '<tr title="Message"><td valign="top"><span class="ui-icon-comment ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + Autolinker.link(obj['message']) + '</td></tr>';
			str += '<tr title="Date Sent"><td valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['date_sent'] + '</td></tr>';
		}
		
		str += '<tr title="Recipants"><td><span class="ui-icon-user ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + picList + '</td></tr>';
		str += '<tr title="Add Member"><td><span class="ui-icon-plus ui-btn-icon-left myicon"/></td><td valign="top"><a class="add-member-button" href="#" data-role="button" data-icon="plus" data-iconpos="left" data-mini="true" data-thread-id="' + obj['id'] + '">Add Member</a></td></tr>';

		str += '</table></a>';
		return str;
	},
	
	clickHandler : function(response) {
		
		var items = $("#thread-list > li > a");
		
		items.unbind('click').click(function() {
			var index = items.index(this);
			var obj = response[index];
			
			MESSAGE_MODULE.gotoMessage(obj['id']);
		});
	},
	
	
	// ---------------------------------------------
	
	
	gotoMessage : function(thread_id) {
		var user = GLOBAL_DATA.user;
		MESSAGE_MODULE.page = 0;
		
		runAJAXSerial('', {
			page : 'message/getmessages',
			thread_id : thread_id,
			id : user['id'],
			pageindex : MESSAGE_MODULE.page
		}, function(response) {
			MESSAGE_MODULE.page += 1;
			
			MESSAGE_MODULE.thread_id = thread_id;
			
			$.mobile.changePage("#message-page", { 
				transition: "slide"
			});
			
			var list = $("#message-list");
			list.empty();
			
			MESSAGE_MODULE.displayMessages(response, true);
			
			MESSAGE_MODULE.handleSend(thread_id);
			
			MESSAGE_MODULE.handleGetMore(thread_id);
		});
	},
	
	handleSend : function(thread_id) {
		var user = GLOBAL_DATA.user;
		
		$("#message-form").unbind('submit').submit(function() {
		
			var field = $(this).find("input[type=text]");

			var formData = $(this).serialize();
		
			runAJAXSerial(formData, {
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
			});
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
		});
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
	
	scrollBot : function() {
		$('html, body').animate({
			scrollTop:$(document).height()
		}, 'slow');
	}
};