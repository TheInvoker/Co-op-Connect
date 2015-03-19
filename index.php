<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
		<?php
			include "snippet/head.php";
		?>
	</head>
	<body>

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

		<?php
			include "snippet/snippet2.php";
		?>
		
		<!-- my modules -->
		<script src="js/module/login.js"></script>
		
	</body>
</html>