<?php

	if (!isset($_POST['id']) ||
		!isset($_POST['name']) ||
		!isset($_POST['locality']) ||
		!isset($_POST['country']) ||
		!isset($_POST['role']) ||
		!isset($_POST['company']) ||
		!isset($_POST['date_start']) ||
		!isset($_POST['date_end']) ||
		!isset($_POST['active']) ||
		!isset($_POST['lat']) ||
		!isset($_POST['lng'])) {
		
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$id = mysqli_real_escape_string($sqlConnection, $_POST['id']); 
	$address = mysqli_real_escape_string($sqlConnection, $_POST['name']); 
	$city = mysqli_real_escape_string($sqlConnection, $_POST['locality']); 
	$country = mysqli_real_escape_string($sqlConnection, $_POST['country']); 
	$role = mysqli_real_escape_string($sqlConnection, $_POST['role']); 
	$company = mysqli_real_escape_string($sqlConnection, $_POST['company']); 
	$date_start = mysqli_real_escape_string($sqlConnection, $_POST['date_start']); 
	$date_end = mysqli_real_escape_string($sqlConnection, $_POST['date_end']); 
	$active = mysqli_real_escape_string($sqlConnection, $_POST['active']); 
	$latitude = mysqli_real_escape_string($sqlConnection, $_POST['lat']); 
	$longitude = mysqli_real_escape_string($sqlConnection, $_POST['lng']); 
	
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
								
	if (!mysqli_query($sqlConnection, $query)) {
		$errorMessage = mysqli_error($sqlConnection);
		return;
	}

?>