<?php

    // enable debugging
	ini_set('display_errors',1);
	error_reporting(E_ALL);

	// set print json
	$GLOBALS['printJSON'] = true;
	
	function RunQueries($page) {
	
		$errorMessage = null;
		$successMessage = array();

		include dirname(__FILE__).'/dbinfo.php';
	
		$sqlConnection = mysqli_connect($sqlHost, $sqlusername, $sqlpassword);
		
		if ($sqlConnection) {
		
			$sqlDB = mysqli_select_db($sqlConnection, $sqldbname); 
			if ($sqlDB) {
				
				include dirname(__FILE__) . '/../' . $page . '.php';

			} else {
				$errorMessage = "Could not connect to database.";
			}
			
			mysqli_close($sqlConnection);
			
		} else {
			$errorMessage = "Could not connect to server.";
		}

		if ($errorMessage == null) {
			return $successMessage;
		}
		
		return $errorMessage;
	}
	
	function logQuery($str) {
		$myFile = "../../logs/log.txt";
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
		
		return "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/../../images/avatars/{$curID}/{$picName}";
	}
	
	
	
	
	// http://stackoverflow.com/questions/1846202/php-how-to-generate-a-random-unique-alphanumeric-string
	// by Scott
	
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