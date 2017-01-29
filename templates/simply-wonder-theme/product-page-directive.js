window.page.directive = {    
    '#heading': 'page-heading',
    '#top-nav > div': {
        'link<-navigation-links': {
            'a': 'link.text',
            'a@href': 'link.link'
        }
    },
    '.big img@src': 'main-image',
    '.big .video': 'main-video',
    '.images .column': {
        'image<-images': {
            'img@src': 'image.image'
        }
    },
    '#description h3': 'title',
    '#description > p': 'description',
    '#description .cost label span': 'price-heading',
    '#description .cost .price': 'price',
    '#description label.text-field': 'text-field-text',
    '#description input@placeholder': 'text-field-placeholder',
    '#payment': 'payment-html',
    '#description .button': 'buy-button-text',
    '#links a': {
        'link<-links': {
            '.': 'link.text',
            '.@href': 'link.link'
        }
    },
    '#tabs > li.first a': 'features-heading',
    '#features h4': 'features-heading',
    '#features .review': {
        'feature<-features': {
            'h5':'feature.title',
            'p': 'feature.description',
            'img.thumbnail@src': 'feature.image'
        }
    },
    '#questions label.question-heading': 'questions-heading',
    '#questions textarea@placeholder': 'questions-placeholder',
    '#questions button': "questions-button"
};