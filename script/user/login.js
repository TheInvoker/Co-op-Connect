exports["handle"] = function(sqlOpen, email, password, success, failure) {
	
	sqlOpen.runSQL(function(connection) {
		
		var query = "SELECT u.id, u.active, u.avatar_filename, r.name AS role_name \
				  FROM user u \
				  JOIN role r ON r.id = u.role_id \
				  WHERE u.email_address = '" + email + "' AND u.password = '" + password + "'";
			
		connection.query(query, function(err, rows, fields) {
			if (err) {
				console.log("ERROR: " + err.message);
			} else {
				console.log('got all clips');
			}
			connection.end();

		});
	});
			  
	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);

	if ($num_records == 0) {
		$errorMessage = $ERROR_INVALID_LOGIN;
		return;
	}
	
	$row = mysqli_fetch_assoc($recordset);
	
	$filename = $row['avatar_filename'];
	$picURL = FormatImageURL($row['id'], $filename);
	
	$active = $row['active'];
	$user_id = $row['id'];
	$role_name = $row['role_name'];
	
	if ($active == 0) {
		$errorMessage = $ERROR_ACCOUNT_NOT_ACTIVE;
		return;
	}

	$_SESSION['auth'] = true;
	$_SESSION['id'] = $user_id;
	$_SESSION['picURL'] = $picURL;
	$_SESSION['role_name'] = $role_name;
	
};