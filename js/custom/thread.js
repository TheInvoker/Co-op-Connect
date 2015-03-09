var THREAD_MODULE_OBJ = function() {
	
	var serviceChecker = null;
	var serviceFrequency = 1000 * 60 * 3;
	var context = "#thread-page";

	this.setMessageThreads = function() {
		var user = GLOBAL_DATA.user;

		runAJAXSerial('', {
			page : 'message/getthreads',
			id : user['id']
		}, function(response) {
			$.mobile.changePage(context, { 
				transition: "slide"
			});
			
			// add thread items
			displayThreads(response);
			
			// handle clicks
			handleAddMember();
			handleProfileClick();
			clickHandler(response);
		}, function(data,status,xhr) {

		});
	};

	this.startAuto = function() {
		threadChecker = setInterval(function(){ 
			setMessageThreads();
		}, serviceFrequency);
	};

	this.stopAuto = function() {
		clearInterval(serviceChecker);
	};

	var displayThreads = function(response) {
		var list = $(context).find("#thread-list");
		list.empty();
		
		var myListContent = "";
		for(var i=0; i<response.length; i+=1) {
			var obj = response[i];
			myListContent += '<li>' + formatThread(obj) + '</li>';
		}
		
		list.append(myListContent).listview().trigger('create');
		list.listview('refresh');
	};
	
	var formatThread = function(obj) {
		var str = '<a href="#"' + checkNew(obj) + ' data-thread-id="' + obj['id'] + '"><table>';
		
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
	};

	var checkNew = function(obj) {
		if (obj['new']=='1') {
			return ' class="new_item"'; 
		}
		return '';
	};

	var handleAddMember = function() {
		$(context).find("#thread-list").find(".add-member-button").click(function() {
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
					gotoMessage(new_thread_id);
				}, function(data,status,xhr) {

				});
			}
			
			return false;
		});
	};

	var handleProfileClick = function() {
		$(context).find("#thread-list").find(".thread-image").click(function() {
			PROFILE_MODULE.getProfile($(this).attr("data-id"));
			return false;
		});
	};
	
	var clickHandler = function(response) {
		$(context).find("#thread-list > li > a").click(function() {
			MESSAGE_MODULE.gotoMessage($(this).attr("data-thread-id"));
		});
	};
};

var THREAD_MODULE = new THREAD_MODULE_OBJ();