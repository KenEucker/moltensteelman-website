$(document).ready(function() {

	$(".toggle-topbar").click(function() { 
		//$(".top-bar-section").slideToggle(); 
		$('.nav-custom.fixed').removeClass('fixed');
		$('.top-bar').addClass('expanded').addClass('fixed');
	});


	/*------------ For Top Banner ------------ */
	// Full list of configuration options available here:
	// https://github.com/hakimel/reveal.js#configuration
	Reveal.initialize({
		width : 1024,
		height : 660,
		history : true,
	});

});
