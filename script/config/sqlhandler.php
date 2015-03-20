<?php

	include "common.php";
	include "sqlopen.php";

	if (isset($_POST['page'])) {

		$page = $_POST['page']; 

		if (strpos($page, '..') !== FALSE) {

			$result = "Invalid request given.";

		} else {

			$path = '../' . $page . '.php';

			if (!file_exists($path)) {

				$result = "Invalid request given.";

			} else {

				include '../' . $page . '.php';
				
				$result = $errorMessage ? $errorMessage : $successMessage;
			}
		}
	} else {
		$result = "Missing request.";
	}

	include "sqlclose.php";


  	if (is_string($result)) {
	  	header('HTTP/1.1 503 Service Unavailable');
  		print $result;
  	} else {
  		print(json_encode(array("code" => 200, "response" => $result)));
  	}

?>