<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = $ERROR_NOT_LOGGED_IN;
		return;
	}

	if (!isset($_POST['user_id']) ||
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
		
		$errorMessage = $ERROR_NOT_GET_DATA;
		return;
	}

	$user_id = mysqli_real_escape_string($sqlConnection, $_POST['user_id']); 
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
	
	$query = "INSERT INTO placement (user_id,address,city,country,topic,organization,date_started,date_finished,active,latitude,longitude) VALUES 
			  ({$user_id},'{$address}','{$city}','{$country}','{$role}','{$company}','{$date_start}','{$date_end}',{$active},'{$latitude}','{$longitude}')";

	if (!mysqli_query($sqlConnection, $query)) {
		$errorMessage = mysqli_error($sqlConnection);
		return;
	}

?>