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

				<div id="error-page" class="page">
					<div class="header noselect">
						Error
					</div>
					<section>
						<div>
							<?php
								print $errorMessage;
							?>
						</div>
					</section>
				</div>

			<?php else: ?>


				<div id="menu-panel" class="panel noselect">
					<div id="home-button">
						<img src="images/site/svg/home.svg"/>
						Home
					</div>
					<div id="profile-button">
						<img src="images/site/svg/profile.svg"/>
						My Profile
					</div>
					<div id="placement-button">
						<img src="images/site/svg/placement.svg"/>
						My Placements
					</div>
					<div id="search-button">
						<img src="images/site/svg/search.svg"/>
						Search
					</div>
					<div id="map-button">
						<img src="images/site/svg/map.svg"/>
						Map
					</div>
					<div id="message-button">
						<img src="images/site/svg/message.svg"/>
						Messages
						<span id="message-number" class="countBubl" style="display:none;"></span>
					</div>
					<div id="resource-button">
						<img src="images/site/svg/resource.svg"/>
						Resources
						<span id="resource-number" class="countBubl" style="display:none;"></span>
					</div>
					<div id="about-button">
						<img src="images/site/svg/info.svg"/>
						About
					</div>
					<div id="logout-button">
						<img src="images/site/svg/logout.svg"/>
						Logout
					</div>
				</div>



				<div id="grid-page" class="page" style="display:none;">
					<div class="header noselect">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Home</div>
					</div>
					<section>
						<div id="newsgrid">
						</div>
					</section>
				</div>






				

				<div id="profile-page" class="page" style="display:none;">
					<div class="header noselect">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Profile</div>
						<div class="header-icon header-right header-icon-edit" id="profile-edit-button"></div>
					</div>

					<section>
						<div>
							<div id="profile-fullname"></div>

							<div id="profile-status" class="bubble multiline"></div>
							
							<img id="profile-avatar-image"/>

							<p id="profile-biotext" class="multiline"></p>
							
							<h3>Details:</h3>
							
							<table>
								<tr><td>Role: </td><td id="profile-role"></td></tr>
								<tr><td>Department: </td><td id="profile-department"></td></tr>
								<tr><td>Member Since: </td><td id="profile-datejoined"></td></tr>
							</table>
							
							<div id="profile-buttons">
								<a id="profile-email" href="#"><img class="profile-icon" src="images/site/svg/email.svg"/></a>
								<a id="profile-phone" href="#"><img class="profile-icon" src="images/site/svg/phone.svg"/></a>
								<a id="profile-site" href="#" target="_blank"><img class="profile-icon" src="images/site/svg/world.svg"/></a>
								<div id="profile-message"><img class="profile-icon" src="images/site/svg/message.svg"/></div>
								<div id="profile-placements"><img class="profile-icon" src="images/site/svg/placement.svg"/></div>
							</div>
						</div>
					</section>
				</div>
				<div id="profile-edit-page" class="page" style="display:none;">
					<div class="header noselect">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Profile Edit</div>
						<div class="header-icon header-right header-icon-cancel" id="profile-cancel-button"></div>
					</div>

					<section>
						<div>
							<form id="profile-edit-form">
								<label for="file">Avatar Image:</label>
								<br/>
								<input name="file" type="file" accept="image/*">
								<br/>
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
								<label for="phone">Phone Number:</label>
								<br/>
								<input name="phone" type="tel" maxlength="255">
								<br/>
								<label for="website">Website:</label>
								<br/>
								<input name="website" type="url" maxlength="255">
								<br/>
								<label for="status">Status:</label>
								<br/>
								<textarea name="status" rows="2" maxlength="16777215"></textarea>
								<br/>
								<label for="biotext">Bio Text:</label>
								<br/>
								<textarea name="biotext" rows="4" maxlength="4294967295"></textarea>
								<br/>
								<fieldset>
									<legend>Co-op Department</legend>
									<?php
										$_GET['field'] = "department";
										$_GET['radio'] = '1';
										include "script/html/printfieldhtml.php";
									?>
								</fieldset>
								<br/>
								<input type="submit" value="Save">
							</form>
						</div>
					</section>
				</div>







				<div id="placement-page" class="page" style="display:none;">
					<div id="placement-panel" class="panel noselect">
						<div id="placement-edit-button">
							<img src="images/site/svg/edit.svg"/>
							Edit
						</div>
						<div id="placement-checklist-button">
							<img src="images/site/svg/checklist.svg"/>
							Checklist
						</div>
						<div id="placement-map-button">
							<img src="images/site/svg/map.svg"/>
							View On Map
						</div>
						<div id="placement-delete-button">
							<img src="images/site/svg/cancel.svg"/>
							Delete
						</div>
					</div>
				
					<div class="header noselect">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Placements</div>
						<div class="header-icon header-right header-icon-add" id="add-placement-button"></div>
					</div>

					<section>
						<div id="placement-list">

						</div>
					</section>
				</div>
				<div id="placement-edit-page" class="page" style="display:none;">
					<div class="header noselect">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Placement Edit</div>
						<div class="header-icon header-right header-icon-cancel" id="placement-cancel-button"></div>
					</div>

					<section>
						<div>
							<form id="placement-edit-form">
								<input name="name" type="hidden" maxlength="255">
								<input name="locality" type="hidden" maxlength="255">
								<input name="country" type="hidden" maxlength="255">
								<input name="lat" type="hidden" maxlength="255">
								<input name="lng" type="hidden" maxlength="255">
			
								<label for="address">Address:</label>
								<br/>
								<input name="address" type="text" maxlength="255" required>
								<br/>
								<label for="role">Role:</label>
								<br/>
								<input name="role" type="text" maxlength="255" required>
								<br/>
								<label for="company">Company:</label>
								<br/>
								<input name="company" type="text" maxlength="255" required>
								<br/>
								<label for="date_start">Start Date:</label>
								<br/>
								<input name="date_start" type="date" placeholder="yyyy-mm-dd" pattern="\d\d\d\d-\d\d-\d\d" required/>
								<br/>
								<label for="date_end">End Date:</label>
								<br/>
								<input name="date_end" type="date" placeholder="yyyy-mm-dd" pattern="\d\d\d\d-\d\d-\d\d" required/>
								<br/>
								<label for="active">Active:</label>
								<br/>
								<select name="active">
									<option value="0">No</option>
									<option value="1">Yes</option>
								</select>
								<br/>
								<input type="submit" value="Save">
							</form>
						</div>
					</section>
				</div>

				
				

				
				
				<div id="checklist-page" class="page" style="display:none;">
					<div class="header noselect">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Checklist</div>
						<div class="header-icon header-right header-icon-accept" id="checklist-accept-button"></div>
					</div>

					<section>
						<div id="checklistCB">
						</div>
					</section>
				</div>

				
				
				
				
				
				
				
				
				
				

				<div id="search-page" class="page" style="display:none;">
				
					<div id="search-panel" class="panel noselect">
						<div id="search-settings-button">
							<img src="images/site/svg/settings.svg"/>
							Settings
						</div>
						<div id="search-none-button">
							<img src="images/site/svg/circle.svg"/>
							Select None
						</div>
						<div id="search-all-button">
							<img src="images/site/svg/square.svg"/>
							Select All
						</div>
						<div id="search-message-button">
							<img src="images/site/svg/message.svg"/>
							Message
						</div>
						<div id="search-email-button">
							<img src="images/site/svg/email.svg"/>
							Email
						</div>
					</div>
				
					<div class="header noselect">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Search</div>
						<div class="header-icon header-right header-icon-nav" data-panel="#search-panel"></div>
					</div>

					<section>
						<div>
							<form id="search-form">
								<input name="search" type="search" maxlength="255">
								<input type="submit" value="Search">
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
					</section>
				</div>
				<div id="search-settings-page" class="page" style="display:none;">
					<div class="header noselect">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Settings</div>
						<div class="header-icon header-right header-icon-accept" id="search-accept-button"></div>
					</div>

					<section>
						<div>
							<form id="search-settings-form">
								<div class="search-settings-title">User Filters:</div>

								<label for="firstname">First Name:</label>
								<br/>
								<input name="firstname" type="text" maxlength="255">
								<br/>
								<label for="lastname">Last Name:</label>
								<br/>
								<input name="lastname" type="text" maxlength="255">
								<br/>
								<label for="email">Email Address:</label>
								<br/>
								<input name="email" type="text" maxlength="255">
								<br/>
								<br/>
								<fieldset id="search_department_cb">
									<legend>Co-op Department</legend>
									<div class="search-icons">
										<div class="clear-cb-button"><img class="search-small-icon" src="images/site/svg/circle.svg"/></div>
										<div class="selectall-cb-button"><img class="search-small-icon" src="images/site/svg/square.svg"/></div>
									</div>
									<?php
										$_GET['field'] = "department";
										$_GET['radio'] = '0';
										include "script/html/printfieldhtml.php";
									?>
								</fieldset>

								<fieldset id="search_role_cb">
									<legend>Role</legend>
									<div class="search-icons">
										<div class="clear-cb-button"><img class="search-small-icon" src="images/site/svg/circle.svg"/></div>
										<div class="selectall-cb-button"><img class="search-small-icon" src="images/site/svg/square.svg"/></div>
									</div>
									<?php
										$_GET['field'] = "role";
										$_GET['radio'] = '0';
										include "script/html/printfieldhtml.php";
									?>

								</fieldset>
								
								<br/>
								<div class="search-settings-title">Placement Filters:</div>

								<fieldset id="search_city_cb">
									<legend>City</legend>
									<div class="search-icons">
										<div class="clear-cb-button"><img class="search-small-icon" src="images/site/svg/circle.svg"/></div>
										<div class="selectall-cb-button"><img class="search-small-icon" src="images/site/svg/square.svg"/></div>
									</div>
									<?php
										$_GET['field'] = "city";
										$_GET['radio'] = '0';
										include "script/html/printfieldhtml.php";
									?>

								</fieldset>

								<fieldset id="search_country_cb">
									<legend>Country</legend>
									<div class="search-icons">
										<div class="clear-cb-button"><img class="search-small-icon" src="images/site/svg/circle.svg"/></div>
										<div class="selectall-cb-button"><img class="search-small-icon" src="images/site/svg/square.svg"/></div>
									</div>
									<?php
										$_GET['field'] = "country";
										$_GET['radio'] = '0';
										include "script/html/printfieldhtml.php";
									?>

								</fieldset>

								<fieldset id="search_topic_cb">
									<legend>Role</legend>
									<div class="search-icons">
										<div class="clear-cb-button"><img class="search-small-icon" src="images/site/svg/circle.svg"/></div>
										<div class="selectall-cb-button"><img class="search-small-icon" src="images/site/svg/square.svg"/></div>
									</div>
									<?php
										$_GET['field'] = "topic";
										$_GET['radio'] = '0';
										include "script/html/printfieldhtml.php";
									?>

								</fieldset>

								<fieldset id="search_company_cb">
									<legend>Company</legend>
									<div class="search-icons">
										<div class="clear-cb-button"><img class="search-small-icon" src="images/site/svg/circle.svg"/></div>
										<div class="selectall-cb-button"><img class="search-small-icon" src="images/site/svg/square.svg"/></div>
									</div>
									<?php
										$_GET['field'] = "company";
										$_GET['radio'] = '0';
										include "script/html/printfieldhtml.php";
									?>

								</fieldset>
								<br/>
								<label for="date_start">Start Date:</label>
								<br/>
								<input name="date_start" type="date" placeholder="yyyy-mm-dd" pattern="\d\d\d\d-\d\d-\d\d"/>
								<br/>
								<label for="date_end">End Date:</label>
								<br/>
								<input name="date_end" type="date" placeholder="yyyy-mm-dd" pattern="\d\d\d\d-\d\d-\d\d"/>
								<input name="active" type="hidden" maxlength="255" value="1">
							</form>
						</div>
					</section>
				</div>

				



				<div id="map-page" class="page" style="display:none;">
					<div class="header">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Map</div>
						<div class="header-icon header-right header-icon-settings" id="map-settings-button"></div>
					</div>

					<section>
						<div id="map_canvas">
							<!-- map loads here... -->
						</div>
					</section>
				</div>
				<div id="map-settings-page" class="page" style="display:none;">
					<div class="header">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Settings</div>
						<div class="header-icon header-right header-icon-cancel" id="map-cancel-button"></div>
					</div>
				
					<section>
						<div>
							<form id="map-filter-form">
								<label for="map_date_start">Start Date:</label>
								<br/>
								<input name="map_date_start" type="date" placeholder="yyyy-mm-dd" pattern="\d\d\d\d-\d\d-\d\d"/>
								<br/>
								<label for="map_date_end">End Date:</label>
								<br/>
								<input name="map_date_end" type="date" placeholder="yyyy-mm-dd" pattern="\d\d\d\d-\d\d-\d\d"/>
								<br/>
								<br/>
								<input type="submit" value="Update">
							</form>
						</div>
					</section>
				</div>
				
				
				
				
				<div id="thread-page" class="page" style="display:none;">
					<div class="header">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Threads</div>
					</div>

					<section>
						<div>
							<div id="thread-list">
							</div>
							<div id="memberList-popup" class="thread-popup">
							</div>
						</div>
					</section>
				</div>
				<div id="message-page" class="page" style="display:none;">
					<div class="header">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Messages</div>
						<div class="header-icon header-right header-icon-arrowdown" id="message-showmore-button"></div>
					</div>

					<section>
						<div>
							<div id="message-list">
							</div>

							<form id="message-form">
								<textarea name="message" rows="2" maxlength="255"></textarea>
								<input type="submit" value="Send">
							</form>
						</div>
					</section>
				</div>
				


				<div id="resource-page" class="page" style="display:none;">
					<div class="header">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">Resources</div>
						<div class="header-icon header-right header-icon-arrowdown" id="resource-showmore-button"></div>
					</div>

					<section>
						<div id="resource-list">
						</div>
					</section>
				</div>

				
				
				<div id="about-page" class="page" style="display:none;">
					<div class="header">
						<div class="header-icon header-left header-icon-nav" data-panel="#menu-panel"></div>
						<div class="name">About</div>
					</div>

					<section>
						<div>
							<section>
								<header>
									<div class="about-title">UTSC Co-op Connect</div>
									<div id="about-version"></div>
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
									<li><a href="https://github.com/gregjacobs/Autolinker.js" target="_blank">Autolinker</a></li>
									<li><a href="https://developers.google.com/maps/documentation/javascript" target="_blank">Google Maps</a></li>
									<li><a href="http://ubilabs.github.io/geocomplete" target="_blank">Geocomplete</a></li>
									<li><a href="http://gmap3.net" target="_blank">gmap3</a></li>
									<li><a href="http://fooplugins.com/plugins/footable-jquery" target="_blank">footable</a></li>
									<li><a href="http://malsup.com/jquery/block" target="_blank">jQuery BlockUI</a></li>
									<li><div>Icons made by <a href="http://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div></li>
								</ol>
							</section>
						</div>
					</section>
				</div>

				

				
				<?php
					include "snippet/snippet1.php";
					include "snippet/snippet2.php";
				?>
				
				<!-- Include the google maps library -->
				<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&amp;language=en"></script>
				<!-- Include the gmap3 library -->
				<script src="js/plugin/gmap3.min.js"></script>
				<!-- Include the geolocation autocomplete library -->
				<script src="js/plugin/jquery.geocomplete.min.js"></script>

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