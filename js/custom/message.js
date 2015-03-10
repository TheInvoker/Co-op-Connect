var MESSAGE_MODULE_OBJ = function() {
    
    var page = 0;
    var thread_id = null;
    var serviceChecker = null;
    var serviceFrequency = 1000 * 60 * 3;
    var context = "#message-page";
    
    this.gotoMessage = function(thread_id) {

        var user = GLOBAL_DATA.user;
        
        runAJAXSerial('', {
            page : 'message/getmessages',
            thread_id : thread_id,
            id : user['id'],
            pageindex : 0
        }, function(response) {
            
            // update global vars
            page = 1;
            thread_id = thread_id;
            
            $.mobile.changePage(context, { 
                transition: "slide"
            });
            
            // clear screen
            clearScreen();
            
            // display messages
            displayMessages(response, true);
            
            // handle sending messages
            handleSend(thread_id);
            
            // handle getting more messages
            handleGetMore(thread_id);
			
			// scroll bot
			scrollBot();
        }, function(data,status,xhr) {

        });
    };

    this.startAuto = function() {
        serviceChecker = setInterval(function(){ 
            getNewMessages(thread_id);
        }, serviceFrequency);
    };

    this.stopAuto = function() {
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
        var user = GLOBAL_DATA.user;
        
        var acc = '';
        for(var i=0; i<response.length; i+=1) {
            var obj = response[i];

            var acc_temp = "";
            acc_temp += '<div class="message ' + (obj['user_id']==user['id'] ? 'message-right' : 'message-left') + '">';
            acc_temp += '<div>' + Autolinker.link(escapeHTML(obj['message'])) + '</div>';
            if (obj['user_id']!=user['id']) {
                acc_temp += '<div class="message-details">' + obj['first_name'] + ' ' + obj['last_name'] + '</div>';
            }
            acc_temp += '<div class="message-details">' + obj['date_sent'] + '</div>';
            acc_temp += '</div>';
            
            acc = acc_temp + acc;
        }
        
        addMessage(acc, onBottom);
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

    var handleSend = function(thread_id) {
        var user = GLOBAL_DATA.user;
        
        $(context).find("#message-form").unbind('submit').submit(function() {
        
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
                    date_sent : getDate() + ' ' + getTime()
                };
                
                field.val("").focus();
                
                displayMessages([obj], true);
            }, function(data,status,xhr) {
                
            });
            
            return false;
        });
    };
    
    var handleGetMore = function(thread_id) {
        var user = GLOBAL_DATA.user;
        
        $(context).find("#more-message-button").unbind('click').click(function() {
            runAJAXSerial('', {
                page : 'message/getmessages',
                thread_id : thread_id,
                id : user['id'],
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
    };
    
    var getNewMessages = function(thread_id) {
        var user = GLOBAL_DATA.user;
        
        runAJAXSerial('', {
            page : 'message/getnewmessages',
            thread_id : thread_id,
            id : user['id']
        }, function(response) {
            if (response.length > 0) {
                displayMessages(response, true);
            }
        }, function(data,status,xhr) {
            
        });
    };
};

var MESSAGE_MODULE = new MESSAGE_MODULE_OBJ();