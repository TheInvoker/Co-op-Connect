<?php

	if (isNotIncluded()) {
		$errorMessage = "File is private.";
		return;
	}

	$sqlHost = "localhost";
	$sqlusername = "root";
	$sqlpassword = "root";
	$sqldbname = "co-op connect";	

?>