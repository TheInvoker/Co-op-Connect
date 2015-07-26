<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = $ERROR_NOT_LOGGED_IN;
		return;
	}

	if (!isset($_POST['map_date_start']) || !isset($_POST['map_date_end'])) {
		$errorMessage = $ERROR_NOT_GET_DATA;
		return;
	}
	
	$date_start = mysqli_real_escape_string($sqlConnection, $_POST['map_date_start']); 
	$date_end = mysqli_real_escape_string($sqlConnection, $_POST['map_date_end']); 
	
	
	if ($date_start=="" && $date_end=="") {
		$datePred = "";
	} else if ($date_start=="") {
		$datePred = " AND ('{$date_end}' >= p.date_started)";
	} else if ($date_end=="") {
		$datePred = " AND ('{$date_start}' <= p.date_finished)";
	} else {
		$datePred = " AND ('{$date_start}' <= p.date_finished AND '{$date_end}' >= p.date_started)";
	}
	
	$query = "SELECT u.first_name, u.last_name, u.avatar_filename, p.id, p.user_id, p.address, p.city, p.country, p.topic, p.organization, p.latitude, p.longitude, d.name AS department_name, d.color
			  FROM user u
			  JOIN placement p ON p.user_id=u.id
			  JOIN department d ON d.id = u.department_id
			  WHERE p.active=1{$datePred}";

	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);
	
	for ($i = 0; $i < $num_records; $i++) {
		$row = mysqli_fetch_assoc($recordset);
		$curID = $row['user_id'];
		$picURL = $row['avatar_filename'];
		
		$picURL = FormatImageURL($curID, $picURL);

		$tempObject = array(
			'id' => $row['id'], 
			'user_id' => $curID, 
			'address' => $row['address'],
			'city' => $row['city'],
			'country' => $row['country'],
			'topic' => $row['topic'],
			'organization' => $row['organization'],
			'firstname' => $row['first_name'],
			'lastname' => $row['last_name'],
			'picURL' => $picURL,
			'latitude' => $row['latitude'],
			'longitude' => $row['longitude'],
			'department_name' => $row['department_name'],
			'color' => $row['color']
		);
		
		array_push($successMessage, $tempObject);
	}

?>