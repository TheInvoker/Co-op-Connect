<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = "You are not logged in.";
		return;
	}

	if (!isset($_POST['id']) || !isset($_POST['pageindex'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$lim = 5;

	$user_id = mysqli_real_escape_string($sqlConnection, $_POST['id']);
	$offset = mysqli_real_escape_string($sqlConnection, $_POST['pageindex']) * $lim;
	
	$query = "SELECT r.*, r.date_modified>u.resource_checked_date AS new
			  FROM resource r
			  JOIN user u ON u.id={$user_id}
			  JOIN department d on u.department_id=d.id
			  JOIN resource_department rd ON r.id = rd.resource_id AND rd.department_id = u.department_id
			  WHERE r.active=1
			  ORDER BY r.date_modified DESC
			  LIMIT {$offset}, {$lim}";
	  
	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);
	
	
	$query = "UPDATE user
			  SET resource_checked_date=NOW()
			  WHERE id={$user_id}";
			  
	if (!mysqli_query($sqlConnection, $query)) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	
	for ($i = 0; $i < $num_records; $i++) {
		$row = mysqli_fetch_assoc($recordset);
		
		$tempObject = array(
			'text' => $row['text'],
			'date_modified' => $row['date_modified'],
			'new' => $row['new']
		);
		
		array_push($successMessage, $tempObject);
	}

?>