<?php

	if (isset($_POST['user_id']) && isset($_POST['target_id'])) {

		$user_id = $_POST['user_id'];
		$target_id = $_POST['target_id'];
		
		$query = "SELECT th.id
		          FROM (
				     SELECT th.id
		             FROM thread th
				     JOIN thread_user tu ON th.id=tu.thread_id AND (tu.user_id={$user_id} OR tu.user_id={$target_id})
				     GROUP BY th.id
					 HAVING count(tu.id)=2
				  ) th
				  JOIN thread_user tu ON th.id=tu.thread_id
				  GROUP BY th.id
				  HAVING count(tu.id)=2";
		$recordset = mysqli_query($sqlConnection, $query);	
		$num_records = mysqli_num_rows($recordset);
		
		if ($num_records == 0) {
			
			$query = "INSERT INTO thread (date_created) VALUES (NOW())";
			mysqli_query($sqlConnection, $query);
			$thread_id = mysqli_insert_id($sqlConnection);
			
			$query = "INSERT INTO thread_user (thread_id,user_id,last_read_date)
			          SELECT {$thread_id},{$user_id},NOW()
					  UNION
					  SELECT {$thread_id},{$target_id},NOW()";
			mysqli_query($sqlConnection, $query);
			
		} else {
			
			$row = mysqli_fetch_assoc($recordset);
			$thread_id = $row['id'];
		}
		
		$successMessage = array(
			'id' => $thread_id
		);
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}
?>