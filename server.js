var common = require("./config/common");
var express = require('express');
var app = express();
var path = require('path'); 
var sqlOpen = require('./config/sqlopen');

var loggedIn = false;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	var dest = loggedIn ? 'coopconnect.html' : 'index.html';
	res.sendFile(dest, { root: __dirname });
});
app.post('/login', function (req, res) {
	var loginModule = require('./script/user/login'); 
	var email = req.body.email;
	var password = req.body.password;	
	console.log(email);
	console.log(password);
	
	loginModule.handle(sqlOpen, email, password, function(message) {
		loggedIn = true;
		finishRequest(res, 200, message);
	}, function(message) {
		loggedIn = false;
		finishRequest(res, 200, message);
	});
});
app.post('/logout', function (req, res) {
	loggedIn = false;
	finishRequest(res, 200, {});
});
app.post('/user/resetpassword', function (req, res) {

});


				//var sqlopen = require("config/sqlopen");
				//var module = require(filepathnoext);
				//module.run(sqlopen);


var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Co-op Connect started at http://%s:%s', host, port);
});

var finishRequest = function(res, returnCode, message) {	
	res.end(JSON.stringify({
		"code" : returnCode, 
		"response" : message
	}));
}