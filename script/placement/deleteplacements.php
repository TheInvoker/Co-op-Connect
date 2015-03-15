<?php

	if (!isset($_POST['id'])) {
		$errorMessage = "Did not recieve all of the data.";
		return;
	}
	
	$id = $_POST['id']; 
	
	$query = "DELETE FROM placement WHERE id={$id}";
								
	mysqli_query($sqlConnection, $query);

?>