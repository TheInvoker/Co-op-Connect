<?php

	if (!$_SESSION["auth"]) {
		$errorMessage = "You are not logged in.";
		return;
	}

	if (!isset($_POST['id'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$nameLim = 6;

	$user_id = mysqli_real_escape_string($sqlConnection, $_POST['id']);

	$query = "SELECT th.id, tm.message, tm.date_sent, tm.date_sent>tu.last_read_date AS new
			  FROM thread th
			  JOIN thread_user tu ON th.id=tu.thread_id AND tu.user_id={$user_id}
			  JOIN thread_message tm ON th.id=tm.thread_id
			  JOIN (
				   SELECT thread_id, MAX(date_sent) date_sent
				   FROM thread_message
				   GROUP BY thread_id
			  ) q ON tm.thread_id = q.thread_id AND tm.date_sent = q.date_sent
			  GROUP BY th.id
			  ORDER BY tm.date_sent DESC";  
			  
	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);
	
	
	for ($i = 0; $i < $num_records; $i++) {
		$row = mysqli_fetch_assoc($recordset);
		
		$thread_id = $row['id'];
		

		//////////////////
		$query = "SELECT SQL_CALC_FOUND_ROWS u.id, u.first_name, u.last_name, u.avatar_filename
				  FROM thread th
				  JOIN thread_user tu ON tu.thread_id=th.id
				  JOIN user u ON tu.user_id=u.id
				  WHERE th.id={$thread_id}
				  ORDER BY u.last_name
				  LIMIT {$nameLim}";
				  
		$recordset2 = mysqli_query($sqlConnection, $query);	
		if (!$recordset2) { 
			$errorMessage = mysqli_error($sqlConnection); 
			return; 
		}
		$num_records2 = mysqli_num_rows($recordset2);
		
		$tempList = array();
		for ($j = 0; $j < $num_records2; $j++) {
			$row2 = mysqli_fetch_assoc($recordset2);
			
			$filename = $row2['avatar_filename'];
			$picURL = FormatImageURL($row2['id'], $filename);
			
			$tempObject = array(
				'id' => $row2['id'],
				'first_name' => $row2['first_name'],
				'last_name' => $row2['last_name'],
				'picURL' => $picURL
			);
			
			array_push($tempList, $tempObject);
		}

		$query = "SELECT FOUND_ROWS() AS total";
		
		$recordset3 = mysqli_query($sqlConnection, $query);
		if (!$recordset3) { 
			$errorMessage = mysqli_error($sqlConnection); 
			return; 
		}
		
		$row3 = mysqli_fetch_assoc($recordset3);
		$total = $row3['total'];
		//////////////////
		
		
		$tempObject = array(
			'id' => $thread_id,
			'message' => $row['message'],
			'date_sent' => $row['date_sent'],
			'new' => $row['new'],
			'member_names' => $tempList,
			'extra' => $total > $num_records2 ? 1 : 0
		);
		
		array_push($successMessage, $tempObject);
	}

?>