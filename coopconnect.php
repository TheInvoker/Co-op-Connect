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
		
			<?php
				include "config/sqlopen.php";
			?>


			<?php if ($errorMessage): ?>

				<div id="error-page" data-role="page" data-theme="b">
					<div data-role="header">
						<h1>Error</h1>
					</div>
					<div data-role="main" class="ui-content">
						<?php
							print $errorMessage;
						?>
					</div>
				</div>

			<?php else: ?>


				<div data-role="panel" id="menu-panel" data-display="push" data-theme="b">
					<ul data-role="listview">
						<li><a id="home-button" href="#" class="ui-btn ui-icon-home ui-btn-icon-left">Home</a></li>
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
						<li><a id="logout-button" href="#" class="ui-btn ui-icon-arrow-l ui-btn-icon-left">Logout</a></li>
					</ul>
				</div>



				<div id="grid-page" data-role="page" data-theme="b">
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
						<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
						<h1>Profile</h1>
						<a id="profile-edit-button" href="#" data-icon="edit">Edit</a>
					</div>

					<div data-role="main" class="ui-content">
						<h2 id="profile-fullname"></h2>
						<table>
							<tr>
								<td><img src="" id="profile-avatar-image" class="avatar-image"/></td>
								<td valign="top"><div id="profile-status" class="bubble multiline"></div></td>
							</tr>
						</table>
						
						<p id="profile-biotext" class="multiline"></p>
						
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
									$_GET['field'] = "department";
									$_GET['radio'] = '1';
									include "script/html/printfieldhtml.php";
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
						<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
						<h1>Placements</h1>
						<a id="add-placement-button" href="#" data-icon="plus">Add</a>
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
				
					<div data-role="panel" id="search-panel" data-display="push" data-position="right">
						<ul data-role="listview">
							<li><a id="search-setting-button" href="#" class="ui-btn ui-icon-gear ui-btn-icon-left">Settings</a></li>
							<li><a id="search-clear-all" href="#" class="ui-btn ui-icon-minus ui-btn-icon-left">Select None</a></li>
							<li><a id="search-select-all" href="#" class="ui-btn ui-icon-plus ui-btn-icon-left">Select All</a></li>
							<li><a id="search-message-all" href="#" class="ui-btn ui-icon-comment ui-btn-icon-left">Message</a></li>
							<li><a id="search-email-all" href="#" class="ui-btn ui-icon-mail ui-btn-icon-left">Email</a></li>
						</ul>
					</div>
				
					<div data-role="header">
						<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
						<h1>Search</h1>
						<a href="#search-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
					</div>

					<div data-role="main" class="ui-content">
						<form id="search-form">
							<input name="search" type="search" maxlength="255" data-mini="true">
							<input type="submit" value="Search" data-mini="true">
						</form>
						
						<br/>
						
						<div class="divscrollable">
							<table id="search-table" class="footable" data-page-navigation="#search-table-pagination" data-page-size="20">
								<thead>
									<tr>
										<th data-type="numeric">#</th>
										<th>Avatar</th>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Role</th>
										<th>Department</th>
										<th data-type="numeric">Matched Placements</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
								<tfoot>
									<tr>
										<td colspan="100%">
											<div id="search-table-pagination" class="pagination pagination-centered hide-if-no-paging"></div>
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
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
									$_GET['field'] = "department";
									$_GET['radio'] = '0';
									include "script/html/printfieldhtml.php";
								?>

							</fieldset>

							<fieldset id="search_role_cb" data-role="controlgroup" data-mini="true">
								<legend>Role:</legend>
								<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
								<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>

								<?php
									$_GET['field'] = "role";
									$_GET['radio'] = '0';
									include "script/html/printfieldhtml.php";
								?>

							</fieldset>

							<h4>Placement Filters:</h4>

							<fieldset id="search_city_cb" data-role="controlgroup" data-mini="true">
								<legend>City:</legend>
								<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
								<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>

								<?php
									$_GET['field'] = "city";
									$_GET['radio'] = '0';
									include "script/html/printfieldhtml.php";
								?>

							</fieldset>

							<fieldset id="search_country_cb" data-role="controlgroup" data-mini="true">
								<legend>Country:</legend>
								<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
								<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>

								<?php
									$_GET['field'] = "country";
									$_GET['radio'] = '0';
									include "script/html/printfieldhtml.php";
								?>

							</fieldset>

							<fieldset id="search_topic_cb" data-role="controlgroup" data-mini="true">
								<legend>Role:</legend>
								<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
								<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>

								<?php
									$_GET['field'] = "topic";
									$_GET['radio'] = '0';
									include "script/html/printfieldhtml.php";
								?>

							</fieldset>

							<fieldset id="search_company_cb" data-role="controlgroup" data-mini="true">
								<legend>Company:</legend>
								<a href="#" class="clear-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-minus ui-btn-icon-left">Select None</a>
								<a href="#" class="selectall-cb-button ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini ui-icon-plus ui-btn-icon-left">Select All</a>

								<?php
									$_GET['field'] = "company";
									$_GET['radio'] = '0';
									include "script/html/printfieldhtml.php";
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

					<div data-role="header">
						<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
						<h1>Map</h1>
					</div>

					<div data-role="content" id="map_content">
						<div role="main" class="ui-content" id="map_canvas">
							<!-- map loads here... -->
						</div>
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
						<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
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
						<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
						<h1>Resources</h1>
						<a id="more-resource-button" href="#" data-icon="arrow-d">Show More</a>
					</div>

					<div data-role="main" class="ui-content">
						<ul id="resource-list" data-role="listview" data-filter="true" data-filter-placeholder="filter" data-inset="true">

						</ul>
					</div>
				</div>

				<div id="about-page" data-role="page" data-theme="b">
					<div data-role="header">
						<a href="#menu-panel" class="ui-btn ui-shadow ui-icon-bars ui-btn-icon-notext"></a>
						<h1>About</h1>
					</div>

					<div data-role="main" class="ui-content">
						<section>
							<header>
								<h1>UTSC Co-op Connect</h1><div id="about-version"></div>
								<script>
									document.getElementById("about-version").innerHTML = GLOBAL_DATA.version;
								</script>
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
								<li><a href="http://fooplugins.com/plugins/footable-jquery" target="_blank">footable</a></li>
								<li><a href="http://malsup.com/jquery/block" target="_blank">jQuery BlockUI</a></li>
							</ol>
						</section>
					</div>
				</div>

				<?php
					include "snippet/snippet1.php";
					include "snippet/snippet2.php";
				?>
				
				<!-- Include the Google maps library -->
				<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>
				<!-- Include the jquery maps library -->
				<script src="js/plugin/jquery.ui.map.full.min.js"></script>
				<!-- Include the maps clusterer library -->
				<script src="js/plugin/markerclusterer_packed.js"></script>
				<!-- Include the geolocation autocomplete library -->
				<script src="js/plugin/jquery.geocomplete.min.js"></script>
				<!-- Include the date picker library -->
				<script src="js/plugin/picker.js"></script>
				<script src="js/plugin/picker.date.js"></script>

				<!-- my modules -->
				<script src="js/module/navigation/mainmenu.js"></script>
				<script src="js/module/map/map.js"></script>
				<script src="js/module/map/map_edit.js"></script>
				<script src="js/module/profile/profile.js"></script>
				<script src="js/module/profile/profile_edit.js"></script>
				<script src="js/module/placement/placement.js"></script>
				<script src="js/module/placement/placement_edit.js"></script>
				<script src="js/module/checklist/checklist.js"></script>
				<script src="js/module/search/search.js"></script>
				<script src="js/module/search/search_edit.js"></script>
				<script src="js/module/resource/resource.js"></script>
				<script src="js/module/thread/thread.js"></script>
				<script src="js/module/thread/message.js"></script>
				<script src="js/module/about/about.js"></script>
				<script src="js/module/grid/grid.js"></script>
				
				<!-- Include the date picker css -->
				<link rel="stylesheet" type="text/css" href="css/plugin/default.css">
				<link rel="stylesheet" type="text/css" href="css/plugin/default.date.css">

				<script>
					GLOBAL_DATA.user = {
						id : <?php print $_SESSION['id']; ?>,
						picURL : '<?php print $_SESSION['picURL']; ?>'
					};
	
					GRID_MODULE.setGrid();
				</script>

				<?php
					include "config/sqlclose.php";
				?>

			<?php endif ?>

		<?php else: ?>

			<script>
				window.location.href = ".";
			</script>

		<?php endif ?>

	</body>
</html>