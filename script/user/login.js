exports["handle"] = function(sqlOpen, email, password, success, failure) {
		
	sqlOpen.runSQL(function(connection) {

		var query = "SELECT u.id, u.active \
				     FROM user u \
				     WHERE u.email_address = " + connection.escape(email) + " AND u.password = " + connection.escape(password);

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
					success(rows[0].id);
				}
			}
			connection.end();
		});
	});
};