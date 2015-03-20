<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = "You are not logged in.";
		return;
	}

	if (!isset($_POST['id']) || !isset($_POST['targetid'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	
	$user_id = mysqli_real_escape_string($sqlConnection, $_POST['id']); 
	$targetid = mysqli_real_escape_string($sqlConnection, $_POST['targetid']); 

	// carry on
	$Pquery = "(
				 SELECT count(*) 
				 FROM checklist c
				 JOIN user u ON u.id={$targetid}
				 JOIN task AS t ON t.id = c.task_id
				 JOIN task_department td ON td.task_id=t.id and td.department_id=u.department_id
				 WHERE t.active = 1 AND c.placement_id = p.id
			   ) / (
				 SELECT (case when count(*) > 0 then count(*) end)
				 FROM task t
				 JOIN user u ON u.id={$targetid}
				 JOIN task_department td ON td.task_id=t.id and td.department_id=u.department_id
				 WHERE t.active = 1
			   )";
	
	$query = "SELECT p.*, " . ($user_id==$targetid ? "({$Pquery})" : "null") . " AS percentage
			  FROM placement p
			  WHERE p.user_id={$targetid}" . ($user_id==$targetid ? "" : " AND p.active=1") . "
			  ORDER BY p.date_started DESC";

	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);
	
	for ($i = 0; $i < $num_records; $i++) {
		$row = mysqli_fetch_assoc($recordset);

		$tempObject = array(
			'id' => $row['id'], 
			'active' => $row['active'], 
			'address' => $row['address'],
			'date_started' => $row['date_started'],
			'date_finished' => $row['date_finished'],
			'topic' => $row['topic'],
			'organization' => $row['organization'],
			'country' => $row['country'],
			'city' => $row['city'],
			'latitude' => $row['latitude'],
			'longitude' => $row['longitude'],
			'percentage' => $row['percentage']==null ? 1 : $row['percentage']
		);
		
		array_push($successMessage, $tempObject);
	}

?>