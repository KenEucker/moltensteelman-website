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
		scrollTo(this, "#home");
	});

	$.each($("#top-nav a"),
	function(i, el) {
		var target = el.hash;
		$( target + '-link').click(function(event) {
			event.preventDefault();
			scrollTo(this, target);
		});
	});
	

	function scrollTo(target, selector) {
		var liIndex = $(target).index();
		var contentPosTop = $(selector).eq(liIndex).position().top;

		$('html, body').stop().animate({
			scrollTop : contentPosTop
		}, 800);
	}

	

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

	$('div.our-team').click(function(){
			$('#about-blurb .member').html($(this).find('.caption').html());
			$('#about-blurb .original').addClass('hidden');
			$('#about-blurb .member').removeClass('hidden');
	});
	$('#about-title').click(function(){
			$('#about-blurb .original').removeClass('hidden');
			$('#about-blurb .member').addClass('hidden');
	});
});

