var MESSAGE_MODULE_OBJ = function() {
    
    var page = 0,
        thread_id = null,
        serviceChecker = null,
        serviceFrequency = 1000 * 60 * 3,
        names = null,
        context = "#message-page",
        thisOBJ = this;
    
    this.gotoMessage = function(tid, thisnames) {

        var user = GLOBAL_DATA.user;
        names = thisnames;
        
        runAJAXSerial('', {
            page : 'message/getmessages',
            thread_id : tid,
            id : user['id'],
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
            
            // handle sending messages
            handleSend(tid);
            
            // handle getting more messages
            handleGetMore(tid);

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

    this.scrollBot = function() {
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
            acc_temp += '<div class="message ' + (obj['user_id']==user['id'] ? 'message-right' : 'message-left') + '">';
            acc_temp += '<img src="' + getImage(obj['user_id']) + '" align="right" class="message-image" />';
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

    var getImage = function(id) {
        var i=0; l=names.length;
        for(i=0; i<l; i+=1) {
            var obj = names[i];
            if (obj['id'] == id) {
                return obj['picURL']=='' ? GLOBAL_DATA.def_image_link : obj['picURL'];
            }
        }
        return GLOBAL_DATA.def_image_link;
    };

    var addMessage = function(html, onBottom) {
        var list = $(context).find("#message-list");
        if (onBottom) {
            list.append(html);
            thisOBJ.scrollBot();
        } else {
            list.prepend(html);
        }
    };

    var handleSend = function(thread_id) {
        var user = GLOBAL_DATA.user;
        
        $(context).find("#message-form").unbind('submit').submit(function() {
        
            var field = $(this).find("textarea");
        
            runAJAXSerial($(this).serialize(), {
                page : 'message/setmessage',
                id : user['id'],
                thread_id : thread_id
            }, function(response) {
                var user = GLOBAL_DATA.user;
                
                var obj = {
                    user_id : user['id'],
                    message : field[0].value.replace(/<br\s*\/?>/mg,"\n"),
                    date_sent : getDate() + ' ' + getTime()
                };

                cleanResponse(obj);
                
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