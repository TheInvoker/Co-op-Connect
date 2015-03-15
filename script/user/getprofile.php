<?php

	if (!isset($_POST['id'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$targetID = $_POST['id']; 

	$query = "SELECT u.*, d.name AS department_name, d.alt_color AS d_color, r.name AS role_name, r.color AS r_color
			  FROM user u
			  JOIN department d ON d.id = u.department_id
			  JOIN role r ON r.id = u.role_id
			  WHERE u.id = {$targetID}";
			  
	$recordset = mysqli_query($sqlConnection, $query);	
	$num_records = mysqli_num_rows($recordset);

	if ($num_records == 0) {
		$errorMessage = "Account not found.";
		return;
	}
	
	$row = mysqli_fetch_assoc($recordset);
	
	$filename = $row['avatar_filename'];
	$picURL = FormatImageURL($targetID, $filename);
	
	$successMessage = array(
		'id' => $row['id'],
		'firstname' => $row['first_name'],
		'lastname' => $row['last_name'],
		'email' => $row['email_address'],
		'phone' => $row['phone_number'],
		'website' => $row['website_link'],
		'status' => $row['status_text'],
		'biotext' => $row['bio_text'],
		'role_name' => $row['role_name'],
		'r_color' => $row['r_color'],
		'datejoined' => $row['date_joined'],
		'department_name' => $row['department_name'],
		'd_color' => $row['d_color'],
		'picURL' => $picURL
	);

?>