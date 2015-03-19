<?php

	if (!isset($_GET['field']) || !isset($_GET['radio'])) {
		print "Did not recieve all of the data.";
		return;
	}
	
	$field = mysqli_real_escape_string($sqlConnection, $_GET['field']); 
	$radio = mysqli_real_escape_string($sqlConnection, $_GET['radio']); 

	if ($field == "department") {
		$qname = "name";
		$query = "SELECT DISTINCT {$qname}
				  FROM department
				  ORDER BY {$qname}";
	} else if ($field == "role") {
		$qname = "name";
		$query = "SELECT DISTINCT {$qname}
				  FROM role
				  ORDER BY {$qname}";
	} else if ($field == "city") {
		$qname = "city";
		$query = "SELECT DISTINCT {$qname} 
				  FROM placement
				  WHERE active=1
				  ORDER BY {$qname}";
	} else if ($field == "country") {
		$qname = "country";
		$query = "SELECT DISTINCT {$qname} 
				  FROM placement
				  WHERE active=1
				  ORDER BY {$qname}";
	} else if ($field == "topic") {
		$qname = "topic";
		$query = "SELECT DISTINCT {$qname} 
				  FROM placement
				  WHERE active=1
				  ORDER BY {$qname}";
	} else if ($field == "company") {
		$qname = "organization";
		$query = "SELECT DISTINCT {$qname} 
				  FROM placement
				  WHERE active=1
				  ORDER BY {$qname}";
	} else {
		print "Did not recieve all of the data.";
		return;
	}

	$recordset = mysqli_query($sqlConnection, $query);
	if (!$recordset) { 
		print mysqli_error($sqlConnection); 
		return;
	}
	$num_records = mysqli_num_rows($recordset);
	
	$token = getToken(10);

	for ($i = 0; $i < $num_records; $i++) {
		
		$row = mysqli_fetch_assoc($recordset);
		
		$name = $row["{$qname}"];
		$uid = "{$field}_{$radio}_{$i}_{$token}";
		
		if ($radio =='1') {
			
			$checked = $i==0 ? " checked=\"checked\"" : "";
			print "<input name=\"{$field}\" id=\"{$uid}\" value=\"{$name}\"{$checked} type=\"radio\">\n";
			print "<label for=\"{$uid}\">{$name}</label>\n";
			
		} else {
			
			print "<input name=\"{$field}[]\" id=\"{$uid}\" value=\"{$name}\" checked=\"\" type=\"checkbox\">\n";
			print "<label for=\"{$uid}\">{$name}</label>\n";
			
		}
	}
	
?>