<?php

	if (!$_SESSION["auth"]) {
		$errorMessage = "You are not logged in.";
		return;
	}

	if (!isset($_POST['id'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$id = mysqli_real_escape_string($sqlConnection, $_POST['id']); 
	
	$query = "DELETE FROM placement WHERE id={$id}";

	if (!mysqli_query($sqlConnection, $query)) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
?>