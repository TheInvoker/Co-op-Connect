<?php

	if (isNotIncluded()) {
		$errorMessage = "File is private.";
		return;
	}

	if (!$sqlConnection) {
		$errorMessage = "Could not close database connection.";
		return;
	}

	mysqli_close($sqlConnection);

?>