window.page.directive = {    
    '#heading': 'page-heading',
    '#top-nav > li': {
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
    '#description label': 'text-field-text',
    '#description input@placeholder': 'text-field-placeholder',
    '#description .options > select': {
        'color<-colors': {
            'option': 'color.color',
            'option@value': 'color.color'
        }
    }
};