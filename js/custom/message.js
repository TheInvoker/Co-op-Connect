var MESSAGE_MODULE = {
	
	setMessageThreads : function() {
		var user = GLOBAL_DATA.user;
		var formData = 'page=message/getthreads&id=' + user['id'];
		
		$.ajax({
			type: 'POST',
			url: GLOBAL_DATA.server_link,
			data: formData,
			dataType: 'json',
			success: function(jsonData) {
				handleResponse(jsonData, function(response) {
					$.mobile.changePage("#thread-page", { 
						transition: "slide"
					});
					
					// add thread items
					MESSAGE_MODULE.displayThreads(response);
				});
			},
			error: function(data,status,xhr) {
				alert('Error Occured!');
			}
		});
	},
	
	displayThreads : function(response) {
		
	}
};