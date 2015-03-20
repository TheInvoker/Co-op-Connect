<?php

	if (isNotIncluded()) {
		$errorMessage = "File is private.";
		return;
	}

	if (!$_SESSION["auth"]) {
		$errorMessage = "You are not logged in.";
		return;
	}

	if (!isset($_POST['id']) || !isset($_POST['user_id'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$id = mysqli_real_escape_string($sqlConnection, $_POST['id']); 
	$user_id = mysqli_real_escape_string($sqlConnection, $_POST['user_id']); 
	
	$query = "SELECT t.*, (case when cl.task_id is null then 0 else 1 end) AS checked
			  FROM task t
			  JOIN user u ON u.id={$user_id}
			  JOIN task_department td ON td.task_id=t.id and td.department_id=u.department_id
			  LEFT OUTER JOIN checklist cl ON t.id=cl.task_id AND cl.placement_id={$id}
			  WHERE t.active=1";
			  
	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);

	for ($i = 0; $i < $num_records; $i++) {
		
		$row = mysqli_fetch_assoc($recordset);
		
		$tempObject = array(
			'task_id' => $row['id'], 
			'checked' => $row['checked'],
			'name' => $row['name'], 
			'description' => $row['description'], 
			'last_updated' => $row['last_updated']
		);
	
		array_push($successMessage, $tempObject);
	}

?>