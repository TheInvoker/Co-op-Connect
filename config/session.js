var users = {};

exports.isLoggedIn = function(clientsessionID) {
	return clientsessionID in users;
};
exports.setLoggedOut = function(clientsessionID) {
	delete users[clientsessionID];
};
exports.socketDisconnect = function(socketID) {
    for (var property in users) {
        if (users.hasOwnProperty(property) && users[property].socketID == socketID) {
            users[property].online = false;
			return;
        }
    }
};
exports.setLoggedIn = function(clientsessionID, socketID) {
	if (clientsessionID in users) {
		users[clientsessionID].online = true;
	} else {
		users[clientsessionID] = {
			'online' : true,
			'socketID' : socketID
		};
	}
};