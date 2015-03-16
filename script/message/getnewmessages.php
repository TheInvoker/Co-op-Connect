<?php

	if (!isset($_POST['id']) || !isset($_POST['thread_id'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}

	$user_id = mysqli_real_escape_string($sqlConnection, $_POST['id']);
	$thread_id = mysqli_real_escape_string($sqlConnection, $_POST['thread_id']);

	$query = "SELECT tm.user_id,tm.message,tm.date_sent,u.first_name,u.last_name,u.avatar_filename
			  FROM thread_user tu
			  JOIN thread_message tm ON tm.thread_id={$thread_id} AND tu.last_read_date<tm.date_sent
			  JOIN user u ON u.id=tm.user_id
			  WHERE tu.user_id={$user_id} AND tu.thread_id={$thread_id}
			  ORDER BY tm.date_sent DESC";
			  
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