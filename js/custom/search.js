var SEARCH_MODULE_OBJ = function() {
    
    var page = 0,
        context = "#search-page";

	swipePanel(context, "#search-panel");
	
    registerShowEvent(context, function(prev_id) {
        if (prev_id != SEARCH_SETTINGS_MODULE.getContext()) {
            SEARCH_SETTINGS_MODULE.resetForm();
        }
    });

    $(context).on('click', "#search-setting-button", function() {
        SEARCH_SETTINGS_MODULE.initSettings();
    });

    $(context).on('submit', "#search-form", function() {

        runAJAXSerial(SEARCH_SETTINGS_MODULE.getFormData() + "&" + $(this).serialize(), {
            page : 'search/search'
        }, function(response) {
            showResults(response);
            activateCheckBoxes();
        }, function(data,status,xhr) {

        });
        
        return false;
    });

    $(context).on("click", ".search-person", function(e) {
        if (!e.hasOwnProperty('_clickedName')) {
            var id = $(this).attr("data-id");
            PROFILE_MODULE.getProfile(id);
        }
    });

    $(context).on("click", ".search-person .ui-checkbox .ui-btn", function(e) {
        e['_clickedName'] = true;
    });

    $(context).on('click', "#search-clear-all", function() {
        var checkBoxes = getcheckBoxes();
        checkBoxes.prop("checked", false).checkboxradio( "refresh" );
    });

    $(context).on('click', "#search-select-all", function() {
        var checkBoxes = getcheckBoxes();
        checkBoxes.prop("checked", true).checkboxradio( "refresh" );
    });

    $(context).on('click', "#search-message-all", function() {
        var idList = getDataList("data-id");
        var strList = idList.join(";");
         
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

    $(context).on('click', "#search-email-all", function() {
        var emailList = getDataList("data-email");
        var strList = emailList.join(","); 
        
        window.location.href = "mailto:?bcc=" + strList;
    });

    this.initSearch = function() {
        $.mobile.changePage(context, { 
            transition: "slide"
        });
        
        clearPage();
    };
    
    var clearPage = function() {
        $(context).find("#search-form").find("input").eq(0).val("");
        $(context).find("#search-table > tbody").empty();
    };

    var showResults = function(response) {
        var body = $(context).find("#search-table > tbody"), acc = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            var tagid = 'searchlist-' + i;

            acc += "<tr class=\"search-person\" data-id=\"" + obj['id'] + "\" data-email=\"" + obj['email'] + "\">";
            acc += "<td>" + (i+1) + "</td>";
            acc += "<td><img class=\"small-image\" src=\"" + (obj['picURL']=='' ? GLOBAL_DATA.def_image_link : obj['picURL']) + "\"/></td>";
            acc += '<td><div><input name="' + tagid + '" id="' + tagid + '" type="checkbox"><label for="' + tagid + '">' + obj['firstname'] + " " + obj['lastname'] + '</label></div></td>';
            acc += "<td>" + getColorCodeTag(obj['role_name'], obj['r_color']) + "</td>";
            acc += "<td>" + getColorCodeTag(obj['department_name'], obj['d_color']) + "</td>";
            acc += "<td>" + obj['num_placements'] + "</td>";
            acc += "</tr>";
        }
        
        body.html(acc);

        $(context).find("#search-table").table("refresh");
    };

    var activateCheckBoxes = function() {
        var checkBoxes = getcheckBoxes();
        checkBoxes.checkboxradio().prop("checked", false).checkboxradio( "refresh" );
    };

    var getcheckBoxes = function() {
        return $(context).find("#search-table").find("input[type=checkbox]");
    };

    var getDataList = function(attr) {
        var checkBoxes = getcheckBoxes();
        var i=0; l=checkBoxes.length, list = [];

        for(i=0; i<l; i+=1) {
            var obj = $(checkBoxes[i]);
            
            if (obj[0].checked) {
                list.push(obj.parent().parent().attr(attr));
            }
        }
        
        return list;
    };
};

var SEARCH_MODULE = new SEARCH_MODULE_OBJ();