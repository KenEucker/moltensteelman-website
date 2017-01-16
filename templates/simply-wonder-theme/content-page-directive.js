window.page.directive = {    
    '#heading': 'page-heading',
    '#top-nav > div': {
        'link<-navigation-links': {
            'a': 'link.text',
            'a@href': 'link.link'
        }
    },
    '#images-heading h4': 'images-heading',
    '.images .column': {
        'image<-images': {
            'img@src': 'image.image'
        }
    },
    '#callout h1': 'callout-title',
    '#callout p.lead': 'callout-description',
    '#callout .button1': 'callout-button1',
    '#callout .button2': 'callout-button2',
    '#description h2': 'description-title',
    '#description p': 'description',
    '#description img.main@src': 'main-image',
    '#points .point': {
        'point<-points': {
            'h3': 'point.heading',
            'p': 'point.description'
        }
    },
    '#bullets li': {
        'bullet<-bullets': {
            '.stat': 'bullet.amount',
            'span': 'bullet.name'
        }
    }
};