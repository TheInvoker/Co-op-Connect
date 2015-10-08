var LOGIN_MODULE = new function() {
    
    var context = "#login-page";
	
	socket.on('loginSuccess', function(msg){
		window.location.href = 'coopconnect?clientid=' + GLOBAL_DATA.clientID;
	});
	socket.on('loginFailed', function(msg){
		alert(msg.message);
	});
	socket.emit('checklogin', {
		'clientid' : GLOBAL_DATA.clientID
	});
			
	$(context).on('submit', "#login-form", function() {
		
		// configure login button click
		socket.emit('login', {
			email : $(this).find("input[name=email]").val(),
			password : $(this).find("input[name=password]").val(),
			clientid : GLOBAL_DATA.clientID
		});
		
		return false;
		
	});
	
	$("#login-panel").on('click', "#login-register-button", function() {
		// configure register button click
		REGISTER_MODULE.register();
		
	}).on('click', "#login-forgot-button", function() {
		
		// configure forgot password button click
		var email = prompt("Please enter your email adress:", "");
		
		if (email != null) {
			email = email.trim();
			
			runAJAXSerial("user/resetpassword", "", {
				email : email
			}, function(response) {
				showNotification("Success", "A confirmation email has been sent to you.", function() {
				});
			}, function(data,status,xhr) {
				
			});
		}
		
	});
	
	this.showLogin = function() {
		changePage(context, function() {});
	};
	
	this.getContext = function() {
		return context;
	};
};