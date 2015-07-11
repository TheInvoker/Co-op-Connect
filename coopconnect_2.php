<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
	
		<?php
			include "snippet/head.php";
			
			include "config/common.php";
		?>
		
	</head>
	<body>




				<div id="menu-panel" class="panel">
					<ul>
						<li><a id="home-button" href="#">Home</a></li>
						<li><a id="profile-button" href="#">My Profile</a></li>
						<li><a id="placement-button" href="#">My Placements</a></li>
						<li><a id="search-button" href="#">Search</a></li>
						<li><a id="map-button" href="#">Map</a></li>
						<li><a id="message-button" href="#">
							Messages
							<span id="message-number" class="countBubl" style="display:none;"></span>
							</a>
						</li>
						<li><a id="resource-button" href="#">
							Resources
							<span id="resource-number" class="countBubl" style="display:none;"></span>
							</a>
						</li>
						<li><a id="about-button" href="#">About</a></li>
						<li><a id="logout-button" href="#">Logout</a></li>
					</ul>
				</div>



				<div id="grid-page">
					<div class="header">
						<a href="#menu-panel" class="header-icon header-left header-icon-home"></a>
						Home
					</div>

					<div>
						<div id="newsgrid">
						</div>
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


	</body>
</html>