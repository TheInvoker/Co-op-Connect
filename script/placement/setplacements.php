<?php

	if (isset($_POST['id'])) {
		
		$id = $_POST['id']; 
		$address = mysqli_real_escape_string($sqlConnection, $_POST['name']); 
		$city = mysqli_real_escape_string($sqlConnection, $_POST['locality']); 
		$country = mysqli_real_escape_string($sqlConnection, $_POST['country']); 
		$role = mysqli_real_escape_string($sqlConnection, $_POST['role']); 
		$company = mysqli_real_escape_string($sqlConnection, $_POST['company']); 
		$date_start = $_POST['date_start']; 
		$date_end = $_POST['date_end']; 
		$active = $_POST['active']; 
		$latitude = $_POST['lat']; 
		$longitude = $_POST['lng']; 
		
		$query = "UPDATE placement SET
					address='{$address}', 
					city='{$city}',
					country='{$country}',
					topic='{$role}', 
					organization='{$company}', 
					date_started='{$date_start}', 
					date_finished='{$date_end}', 
					active={$active},
					latitude='{$latitude}',
					longitude='{$longitude}'
				  WHERE id={$id}";
									
		mysqli_query($sqlConnection, $query);
				  
		$sqlerror = mysqli_error($sqlConnection);
		if ($sqlerror != "") {
			$errorMessage = "Error: {$sqlerror}";
		}
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}

?>