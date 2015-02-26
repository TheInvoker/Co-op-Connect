<?php

	if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['ad'])) {
	
		$email = mysqli_real_escape_string($sqlConnection, $_POST['email']); 
		$pass = mysqli_real_escape_string($sqlConnection, $_POST['password']); 
		$admin = $_POST['ad']; 
		
		$query = "SELECT u.id, u.active, u.department_id
				  FROM user u
				  JOIN role r ON r.id = u.role_id
				  WHERE u.email_address = '{$email}' AND u.password = '{$pass}'" . ($admin=="1" ? " AND r.name='Admin'" : "");
				  
		$recordset = mysqli_query($sqlConnection, $query);	
		$num_records = mysqli_num_rows($recordset);

		if ($num_records == 1) {
		
			$row = mysqli_fetch_assoc($recordset);
			$active = $row['active'];
			
			if ($active == 0) {
				$errorMessage = "Your account is currently not activated.";
			} else {
				$successMessage = array(
					'id' => $row['id'],
					'department_id' => $row['department_id']
				);
			}
		} else {
			$errorMessage = "Invalid email or password.";
			
			if ($admin=="1") {
				$errorMessage = $errorMessage . " Or you are not an admin.";
			}
		}
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}

?>