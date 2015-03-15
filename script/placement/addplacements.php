<?php

	if (!isset($_POST['user_id'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}

	$user_id = $_POST['user_id']; 
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
	
	$query = "INSERT INTO placement (user_id,address,city,country,topic,organization,date_started,date_finished,active,latitude,longitude) VALUES 
			  ({$user_id},'{$address}','{$city}','{$country}','{$role}','{$company}','{$date_start}','{$date_end}',{$active},'{$latitude}','{$longitude}')";

	if (!mysqli_query($sqlConnection, $query)) {
		$errorMessage = mysqli_error($sqlConnection);
		return;
	}

?>