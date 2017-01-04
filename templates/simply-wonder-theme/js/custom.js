$(document).ready(function() {

	/*------------ For Scrollspy Init ------------ */
	$('.nav-link').each(function(i) {
		var position = $($(this).attr("href")).position();
		$(this).scrollspy({
			min : position.top - 50,
			max : position.top + $($(this).attr("href")).height(),
			onEnter : function(element, position) {
				$(element).addClass('active'); 
			},
			onLeave : function(element, position) {
				$(element).removeClass('active');
			}
		});
	});
	
	
	
	
	/*------------ For Top Banner ------------ */
	// Full list of configuration options available here:
	// https://github.com/hakimel/reveal.js#configuration
	Reveal.initialize({
		width : 1024,
		height : 350,
		controls : false,
		progress : false,
		history : true,
		center : true,
		loop : true,
		autoSlide : 5000,
		minScale : 0.2,
		maxScale : 1.0
	});

	/*------------ For smooth scroll ------------ */

	$('.logo').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();

		$('html, body').stop().animate({
			scrollTop : 0
		}, 800);
	});

	$('#home-link').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();
		$('html, body').stop().animate({
			scrollTop : 0
		}, 800);
	});

	$('#about-link').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();
		var contentPosTop = $('#about').eq(liIndex).position().top;

		$('html, body').stop().animate({
			scrollTop : contentPosTop
		}, 800);
	});

	$('#portfolio-link').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();
		var contentPosTop = $('#portfolio').eq(liIndex).position().top;

		$('html, body').stop().animate({
			scrollTop : contentPosTop
		}, 800);
	});

	$('#contact-link').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();
		var contentPosTop = $('#contact').eq(liIndex).position().top;

		$('html, body').stop().animate({
			scrollTop : contentPosTop
		}, 800);
	});

	/*------------ For Portfolio thumbnails ------------ */

	$('.fancybox').fancybox();

	$('.fancybox').hover(function() {
		$(this).addClass("animated bounce");
	}, function() {
		$(this).removeClass("animated bounce");
	});

	// Fires whenever a player has finished loading
	function onPlayerReady(event) {
		event.target.playVideo();
	}

	// Fires when the player's state changes.
	function onPlayerStateChange(event) {
		// Go to the next video after the current one is finished playing
		if (event.data === 0) {
			$.fancybox.next();
		}
	}

	// The API will call this function when the page has finished downloading the JavaScript for the player API
	window.onYouTubePlayerAPIReady = function() {
		
		// Initialise the fancyBox after the DOM is loaded
		$(document).ready(function() {
			$(".fancybox.iframe")
				.attr('rel', 'gallery')
				.fancybox({
					openEffect  : 'none',
					closeEffect : 'none',
					nextEffect  : 'none',
					prevEffect  : 'none',
					padding     : 0,
					margin      : 50,
					beforeShow  : function() {
						// Find the iframe ID
						var id = $.fancybox.inner.find('iframe').attr('id');
						
						// Create video player object and add event listeners
						var player = new YT.Player(id, {
							events: {
								'onReady': onPlayerReady,
								'onStateChange': onPlayerStateChange
							}
						});
					}
				});
		});
		
	}

	/*------------  for Google map  ------------ */

	// $(window).load(function() {
	// 	LoadGmaps();
	// });

	// /* Add Your Company Name latitude and  longitude here.
	//  * for latitude and longitude please check http://itouchmap.com/latlong.html
	//  *  */
	// var latitude = "45.073323";
	// var longitude = "-122.979173";
	// var details = "Moltensteelman Headquarters - Salem, OR, United States";

	// function LoadGmaps() {
	// 	var myLatlng = new google.maps.LatLng(latitude, longitude);
	// 	var myOptions = {
	// 		zoom : 100,
	// 		scrollwheel : true,
	// 		center : myLatlng,
	// 		navigationControl : true,
	// 		mapTypeId : google.maps.MapTypeId.SATELLITE
	// 	}

	// 	var map = new google.maps.Map(document.getElementById("googlemaps"), myOptions);
	// 	var marker = new google.maps.Marker({
	// 		position : myLatlng,
	// 		map : map,
	// 		icon : 'img/map_icon.png'
	// 	});
	// 	var infowindow = new google.maps.InfoWindow({
	// 		content : details
	// 	});
	// 	google.maps.event.addListener(marker, "click", function() {
	// 		infowindow.open(map, marker);

	// 	});

	// }

});

