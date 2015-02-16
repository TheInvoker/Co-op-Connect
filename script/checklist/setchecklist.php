<?php

	if (isset($_POST['taskid']) && isset($_POST['placementid']) && isset($_POST['state'])) {
		
		$taskid = $_POST['taskid']; 
		$placementid = $_POST['placementid']; 
		$state = $_POST['state']; 

		if ($state == '0') {
			$query = "DELETE from checklist WHERE task_id={$taskid} AND placement_id={$placementid}";
		} else {
			$query = "INSERT INTO checklist (task_id, placement_id) VALUES ({$taskid},{$placementid})";
		}

		mysqli_query($sqlConnection, $query);

	} else {
		$errorMessage = "Did not recieve all of the data.";
	}

?>