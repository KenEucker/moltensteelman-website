$(document).ready(function() {

	$('.controller-pause').click(function(){
		Reveal.configure({ autoSlide: 0 }); // off
		$(this).fadeOut();
	});

    $('#mentions .column').last().addClass('end');
    $('#portfolio .column').last().addClass('end');
});