$(document).ready(function() {
    // Paypal translate html form
    var paypalFormTable = $('form[action="https://www.paypal.com/cgi-bin/webscr"] table'), 
        paypalFormSubmitButton = $('form[action="https://www.paypal.com/cgi-bin/webscr"] input[name="submit"]'),
        replaceHtml = paypalFormTable.html().replace('<tr><td>','').replace('</td></tr>','').replace('<tbody>','').replace('</tbody>',''),
        paymentPrice = $('#description .price'),
        paypalPriceSelector = $('select[name="os0"]'),
        paypalPriceSelectorCurrentValue = paypalPriceSelector.find('option:selected').text(),
        papalPriceCurrentPrice = paypalPriceSelectorCurrentValue.substr(paypalPriceSelectorCurrentValue.indexOf('$') - 1);

        paypalFormTable.replaceWith(replaceHtml);
        paypalFormSubmitButton.addClass('button').addClass('large').addClass('expanded').attr('src','').attr('type','submit').attr('value','Place Order');
        paymentPrice.html(papalPriceCurrentPrice);
        $(document).on('change', 'select[name="os0"]', function(e){
            var option = this.options[e.target.selectedIndex].text;
            paymentPrice.html(option.substr(option.indexOf('$') - 1));
        });

    
    $('.images img.thumb').click(function(){
        $('img.big')[0].src = this.src;
    });
    $('#questions').submit(function(e){
        e.preventDefault();
        $.ajax({url: '/Gmail', type: 'post', data: $(this).serialize()});
        $(this).html("Thank you for your question! We will answer your question promptly. In the meantime, check out other answers.");
    });
});