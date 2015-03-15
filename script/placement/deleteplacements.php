<?php

	if (!isset($_POST['id'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$id = $_POST['id']; 
	
	$query = "DELETE FROM placement WHERE id={$id}";

	if (!mysqli_query($sqlConnection, $query)) { 
		$errorMessage = mysqli_error($sqlConnection); 
		return; 
	}
?>