var RESOURCE_MODULE = {
	
	setResource : function() {
		
		var user = GLOBAL_DATA.user;
		var formData = 'page=resource/getresources&id=' + user['id'];
		
		$.ajax({
			type: 'POST',
			url: GLOBAL_DATA.server_link,
			data: formData,
			dataType: 'json',
			success: function(jsonData) {
				handleResponse(jsonData, function(response) {
					$.mobile.changePage("#resource-page", { 
						transition: "slide"
					});
					
					// add resource items
					RESOURCE_MODULE.displayResource(response);
				});
			},
			error: function(data,status,xhr) {
				alert('Error Occured!');
			}
		});
	},
	
	displayResource : function(response) {
		var list = $("#resource-list");
		list.empty();
		
		var myListContent = "";
		for(var i=0; i<response.length; i+=1) {
			var obj = response[i];
			myListContent += '<li' + RESOURCE_MODULE.checkNew(obj) + '>' + RESOURCE_MODULE.formatLocation(obj) + '</li>';
		}
		
		list.append(myListContent).listview().trigger('create');
		list.listview('refresh');
	},
	
	checkNew : function(obj) {
		if (obj['new']=='1') {
			return ' class="new_resource"'; 
		}
		return '';
	},
	
	formatLocation : function(obj) {
		var str = '<table>';
		str += '<tr><td title="Description" valign="top"><span class="ui-icon-info ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['text'] + '</td></tr>';
		str += '<tr><td title="Last Updated" valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">Updated: ' + obj['date_modified'] + '</td></tr>';
		str += '</table>';
		return str;
	}
};