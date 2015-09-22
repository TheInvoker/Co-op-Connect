var fs = require('fs');	
var nodemailer = require('nodemailer');
var uuid = require('node-uuid');

// define vars to keep track of errors
exports["errorMessage"] = "";
exports["successMessage"] = {};

// define error messages
exports["ERROR_SERVER_CONNECT"] = "Could not connect to server.";
exports["ERROR_DB_CONNECT"] = "Could not connect to database.";
exports["ERROR_CLOSE_DB"] = "Could not close database connection.";
exports["ERROR_NOT_LOGGED_IN"] = "You are not logged in.";
exports["ERROR_NOT_GET_DATA"] = "Did not receive all of the data.";
exports["ERROR_SELECT_PERSON_COUNT"] = "Select at least 1 person.";
exports["ERROR_USER_IN_CREATE_THREAD"] = "Cannot create thread with you selected.";
exports["ERROR_USER_IN_THREAD"] = "User is already in this thread.";
exports["ERROR_ACCOUNT_NOT_FOUND"] = "Account not found.";
exports["ERROR_INVALID_LOGIN"] = "Invalid email or password.";
exports["ERROR_ACCOUNT_NOT_ACTIVE"] = "Your account is currently not activated.";
exports["ERROR_PASSWORD_NOT_MATCH"] = "Passwords don't match.";
exports["ERROR_TOKEN_EXPIRED"] = "Token is invalid or expired.";
exports["ERROR_INVALID_IMAGE"] = "Invalid file type.";
exports["ERROR_FILE_BIG"] = "Size cannot be more than 100kb.";
exports["ERROR_UPLOADING_FILE"] = "There was an error uploading the file. Check permissions possibly.";
exports["ERROR_MOVING_FILE"] = "There was an error moving the file. Check permissions possibly.";

exports["logQuery"] = function(str) {
	var msg = str + "\n\n\n----------------------------------------------------\n\n";
	fs.writeFile("logs/log.txt", msg, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	}); 
};

exports["sendEmail"] = function(toEmail, subject, message) {

	message += "<br/><br/><br/><br/>Co-op Connect";		

	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'rydsouza82@gmail.com',
			pass: 'userpass'
		}
	});

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: 'Co-op Connect <rydsouza82@gmail.com>', // sender address
		to: toEmail, // list of receivers
		subject: subject, // Subject line
		text: '', // plaintext body
		html: message // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Message sent: ' + info.response);
		}
	});
};

exports["FormatImageURL"] = function(curID, picName) {
	if (picName == "") {
		return "";
	}
	return "images/avatars/" + curID + "/" + picName;
};

exports["crypto_rand_secure"] = function() {
	return uuid.v4();
};