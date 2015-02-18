<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
		<?php
			include "snippet/head.php";
		?>
		
		<script src="js/custom/alogin.js"></script>
		<script src="js/custom/amainmenu.js"></script>
	</head>
	<body>

		<div id="login-page" data-role="page" data-theme="a">
			<div data-role="header">
				<h1>Co-op Connect Admin</h1>
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
		
		
		<div id="menu-page" data-role="page" data-theme="a">
			<div data-role="header">
				<h1>Admin Main Menu</h1>
			</div>

			<div data-role="main" class="ui-content">
				<a id="manage-users-button" href="#" data-role="button" data-icon="user" data-iconpos="left">Manage Users</a> 
				<a id="manage-resources-button" href="#" data-role="button" data-icon="info" data-iconpos="left">Manage Resources</a> 
				<a id="manage-tasks-button" href="#" data-role="button" data-icon="bullets" data-iconpos="left">Manage Tasks</a> 
			</div>
		</div> 
		
		
		
		
		
		
		
		<div id="manage-users-page" data-role="page" data-theme="a">
			<div data-role="header">
				<h1>Manage Users</h1>
			</div>

			<div data-role="main" class="ui-content">
				
			</div>
		</div> 
		
		<div id="manage-resources-page" data-role="page" data-theme="a">
			<div data-role="header">
				<h1>Manage Resources</h1>
			</div>

			<div data-role="main" class="ui-content">
				
			</div>
		</div> 
		
		<div id="manage-tasks-page" data-role="page" data-theme="a">
			<div data-role="header">
				<h1>Manage Tasks</h1>
			</div>

			<div data-role="main" class="ui-content">
				
			</div>
		</div> 

	</body>
</html>