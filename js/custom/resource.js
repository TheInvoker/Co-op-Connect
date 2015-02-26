var RESOURCE_MODULE = {
	
	// PUBLIC

	setResource : function() {
		
		var user = GLOBAL_DATA.user;

		runAJAXSerial('', {
			page : 'resource/getresources',
			id : user['id']
		}, function(response) {
			$.mobile.changePage("#resource-page", { 
				transition: "slide"
			});
			
			// add resource items
			RESOURCE_MODULE.displayResource(response);
		}, function(data,status,xhr) {
			
		});
	},

	// PRIVATE
	
	displayResource : function(response) {
		var list = $("#resource-list");
		list.empty();
		
		var myListContent = "";
		for(var i=0; i<response.length; i+=1) {
			var obj = response[i];
			myListContent += '<li' + RESOURCE_MODULE.checkNew(obj) + '>' + RESOURCE_MODULE.formatResource(obj) + '</li>';
		}
		
		list.append(myListContent).listview().trigger('create');
		list.listview('refresh');
	},
	
	checkNew : function(obj) {
		if (obj['new']=='1') {
			return ' class="new_item"'; 
		}
		return '';
	},
	
	formatResource : function(obj) {
		var str = '<table>';
		str += '<tr title="Description"><td valign="top"><span class="ui-icon-alert ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + Autolinker.link(obj['text']) + '</td></tr>';
		str += '<tr title="Last Updated"><td valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['date_modified'] + '</td></tr>';
		str += '</table>';
		return str;
	}
};