<?php

	if (!isset($_POST['email'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$email = mysqli_real_escape_string($sqlConnection, $_POST['email']);

	$query = "SELECT id
			  FROM user
			  WHERE email_address = '{$email}'";
	$recordset = mysqli_query($sqlConnection, $query);
	
	if (mysqli_num_rows($recordset) == 0) {
		$errorMessage = "Account not found.";
		return;
	}
	
	$row = mysqli_fetch_assoc($recordset);
	
	$id =  $row['id'];	
	$token = getToken(20);
	
	$query = "UPDATE user
			  SET reset_token='{$token}'
			  WHERE id = {$id}";
	mysqli_query($sqlConnection, $query);
	
	$link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/../../reset.php?token={$token}&id={$id}";
	$message = "Click the below link to reset your password. If you did not request this, then ignore this email.<br/><br/><a href='{$link}'>RESET PASSWORD</a>";
	
	//sendEmail($email, "Password Reset", $message);

?>