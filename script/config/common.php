<?php

    // enable debugging
	ini_set('display_errors',1);
	error_reporting(E_ALL);

	// use sessions
	session_start();
	
	// define vars to keep track of errors
	$errorMessage = "";
	$successMessage = array();
	
	// define error messages
	$ERROR_SERVER_CONNECT = "Could not connect to server.";
	$ERROR_DB_CONNECT = "Could not connect to database.";
	$ERROR_CLOSE_DB = "Could not close database connection.";
	$ERROR_NOT_LOGGED_IN = "You are not logged in.";
	$ERROR_NOT_GET_DATA = "Did not recieve all of the data.";
	$ERROR_SELECT_PERSON_COUNT = "Select at least 1 person.";
	$ERROR_USER_IN_CREATE_THREAD = "Cannot create thread with you selected.";
	$ERROR_USER_IN_THREAD = "User is already in this thread.";
	$ERROR_ACCOUNT_NOT_FOUND = "Account not found.";
	$ERROR_INVALID_LOGIN = "Invalid email or password.";
	$ERROR_ACCOUNT_NOT_ACTIVE = "Your account is currently not activated.";
	$ERROR_PASSWORD_NOT_MATCH = "Passwords don't match.";
	$ERROR_TOKEN_EXPIRED = "Token is invalid or expired.";
	$ERROR_INVALID_IMAGE = "Invalid file type.";
	$ERROR_FILE_BIG = "Size cannot be more than 100kb.";
	$ERROR_UPLOADING_FILE = "There was an error uploading the file. Check permissions possibly.";
	$ERROR_MOVING_FILE = "There was an error moving the file. Check permissions possibly.";
	
	function logQuery($str) {
		$myFile = "logs/log.txt";
		$fh = fopen($myFile, 'a');
		fwrite($fh, $str . "\n\n\n");
		fwrite($fh, "----------------------------------------------------\n\n");
		fclose($fh);
	}

	function sendEmail($toEmail, $subject, $message) {
		$hostEmail = "rydsouza82@gmail.com";
		$message = $message . "<br/><br/><br/><br/>Co-op Connect";		
		//$message = wordwrap($message, 70, "<br/>");
		$headers = "From: " . $hostEmail . "\r\n" .
			"Reply-To: " . $hostEmail . "\r\n" .
			"MIME-Version: 1.0" . "\r\n" .
			"Content-Type: text/html; charset=ISO-8859-1" . "\r\n";
			
		mail($toEmail, $subject, $message, $headers);
	}
	
	function FormatImageURL($curID, $picName) {
		if ($picName == "") {
			return "";
		}
		
		return "images/avatars/{$curID}/{$picName}";
	}
	
	
	
	// by Scott
	// http://stackoverflow.com/questions/1846202/php-how-to-generate-a-random-unique-alphanumeric-string
	
	function crypto_rand_secure($min, $max) {
		$range = $max - $min;
		if ($range < 0) return $min; // not so random...
		$log = log($range, 2);
		$bytes = (int) ($log / 8) + 1; // length in bytes
		$bits = (int) $log + 1; // length in bits
		$filter = (int) (1 << $bits) - 1; // set all lower bits to 1
		do {
			$rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
			$rnd = $rnd & $filter; // discard irrelevant bits
		} while ($rnd >= $range);
		return $min + $rnd;
	}

	function getToken($length) {
		$token = "";
		$codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		$codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
		$codeAlphabet.= "0123456789";
		for($i=0;$i<$length;$i++){
			$token .= $codeAlphabet[crypto_rand_secure(0,strlen($codeAlphabet))];
		}
		return $token;
	}
?>