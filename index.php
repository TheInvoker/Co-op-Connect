<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
	
		<?php
			include "snippet/head.php";
			
			include "script/config/common.php";
		?>
		
	</head>
	<body>

		<?php if (isset($_SESSION["auth"]) && $_SESSION["auth"]): ?>

			<script>
				window.location.href = "coopconnect.php";
			</script>

		<?php else: ?>

			<div id="login-page" data-role="page" data-theme="b">
			
				<div data-role="panel" id="login-panel" data-display="push">
					<ul data-role="listview">
						<li><a id="register-button" href="#" class="ui-btn ui-icon-arrow-u ui-btn-icon-left">Register</a></li>
						<li><a id="forgot-button" href="#" class="ui-btn ui-icon-info ui-btn-icon-left">Forgot Password</a></li>
					</ul>
				</div>
			
				<div data-role="header">
					<a href="#login-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
					<h1>UTSC Co-op Connect</h1>
				</div>

				<div data-role="main" class="ui-content">
					<center>
						<img class="logo-image-home" src="./images/site/coopconnect.png" alt="Co-op Connect logo" title="Co-op Connect logo"/>
					</center>

					<form id="login-form">
						<label for="email">Email Address:</label>
						<input name="email" type="email" maxlength="255" value="ryan.dsouza@hotmail.ca" required>
						<label for="password">Password:</label>
						<input name="password" type="password" autocomplete="off" maxlength="255" value="test" required>
						<input type="submit" value="Login">
					</form>
				</div>
			</div>


			<div id="register-page" data-role="page" data-theme="b">
				<div data-role="header">
					<h1>Register</h1>
				</div>

				<div data-role="main" class="ui-content">
					<form id="register-form">

						<label for="firstname">First Name:</label>
						<input name="firstname" type="text" maxlength="255" required>

						<label for="lastname">Last Name:</label>
						<input name="lastname" type="text" maxlength="255" required>

						<label for="email">Email Address:</label>
						<input name="email" type="email" maxlength="255" required>

						<label for="password">Password:</label>
						<input name="password" type="password" maxlength="255" required>

						<label for="c-password">Confirm Password:</label>
						<input name="c-password" type="password" maxlength="255" required>

						<input type="submit" value="Register">
					</form>
				</div>
			</div>
			
			<?php
				include "snippet/snippet2.php";
			?>

			<!-- my modules -->
			<script src="js/module/login.js"></script>
			<script src="js/module/register.js"></script>

		<?php endif ?>

	</body>
</html>