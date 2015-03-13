<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
		<?php
			include "snippet/head.php";
		?>
	</head>
	<body>

		<div id="reset-page" data-role="page" data-theme="b">
	
			<div data-role="header">
				<h1>Password Reset</h1>
			</div>

			<div data-role="main" class="ui-content">
				<form id="reset-form">
					<label for="password">New Password:</label>
					<input name="password" type="password" maxlength="255" value="" required>
					<label for="password2">Confirm New Password:</label>
					<input name="password2" type="password" maxlength="255" value="" required>
					<input type="submit" value="Reset">
				</form>
			</div>
		</div>

		<?php
			include "snippet/scripts.php";
		?>
		
		<script src="js/custom/reset.js"></script>
		
	</body>
</html>