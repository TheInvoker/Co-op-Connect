<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = $ERROR_NOT_LOGGED_IN;
		return;
	}

	if (!isset($_POST['firstname']) || 
		!isset($_POST['lastname']) || 
		!isset($_POST['email']) || 
		!isset($_POST['phone']) || 
		!isset($_POST['website']) || 
		!isset($_POST['status']) || 
		!isset($_POST['biotext']) || 
		!isset($_POST['department'])) {
		
		$errorMessage = $ERROR_NOT_GET_DATA;
		return;
	}
	
	$targetID = $_SESSION["id"]; 
	$firstname = mysqli_real_escape_string($sqlConnection, $_POST['firstname']); 
	$lastname = mysqli_real_escape_string($sqlConnection, $_POST['lastname']); 
	$email = mysqli_real_escape_string($sqlConnection, $_POST['email']); 
	$phone = mysqli_real_escape_string($sqlConnection, $_POST['phone']); 
	$website = mysqli_real_escape_string($sqlConnection, $_POST['website']); 
	$status = mysqli_real_escape_string($sqlConnection, $_POST['status']); 
	$profiletext = mysqli_real_escape_string($sqlConnection, $_POST['biotext']); 
	$coopdepartment = mysqli_real_escape_string($sqlConnection, $_POST['department']); 
	

	$query = "UPDATE user u
			  JOIN department d ON d.name='{$coopdepartment}'
			  SET u.first_name='{$firstname}', u.last_name='{$lastname}', u.email_address='{$email}', u.phone_number='{$phone}', u.website_link='{$website}', u.status_text='{$status}', u.bio_text='{$profiletext}', u.department_id=d.id
			  WHERE u.id={$targetID}";

	if (!mysqli_query($sqlConnection, $query)) {
		$errorMessage = mysqli_error($sqlConnection);
		return;
	}
	
	if ($_FILES["file"]["name"]) {

		$validextensions = array("jpeg","jpg","png");
		$validtypes = array("image/png","image/jpg","image/jpeg");
		$temporary = explode(".", $_FILES["file"]["name"]);
		
		if (count($temporary) > 0) {
			
			$file_extension = strtolower(end($temporary));

			if (!in_array($_FILES["file"]["type"], $validtypes) || !in_array($file_extension, $validextensions)) {  
				$errorMessage = $ERROR_INVALID_IMAGE;
				return;
			}
			
			if ($_FILES["file"]["size"] > 100000) {
				$errorMessage = $ERROR_FILE_BIG;
				return;
			}
			
			if ($_FILES["file"]["error"] > 0) {
				$errorMessage = $ERROR_UPLOADING_FILE;
				return;
			}

			$target_path = "images/avatars/{$targetID}/";
			$filename = mysqli_real_escape_string($sqlConnection, $_FILES["file"]["name"]);

			// if not exist
			if (!is_dir($target_path)) {  

				// make the directory
				mkdir($target_path);
				
			} else {
				
				// delete contents
				$files = glob($target_path . "*"); 
				foreach($files as $file) {
					if(is_file($file)) {
						unlink($file);
					}
				}
			}

			// Storing source path of the file in a variable
			$sourcePath = $_FILES['file']['tmp_name']; 

			// Moving Uploaded file
			if (!move_uploaded_file($sourcePath, $target_path . $filename)) { 
				$errorMessage = $ERROR_MOVING_FILE;
				return;
			}

			$query = "UPDATE user 
					  SET avatar_filename='{$filename}'
					  WHERE id={$targetID}";

			if (!mysqli_query($sqlConnection, $query)) { 
				$errorMessage = mysqli_error($sqlConnection); 
				return; 
			}
		}
	}

?>