$(document).ready(function() {
    // Paypal translate html form
    var paypalFormTable = $('form[action="https://www.paypal.com/cgi-bin/webscr"] table'), 
        paypalFormSubmitButton = $('form[action="https://www.paypal.com/cgi-bin/webscr"] input[name="submit"]');

        if(paypalFormTable.length) {
            var 
            paymentPrice = $('#description .price'),
            paypalPriceSelector = $('select[name="os0"]'),
            paypalPriceSelectorCurrentValue = paypalPriceSelector.find('option:selected').text(),
            papalPriceCurrentPrice = paypalPriceSelectorCurrentValue.substr(paypalPriceSelectorCurrentValue.indexOf('$') - 1);

            paypalFormTable.replaceWith(paypalFormTable.html().replace('<tr><td>','').replace('</td></tr>','').replace('<tbody>','').replace('</tbody>',''));
            paypalFormSubmitButton.addClass('button').addClass('large').addClass('expanded').attr('src','').attr('type','submit').attr('value','Place Order');
            paymentPrice.html(papalPriceCurrentPrice);
            $(document).on('change', 'select[name="os0"]', function(e){
                var option = this.options[e.target.selectedIndex].text;
                paymentPrice.html(option.substr(option.indexOf('$') - 1));
            });
        }
    
    $('i.icon-youtube').hide();

    if($('.big .video').html().length) {
        $('.big img')[0].src = "";
    }

    $('i.icon-youtube').click(function(){
        $('.big img')[0].src = "";
        $('.big .video').show();     
        $(this).hide();
    });

    $('.images img.thumb').click(function(){
        $('.big img')[0].src = this.src;

        if($('.big .video').html().length) {
            $('.big .video').hide();     
            $('i.icon-youtube').show();
        }
    });
    $('#questions').submit(function(e){
        e.preventDefault();
        $.ajax({url: '/Gmail', type: 'post', data: $(this).serialize()});
        $(this).html("Thank you for your question! We will answer your question promptly. In the meantime, check out other answers.");
    });
});