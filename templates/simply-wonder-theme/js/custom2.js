$(document).ready(function() {

	$(".toggle-topbar").click(function() { 
		//$(".top-bar-section").slideToggle(); 
		$('.nav-custom.fixed').removeClass('fixed');
		$('.top-bar').addClass('expanded').addClass('fixed');
	});



});
