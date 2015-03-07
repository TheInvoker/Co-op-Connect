var RESOURCE_MODULE = {
	
	// PUBLIC

	setResource : function() {
		
		var user = GLOBAL_DATA.user;

		runAJAXSerial('', {
			page : 'resource/getresources',
			id : user['id'],
			pageindex : RESOURCE_MODULE.page
		}, function(response) {
			RESOURCE_MODULE.page += 1;
			
			$.mobile.changePage(RESOURCE_MODULE.context, { 
				transition: "slide"
			});
			
			// clear
			RESOURCE_MODULE.emptyScreen();
			
			// add resource items
			RESOURCE_MODULE.displayResource(response);
			
			// handle show more
			RESOURCE_MODULE.handleShowMore();
		}, function(data,status,xhr) {
			
		});
	},

	// PRIVATE
	
	page : 0,
	context : "#resource-page",
	
	emptyScreen : function() {
		var list = $(RESOURCE_MODULE.context).find("#resource-list");
		list.empty();
	},
	
	displayResource : function(response) {
		var list = $(RESOURCE_MODULE.context).find("#resource-list");
		
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
	},
	
	handleShowMore : function() {
		$(RESOURCE_MODULE.context).find("#more-resource-button").unbind('click').click(function() {
			
			var user = GLOBAL_DATA.user;
			
			runAJAXSerial('', {
				page : 'resource/getresources',
				id : user['id'],
				pageindex : RESOURCE_MODULE.page
			}, function(response) {
				RESOURCE_MODULE.page += 1;

				if (response.length > 0) {
					// add resource items
					RESOURCE_MODULE.displayResource(response);
				} else {
					alert("No more resources.");
				}
			}, function(data,status,xhr) {
				
			});
		});
	}
};