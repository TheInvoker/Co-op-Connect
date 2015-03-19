<?php

	include "common.php";
	include "sqlopen.php";

	$errorMessage = null;
	$successMessage = array();

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

	print(json_encode(array("code" => (is_string($result) ? 401 : 200), "response" => $result)));

?>