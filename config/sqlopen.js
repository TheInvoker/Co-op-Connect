var mysql = require('mysql');
var sqlDetails = require('./dbinfo');

exports.runSQL = function(callback) {
	var connection = mysql.createConnection(sqlDetails.sqlDetails);
	connection.connect();
	
	connection.query('USE `' + sqlDetails.sqlDetails["database"] + '`', function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log('connected to database');
			callback(connection);
		}
	});
};