var REGISTER_MODULE = {
	
	register : function() {
		$.mobile.changePage( "#register-page", { 
			transition: "slide"
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
						$.mobile.changePage( "", { 
							transition: "slide",
							changeHash: false,
							reverse: true
						});	
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