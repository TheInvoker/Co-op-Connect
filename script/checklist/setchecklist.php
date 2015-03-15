<?php

	if (!isset($_POST['taskid']) || !isset($_POST['placementid']) || !isset($_POST['state'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}

	$taskid = $_POST['taskid']; 
	$placementid = $_POST['placementid']; 
	$state = $_POST['state']; 

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