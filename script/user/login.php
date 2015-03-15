<?php

	if (!isset($_POST['email']) || !isset($_POST['password']) || !isset($_POST['ad'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}

	$email = mysqli_real_escape_string($sqlConnection, $_POST['email']); 
	$pass = mysqli_real_escape_string($sqlConnection, $_POST['password']); 
	$admin = mysqli_real_escape_string($sqlConnection, $_POST['ad']); 
	
	$query = "SELECT u.id, u.active, u.avatar_filename
			  FROM user u
			  JOIN role r ON r.id = u.role_id
			  WHERE u.email_address = '{$email}' AND u.password = '{$pass}'" . ($admin=="1" ? " AND r.name='Admin'" : "");
			  
	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);

	if ($num_records == 0) {
		$errorMessage = "Invalid email or password.";
		if ($admin == "1") {
			$errorMessage = $errorMessage . " Or you are not an admin.";
		}
		return;
	}
	
	$row = mysqli_fetch_assoc($recordset);
	
	$filename = $row['avatar_filename'];
	$picURL = FormatImageURL($row['id'], $filename);
	
	$active = $row['active'];
	
	if ($active == 0) {
		$errorMessage = "Your account is currently not activated.";
		return;
	}
	
	$successMessage = array(
		'id' => $row['id'],
		'picURL' => $picURL
	);

?>