<?php

	if ($_SESSION['allow_sql']) {

		if (!$sqlConnection) {
			$errorMessage = "Could not close database connection.";
			return;
		}

		mysqli_close($sqlConnection);

	}

	$_SESSION['allow_sql'] = false;

?>