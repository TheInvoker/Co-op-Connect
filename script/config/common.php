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
	
?>