<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
		<?php
			include "snippet/head.php";
		?>
	</head>
	<body>

		<div data-role="panel" id="menu-panel" data-display="push" data-theme="a">
			<ul data-role="listview">
				<li><a id="home-button" href="#" class="ui-btn ui-icon-home ui-btn-icon-left">Home</a></li>
				<li><a id="manage-users-button" href="#" class="ui-btn ui-icon-user ui-btn-icon-left">Manage Users</a></li>
				<li><a id="manage-resources-button" href="#" class="ui-btn ui-icon-info ui-btn-icon-left">Manage Resources</a></li>
				<li><a id="manage-tasks-button" href="#" class="ui-btn ui-icon-bullets ui-btn-icon-left">Manage Tasks</a></li>
			</ul>
		</div>

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
		
		
		<div id="grid-page" data-role="page" data-theme="a">
			<div data-role="header">
				<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
				<h1>Admin Home</h1>
			</div>

			<div data-role="main" class="ui-content">
				<div id="newsgrid">
				</div>
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
			include "snippet/snippet1.php";
			include "snippet/snippet2.php";
		?>
		
		<!-- my modules -->
		<script src="js/module/alogin.js"></script>
		<script src="js/module/amainmenu.js"></script>
		<script src="js/module/grid.js"></script>
		
	</body>
</html>