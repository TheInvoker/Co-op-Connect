<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = $ERROR_NOT_LOGGED_IN;
		return;
	}

	$user_id = $_SESSION["id"];

	$query = "SELECT count(*) AS count
			  FROM user u
			  JOIN resource r
			  JOIN resource_department rd ON r.id = rd.resource_id
			  WHERE u.id={$user_id} AND r.active=1 AND rd.department_id=u.department_id AND r.date_modified>u.resource_checked_date";
			  
	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$row = mysqli_fetch_assoc($recordset);

	$query = "SELECT count(*) AS count
			  FROM thread th
			  JOIN thread_user tu ON th.id=tu.thread_id AND tu.user_id={$user_id}
			  JOIN thread_message tm ON th.id=tm.thread_id AND tu.last_read_date<tm.date_sent";

	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$row2 = mysqli_fetch_assoc($recordset);
	
	
	$successMessage = array(
		'new_news' => $row['count'],
		'new_messages' => $row2['count']
	);

?>