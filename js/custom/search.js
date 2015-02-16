var SEARCH_MODULE = {
	
	page : 0,
	
	initSearch : function() {
		$.mobile.changePage("#search-page", { 
			transition: "slide"
		});
		
		SEARCH_MODULE.clearPage();
		
		SEARCH_MODULE.resetForm();
		
		SEARCH_MODULE.searchHandler();
		
		SEARCH_MODULE.settingsHandler();
	},
	
	clearPage : function() {
		$("#search-table > tbody").empty();
		$("#search-form").find("input").eq(0).val("");
	},
	
	resetForm : function() {
		$("#search-settings-form").find("input[type=text],input[type=date]").val("");
		
		try {
			$("#search-settings-form").find("input[type=checkbox]").prop("checked", true).checkboxradio( "refresh" );
		} catch(err) {}
	},
	
	searchHandler : function() {
		
		$("#search-form").unbind('submit').submit(function() {
			
			var formData = $("#search-settings-form").serialize();
			formData += "&" + $(this).serialize();
			formData += '&page=search/search';

			$.ajax({
				type: 'POST',
				url: GLOBAL_DATA.server_link,
				data: formData,
				dataType: 'json',
				success: function(jsonData) {
					handleResponse(jsonData, function(response) {
						SEARCH_MODULE.showResults(response);
					});
				},
				error: function(data,status,xhr) {
					alert('Error Occured!');
				}
			});
			
			return false;
		});
	},
	
	settingsHandler : function() {
		$("#search-setting-button").unbind('click').click(function() {
			$.mobile.changePage("#search-settings-page", { 
				transition: "slide"
			});
			
			$(".clear-cb-button").unbind('click').click(function() {
				$(this).parent().find("input").prop("checked", false).checkboxradio( "refresh" );
			});
			$(".selectall-cb-button").unbind('click').click(function() {
				$(this).parent().find("input").prop("checked", true).checkboxradio( "refresh" );
			});
			$(".clear-text-date").unbind('click').click(function() {
				$(this).prev().find("input").val("");
			});
			$(".set-text-today").unbind('click').click(function() {
				$(this).prev().prev().find("input").val(getDate());
			});
			
			var elements = $("#search-settings-form").find("input[type=date]");
			dateHandler(elements, false, function() {});
		});
	},
	
	showResults : function(response) {
		var body = $("#search-table > tbody");
		
		var acc = "";
		for(var i=0;i<response.length; i+=1) {
			var obj = response[i];
			acc += "<tr class=\"search-person\" data-id=\"" + obj['id'] + "\">";
			acc += "<th><img class=\"small-image\" src=\"" + obj['picURL'] + "\"/></th>";
			acc += "<td>" + obj['firstname'] + " " + obj['lastname'] + "</td>";
			acc += "<td>" + obj['role_name'] + "</td>";
			acc += "<td>" + obj['department_name'] + "</td>";
			acc += "<td>" + obj['num_placements'] + "</td>";
			acc += "</tr>";
		}
		
		body.html(acc);
		$("#search-table").find(".search-person").click(function() {
			var id = $(this).attr("data-id");
			PROFILE_MODULE.getProfile(id);
		});
		$("#search-table").table("refresh");
	}
};