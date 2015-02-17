<?php

	if (isset($_POST['id']) && isset($_POST['thread_id']) && isset($_POST['pageindex'])) {

		$user_id = $_POST['id'];
		$thread_id = $_POST['thread_id'];
		$lim = 30;
		$offset = $_POST['pageindex'] * $lim;
	
		$query = "SELECT tm.user_id,tm.message,tm.date_sent,u.first_name,u.last_name
		          FROM thread_message tm
				  JOIN user u ON u.id=tm.user_id
				  WHERE tm.thread_id={$thread_id}
				  ORDER BY tm.date_sent DESC
				  LIMIT {$offset}, {$lim}";
				  
		$recordset = mysqli_query($sqlConnection, $query);	
		$num_records = mysqli_num_rows($recordset);
		
		
		$query = "UPDATE thread_user
		          SET last_read_date=NOW()
				  WHERE thread_id={$thread_id} AND user_id={$user_id}";
		mysqli_query($sqlConnection, $query);	
		
		
		for ($i = 0; $i < $num_records; $i++) {
			$row = mysqli_fetch_assoc($recordset);
			
			$tempObject = array(
				'user_id' => $row['user_id'],
				'message' => $row['message'],
				'date_sent' => $row['date_sent'],
				'first_name' => $row['first_name'],
				'last_name' => $row['last_name']
			);
			
			array_push($successMessage, $tempObject);
		}
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}
?>