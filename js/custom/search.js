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
			$("#done-search-settings-button").unbind('click').click(function() {
				history.back();
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

		$("#search-table").table("refresh");
		$("#search-table").find(".search-person").unbind('click').click(function() {
			var id = $(this).attr("data-id");
			PROFILE_MODULE.getProfile(id);
		});
		
		var checkBoxes = $("#search-table").find(".custom-radio");
		
		checkBoxes.unbind('click').click(function() {
			$(this).toggleClass("custom-radio-on");
			return false;
		});
		$("#search-clear-all").unbind('click').click(function() {
			checkBoxes.removeClass("custom-radio-on");
		});
		$("#search-select-all").unbind('click').click(function() {
			checkBoxes.addClass("custom-radio-on");
		});
		$("#search-message-all").unbind('click').click(function() {
			var idList = [];
			
			for(var i=0; i<checkBoxes.length; i+=1) {
				var obj = $(checkBoxes[i]);
				
				if (obj.hasClass("custom-radio-on")) {
					var id = obj.parent().parent().attr("data-id");
					idList.push(id);
				}
			}
			
			var strList = idList.join(","); 
			var user = GLOBAL_DATA.user;
			
			runAJAXSerial('', {
				page : 'message/setthread',
				target_ids : strList,
				user_id : user['id']
			}, function(response) {
				var thread_id = response['id'];
				MESSAGE_MODULE.gotoMessage(thread_id);
			});
		});
	}
};