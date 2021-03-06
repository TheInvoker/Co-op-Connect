<?php

	if (!isset($_POST['email'])) {
		$errorMessage = $ERROR_NOT_GET_DATA;
		return;
	}
	
	$email = mysqli_real_escape_string($sqlConnection, $_POST['email']);

	$query = "SELECT id
			  FROM user
			  WHERE email_address = '{$email}'";
			  
	$recordset = mysqli_query($sqlConnection, $query);
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	
	if (mysqli_num_rows($recordset) == 0) {
		$errorMessage = $ERROR_ACCOUNT_NOT_FOUND;
		return;
	}
	
	$row = mysqli_fetch_assoc($recordset);
	
	$id =  $row['id'];	
	$token = getToken(30);
	
	$query = "UPDATE user
			  SET reset_token='{$token}'
			  WHERE id = {$id}";
			  
	if (!mysqli_query($sqlConnection, $query)) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	
	$link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/../../reset.php?token={$token}&id={$id}";
	$message = "Click the below link to reset your password. If you did not request this, then ignore this email.<br/><br/><a href='{$link}'>RESET PASSWORD</a>";
	
	//sendEmail($email, "Password Reset", $message);

?>