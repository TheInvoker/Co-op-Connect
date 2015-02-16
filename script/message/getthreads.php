<?php

	if (isset($_POST['id'])) {

		$user_id = $_POST['id'];
	
		$query1 = "SELECT thread_id, MAX(date_sent) date_sent
				   FROM thread_message
				   GROUP BY thread_id";
		$query = "SELECT th.id, tm.message, tm.date_sent
		          FROM thread th
				  JOIN thread_user tu ON th.id=tu.thread_id AND tu.user_id={$user_id}
				  LEFT JOIN thread_message tm ON th.id=tm.thread_id
	              LEFT JOIN ({$query1}) q ON tm.thread_id = q.thread_id AND tm.date_sent = q.date_sent
				  ORDER BY tm.date_sent DESC";

		$recordset = mysqli_query($sqlConnection, $query);	
		$num_records = mysqli_num_rows($recordset);
		
		
		for ($i = 0; $i < $num_records; $i++) {
			$row = mysqli_fetch_assoc($recordset);
			
			$thread_id = $row['id'];
			$message = $row['message'];
			
			//////////////////
			$tempList = array();
			
			if ($message != null) {
				$query = "SELECT u.id, u.first_name, u.last_name, u.avatar_filename
						  FROM thread th
						  JOIN thread_user tu ON tu.thread_id=th.id AND tu.user_id!={$user_id}
						  JOIN user u ON tu.user_id=u.id
						  WHERE th.id={$thread_id}";
				$recordset2 = mysqli_query($sqlConnection, $query);	
				$num_records2 = mysqli_num_rows($recordset2);

				for ($j = 0; $j < $num_records2; $j++) {
					$row2 = mysqli_fetch_assoc($recordset2);
					
					$filename = $row2['avatar_filename'];
					$picURL = FormatImageURL($row2['id'], $filename);
					
					$tempObject = array(
						'first_name' => $row2['first_name'],
						'last_name' => $row2['last_name'],
						'picURL' => $picURL
					);
					
					array_push($tempList, $tempObject);
				}
			}
			//////////////////
			
			
			$tempObject = array(
				'id' => $thread_id,
				'message' => $message,
				'date_sent' => $row['date_sent'],
				'member_names' => $tempList
			);
			
			array_push($successMessage, $tempObject);
		}
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}
?>