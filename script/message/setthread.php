<?php

	if (isset($_POST['user_id']) && isset($_POST['target_ids'])) {

		$user_id = $_POST['user_id'];
		$target_ids = $_POST['target_ids'];
		
		if (trim($target_ids) != "") {
			
			$targetList = explode(',', $target_ids);
			$member_count = count($targetList);
			$total_member_count = $member_count + 1;
			
			if (!in_array($user_id, $targetList)) {

				if ($member_count > 0) {
				
					$query = "SELECT th.id
							  FROM (
								 SELECT th.id
								 FROM thread th
								 JOIN thread_user tu ON th.id=tu.thread_id
								 GROUP BY th.id
								 HAVING count(tu.id)={$total_member_count}
							  ) th
							  JOIN thread_user tu ON th.id=tu.thread_id AND (tu.user_id={$user_id} OR tu.user_id IN ({$target_ids}))";
					$recordset = mysqli_query($sqlConnection, $query);	
					$num_records = mysqli_num_rows($recordset);
					
					if ($num_records == 0) {
						
						$query = "INSERT INTO thread (date_created) VALUES (NOW())";
						mysqli_query($sqlConnection, $query);
						$thread_id = mysqli_insert_id($sqlConnection);
						
						$query = "INSERT IGNORE
								  INTO thread_user (thread_id,user_id,last_read_date)
								  SELECT {$thread_id},{$user_id},NOW()
								  UNION
								  SELECT {$thread_id}, b.a, NOW()
								  FROM (SELECT ({$target_ids}) AS a) b";
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
			} else {
				$errorMessage = "Cannot create thread with you selected.";
			}
		} else {
			$errorMessage = "Select at least 1 person.";
		}
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}
?>