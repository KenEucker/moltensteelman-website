window.page.directive = {    
    '#heading': 'page-heading',
    '#top-nav > div': {
        'link<-navigation-links': {
            'a': 'link.text',
            'a@href': 'link.link'
        }
    },
    '.images img.big@src': 'main-image',
    '.images .column': {
        'image<-images': {
            'img@src': 'image.image'
        }
    },
    '#description h3': 'title',
    '#description > p': 'description',
    '#description h3': 'title',
    '#description label.text-field': 'text-field-text',
    '#description input@placeholder': 'text-field-placeholder',
    '#description .options option': {
        'color<-colors': {
            '.': 'color.color',
            '.@value': 'color.color'
        }
    },
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
    '#questions label': 'questions-heading',
    '#questions textarea@placeholder': 'questions-placeholder',
    '#questions button': "questions-button"
};