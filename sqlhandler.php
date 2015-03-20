<?php

	include "script/config/common.php";
	
	if ($_SESSION["auth"]) {
		
		if (isset($_POST['page'])) {

			$page = $_POST['page']; 

			if (strpos($page, '..') !== FALSE) {

				$result = "Invalid request given.";

			} else {

				$path = 'script/' . $page . '.php';

				if (!file_exists($path)) {

					$result = "Invalid request given.";

				} else {

					include "script/config/sqlopen.php";
					
					if (!$errorMessage) {
						include $path;
					}

					include "script/config/sqlclose.php";
					
					$result = $errorMessage ? $errorMessage : $successMessage;
				}
			}
		} else {
			$result = "Missing request.";
		}
	} else {
		$errorMessage = "You are not logged in.";
	}

  	if (is_string($result)) {
	  	header("HTTP/1.1 503 {$result}");
  	} else {
  		print(json_encode(array("code" => 200, "response" => $result)));
  	}

?>