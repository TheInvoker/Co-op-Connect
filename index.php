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

		<script src="js/custom/login.js"></script>
		<script src="js/custom/mainmenu.js"></script>
		<script src="js/custom/map.js"></script>
		<script src="js/custom/map_edit.js"></script>
		<script src="js/custom/profile.js"></script>
		<script src="js/custom/profile_edit.js"></script>
		<script src="js/custom/register.js"></script>
		<script src="js/custom/placement.js"></script>
		<script src="js/custom/placement_edit.js"></script>
		<script src="js/custom/checklist.js"></script>
		<script src="js/custom/search.js"></script>
		<script src="js/custom/search_edit.js"></script>
		<script src="js/custom/resource.js"></script>
		<script src="js/custom/thread.js"></script>
		<script src="js/custom/message.js"></script>
		<script src="js/custom/about.js"></script>
		<script src="js/custom/grid.js"></script>

		<link rel="stylesheet" type="text/css" href="css/default.css">
		<link rel="stylesheet" type="text/css" href="css/default.date.css">
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
		
			<div data-role="panel" id="menu-panel" data-display="push">
				<ul data-role="listview">
					<li><a id="profile-button" href="#" class="ui-btn ui-icon-user ui-btn-icon-left">My Profile</a></li>
					<li><a id="placement-button" href="#" class="ui-btn ui-icon-shop ui-btn-icon-left">My Placements</a></li>
					<li><a id="search-button" href="#" class="ui-btn ui-icon-search ui-btn-icon-left">Search</a></li>
					<li><a id="map-button" href="#" class="ui-btn ui-icon-location ui-btn-icon-left">Map</a></li>
					<li><a id="message-button" href="#" class="ui-btn ui-icon-comment ui-btn-icon-left">
						Messages
						<span id="message-number" class="ui-li-count ui-btn-corner-all countBubl" style="display:none;"></span>
						</a>
					</li>
					<li><a id="resource-button" href="#" class="ui-btn ui-icon-alert ui-btn-icon-left">
						Resources
						<span id="resource-number" class="ui-li-count ui-btn-corner-all countBubl" style="display:none;"></span>
						</a>
					</li>
					<li><a id="about-button" href="#" class="ui-btn ui-icon-info ui-btn-icon-left">About</a></li>
				</ul>
			</div>
		
			<div data-role="header">
				<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
				<h1>Home</h1>
			</div>

			<div data-role="main" class="ui-content">
				<div id="newsgrid">
				</div>
			</div>
		</div>








		<div id="profile-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Profile</h1>
				<a id="profile-edit-button" href="#" data-icon="edit" class="ui-btn-right">Edit</a>
			</div>

			<div data-role="main" class="ui-content">
				<h2 id="profile-fullname"></h2>
				<table>
					<tr>
						<td><img src="" id="profile-avatar-image" class="avatar-image"/></td>
						<td valign="top"><div id="profile-status" class="bubble"></div></td>
					</tr>
				</table>
				
				<p id="profile-biotext"></p>
				
				<h3>Details:</h3>
				
				<table>
					<tr><td>Role: </td><td id="profile-role"></td></tr>
					<tr><td>Department: </td><td id="profile-department"></td></tr>
					<tr><td>Member Since: </td><td id="profile-datejoined"></td></tr>
				</table>
				
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-type="horizontal">
						<a id="profile-email" class="ui-shadow ui-btn ui-corner-all ui-icon-mail ui-btn-icon-left">Email</a>
						<a id="profile-phone" class="ui-shadow ui-btn ui-corner-all ui-icon-phone ui-btn-icon-left">Phone</a>
						<a id="profile-site" class="ui-shadow ui-btn ui-corner-all ui-icon-info ui-btn-icon-left" target="_blank">Website</a>
						<a id="profile-message" class="ui-shadow ui-btn ui-corner-all ui-icon-comment ui-btn-icon-left">Message</a>
						<a id="profile-placements" class="ui-shadow ui-btn ui-corner-all ui-icon-shop ui-btn-icon-left">Placements</a>
					</fieldset>
				</div>
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
		
			<div data-role="panel" id="placement-panel" data-display="push">
				<ul data-role="listview">
					<li><a id="placement-edit-button" href="#" class="ui-btn ui-icon-edit ui-btn-icon-left">Edit</a></li>
					<li><a id="placement-checklist-button" href="#" class="ui-btn ui-icon-bullets ui-btn-icon-left">Checklist</a></li>
					<li><a id="placement-map-button" href="#" class="ui-btn ui-icon-location ui-btn-icon-left">View On Map</a></li>
					<li><a id="placement-delete-button" href="#" class="ui-btn ui-icon-delete ui-btn-icon-left">Delete</a></li>
				</ul>
			</div>
		
			<div data-role="header">
				<h1>Placements</h1>
				<a id="add-placement-button" href="#" data-icon="plus" class="ui-btn-right">Add</a>
			</div>

			<div data-role="main" class="ui-content">
				<ul id="placement-list" data-role="listview" data-filter="true" data-filter-placeholder="filter" data-inset="true">

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
				<a id="done-checklist-button" href="#" data-icon="check" class="ui-btn-right">Done</a>
			</div>

			<div data-role="main" class="ui-content">
				<fieldset id="checklistCB" data-role="controlgroup">
				</fieldset>
			</div>
		</div>



		<div id="search-page" data-role="page" data-theme="b">
		
			<div data-role="panel" id="search-panel" data-display="push">
				<ul data-role="listview">
					<li><a id="search-clear-all" href="#" class="ui-btn ui-icon-minus ui-btn-icon-left">Select None</a></li>
					<li><a id="search-select-all" href="#" class="ui-btn ui-icon-plus ui-btn-icon-left">Select All</a></li>
					<li><a id="search-message-all" href="#" class="ui-btn ui-icon-comment ui-btn-icon-left">Message</a></li>
					<li><a id="search-email-all" href="#" class="ui-btn ui-icon-mail ui-btn-icon-left">Email</a></li>
				</ul>
			</div>
		
			<div data-role="header">
				<a href="#search-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
				<h1>Search</h1>
				<a id="search-setting-button" href="#" data-icon="gear">Settings</a>
			</div>

			<div data-role="main" class="ui-content">
				<form id="search-form">

					<input name="search" type="search" maxlength="255" data-mini="true">

					<input type="submit" value="Search" data-mini="true">
				</form>

				<table data-role="table" id="search-table" data-mode="columntoggle" class="ui-body-d ui-shadow table-stripe ui-responsive" data-column-btn-theme="b" data-column-btn-text="Columns to display..." data-column-popup-theme="b">
					<thead>
						<tr class="ui-bar-d">
							<th data-priority="2">#</th>
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
				<a id="done-search-settings-button" href="#" data-icon="check" class="ui-btn-right">Done</a>
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
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
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
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
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
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
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
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
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
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
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
						<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
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

					<label for="date_end">End Date:</label>
					<input name="date_end" type="date"/>

					<input name="active" type="hidden" maxlength="255" value="1">
				</form>
			</div>
		</div>





		<div id="map-page" data-role="page" data-theme="b">
			<div role="main" class="ui-content" id="map_canvas">
				<!-- map loads here... -->
			</div>
			
			<a id="map-setting-button" href="#" class="ui-btn ui-shadow ui-icon-gear ui-btn-icon-notext mapControl"></a>
		</div>
		<div id="map-settings-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Settings</h1>
			</div>
		
			<div data-role="main" class="ui-content">
				<form id="map-filter-form">
					<label for="map_date_start">Start Date:</label>
					<input name="map_date_start" type="date"/>
					<label for="map_date_end">End Date:</label>
					<input name="map_date_end" type="date"/>
					<input type="submit" value="Update">
				</form>
			</div>
		</div>
		
		
		
		
		<div id="thread-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>Threads</h1>
			</div>

			<div data-role="main" class="ui-content">
				<ul id="thread-list" data-role="listview" data-filter="true" data-filter-placeholder="filter" data-inset="true">
				</ul>
				<div data-role="popup" id="memberList-popup">
					<div style="margin:5px;">
						<ul id="member-list" data-role="listview" data-filter="true" data-filter-placeholder="filter" data-inset="true">
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div id="message-page" data-role="page" data-theme="b">
			<div data-role="header">
				<a id="more-message-button" href="#" data-icon="arrow-d" class="ui-btn-right">Show More</a>
				<h1>Messages</h1>
			</div>

			<div data-role="main" class="ui-content">
				<div id="message-list">
				</div>

				<form id="message-form">
					<textarea name="message" cols="40" rows="2" maxlength="255"></textarea>
					<input type="submit" value="Send">
				</form>
			</div>
		</div>


		<div id="resource-page" data-role="page" data-theme="b">
			<div data-role="header">
				<a id="more-resource-button" href="#" data-icon="arrow-d" class="ui-btn-right">Show More</a>
				<h1>Resources</h1>
			</div>

			<div data-role="main" class="ui-content">
				<ul id="resource-list" data-role="listview" data-filter="true" data-filter-placeholder="filter" data-inset="true">

				</ul>
			</div>
		</div>

		<div id="about-page" data-role="page" data-theme="b">
			<div data-role="header">
				<h1>About</h1>
			</div>

			<div data-role="main" class="ui-content">
				<section>
					<header>
						<h1>UTSC Co-op Connect</h1>v1.0.0
					</header>
				</section>
				
				<section>
					<header>
						<h4>Description:</h4>
					</header>
					<p>
						Co-op Connect is a social platform designed to enhance the work term experience of co-op students in UTSC. It includes tools that can help users to search for other relavent people who might be of some help. It also allows for efficient communication between users using a built in messaging service. Users also get access to public resources and tools for keeping track of tasks.
					</p>
				</section>
				
				<section>
					<header>
						<h4>Background Story:</h4>
					</header>
					<p>
						This app was originally developed for the Android O.S. for the <a href="http://blog.utsc.utoronto.ca/appstar" target="_blank">AppStar</a> contest at <a href="http://blog.utsc.utoronto.ca/thehub" target="_blank">TheHub</a> in 2013 for the <a href="http://www.utsc.utoronto.ca/admissions/programs/international-development-studies" target="_blank">IDS</a> department in UTSC. This app won first place in the education category. To see details, click <a href="http://blog.utsc.utoronto.ca/thehub/2013/10/13/appstar-2013-1st-prize-education-goes-to-ids-connect" target="_blank">here</a> and <a href="http://ose.utsc.utoronto.ca/ose/story.php?id=5422" target="_blank">here</a>. In early 2015, it was ported to a web app, optimized for mobile devices and generalized for all co-op departments in UTSC.
					</p>
				</section>
				
				<section>
					<header>
						<h4>Developers:</h4>
					</header>
					<ol>
						<li><a href="http://www.linkedin.com/profile/view?id=282676120" target="_blank">Ryan D'Souza</a></li>
					</ol>
				</section>
				
				<section>
					<header>
						<h4>Plugins:</h4>
					</header>
					<ol>
						<li><a href="http://jquery.com" target="_blank">jQuery</a></li>
						<li><a href="http://jquerymobile.com" target="_blank">jQuery Mobile</a></li>
						<li><a href="https://github.com/gregjacobs/Autolinker.js" target="_blank">Autolinker</a></li>
						<li><a href="https://developers.google.com/maps/documentation/javascript" target="_blank">Google Maps</a></li>
						<li><a href="http://ubilabs.github.io/geocomplete" target="_blank">Geocomplete</a></li>
						<li><a href="https://code.google.com/p/jquery-ui-map" target="_blank">jquery-ui-map</a></li>
						<li><a href="https://code.google.com/p/google-maps-utility-library-v3/wiki/Libraries" target="_blank">google-maps-utility-library-v3</a></li>
						<li><a href="http://amsul.ca/pickadate.js" target="_blank">pickadate</a></li>
						<li><a href="https://github.com/alexgibson/shake.js" target="_blank">shake</a></li>
					</ol>
				</section>
			</div>
		</div>

		<script src="js/picker.js"></script>
		<script src="js/picker.date.js"></script>
		
	</body>
</html>