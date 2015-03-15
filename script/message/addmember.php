<?php

	if (!isset($_POST['thread_id']) || !isset($_POST['email'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$thread_id = mysqli_real_escape_string($sqlConnection, $_POST['thread_id']);
	$email = mysqli_real_escape_string($sqlConnection, $_POST['email']);
	
	// get 3 things
	// 1. id of user, null if not there
	// 2. 1 if user in thread, else 0
	// 3. number of people in thread
	$query = "SELECT
				 (SELECT id 
				  FROM user 
				  WHERE email_address='{$email}') id,
				 (SELECT count(*) 
				  FROM thread th 
				  JOIN thread_user tu ON tu.thread_id=th.id
				  JOIN user u on u.id=tu.user_id AND u.email_address='{$email}'
				  WHERE th.id={$thread_id}) inThread,
				 (SELECT count(*) 
				  FROM thread_user 
				  WHERE thread_id={$thread_id}) memberCount";	  
	$recordset = mysqli_query($sqlConnection, $query);	
	$row = mysqli_fetch_assoc($recordset);
	
	if ($row['id'] == null) {
		$errorMessage = "Email address does not exist.";
		return;
	} 
	
	if ($row['inThread'] == 1) {
		$errorMessage = "User is already in this thread.";
		return;
	}
	
	$target_id = $row['id'];
	$member_count = $row['memberCount'];

	// check if there is a thread with the people in the selected thread plus the person you want to add
	$query = "SELECT th.id
			  FROM (
				 SELECT th.id
				 FROM thread th
				 JOIN thread_user tu ON th.id=tu.thread_id
				 GROUP BY th.id
				 HAVING count(th.id) = 1 + {$member_count}
			  ) th
			  JOIN thread_user tu ON th.id=tu.thread_id AND (tu.user_id={$target_id} OR tu.user_id IN (SELECT user_id FROM thread_user WHERE thread_id={$thread_id}))
			  GROUP BY th.id
			  HAVING count(th.id) = 1 + {$member_count}";
	$recordset = mysqli_query($sqlConnection, $query);	
	$num_records = mysqli_num_rows($recordset);
	
	if ($num_records == 0) {
		
		if ($member_count == 2) {
			
			// create a new thread
			$query = "INSERT INTO thread (date_created) VALUES (NOW())";
			mysqli_query($sqlConnection, $query);
			$new_thread_id = mysqli_insert_id($sqlConnection);
			
			// add people from selected thread plus the new person
			$query = "INSERT IGNORE
					  INTO thread_user (thread_id,user_id,last_read_date)
					  SELECT {$new_thread_id},{$target_id},NOW()
					  UNION
					  SELECT {$new_thread_id}, a.user_id, NOW()
					  FROM (SELECT user_id FROM thread_user WHERE thread_id={$thread_id}) a";
			mysqli_query($sqlConnection, $query);
			
			$thread_id = $new_thread_id;
		} else {
			
			// add user to thread
			$query = "INSERT INTO thread_user (thread_id,user_id,last_read_date) VALUES ({$thread_id},{$target_id},'0000-00-00 00:00:00')";
			mysqli_query($sqlConnection, $query);
		}
	} else {
		
		// get the thread id of the existing thread
		$row = mysqli_fetch_assoc($recordset);
		$thread_id = $row['id'];
	}
	
	$successMessage = array(
		'id' => $thread_id
	);

?>