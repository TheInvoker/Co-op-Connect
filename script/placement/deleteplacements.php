<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = $ERROR_NOT_LOGGED_IN;
		return;
	}

	if (!isset($_POST['id'])) {
		$errorMessage = $ERROR_NOT_GET_DATA;
		return;
	}
	
	$id = mysqli_real_escape_string($sqlConnection, $_POST['id']); 
	
	$query = "DELETE FROM placement WHERE id={$id}";

	if (!mysqli_query($sqlConnection, $query)) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
?>