<?php

	include "config/common.php";
	
	if (isset($_POST['page'])) {

		$page = $_POST['page']; 

		if (strpos($page, '..') !== false) {

			$errorMessage = "Invalid request given.";
			
		} else {

			$path = 'script/' . $page . '.php';

			if (!file_exists($path)) {

				$errorMessage = "Invalid request given.";

			} else {

				include "config/sqlopen.php";
				
				if (!$errorMessage) {
					include $path;
				}

				include "config/sqlclose.php";
			}
		}
	} else {
		$errorMessage = "Missing request.";
	}

  	if ($errorMessage) {
		
		switch ($errorMessage) {
			case $ERROR_NOT_LOGGED_IN:
				$errno = 402;
				break;
			default:
				$errno = 401;
		}
		
	  	print(json_encode(array("code" => $errno, "response" => $errorMessage)));
  	} else {
  		print(json_encode(array("code" => 200, "response" => $successMessage)));
  	}

?>