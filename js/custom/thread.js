var THREAD_MODULE_OBJ = function() {
    
    var serviceChecker = null,
        serviceFrequency = 1000 * 60 * 3,
        context = "#thread-page";

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
            
            // handle more members
            handleMoreMembers();

            // handle clicks
            handleAddMember();

            handleProfileClick();

            clickHandler(response);

        }, function(data,status,xhr) {

        });
    };

    this.startAuto = function(wentBack) {
		if (wentBack) {
			THREAD_MODULE.setMessageThreads();
		}
		
        threadChecker = setInterval(function(){ 
            THREAD_MODULE.setMessageThreads();
        }, serviceFrequency);
    };

    this.stopAuto = function() {
        clearInterval(serviceChecker);
    };

    var displayThreads = function(response) {
        var list = $(context).find("#thread-list"), myListContent = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            myListContent += '<li>' + formatThread(obj) + '</li>';
        }
        
        list.html(myListContent).listview().trigger('create');
        list.listview('refresh');


    };
    
    var formatThread = function(obj) {
        var user = GLOBAL_DATA.user, nameList = obj['member_names'], i=0, l=nameList.length, picList = '';

        for(var i=0; i<l; i+=1) {
            var nameObj = nameList[i];
            if (nameObj['id'] != user['id']) {
                var thisname = nameObj['first_name'] + ' ' + nameObj['last_name'];
                picList += '<span class="thread-image" data-id="' + nameObj['id'] + '"><div><img title="' + thisname + '" alt="' + thisname + '" src="' + (nameObj['picURL']=='' ? GLOBAL_DATA.def_image_link : nameObj['picURL']) + '" class="small-image"/></div><div>' + thisname + '</div></span>';
            }
        }

        var str = '<a href="#"' + checkNew(obj) + ' data-thread-id="' + obj['id'] + '"><table>';
        str += '<tr title="Message"><td valign="top"><span class="ui-icon-comment ui-btn-icon-left myicon"/></td><td colspan="3" valign="top" class="mywrap">' + Autolinker.link(obj['message']) + '</td></tr>';
        str += '<tr title="Date Sent"><td valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td colspan="3" valign="top" class="mywrap">' + obj['date_sent'] + '</td></tr>';
        str += '<tr title="Recipants"><td><span class="ui-icon-user ui-btn-icon-left myicon"/></td>';
        str += '<td valign="top" class="mywrap">' + picList + '</td>';
        str += '<td>' + (obj['extra'] > 0 ? "<a href='#' title='Show All' data-thread-id='" + obj['id'] + "' class='memberList-button'>(Show All)</a>" : "") + '</td>';
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

    var handleMoreMembers = function() {
        $(context).find(".memberList-button").click(function() {
            var thread_id = $(this).attr("data-thread-id");
            showMembers(thread_id);
            return false;
        });
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
                myListContent += '<li>' + formatMember(obj) + '</li>';
            }
        }

        list.html(myListContent).listview().trigger('create');
        list.listview('refresh');

        $(context).find("#member-list").find(".member-individual").click(function() {
            PROFILE_MODULE.getProfile($(this).attr("data-id"));
        });

        $(context).find("#memberList-popup").popup("open");
    };

    var formatMember = function(obj) {
        var thisname = obj['first_name'] + ' ' + obj['last_name'];

        var str = '<a class="member-individual" href="#" data-id="' + obj['id'] + '"><table><tr><td>';
        str += '<img title="' + thisname + '" alt="' + thisname + '" src="' + (obj['picURL']=='' ? GLOBAL_DATA.def_image_link : obj['picURL']) + '" class="small-image"/>';
        str += '</td><td>';
        str += thisname;
        str += '</td></tr></table></a>';
        return str;
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
        var items = $(context).find("#thread-list > li > a");
        
        items.click(function() {
            var index = items.index(this);
            var thread = response[index];
            var names = thread['member_names'];

            MESSAGE_MODULE.gotoMessage($(this).attr("data-thread-id"), names);
        });
    };
};

var THREAD_MODULE = new THREAD_MODULE_OBJ();