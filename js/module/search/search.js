var SEARCH_MODULE = new function() {
    
    var page = 0,
        context = "#search-page";

    $(context).on('submit', "#search-form", function() {
        runAJAXSerial(SEARCH_SETTINGS_MODULE.getFormData() + "&" + $(this).serialize(), {
            page : 'search/search'
        }, function(response) {
            showResults(response);
        }, function(data,status,xhr) {

        });
        
        return false;
		
    }).on("click", ".footable tbody tr.search-person", function(e) {
		
		if (!e.hasOwnProperty("_selectedProfile")) {
			$(this).toggleClass("search_row_select");
		}
		
    }).on("click", ".footable tbody tr td img", function(e) {
		
		var id = $(this).attr("data-uid");
		PROFILE_MODULE.getProfile(id);
		e['_selectedProfile'] = true;
		
    });
	
	$("#search-panel").on('click', "#search-settings-button", function() {
		
        SEARCH_SETTINGS_MODULE.initSettings();
		
    }).on('click', "#search-none-button", function() {
		
        var searchRows = getSearchRows();
        searchRows.removeClass("search_row_select");
		
    }).on('click', "#search-all-button", function() {
		
        var searchRows = getSearchRows();
        searchRows.addClass("search_row_select");
		
    }).on('click', "#search-message-button", function() {
		
        var idList = getDataList("data-uid");
        var strList = idList.join(",");
         
        runAJAXSerial('', {
            page : 'message/setthread',
            target_ids : strList
        }, function(response) {
            var thread_id = response['id'];
            MESSAGE_MODULE.gotoMessage(thread_id);
        }, function(data,status,xhr) {
            
        });
		
    }).on('click', "#search-email-button", function() {
		
        var emailList = getDataList("data-email");
        var strList = emailList.join(";"); 
        
        window.location.href = "mailto:?bcc=" + strList;
    });

    this.initSearch = function() {
        changePage(context,function(){});
    };
    
	this.getContext = function() {
		return context;
	};
	
    var clearPage = function() {
        $(context).find("#search-form").find("input").eq(0).val("");
        $(context).find(".footable > tbody").empty();
		$(context).find('.footable').trigger('footable_redraw');
    };

    var showResults = function(response) {
        var body = $(context).find(".footable > tbody"), acc = "", i=0, l=response.length;
        
		clearPage();
		
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            var tagid = 'searchlist-' + i;

            acc += "<tr class=\"search-person\" data-uid=\"" + obj['id'] + "\" data-email=\"" + obj['email'] + "\">";
            acc += "<td>" + (i+1) + "</td>";
            acc += "<td><img class=\"small-image\" title=\"Click to visit profile\" src=\"" + (obj['picURL']=='' ? GLOBAL_DATA.def_image_link : obj['picURL']) + "\" data-uid=\"" + obj['id'] + "\"/></td>";
            acc += '<td>' + obj['firstname'] + '</td>';
			acc += '<td>' + obj['lastname'] + '</td>';
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