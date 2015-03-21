<?php

	if (!isset($_SESSION["auth"]) || !$_SESSION["auth"]) {
		$errorMessage = $ERROR_NOT_LOGGED_IN;
		return;
	}

	if (!isset($_POST['taskid']) || !isset($_POST['placementid']) || !isset($_POST['state'])) {
		$errorMessage = $ERROR_NOT_GET_DATA;
		return;
	}

	$taskid = mysqli_real_escape_string($sqlConnection, $_POST['taskid']); 
	$placementid = mysqli_real_escape_string($sqlConnection, $_POST['placementid']); 
	$state = mysqli_real_escape_string($sqlConnection, $_POST['state']); 

	if ($state == '0') {
		$query = "DELETE from checklist WHERE task_id={$taskid} AND placement_id={$placementid}";
	} else {
		$query = "INSERT INTO checklist (task_id, placement_id) VALUES ({$taskid},{$placementid})";
	}

	if (!mysqli_query($sqlConnection, $query)) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
?>