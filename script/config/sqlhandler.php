<?php

	// include common functions
	include_once dirname(__FILE__).'/common.php';
	
	$result = isset($_POST['page']) ? 
				RunQueries($_POST['page']) : 
				(isset($_GET['page']) ? 
				   RunQueries($_GET['page']) : 
				   "Missing request.");

	if ($GLOBALS['printJSON']) {
		print(json_encode(array("code" => (is_string($result) ? 401 : 200), "response" => $result)));
	}
?>