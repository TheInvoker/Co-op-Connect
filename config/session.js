var users = {};

exports.sayHelloInEnglish = function() {
  return "HELLO";
};




exports.isLoggedIn = function(clientsessionID) {
	return clientsessionID in users && users[clientsessionID]["loggedIn"];
};
exports.setLoggedOut = function(clientsessionID) {
	activeUsers[clientsessionID]["loggedIn"] = false;
};
exports.setLoggedIn = function(clientsessionID, data) {
	if (clientsessionID in users) {
		activeUsers[clientsessionID]["loggedIn"] = true;
	} else {
		activeUsers[clientsessionID] = {
			'loggedIn' : true,
			'data' : data
		};
	}
};
exports.getUserObj = function(clientsessionID) {
	return users[clientsessionID]["data"];
};