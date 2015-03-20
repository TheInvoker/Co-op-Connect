<?php

	if (!$_SESSION["auth"]) {
		$errorMessage = "You are not logged in.";
		return;
	}

	if (!isset($_POST['id']) || !isset($_POST['thread_id']) || !isset($_POST['message'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$user_id = mysqli_real_escape_string($sqlConnection, $_POST['id']);
	$thread_id = mysqli_real_escape_string($sqlConnection, $_POST['thread_id']);
	$message = mysqli_real_escape_string($sqlConnection, $_POST['message']);
	
	$query = "INSERT INTO thread_message (thread_id,user_id,message,date_sent)
			  VALUES ({$thread_id},{$user_id},'{$message}',NOW())";

	if (!mysqli_query($sqlConnection, $query)) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	
	$query = "UPDATE thread_user
			  SET last_read_date=NOW()
			  WHERE thread_id={$thread_id} AND user_id={$user_id}";

	if (!mysqli_query($sqlConnection, $query)) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	
?>