<?php

	if (isset($_POST['email'])) {
	
		$email = mysqli_real_escape_string($sqlConnection, $_POST['email']);
	
		$query = "SELECT password
				  FROM user
				  WHERE email_address = '{$email}'";
		$recordset = mysqli_query($sqlConnection, $query);
		
		if (mysqli_num_rows($recordset) == 1) {
			$row = mysqli_fetch_assoc($recordset);
			
			$password =  $row['password'];
			$message = "Your password is <b>{$password}</b>";	
			
			//sendEmail($email, "Password Reminder", $message);

		} else {
			$errorMessage = "Account not found.";
		}
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}

?>