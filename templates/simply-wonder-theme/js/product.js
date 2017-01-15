$(document).ready(function() {
    $('.images img.thumb').click(function(){
        $('img.big')[0].src = this.src;
    });
});