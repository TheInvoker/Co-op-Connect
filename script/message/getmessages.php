<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = $ERROR_NOT_LOGGED_IN;
		return;
	}

	if (!isset($_POST['id']) || !isset($_POST['thread_id']) || !isset($_POST['pageindex'])) {
		$errorMessage = $ERROR_NOT_GET_DATA;
		return;
	}
	
	$lim = 30;

	$user_id = mysqli_real_escape_string($sqlConnection, $_POST['id']);
	$thread_id = mysqli_real_escape_string($sqlConnection, $_POST['thread_id']);
	$offset = mysqli_real_escape_string($sqlConnection, $_POST['pageindex']) * $lim;

	$query = "SELECT tm.user_id,tm.message,tm.date_sent,u.first_name,u.last_name,u.avatar_filename
			  FROM thread_message tm
			  JOIN user u ON u.id=tm.user_id
			  WHERE tm.thread_id={$thread_id}
			  ORDER BY tm.date_sent DESC
			  LIMIT {$offset}, {$lim}";
			  
	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);
	
	
	$query = "UPDATE thread_user
			  SET last_read_date=NOW()
			  WHERE thread_id={$thread_id} AND user_id={$user_id}";

	if (!mysqli_query($sqlConnection, $query)) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	
	for ($i = 0; $i < $num_records; $i++) {
		$row = mysqli_fetch_assoc($recordset);
		
		$filename = $row['avatar_filename'];
		$picURL = FormatImageURL($row['user_id'], $filename);
		
		$tempObject = array(
			'user_id' => $row['user_id'],
			'message' => $row['message'],
			'date_sent' => $row['date_sent'],
			'first_name' => $row['first_name'],
			'last_name' => $row['last_name'],
			'picURL' => $picURL
		);
		
		array_push($successMessage, $tempObject);
	}

?>