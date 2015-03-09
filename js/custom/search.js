var SEARCH_MODULE_OBJ = function() {
    
    var page = 0;
    var context = "#search-page";

    this.initSearch = function() {
        $.mobile.changePage(context, { 
            transition: "slide"
        });
        
        clearPage();

        settingsHandler();
        
        searchHandler();
    };
    
    var clearPage = function() {
        $(context).find("#search-form").find("input").eq(0).val("");
        $(context).find("#search-table > tbody").empty();
    };
    
    var settingsHandler = function() {
        $(context).find("#search-setting-button").unbind('click').click(function() {
            SEARCH_SETTINGS_MODULE.initSettings();
        });
    };
    
    var searchHandler = function() {
        
        $(context).find("#search-form").unbind('submit').submit(function() {
            
            var formData = SEARCH_SETTINGS_MODULE.getFormData() + "&" + $(this).serialize();

            runAJAXSerial(formData, {
                page : 'search/search'
            }, function(response) {
                showResults(response);
                handleViewPerson();
                handleCheckBoxControls();
            }, function(data,status,xhr) {

            });
            
            return false;
        });
    };
    
    var showResults = function(response) {
        var body = $(context).find("#search-table > tbody");
        
        var acc = "";
        for(var i=0;i<response.length; i+=1) {
            var obj = response[i];
            
            acc += "<tr class=\"search-person\" data-id=\"" + obj['id'] + "\" data-email=\"" + obj['email'] + "\">";
            acc += "<th><div class='custom-radio' title='Click to toggle selection'></div></th>";
            acc += "<td>" + (i+1) + "</td>";
            acc += "<td><img class=\"small-image\" src=\"" + (obj['picURL']=='' ? GLOBAL_DATA.def_image_link : obj['picURL']) + "\"/></td>";
            acc += "<td>" + obj['firstname'] + " " + obj['lastname'] + "</td>";
            acc += "<td>" + getColorCodeTag(obj['role_name'], obj['r_color']) + "</td>";
            acc += "<td>" + getColorCodeTag(obj['department_name'], obj['d_color']) + "</td>";
            acc += "<td>" + obj['num_placements'] + "</td>";
            acc += "</tr>";
        }
        
        body.html(acc);

        $(context).find("#search-table").table("refresh");
    };

    var handleViewPerson = function() {
        $(context).find("#search-table").find(".search-person").unbind('click').click(function() {
            var id = $(this).attr("data-id");
            PROFILE_MODULE.getProfile(id);
        });
    };

    var handleCheckBoxControls = function() {
        var checkBoxes = $(context).find("#search-table").find(".custom-radio");
        
        checkBoxes.unbind('click').click(function() {
            $(this).toggleClass("custom-radio-on");
            return false;
        });
        $(context).find("#search-clear-all").unbind('click').click(function() {
            checkBoxes.removeClass("custom-radio-on");
        });
        $(context).find("#search-select-all").unbind('click').click(function() {
            checkBoxes.addClass("custom-radio-on");
        });
        $(context).find("#search-message-all").unbind('click').click(function() {
            var idList = getDataList(checkBoxes, "data-id");
            var strList = idList.join(",");
             
            var user = GLOBAL_DATA.user;
            
            runAJAXSerial('', {
                page : 'message/setthread',
                target_ids : strList,
                user_id : user['id']
            }, function(response) {
                var thread_id = response['id'];
                MESSAGE_MODULE.gotoMessage(thread_id);
            }, function(data,status,xhr) {
                
            });
        });
        $(context).find("#search-email-all").unbind('click').click(function() {
            var emailList = getDataList(checkBoxes, "data-email");
            var strList = emailList.join(","); 
            
            window.location.href = "mailto:?bcc=" + strList;
        });
    };

    var getDataList = function(checkBoxes, attr) {
        var list = [];
        
        for(var i=0; i<checkBoxes.length; i+=1) {
            var obj = $(checkBoxes[i]);
            
            if (obj.hasClass("custom-radio-on")) {
                var data = obj.parent().parent().attr(attr);
                list.push(data);
            }
        }
        
        return list;
    };
};

var SEARCH_MODULE = new SEARCH_MODULE_OBJ();