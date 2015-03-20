<?php

	$email = mysqli_real_escape_string($sqlConnection, $_POST['email']); 
	$pass = mysqli_real_escape_string($sqlConnection, $_POST['password']); 
	
	$query = "SELECT u.id, u.active, u.avatar_filename, r.name AS role_name
			  FROM user u
			  JOIN role r ON r.id = u.role_id
			  WHERE u.email_address = '{$email}' AND u.password = '{$pass}'";
			  
	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);

	if ($num_records == 0) {
		$errorMessage = "Invalid email or password.";
		return;
	}
	
	$row = mysqli_fetch_assoc($recordset);
	
	$filename = $row['avatar_filename'];
	$picURL = FormatImageURL($row['id'], $filename);
	
	$active = $row['active'];
	$user_id = $row['id'];
	$role_name = $row['role_name'];
	
	if ($active == 0) {
		$errorMessage = "Your account is currently not activated.";
		return;
	}

	$_SESSION['auth'] = true;
	$_SESSION['id'] = $user_id;
	$_SESSION['picURL'] = $picURL;
	$_SESSION['role_name'] = $role_name;
	
?>