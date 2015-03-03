var SEARCH_MODULE = {
	
	// PUBLIC

	initSearch : function() {
		$.mobile.changePage("#search-page", { 
			transition: "slide"
		});
		
		SEARCH_MODULE.clearPage();

		SEARCH_MODULE.settingsHandler();
		
		SEARCH_MODULE.searchHandler();
	},
	
	// PRIVATE

	page : 0,

	clearPage : function() {
		$("#search-form").find("input").eq(0).val("");
		$("#search-table > tbody").empty();
	},
	
	settingsHandler : function() {
		$("#search-setting-button").unbind('click').click(function() {
			SEARCH_SETTINGS_MODULE.initSettings();
		});
	},
	
	searchHandler : function() {
		
		$("#search-form").unbind('submit').submit(function() {
			
			var formData = SEARCH_SETTINGS_MODULE.getFormData() + "&" + $(this).serialize();

			runAJAXSerial(formData, {
				page : 'search/search'
			}, function(response) {
				SEARCH_MODULE.showResults(response);
				SEARCH_MODULE.handleViewPerson();
				SEARCH_MODULE.handleCheckBoxControls();
			}, function(data,status,xhr) {

			});
			
			return false;
		});
	},
	
	showResults : function(response) {
		var body = $("#search-table > tbody");
		
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

		$("#search-table").table("refresh");
	},

	handleViewPerson : function() {
		$("#search-table").find(".search-person").unbind('click').click(function() {
			var id = $(this).attr("data-id");
			PROFILE_MODULE.getProfile(id);
		});
	},

	handleCheckBoxControls : function() {
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
			var idList = SEARCH_MODULE.getDataList(checkBoxes, "data-id");
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
		$("#search-email-all").unbind('click').click(function() {
			var emailList = SEARCH_MODULE.getDataList(checkBoxes, "data-email");
			var strList = emailList.join(","); 
			
			window.location.href = "mailto:?bcc=" + strList;
		});
	},

	getDataList : function(checkBoxes, attr) {
		var list = [];
		
		for(var i=0; i<checkBoxes.length; i+=1) {
			var obj = $(checkBoxes[i]);
			
			if (obj.hasClass("custom-radio-on")) {
				var data = obj.parent().parent().attr(attr);
				list.push(data);
			}
		}
		
		return list;
	}
};