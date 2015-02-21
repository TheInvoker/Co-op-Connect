<script>
	$(function() {
		$( "#menu-panel" ).panel();
		$( "#menu-panel" ).find("ul[data-role=listview]").listview().trigger('create');
	});
</script>