<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
		<?php
			include "snippet/head.php";
		?>
		
		<!-- Include the Google maps library -->
		<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>
		<!-- Include the jquery maps library -->
		<script src="js/jquery.ui.map.full.min.js"></script>
		<!-- Include the maps clusterer library -->
		<script src="js/markerclusterer_packed.js"></script>
		<!-- Include the geolocation autocomplete library -->
		<script src="js/jquery.geocomplete.min.js"></script>
		
		<script src="js/xdate.js"></script>
		<script src="js/xdate.i18n.js"></script>
		<script src="js/mobipick.js"></script>

		<script src="js/custom/login.js"></script>
		<script src="js/custom/mainmenu.js"></script>
		<script src="js/custom/map.js"></script>
		<script src="js/custom/profile.js"></script>
		<script src="js/custom/register.js"></script>
		<script src="js/custom/placement.js"></script>
		<script src="js/custom/checklist.js"></script>
		<script src="js/custom/search.js"></script>
		<script src="js/custom/resource.js"></script>
		<script src="js/custom/message.js"></script>
		
		<link rel="stylesheet" type="text/css" href="css/mobipick.css">
	</head>
	<body>

		<div id="login-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>UTSC Co-op Connect</h1>
			</div>

			<div data-role="main" class="ui-content">
				<form id="login-form">
					<label for="email">Email Address:</label>
					<input name="email" type="email" maxlength="255" value="ryan.dsouza@hotmail.ca" required>
					<label for="password">Password:</label>
					<input name="password" type="password" autocomplete="off" maxlength="255" value="test" required>
					<input type="submit" value="Login">
				</form>
				
				<div align="center">
					<a id="register-button" href="#" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-arrow-u ui-btn-icon-left">Register</a>
					<a id="forgot-button" href="#" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-arrow-d ui-btn-icon-left">Forgot Password</a>
				</div>				
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
		
		
		
		
		
		<div id="menu-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Main Menu</h1>
			</div>

			<div data-role="main" class="ui-content">
				<a id="profile-button" href="#" data-role="button" data-icon="user" data-iconpos="left">My Profile</a> 
				<a id="placement-button" href="#" data-role="button" data-icon="shop" data-iconpos="left">My Placements</a> 
				<a id="search-button" href="#" data-role="button" data-icon="search" data-iconpos="left">Search</a> 
				<a id="map-button" href="#" data-role="button" data-icon="location" data-iconpos="left">Map</a> 
				<a id="message-button" href="#" data-role="button" data-icon="comment" data-iconpos="left">
					Messages
					<span id="message-number" class="ui-li-count ui-btn-corner-all countBubl"></span>
				</a> 
				<a id="resource-button" href="#" data-role="button" data-icon="info" data-iconpos="left">
					Resources
					<span id="resource-number" class="ui-li-count ui-btn-corner-all countBubl"></span>
				</a> 
			</div>
		</div> 
		
		
		
		
		
		
		

		<div id="profile-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Profile</h1>
			</div>

			<div data-role="main" class="ui-content">
				<h2 id="profile-fullname"></h2>
				<img src="" id="profile-avatar-image" class="avatar-image"/>
				
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-type="horizontal">
						<a id="profile-email" class="ui-shadow ui-btn ui-corner-all ui-icon-mail ui-btn-icon-left">Email</a>
						<a id="profile-phone" class="ui-shadow ui-btn ui-corner-all ui-icon-phone ui-btn-icon-left">Phone</a>
						<a id="profile-site" class="ui-shadow ui-btn ui-corner-all ui-icon-info ui-btn-icon-left">Website</a>
						<a id="profile-message" class="ui-shadow ui-btn ui-corner-all ui-icon-comment ui-btn-icon-left">Message</a>
						<a id="profile-placements" class="ui-shadow ui-btn ui-corner-all ui-icon-shop ui-btn-icon-left">Placements</a>
					</fieldset>
				</div>
				
				<p id="profile-status"></p>
				<p id="profile-biotext"></p>
				<p id="profile-info"></p>
				
				<a id="profile-edit-button" href="#" data-role="button" data-icon="edit" data-iconpos="left">Edit</a> 
			</div>
		</div> 
		<div id="profile-edit-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Profile Edit</h1>
			</div>

			<div data-role="main" class="ui-content">
				<form id="profile-edit-form">
				
					<label for="file">Avatar Image:</label>
					<input name="file" type="file" accept="image/*">
				
					<label for="firstname">First Name:</label>
					<input name="firstname" type="text" maxlength="255" required>

					<label for="lastname">Last Name:</label>
					<input name="lastname" type="text" maxlength="255" required>

					<label for="email">Email Address:</label>
					<input name="email" type="email" maxlength="255" required>
					
					<label for="phone">Phone Number:</label>
					<input name="phone" type="tel" maxlength="255">
					
					<label for="website">Website:</label>
					<input name="website" type="url" maxlength="255">
					
					<label for="status">Status:</label>
					<textarea name="status" cols="40" rows="2" maxlength="16777215"></textarea>
					
					<label for="biotext">Bio Text:</label>
					<textarea name="biotext" cols="40" rows="2" maxlength="4294967295"></textarea>
					
					<fieldset id="profile_edit_department_rb" data-role="controlgroup" data-type="horizontal" data-mini="true">
						<legend>Co-op Department:</legend>
						
						<?php
							$_GET['page'] = "html/printfieldhtml";
							$_GET['field'] = "department";
							$_GET['radio'] = '1';
						    include "script/config/sqlhandler.php";
						?>

					</fieldset>
					
					<input type="submit" value="Save">
				</form>
			</div>
		</div> 
		
		
		
		
		
		

		<div id="placement-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Placements</h1>
			</div>

			<div data-role="main" class="ui-content">
				<ul id="placement-list" data-role="listview" data-filter="true" data-filter-placeholder="filter" data-inset="true">

				</ul>

				<a id="add-placement-button" href="#" data-role="button" data-icon="plus" data-iconpos="left">Add</a> 
			</div>
			
			<div id="placementMenu" data-role="popup" data-theme="b">
				<ul data-role="listview" data-inset="true" style="min-width:210px;">
					<li data-role="list-divider">Menu</li>
					<li><a href="#" class="ui-btn ui-icon-edit ui-btn-icon-left">Edit</a></li>
					<li><a href="#" class="ui-btn ui-icon-bullets ui-btn-icon-left">Checklist</a></li>
					<li><a href="#" class="ui-btn ui-icon-location ui-btn-icon-left">View On Map</a></li>
					<li><a href="#" class="ui-btn ui-icon-delete ui-btn-icon-left">Delete</a></li>
				</ul>
			</div>
		</div> 
		<div id="placement-edit-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Placement Edit</h1>
			</div>

			<div data-role="main" class="ui-content">
				<form id="placement-edit-form">
				
					<label for="address">Address:</label>
					<input name="address" type="text" maxlength="255" required>
					
					<img src="images/site/powered-by-google-on-non-white.png" align="right"/>
				
					<input name="name" type="hidden" maxlength="255">
					<input name="locality" type="hidden" maxlength="255">
					<input name="country" type="hidden" maxlength="255">
					<input name="lat" type="hidden" maxlength="255">
					<input name="lng" type="hidden" maxlength="255">
					
					<label for="role">Role:</label>
					<input name="role" type="text" maxlength="255" required>
					
					<label for="company">Company:</label>
					<input name="company" type="text" maxlength="255" required>
					
					<label for="date_start">Start Date:</label>
					<input name="date_start" type="date" required/>
					
					<label for="date_end">End Date:</label>
					<input name="date_end" type="date" required/>
					
					<label for="active">Active:</label>
					<select name="active" data-role="slider">
						<option value="0">No</option>
						<option value="1">Yes</option>
					</select>

					<input type="submit" value="Save">
				</form>
			</div>
		</div> 
		
		
		<div id="checklist-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Checklist</h1>
			</div>

			<div data-role="main" class="ui-content">
				<fieldset id="checklistCB" data-role="controlgroup">
				</fieldset>		
			</div>
		</div> 

		
		
		<div id="search-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Search</h1>
			</div>

			<div data-role="main" class="ui-content">
				<form id="search-form">
				
					<input name="search" type="search" maxlength="255" data-mini="true" required>

					<table width="100%">
						<tr>
							<td width="50%">
								<a id="search-setting-button" href="#" data-role="button" data-icon="gear" data-iconpos="left" data-mini="true">Settings</a> 
							</td>
							<td width="50%">
								<input type="submit" value="Search" data-mini="true">
							</td>
						</tr>
					</table>
				</form>
				
				<table data-role="table" id="search-table" data-mode="columntoggle" class="ui-body-d ui-shadow table-stripe ui-responsive" data-column-btn-theme="b" data-column-btn-text="Columns to display..." data-column-popup-theme="b">
					<thead>
						<tr class="ui-bar-d">
							<th data-priority="4">Avatar</th>
							<th data-priority="1">Name</th>
							<th data-priority="2">Role</th>
							<th data-priority="3">Department</th>
							<th data-priority="4">Matched Placements</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div> 
		<div id="search-settings-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Settings</h1>
			</div>

			<div data-role="main" class="ui-content">
				<form id="search-settings-form">
					<h4>User Filters:</h4>
				
					<label for="firstname">First Name:</label>
					<input name="firstname" type="text" maxlength="255">

					<label for="lastname">Last Name:</label>
					<input name="lastname" type="text" maxlength="255">

					<label for="email">Email Address:</label>
					<input name="email" type="text" maxlength="255">
					
					<fieldset id="search_department_cb" data-role="controlgroup" data-mini="true">
						<legend>Co-op Department:</legend>
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Clear</a>
						<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>
						
						<?php
							$_GET['page'] = "html/printfieldhtml";
							$_GET['field'] = "department";
							$_GET['radio'] = '0';
						    include "script/config/sqlhandler.php";
						?>

					</fieldset>
					
					<fieldset id="search_role_cb" data-role="controlgroup" data-mini="true">
						<legend>Role:</legend>
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Clear</a>
						<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>
						
						<?php
							$_GET['page'] = "html/printfieldhtml";
							$_GET['field'] = "role";
							$_GET['radio'] = '0';
						    include "script/config/sqlhandler.php";
						?>

					</fieldset>
					
					<h4>Placement Filters:</h4>
					
					<fieldset id="search_city_cb" data-role="controlgroup" data-mini="true">
						<legend>City:</legend>
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Clear</a>
						<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>
						
						<?php
							$_GET['page'] = "html/printfieldhtml";
							$_GET['field'] = "city";
							$_GET['radio'] = '0';
						    include "script/config/sqlhandler.php";
						?>

					</fieldset>
					
					<fieldset id="search_country_cb" data-role="controlgroup" data-mini="true">
						<legend>Country:</legend>
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Clear</a>
						<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>
						
						<?php
							$_GET['page'] = "html/printfieldhtml";
							$_GET['field'] = "country";
							$_GET['radio'] = '0';
						    include "script/config/sqlhandler.php";
						?>

					</fieldset>
					
					<fieldset id="search_topic_cb" data-role="controlgroup" data-mini="true">
						<legend>Role:</legend>
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Clear</a>
						<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>
						
						<?php
							$_GET['page'] = "html/printfieldhtml";
							$_GET['field'] = "topic";
							$_GET['radio'] = '0';
						    include "script/config/sqlhandler.php";
						?>

					</fieldset>
					
					<fieldset id="search_company_cb" data-role="controlgroup" data-mini="true">
						<legend>Company:</legend>
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Clear</a>
						<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>
						
						<?php
							$_GET['page'] = "html/printfieldhtml";
							$_GET['field'] = "company";
							$_GET['radio'] = '0';
						    include "script/config/sqlhandler.php";
						?>

					</fieldset>
					
					<label for="date_start">Start Date:</label>
					<input name="date_start" type="date"/>
					<a href="#" class="clear-text-date ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Clear</a>
					<a href="#" class="set-text-today ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Today</a>
					
					<label for="date_end">End Date:</label>
					<input name="date_end" type="date"/>
					<a href="#" class="clear-text-date ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Clear</a>
					<a href="#" class="set-text-today ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Today</a>
					
					<input name="active" type="hidden" maxlength="255" value="1">
				</form>
			</div>
		</div> 
		
		
		
		
		
		<div id="map-page" data-role="page" data-theme="b">			
			<div role="main" class="ui-content" id="map_canvas">
				<!-- map loads here... -->
			</div>

			<form id="map-filter-form" style="padding:10px;">
				<label for="date_start">Start Date:</label>
				<input name="date_start" type="date" required/>
				<label for="date_end">End Date:</label>
				<input name="date_end" type="date" required/>
				<input type="submit" value="Update">
			</form>
		</div>
		
		<div id="thread-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Threads</h1>
			</div>

			<div data-role="main" class="ui-content">
				<ul id="thread-list" data-role="listview" data-filter="true" data-filter-placeholder="filter" data-inset="true">

				</ul>
			</div>
		</div> 
		<div id="message-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Messages</h1>
			</div>

			<div data-role="main" class="ui-content">
				<div id="message-list">
				</div>
				<form id="message-form">
					<input name="message" type="text" maxlength="255" required/>
					<input type="submit" value="Send">
				</form>
			</div>
		</div> 
		
		
		<div id="resource-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Resources</h1>
			</div>

			<div data-role="main" class="ui-content">
				<ul id="resource-list" data-role="listview" data-filter="true" data-filter-placeholder="filter" data-inset="true">

				</ul>
			</div>
		</div> 
		
	</body>
</html>