var THREAD_MODULE = {
	
	// PUBLIC

	setMessageThreads : function() {
		var user = GLOBAL_DATA.user;

		runAJAXSerial('', {
			page : 'message/getthreads',
			id : user['id']
		}, function(response) {
			handleResponse(jsonData, function(response) {
				$.mobile.changePage("#thread-page", { 
					transition: "slide"
				});
				
				// add thread items
				THREAD_MODULE.displayThreads(response);
				
				// handle clicks
				THREAD_MODULE.handleAddMember();
				THREAD_MODULE.handleProfileClick();
				THREAD_MODULE.clickHandler(response);
			});
		}, function(data,status,xhr) {

		});
	},

	startAuto : function() {
		THREAD_MODULE.threadChecker = setInterval(function(){ 
			THREAD_MODULE.setMessageThreads();
		}, THREAD_MODULE.serviceFrequency);
	},

	stopAuto : function() {
		clearInterval(THREAD_MODULE.serviceChecker);
	},

	// PRIVATE

	serviceChecker : null,
	serviceFrequency : 1000 * 60 * 3,

	displayThreads : function(response) {
		var list = $("#thread-list");
		list.empty();
		
		var myListContent = "";
		for(var i=0; i<response.length; i+=1) {
			var obj = response[i];
			myListContent += '<li>' + THREAD_MODULE.formatThread(obj) + '</li>';
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
		var str = '<a href="#"' + THREAD_MODULE.checkNew(obj) + ' data-thread-id="' + obj['id'] + '"><table>';
		
		var picList = '';
		var nameList = obj['member_names'];
		for(var i=0; i<nameList.length; i+=1) {
			var nameObj = nameList[i];
			var thisname = nameObj['first_name'] + ' ' + nameObj['last_name'];
			picList += '<span class="thread-image" data-id="' + nameObj['id'] + '"><div><img title="' + thisname + '" alt="' + thisname + '" src="' + (nameObj['picURL']=='' ? GLOBAL_DATA.def_image_link : nameObj['picURL']) + '" class="small-image"/></div><div>' + thisname + '</div></span>';
		}

		str += '<tr title="Message"><td valign="top"><span class="ui-icon-comment ui-btn-icon-left myicon"/></td><td colspan="3" valign="top" class="mywrap">' + Autolinker.link(obj['message']) + '</td></tr>';
		str += '<tr title="Date Sent"><td valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td colspan="3" valign="top" class="mywrap">' + obj['date_sent'] + '</td></tr>';
		
		str += '<tr title="Recipants"><td><span class="ui-icon-user ui-btn-icon-left myicon"/></td>';
		str += '<td valign="top" class="mywrap">' + picList + '</td>';
		str += '<td>' + (obj['extra'] > 0 ? " + " + obj['extra'] : '') + '</td>';
		str += '<td><a href="#" title="Add Member" class="add-member-button ui-btn ui-shadow ui-icon-plus ui-btn-icon-notext" data-thread-id="' + obj['id'] + '"></a></td></tr>';

		str += '</table></a>';
		return str;
	},

	handleAddMember : function() {
		$("#thread-list").find(".add-member-button").unbind('click').click(function() {
			var thread_id = $(this).attr("data-thread-id");
			var email = prompt("Please enter email adress of member to add:", "");
			
			if (email != null) {
				email = email.trim();
				
				runAJAXSerial('', {
					page : 'message/addmember',
					thread_id : thread_id,
					email : email
				}, function(response) {
					var new_thread_id = response['id'];
					THREAD_MODULE.gotoMessage(new_thread_id);
				}, function(data,status,xhr) {

				});
			}
			
			return false;
		});
	},	

	handleProfileClick : function() {
		$("#thread-list").find(".thread-image").unbind('click').click(function() {
			PROFILE_MODULE.getProfile($(this).attr("data-id"));
			return false;
		});
	},
	
	clickHandler : function(response) {
		$("#thread-list > li > a").unbind('click').click(function() {
			MESSAGE_MODULE.gotoMessage($(this).attr("data-thread-id"));
			return false;
		});
	}
};