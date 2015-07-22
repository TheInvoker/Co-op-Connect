var THREAD_MODULE = new function() {
    
    var serviceChecker = null,
        serviceFrequency = 1000 * 60 * 3,
        context = "#thread-page";

    $(context).on('click', ".memberList-button", function() {
		
        var thread_id = $(this).attr("data-tid");
        showMembers(thread_id);
        return false;
		
    }).on('click', "#member-list .member-individual", function() {
		
        PROFILE_MODULE.getProfile($(this).attr("data-uid"));
		
    }).on('click', "#thread-list .add-member-button", function() {
		
        var thread_id = $(this).attr("data-tid");
        var email = prompt("Please enter email adress of member to add:", "");
        
        if (email != null) {
            email = email.trim();
            
            runAJAXSerial('', {
                page : 'message/addmember',
                thread_id : thread_id,
                email : email
            }, function(response) {
                var new_thread_id = response['id'];
                MESSAGE_MODULE.gotoMessage(new_thread_id);
            }, function(data,status,xhr) {

            });
        }
        
        return false;
		
    }).on('click', "#thread-list .thread-row", function() {
		
        PROFILE_MODULE.getProfile($(this).attr("data-uid"));
        return false;
		
    }).on('click', "#thread-list > table", function() {
		
        var tid = $(this).attr('data-tid');
        MESSAGE_MODULE.gotoMessage(tid);
		
    });

    this.setMessageThreads = function() {
        runAJAXSerial('', {
            page : 'message/getthreads'
        }, function(res) {
            changePage(context, function(){});
            
            // add thread items
            displayThreads(res);

			startAuto();
        }, function(data,status,xhr) {

        });
    };
	
    var stopAuto = function() {
        clearInterval(serviceChecker);
    };
	
    var startAuto = function() {
		stopAuto();
        threadChecker = setInterval(function(){ 
            THREAD_MODULE.setMessageThreads();
        }, serviceFrequency);
    };

    var displayThreads = function(response) {
        var list = $(context).find("#thread-list"), myListContent = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            myListContent += formatThread(obj);
        }
        
        list.html(myListContent);
    };
    
    var formatThread = function(obj) {
        var user = GLOBAL_DATA.user, nameList = obj['member_names'], i=0, l=nameList.length, picList = '';

        for(var i=0; i<l; i+=1) {
            var nameObj = nameList[i];
            if (nameObj['id'] != user['id']) {
                var thisname = nameObj['first_name'] + ' ' + nameObj['last_name'];
                picList += '<span class="thread-row" data-uid="' + nameObj['id'] + '">' + 
				           '<div>' + 
						   '<img title="' + thisname + '" src="' + (nameObj['picURL']=='' ? GLOBAL_DATA.def_image_link : nameObj['picURL']) + '"/>' + 
						   '</div>' + 
						   '<div>' +
						   thisname + 
						   '</div>' +
						   '</span>';
            }
        }

        var str = '<table'+checkNew(obj)+' data-tid="' + obj['id'] +'">';
        str += '<tr title="Message"><td valign="top"><img src="images/site/svg/message.svg" class="thread-small-icon myicon" /></td><td colspan="3" class="multiline">' + Autolinker.link(obj['message']) + '</td></tr>';
        str += '<tr title="Date Sent"><td valign="top"><img src="images/site/svg/date.svg" class="thread-small-icon myicon" /></td><td colspan="3">' + obj['date_sent'] + '</td></tr>';
        str += '<tr title="Recipants">'
		str += '<td valign="top"><img src="images/site/svg/profile.svg" class="thread-small-icon myicon" /></td>';
        str += '<td>' + picList + '</td>';
        str += '<td align="right">' + (obj['extra'] > 0 ? "<div title='Show All' data-tid='" + obj['id'] + "' class='memberList-button'>(Show All)</div>" : "") + '</td>';
        str += '<td align="right"><div title="Add Member" data-tid="' + obj['id'] + '"><img src="images/site/svg/adduser.svg" class="add-member-button thread-add-user-button myicon" /></div></td>';
		str += '</tr>';
        str += '</table>';

        return str;
    };

    var checkNew = function(obj) {
        if (obj['new']=='1') {
            return ' class="new_item"'; 
        }
        return '';
    };

    var showMembers = function(thread_id) {
        runAJAXSerial('', {
            page : 'message/getmembers',
            id : thread_id
        }, function(response) {
            displayMembers(response);
        }, function(data,status,xhr) {

        });
    };

    var displayMembers = function(response) {
        var user = GLOBAL_DATA.user, list = $(context).find("#member-list"), myListContent = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            if (obj['id'] != user['id']) {
                myListContent += '<div>' + formatMember(obj) + '</div>';
            }
        }

        list.html(myListContent);

        $(context).find("#thread-memberList-popup").show();
    };

    var formatMember = function(obj) {
        var thisname = obj['first_name'] + ' ' + obj['last_name'];

        var str = '<a class="member-individual" href="#" data-uid="' + obj['id'] + '"><table><tr><td>';
        str += '<img title="' + thisname + '" alt="' + thisname + '" src="' + (obj['picURL']=='' ? GLOBAL_DATA.def_image_link : obj['picURL']) + '" class="small-image"/>';
        str += '</td><td>';
        str += thisname;
        str += '</td></tr></table></a>';
        return str;
    };
};