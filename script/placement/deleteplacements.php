<?php

	if (isset($_POST['id'])) {
		
		$id = $_POST['id']; 
		
		$query = "DELETE FROM placement WHERE id={$id}";
									
		mysqli_query($sqlConnection, $query);
	} else {
		$errorMessage = "Did not recieve all of the data.";
	}

?>