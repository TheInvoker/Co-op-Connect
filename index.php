<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
	
		<?php
			include "snippet/head.php";
			include "config/common.php";
		?>
		
	</head>
	<body>

		<?php if (isset($_SESSION["auth"]) && $_SESSION["auth"]): ?>

			<script>
				window.location.href = "coopconnect.php";
			</script>

		<?php else: ?>

			<div id="login-page" class="page" style="display:none;">
			
				<div id="login-panel" class="panel noselect">
					<div id="login-register-button">
						<img src="images/site/svg/arrow.svg"/>
						Register
					</div>
					<div id="login-forgot-button">
						<img src="images/site/svg/info.svg"/>
						Forgot Password
					</div>
				</div>
			
				<div class="header noselect">
					<div class="header-icon header-left header-icon-nav" data-panel="#login-panel"></div>
					<div class="name">Login</div>
				</div>

				<section>
					<div align="center">
						<img class="logo-image-home" src="./images/site/coopconnect.png" alt="Co-op Connect logo" title="Co-op Connect logo"/>
				
						<form id="login-form">
							<label for="email">Email Address:</label>
							<br/>
							<input name="email" type="email" maxlength="255" value="ryan.dsouza@hotmail.ca" required>
							<br/>
							<label for="password">Password:</label>
							<br/>
							<input name="password" type="password" autocomplete="off" maxlength="255" value="test" required>
							<br/>
							<input type="submit" value="Login">
						</form>
					</div>
				</section>
			</div>


			<div id="register-page" class="page" style="display:none;">
				<div class="header noselect">
					<div class="name">Register</div>
					<div class="header-icon header-right header-icon-cancel" id="register-cancel-button"></div>
				</div>

				<section>
					<div>
						<form id="register-form">
							<label for="firstname">First Name:</label>
							<br/>
							<input name="firstname" type="text" maxlength="255" required>
							<br/>
							<label for="lastname">Last Name:</label>
							<br/>
							<input name="lastname" type="text" maxlength="255" required>
							<br/>
							<label for="email">Email Address:</label>
							<br/>
							<input name="email" type="email" maxlength="255" required>
							<br/>
							<label for="password">Password:</label>
							<br/>
							<input name="password" type="password" maxlength="255" required>
							<br/>
							<label for="c-password">Confirm Password:</label>
							<br/>
							<input name="c-password" type="password" maxlength="255" required>
							<br/>
							<br/>
							<input type="submit" value="Register">
						</form>
					</div>
				</section>
			</div>
			
			<?php
				include "snippet/snippet2.php";
			?>

			<!-- my modules -->
			<script src="js/module/user/login.js"></script>
			<script src="js/module/user/register.js"></script>

			<script>
				LOGIN_MODULE.showLogin();
			</script>
			
		<?php endif ?>

	</body>
</html>