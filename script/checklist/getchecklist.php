<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = $ERROR_NOT_LOGGED_IN;
		return;
	}

	if (!isset($_POST['id']) || !isset($_POST['user_id'])) {
		$errorMessage = $ERROR_NOT_GET_DATA;
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