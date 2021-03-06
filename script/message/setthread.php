<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = $ERROR_NOT_LOGGED_IN;
		return;
	}

	if (!isset($_POST['target_ids'])) {
		$errorMessage = $ERROR_NOT_GET_DATA;
		return;
	}

	$user_id = $_SESSION["id"];
	$target_ids = mysqli_real_escape_string($sqlConnection, $_POST['target_ids']);
	
	if (trim($target_ids) == "") {
		$errorMessage = $ERROR_SELECT_PERSON_COUNT;
		return;
	}
		
	$targetList = explode(',', $target_ids);
	$member_count = count($targetList);
	$total_member_count = $member_count + 1;
	
	if (in_array($user_id, $targetList)) {
		$errorMessage = $ERROR_USER_IN_CREATE_THREAD;
		return;
	}
	
	if ($member_count = 0) {
		$errorMessage = $ERROR_SELECT_PERSON_COUNT;
		return;
	}
	
	$query = "SELECT th.id
			  FROM (
				 SELECT th.id
				 FROM thread th
				 JOIN thread_user tu ON th.id=tu.thread_id
				 GROUP BY th.id
				 HAVING count(tu.user_id)={$total_member_count}
			  ) th
			  JOIN thread_user tu ON th.id=tu.thread_id AND (tu.user_id={$user_id} OR tu.user_id IN ({$target_ids}))
			  GROUP BY th.id
			  HAVING count(tu.user_id)={$total_member_count}";

	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);
	
	if ($num_records == 0) {
		
		$query = "INSERT INTO thread (date_created) VALUES (NOW())";
		
		if (!mysqli_query($sqlConnection, $query)) { 
			$errorMessage = mysqli_error($sqlConnection); 
			return; 
		}
		$thread_id = mysqli_insert_id($sqlConnection);
		
		$acc = "";
		for($i=0; $i<count($targetList); $i+=1) {
			$mid = $targetList[$i];
			$acc = $acc . ",({$thread_id}, {$mid}, NOW())";
		}
		
		$query = "INSERT IGNORE
				  INTO thread_user (thread_id,user_id,last_read_date)
				  VALUES ({$thread_id},{$user_id},NOW()){$acc}";

		if (!mysqli_query($sqlConnection, $query)) { 
			$errorMessage = mysqli_error($sqlConnection); 
			return; 
		}
	} else {
		
		$row = mysqli_fetch_assoc($recordset);
		$thread_id = $row['id'];
	}
	
	$successMessage = array(
		'id' => $thread_id
	);

?>