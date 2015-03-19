<?php

	include dirname(__FILE__).'/dbinfo.php';

	$sqlConnection = mysqli_connect($sqlHost, $sqlusername, $sqlpassword);

	if (!$sqlConnection) {
		return "Could not connect to server.";
	}

	$sqlDB = mysqli_select_db($sqlConnection, $sqldbname); 
	
	if (!$sqlDB) {
		return "Could not connect to database.";
	}

	return("");

?>