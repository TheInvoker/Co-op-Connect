<?php

	function formatSqlOptionList($sqlConnection, $list) {
		for ($i=0; $i<count($list); $i+=1) {
			$v = mysqli_real_escape_string($sqlConnection, trim($list[$i]));
			if ($v != "") {
				$list[$i] = "'{$v}'";
			}
		}
		
		$join = join(",", $list);
		$acc = "({$join})";
		return $acc;
	}

	if (!isset($_POST['search'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	
	$search = mysqli_real_escape_string($sqlConnection, trim($_POST['search'])); 
	$firstname = mysqli_real_escape_string($sqlConnection, trim($_POST['firstname'])); 
	$lastname = mysqli_real_escape_string($sqlConnection, trim($_POST['lastname'])); 
	$email = mysqli_real_escape_string($sqlConnection, trim($_POST['email'])); 
	
	$departmentList = isset($_POST['department']) ? $_POST['department'] : array();
	$roleList = isset($_POST['role']) ? $_POST['role'] : array();
	$cityList = isset($_POST['city']) ? $_POST['city'] : array();
	$countryList = isset($_POST['country']) ? $_POST['country'] : array();
	$topicList = isset($_POST['topic']) ? $_POST['topic'] : array();
	$companyList = isset($_POST['company']) ? $_POST['company'] : array();
	
	$date_start = $_POST['date_start'];
	$date_end = $_POST['date_end'];
	
	
	$departmentListSQL = formatSqlOptionList($sqlConnection, $departmentList);
	$roleListSQL = formatSqlOptionList($sqlConnection, $roleList);
	$cityListSQL = formatSqlOptionList($sqlConnection, $cityList);
	$countryListSQL = formatSqlOptionList($sqlConnection, $countryList);
	$topicListSQL = formatSqlOptionList($sqlConnection, $topicList);
	$companyListSQL = formatSqlOptionList($sqlConnection, $companyList);

	if ($date_start=="" && $date_end=="") {
		$datePred = "";
	} else if ($date_start=="") {
		$datePred = " AND ('{$date_end}' >= p.date_started)";
	} else if ($date_end=="") {
		$datePred = " AND ('{$date_start}' <= p.date_finished)";
	} else {
		$datePred = " AND ('{$date_start}' <= p.date_finished AND '{$date_end}' >= p.date_started)";
	}
	
	
	$query = "SELECT u.id, u.first_name, u.last_name, u.email_address, u.avatar_filename, r.name AS role_name, r.color AS r_color, d.name AS department_name, d.alt_color AS d_color, count(p.id) AS num_placements
			  FROM user u
			  JOIN department d ON u.department_id=d.id" . ($departmentListSQL=="()" ? "" : " AND d.name IN {$departmentListSQL}") . "
			  JOIN role r ON u.role_id=r.id" . ($roleListSQL=="()" ? "" : " AND r.name IN {$roleListSQL}") . "
			  LEFT JOIN placement p ON u.id=p.user_id AND p.active=1" . ($cityListSQL=="()" ? "" : " AND p.city IN {$cityListSQL}")
																	  . ($countryListSQL=="()" ? "" : " AND p.country IN {$countryListSQL}")
																	  . ($topicListSQL=="()" ? "" : " AND p.topic IN {$topicListSQL}")
																	  . ($companyListSQL=="()" ? "" : " AND p.organization IN {$companyListSQL}") . "
			  WHERE (u.active=1" . ($firstname=="" ? "" : " AND (INSTR(u.first_name,'{$firstname}')>0 OR INSTR('{$firstname}',u.first_name)>0)")
								 . ($lastname=="" ? "" : " AND (INSTR(u.last_name,'{$lastname}')>0 OR INSTR('{$lastname}',u.last_name)>0)")
								 . ($email=="" ? "" : " AND (INSTR(u.email_address,'{$email}')>0 OR INSTR('{$email}',u.email_address)>0)")
								 . $datePred 
								 . ") ";
	if ($search) {
		$query = $query . " AND (";
		$query = $query . "(INSTR(u.first_name,'{$search}')>0 OR INSTR('{$search}',u.first_name)>0)";
		$query = $query . " OR (INSTR(u.last_name,'{$search}')>0 OR INSTR('{$search}',u.last_name)>0)";
		$query = $query . " OR (INSTR(u.email_address,'{$search}')>0 OR INSTR('{$search}',u.email_address)>0)";
		$query = $query . " OR (INSTR(u.phone_number,'{$search}')>0 OR INSTR('{$search}',u.phone_number)>0)";
		$query = $query . " OR (INSTR(d.name,'{$search}')>0 OR INSTR('{$search}',d.name)>0)";
		$query = $query . " OR (INSTR(r.name,'{$search}')>0 OR INSTR('{$search}',r.name)>0)";
		$query = $query . ") ";
	}
	
	$query = $query . "GROUP BY u.id ";
	$query = $query . "ORDER BY u.last_name ASC, num_placements DESC";

	$recordset = mysqli_query($sqlConnection, $query);	
	if (!$recordset) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
	$num_records = mysqli_num_rows($recordset);

	
	
	for ($i = 0; $i < $num_records; $i++) {
		
		$row = mysqli_fetch_assoc($recordset);
		
		$id = $row['id'];
		$filename = $row['avatar_filename'];
		$picURL = FormatImageURL($id, $filename);
	


		$tempObject = array(
			'id' => $id, 
			'firstname' => $row['first_name'], 
			'lastname' => $row['last_name'],
			'email' => $row['email_address'],
			'role_name' => $row['role_name'],
			'r_color' => $row['r_color'],
			'department_name' => $row['department_name'],
			'd_color' => $row['d_color'],
			'num_placements' => $row['num_placements'],
			'picURL' => $picURL
		);
		
		array_push($successMessage, $tempObject);
	}

?>