<?php

	if (isNotIncluded()) {
		$errorMessage = "File is private.";
		return;
	}

	include dirname(__FILE__).'/dbinfo.php';

	$sqlConnection = mysqli_connect($sqlHost, $sqlusername, $sqlpassword);

	if (!$sqlConnection) {
		$errorMessage = "Could not connect to server.";
		return;
	}

	$sqlDB = mysqli_select_db($sqlConnection, $sqldbname); 
	
	if (!$sqlDB) {
		$errorMessage = "Could not connect to database.";
		return;
	}
		
?>