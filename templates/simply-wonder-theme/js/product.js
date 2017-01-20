$(document).ready(function() {
    $('.images img.thumb').click(function(){
        $('img.big')[0].src = this.src;
    });
    $('#questions').submit(function(e){
        e.preventDefault();
        $.ajax({url: '/Gmail', type: 'post', data: $(this).serialize()});
        $(this).html("Thank you for your question! We will answer your question promptly. In the meantime, check out other answers.");
    });
});