<?php

	if (isset($_POST['thread_id']) && isset($_POST['target_id'])) {

		$thread_id = $_POST['thread_id'];
		$target_id = $_POST['target_id'];
		
		$query = "SELECT user_id
		          FROM thread_user
				  WHERE thread_id={$thread_id}";
		$recordset = mysqli_query($sqlConnection, $query);	
		$num_records = mysqli_num_rows($recordset);
		

		if ($num_records == 2) {
			
			$query = "INSERT INTO thread (date_created) VALUES (NOW())";
			mysqli_query($sqlConnection, $query);
			$new_thread_id = mysqli_insert_id($sqlConnection);

			$query = "INSERT INTO thread_user (thread_id,user_id,last_read_date)
			          SELECT {$new_thread_id},user_id,NOW()
			          FROM thread_users
			          WHERE thread_id={$thread_id}
					  UNION
					  SELECT {$new_thread_id},{$target_id},NOW()";
			mysqli_query($sqlConnection, $query);

			$thread_id = $new_thread_id;
		
		} else if ($num_records > 2) {
			
			$query = "INSERT INTO thread_user (thread_id,user_id,last_read_date) VALUES ({$thread_id},{$target_id},'0000-00-00 00:00:00')";
			mysqli_query($sqlConnection, $query);
			
		} else {
			$errorMessage = "Thread has less than 2 people somehow.";
		}
		
		$successMessage = array(
			'id' => $thread_id
		);
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}
?>