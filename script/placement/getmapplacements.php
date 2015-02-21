<?php

	if (isset($_POST['date_start']) && isset($_POST['date_end'])) {

		$date_start = $_POST['date_start']; 
		$date_end = $_POST['date_end']; 
		
		$query = "SELECT u.first_name, u.last_name, u.avatar_filename, p.id, p.user_id, p.address, p.topic, p.latitude, p.longitude, d.name AS department_name, d.color
				  FROM user u
				  JOIN placement p ON p.user_id=u.id
				  JOIN department d ON d.id = u.department_id
				  WHERE p.active=1 AND ('{$date_start}' <= p.date_finished AND '{$date_end}' >= p.date_started)";

		$recordset = mysqli_query($sqlConnection, $query);	
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
				'topic' => $row['topic'],
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
	
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}

?>