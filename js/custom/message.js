var MESSAGE_MODULE = {
	
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

		if (obj['message'] != null) {
			str += '<tr title="Message"><td valign="top"><span class="ui-icon-comment ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + Autolinker.link(obj['message']) + '</td></tr>';
			str += '<tr title="Date Sent"><td valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['date_sent'] + '</td></tr>';
		}
		
		str += '<tr title="Recipants"><td valign="top"><span class="ui-icon-user ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + picList + '</td></tr>';

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
	
	gotoMessage : function(thread_id) {
		var user = GLOBAL_DATA.user;
		
		runAJAX(null, {
			page : 'message/getmessages',
			thread_id : thread_id,
			id : user['id']
		}, function(response) {
			$.mobile.changePage("#message-page", { 
				transition: "slide"
			});
			
			MESSAGE_MODULE.displayMessages(response);
			
			MESSAGE_MODULE.handleSend(thread_id);
		});
	},
	
	displayMessages : function(response) {
		var user = GLOBAL_DATA.user;
		
		var list = $("#message-list");
		list.empty();
		
		var acc = '';
		for(var i=0; i<response.length; i+=1) {
			var obj = response[i];
			
			acc += '<div class="message ' + (obj['user_id']==user['id'] ? 'message-left' : 'message-right') + '">';
			acc += '<div>' + obj['message'] + '</div>';
			acc += '<div class="message-details">' + obj['first_name'] + ' ' + obj['last_name'] + '</div>';
			acc += '<div class="message-details">' + obj['date_sent'] + '</div>';
			acc += '</div>';
		}
		
		list.html(acc);
	},
	
	handleSend : function(thread_id) {
		var user = GLOBAL_DATA.user;
		
		$("#message-form").unbind('submit').submit(function() {
		
			var field = $(this).find("input[type=text]");
			var text = field.val();
		
			runAJAX(null, {
				page : 'message/setmessage',
				id : user['id'],
				thread_id : thread_id,
				message : text
			}, function(response) {
				field.val("");
			});
			
			return false;
		});
	}
};