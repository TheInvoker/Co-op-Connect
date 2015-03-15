<?php

	if (!isset($_POST['token']) || !isset($_POST['id']) || !isset($_POST['password']) || !isset($_POST['password2'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}

	
	$token = mysqli_real_escape_string($sqlConnection, $_POST['token']); 
	$id = mysqli_real_escape_string($sqlConnection, $_POST['id']); 
	$password = mysqli_real_escape_string($sqlConnection, $_POST['password']); 
	$password2 = mysqli_real_escape_string($sqlConnection, $_POST['password2']); 
	
	
	if ($password != $password2) {
		$errorMessage = "Passwords don't match.";
		return;
	}

	$query = "SELECT reset_token
			  FROM user
			  WHERE id = {$id}";
	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);
	
	if ($num_records == 0) {
		$errorMessage = "User does not exist.";
		return;
	}
	
	$row = mysqli_fetch_assoc($recordset);
	$setToken = $row['reset_token'];
	
	if ($setToken=="" || $token=="" || $setToken != $token) {
		$errorMessage = "Token is invalid or expired.";
		return;
	}

	$query = "UPDATE user SET password='{$password}',reset_token='' WHERE id={$id}";

	if (!mysqli_query($sqlConnection, $query)) {
		$errorMessage = mysqli_error($sqlConnection);
		return;
	}

?>