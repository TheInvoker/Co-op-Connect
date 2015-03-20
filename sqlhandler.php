<?php

	include "script/config/common.php";
	
	if (isset($_POST['page'])) {

		$page = $_POST['page']; 

		if (strpos($page, '..') !== false) {

			$errorMessage = "Invalid request given.";
			
		} else {

			$path = 'script/' . $page . '.php';

			if (!file_exists($path)) {

				$errorMessage = "Invalid request given.";

			} else {

				include "script/config/sqlopen.php";
				
				if (!$errorMessage) {
					include $path;
				}

				include "script/config/sqlclose.php";
			}
		}
	} else {
		$errorMessage = "Missing request.";
	}


  	if ($errorMessage) {
	  	print(json_encode(array("code" => 401, "response" => $errorMessage)));
  	} else {
  		print(json_encode(array("code" => 200, "response" => $successMessage)));
  	}

?>