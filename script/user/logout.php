<?php

	if (isNotIncluded()) {
		$errorMessage = "File is private.";
		return;
	}

	$_SESSION["auth"] = false;
	
?>