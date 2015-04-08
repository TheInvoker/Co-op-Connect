var MESSAGE_MODULE = new function() {
    
    var page = 0,
        thread_id = null,
        serviceChecker = null,
        serviceFrequency = 1000 * 60 * 3,
        context = "#message-page";
    
    registerShowEvent(context, function(prev_id) {
        scrollBot();
        startAuto();
    });

    registerHideEvent(context, function(to_id) {
        stopAuto();
    });

    $(context).on('submit','#message-form',function() {
		
		// set the send message button
        var field = $(this).find("textarea");
    
        if (field.val().trim()) {
            runAJAXSerial($(this).serialize(), {
                page : 'message/setmessage',
                thread_id : thread_id
            }, function(response) {

                var obj = {
                    user_id : GLOBAL_DATA.user['id'],
                    message : field[0].value,
                    date_sent : getDate() + ' ' + getTime(),
					picURL : GLOBAL_DATA.user['picURL']
                };

                cleanResponse(obj);
                
                field.val("").focus();
                
                displayMessages([obj], true);
            }, function(data,status,xhr) {
                
            });
        }
        
        return false;
		
    }).on('click','#more-message-button',function() {
		
		// set the show more messages button
        runAJAXSerial('', {
            page : 'message/getmessages',
            thread_id : thread_id,
            pageindex : page
        }, function(response) {
            if (response.length > 0) {
                page += 1;
                
                displayMessages(response, false);
            } else {
                alert("No more messages.");
            }
        }, function(data,status,xhr) {
            
        });

        return false;
		
    });

    this.gotoMessage = function(tid) {

        runAJAXSerial('', {
            page : 'message/getmessages',
            thread_id : tid,
            pageindex : 0
        }, function(response) {
            
            // update global vars
            page = 1;
            thread_id = tid;
            
            $.mobile.changePage(context, { 
                transition: "slide"
            });
            
            // clear screen
            clearScreen();
            
            // display messages
            displayMessages(response, true);

			// update numbers on menu
			MENU_MODULE.runGetCount();
			
        }, function(data,status,xhr) {

        });
    };

    this.getContext = function() {
        return context;
    };

    var startAuto = function() {
        serviceChecker = setInterval(function(){ 
            getNewMessages(thread_id);
        }, serviceFrequency);
    };

    var stopAuto = function() {
        clearInterval(serviceChecker);
    };

    var scrollBot = function() {
        $('html, body').animate({
            scrollTop:$(document).height()
        }, 'slow');
    };

    var clearScreen = function() {
        $(context).find("#message-list").empty();
    };

    var displayMessages = function(response, onBottom) {
        var user = GLOBAL_DATA.user, i=0, l=response.length, acc = '';

        for(i=0; i<l; i+=1) {
            var obj = response[i];

            var acc_temp = "";
            acc_temp += '<div class="message multiline ' + (obj['user_id']==user['id'] ? 'message-right' : 'message-left') + '">';
            acc_temp += '<img src="' + getImage(obj) + '" align="right" class="message-image" />';
            acc_temp += '<div>' + Autolinker.link(obj['message']) + '</div>';
            acc_temp += '<br/>';
            if (obj['user_id']!=user['id']) {
                acc_temp += '<div class="message-details">' + obj['first_name'] + ' ' + obj['last_name'] + '</div>';
            }
            acc_temp += '<div class="message-details">' + obj['date_sent'] + '</div>';
            acc_temp += '</div>';
            
            acc = acc_temp + acc;
        }
        
        addMessage(acc, onBottom);
    };

    var getImage = function(obj) {
        return obj['picURL']=='' ? GLOBAL_DATA.def_image_link : obj['picURL'];
    };

    var addMessage = function(html, onBottom) {
        var list = $(context).find("#message-list");
        if (onBottom) {
            list.append(html);
            scrollBot();
        } else {
            list.prepend(html);
        }
    };
    
    var getNewMessages = function(thread_id) {
        var user = GLOBAL_DATA.user;
        
        runAJAXSerial('', {
            page : 'message/getnewmessages',
            thread_id : thread_id
        }, function(response) {
            if (response.length > 0) {
                displayMessages(response, true);
            }
        }, function(data,status,xhr) {
            
        });
    };
};