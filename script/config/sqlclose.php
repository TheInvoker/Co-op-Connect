<?php

	if (!$sqlConnection) {
		$errorMessage = $ERROR_CLOSE_DB;
		return;
	}

	mysqli_close($sqlConnection);

?>