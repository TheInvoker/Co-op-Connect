<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
		<?php
			include "snippet/head.php";
		?>
	</head>
	<body>

		<div id="login-page" data-role="page" data-theme="a">
			<div data-role="header">
				<h1>UTSC Co-op Connect Admin</h1>
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
		
			<div data-role="panel" id="menu-panel" data-display="push">
				<ul data-role="listview">
					<li><a id="manage-users-button" href="#" class="ui-btn ui-icon-user ui-btn-icon-left">Manage Users</a></li>
					<li><a id="manage-resources-button" href="#" class="ui-btn ui-icon-info ui-btn-icon-left">Manage Resources</a></li>
					<li><a id="manage-tasks-button" href="#" class="ui-btn ui-icon-bullets ui-btn-icon-left">Manage Tasks</a></li>
				</ul>
			</div>
		
			<div data-role="header">
				<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
				<h1>Admin Home</h1>
			</div>

			<div data-role="main" class="ui-content">

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

		<?php
			include "snippet/scripts_2.php";
			include "snippet/scripts.php";
		?>
		
		<script src="js/custom/alogin.js"></script>
		<script src="js/custom/amainmenu.js"></script>	
		
	</body>
</html>