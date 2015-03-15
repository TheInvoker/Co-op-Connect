var SEARCH_MODULE_OBJ = function() {
    
    var page = 0,
        context = "#search-page";

	swipePanel(context, "#search-panel");
	
	$(context).find('.footable').footable();
	
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
        }, function(data,status,xhr) {

        });
        
        return false;
    });

    $(context).on("click", ".search-person", function(e) {
		if (!e.hasOwnProperty("_selectedProfile")) {
			$(this).toggleClass("search_row_select");
		}
    });

    $(context).on("click", ".footable tbody tr td img", function(e) {
		var id = $(this).attr("data-id");
		PROFILE_MODULE.getProfile(id);
		e['_selectedProfile'] = true;
    });
	
    $(context).on('click', "#search-clear-all", function() {
        var searchRows = getSearchRows();
        searchRows.removeClass("search_row_select");
    });

    $(context).on('click', "#search-select-all", function() {
        var searchRows = getSearchRows();
        searchRows.addClass("search_row_select");
    });

    $(context).on('click', "#search-message-all", function() {
        var idList = getDataList("data-id");
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

    $(context).on('click', "#search-email-all", function() {
        var emailList = getDataList("data-email");
        var strList = emailList.join(";"); 
        
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
        $(context).find(".footable > tbody").empty();
		$(context).find('.footable').trigger('footable_redraw');
    };

    var showResults = function(response) {
        var body = $(context).find("#search-table > tbody"), acc = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            var tagid = 'searchlist-' + i;

            acc += "<tr class=\"search-person\" data-id=\"" + obj['id'] + "\" data-email=\"" + obj['email'] + "\">";
            acc += "<td>" + (i+1) + "</td>";
            acc += "<td><img class=\"small-image\" src=\"" + (obj['picURL']=='' ? GLOBAL_DATA.def_image_link : obj['picURL']) + "\" data-id=\"" + obj['id'] + "\"/></td>";
            acc += '<td>' + obj['firstname'] + " " + obj['lastname'] + '</td>';
            acc += "<td>" + getColorCodeTag(obj['role_name'], obj['r_color']) + "</td>";
            acc += "<td>" + getColorCodeTag(obj['department_name'], obj['d_color']) + "</td>";
            acc += "<td>" + obj['num_placements'] + "</td>";
            acc += "</tr>";
        }
        
        body.html(acc);
		
		$(context).find('.footable').trigger('footable_redraw');
		$(context).find('.footable tfoot a').filter('[data-page="0"]').trigger('click');
    };

    var getDataList = function(attr) {
        var searchRows = getSearchRows();
        var i=0; l=searchRows.length, list = [];

        for(i=0; i<l; i+=1) {
            var obj = $(searchRows[i]);
            
            if (obj.hasClass("search_row_select")) {
                list.push(obj.attr(attr));
            }
        }
        
        return list;
    };
	
    var getSearchRows = function() {
        return $(context).find(".footable tbody tr");
    };
};

var SEARCH_MODULE = new SEARCH_MODULE_OBJ();