var REGISTER_MODULE = {
	
	register : function() {
		$.mobile.changePage( "#register-page", { 
			transition: "slideup"
		});	
		
		$("#register-form").unbind('submit').submit(function() {
			
			var formData = $(this).serialize();
			formData += '&page=user/register';
			
			$.ajax({
				type: 'POST',
				url: GLOBAL_DATA.server_link,
				data: formData,
				dataType: 'json',
				success: function(jsonData) {
					handleResponse(jsonData, function(response) {
						history.back();
					});
				},
				error: function(data,status,xhr) {
					alert('Error Occured!');
				}
			});

			return false;
		});
	}
};