<?php

	if (!isset($_POST['firstname']) || !isset($_POST['lastname']) || !isset($_POST['email']) || !isset($_POST['password']) || !isset($_POST['c-password'])) {
		$errorMessage = $ERROR_NOT_GET_DATA;
		return;
	}
		
	$firstName = mysqli_real_escape_string($sqlConnection, $_POST['firstname']); 
	$lastName = mysqli_real_escape_string($sqlConnection, $_POST['lastname']); 
	$email = mysqli_real_escape_string($sqlConnection, $_POST['email']); 
	$password = mysqli_real_escape_string($sqlConnection, $_POST['password']); 
	$cpassword = mysqli_real_escape_string($sqlConnection, $_POST['c-password']); 
	
	$query = "INSERT INTO user
			  (password, date_joined, first_name, last_name, email_address, role_id, active, status_text, bio_text, department_id, resource_checked_date, reset_token)
			  VALUES ('{$password}', NOW(), '{$firstName}', '{$lastName}', '{$email}', 2, 1, '', '', 1, '0000-00-00 00:00:00', '')";


	if (!mysqli_query($sqlConnection, $query)) {
		$errorMessage = mysqli_error($sqlConnection);
		return;
	}
	
	//sendEmail($email, "Registered", "Dear {$firstName} {$lastName},<br/><br/>Thank you for registering with us.");

?>