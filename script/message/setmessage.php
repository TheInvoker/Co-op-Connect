<?php

	if (isset($_POST['id']) && isset($_POST['thread_id']) && isset($_POST['message'])) {

		$user_id = $_POST['id'];
		$thread_id = $_POST['thread_id'];
		$message = mysqli_real_escape_string($sqlConnection, $_POST['message']);
		
		$query = "INSERT INTO thread_message (thread_id,user_id,message,date_sent)
		          VALUES ({$thread_id},{$user_id},'{$message}',NOW())";
				  
		$recordset = mysqli_query($sqlConnection, $query);	

	} else {
		$errorMessage = "Did not recieve all of the data.";
	}
?>