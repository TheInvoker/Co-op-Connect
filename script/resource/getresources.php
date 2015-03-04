<?php

	if (isset($_POST['id']) && isset($_POST['pageindex'])) {

		$user_id = $_POST['id'];
		$lim = 5;
		$offset = $_POST['pageindex'] * $lim;
		
		$query = "SELECT r.*, r.date_modified>u.resource_checked_date AS new
		          FROM resource r
				  JOIN user u ON u.id={$user_id}
				  JOIN department d on u.department_id=d.id
				  JOIN resource_department rd ON r.id = rd.resource_id AND rd.department_id = u.department_id
				  WHERE r.active=1
				  ORDER BY r.date_modified DESC
				  LIMIT {$offset}, {$lim}";
				  
		$recordset = mysqli_query($sqlConnection, $query);	
		$num_records = mysqli_num_rows($recordset);
		
		
		$query = "UPDATE user
		          SET resource_checked_date=NOW()
				  WHERE id={$user_id}";
		mysqli_query($sqlConnection, $query);	
		
		
		for ($i = 0; $i < $num_records; $i++) {
			$row = mysqli_fetch_assoc($recordset);
			
			$tempObject = array(
				'text' => $row['text'],
				'date_modified' => $row['date_modified'],
				'new' => $row['new']
			);
			
			array_push($successMessage, $tempObject);
		}
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}
?>