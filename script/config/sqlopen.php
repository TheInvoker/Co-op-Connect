<?php

	include 'dbinfo.php';

	$sqlConnection = mysqli_connect($sqlHost, $sqlusername, $sqlpassword);

	if (!$sqlConnection) {
		$errorMessage = $ERROR_SERVER_CONNECT;
		return;
	}

	$sqlDB = mysqli_select_db($sqlConnection, $sqldbname); 
	
	if (!$sqlDB) {
		$errorMessage = $ERROR_DB_CONNECT;
		return;
	}

?>