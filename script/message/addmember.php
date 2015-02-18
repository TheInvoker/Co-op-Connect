<?php

	if (isset($_POST['thread_id']) && isset($_POST['email'])) {

		$thread_id = mysqli_real_escape_string($sqlConnection, $_POST['thread_id']);
		$email = mysqli_real_escape_string($sqlConnection, $_POST['email']);
		
		
		$query = "SELECT id
		          FROM user
				  WHERE email_address='{$email}'";
		$recordset = mysqli_query($sqlConnection, $query);	
		$num_records = mysqli_num_rows($recordset); 
		
		if ($num_records > 0) {
			
			$row = mysqli_fetch_assoc($recordset);
			$target_id = $row['id'];
		
			$query = "SELECT user_id
					  FROM thread_user
					  WHERE thread_id={$thread_id} AND user_id!={$target_id}";
			$recordset = mysqli_query($sqlConnection, $query);	
			$num_records = mysqli_num_rows($recordset);
			

			if ($num_records == 2) {
				
				$query = "INSERT INTO thread (date_created) VALUES (NOW())";
				mysqli_query($sqlConnection, $query);
				$new_thread_id = mysqli_insert_id($sqlConnection);

				$query = "INSERT IGNORE
				          INTO thread_user (thread_id,user_id,last_read_date)
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
				$errorMessage = "Nothing happened. Is the person already in the thread?";
			}
			
			$successMessage = array(
				'id' => $thread_id
			);
		
		} else {
			$errorMessage = "Email address does not exist.";
		}
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}
?>