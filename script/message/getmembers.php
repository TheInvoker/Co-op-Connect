<?php

	if (!isset($_POST['id'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$thread_id = $_POST['id'];

	$query = "SELECT u.id, u.first_name, u.last_name, u.avatar_filename
			  FROM thread th
			  JOIN thread_user tu ON tu.thread_id=th.id
			  JOIN user u ON tu.user_id=u.id
			  WHERE th.id={$thread_id}
			  ORDER BY u.last_name";

	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);
	
	for ($i = 0; $i < $num_records; $i++) {
		$row = mysqli_fetch_assoc($recordset);
		
		$filename = $row['avatar_filename'];
		$picURL = FormatImageURL($row['id'], $filename);
		
		$tempObject = array(
			'id' => $row['id'],
			'first_name' => $row['first_name'],
			'last_name' => $row['last_name'],
			'picURL' => $picURL
		);
		
		array_push($successMessage, $tempObject);
	}

?>