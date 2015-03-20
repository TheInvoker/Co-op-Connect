<?php

	if (!$sqlConnection) {
		$errorMessage = "Could not close database connection.";
		return;
	}

	mysqli_close($sqlConnection);

?>