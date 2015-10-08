exports["handle"] = function(sqlOpen, email, password, success, failure) {
		
	sqlOpen.runSQL(function(connection) {

		var query = "SELECT u.id, u.active, u.avatar_filename, r.name AS role_name \
				     FROM user u \
				     JOIN role r ON r.id = u.role_id \
				     WHERE u.email_address = '" + email + "' AND u.password = '" + password + "'";
						
		connection.query(query, function(err, rows, fields) {
			if (err) {
				failure({
					'message' : err.message
				});
			} else {
				if (rows.length == 0) {
					failure({
						'message' : 'Invalid username or password'
					});
				} else if (rows[0].active == 0) {
					failure({
						'message' : 'Account is not active'
					});
				} else {
					success({
						'id' : rows[0].id,
						'picURL' : FormatImageURL(rows[0].id, rows[0].avatar_filename),
						'role_name' : rows[0].role_name
					});
				}
			}
			connection.end();
		});
	});
};