var common = require("./config/common");
var sqlOpen = require('./config/sqlopen');
var session = require('./config/session.js');
var loginModule = require('./script/user/login'); 
var express = require('express');
var app = express();
var path = require('path'); 


app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
	var dest = 'index.html';
	res.sendFile(dest, { root: __dirname });
});
app.get('/coopconnect', function (req, res) {
	var clientsessionID = req.query.clientid;
	var dest = session.isLoggedIn(clientsessionID) ? 'coopconnect.html' : 'index.html';
	res.sendFile(dest, { root: __dirname });
});




var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Co-op Connect started at http://%s:%s', host, port);
});

var io = require('socket.io').listen(server);







io.on('connection', function(socket){
	console.log('a user connected');
	
	socket.on('checklogin', function(data){
		var clientsessionID = data.clientid;
		if (session.isLoggedIn(clientsessionID)) {
			socket.emit('loginSuccess');
		}
	});
	
	socket.on('login', function(data){
		var clientsessionID = data.clientid;
		var email = data.email;
		var password = data.password;	
		
		loginModule.handle(sqlOpen, email, password, function(data) {
			session.setLoggedIn(clientsessionID);
			socket.emit('loginSuccess', data);
		}, function(data) {
			session.setLoggedOut(clientsessionID);
			socket.emit('loginFailed', data);
		});
	});
	
	socket.on('logout', function(msg){

		var data = JSON.parse(msg);
		var clientsessionID = data.clientid;
		
		session.setLoggedOut(clientsessionID);
	});
	
	socket.on('resetpassword', function(msg){

		var data = JSON.parse(msg);
		var clientsessionID = data.clientid;
		var userObj = session.getUserObj(clientsessionID);
	});
	
	socket.on('disconnect', function() {
		console.log('user disconnected');
		session.socketDisconnect(socket.id);
	});
});






/*
var finishRequest = function(res, returnCode, message) {	
	res.end(JSON.stringify({
		"code" : returnCode, 
		"response" : message
	}));
}
*/