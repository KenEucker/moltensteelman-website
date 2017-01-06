window.page.directive = {
    '#heading': 'heading',
    '#specs h2': 'specs-title',
    '#specs p': 'specs-blurb',
    '#portfolio .gallery-item': {
        'video<-videos':{
            'a@href': 'video.url',
            'img@src': 'video.thumbnail',
        }
    },
    '#mentions  div.column': {
        'mention<-mentions':{
            // 'img@alt': 'mention.alt',
            // 'img@src': 'mention.img'
        }
    },
    '#team  div.column': {
        'member<-members':{
            'img@src': 'member.img',
            'h4': 'member.name',
            'p': 'member.blurb',
            '.email@href': 'member.email',
            //'.facebook@href': 'member.facebook',
            // '.twitter@href': 'member.twitter',
            //'.linkedin@href': 'member.linkedin',
            // '.pinterest@href': 'member.pinterest',
        }
    },
    '#contact':{        
        'contact<-contact':{
            'h4':'contact.company-name',
            '.address-1': 'contact.address-1',
            '.address-2': 'contact.address-2',
            '#phone': 'contact.phone',
            // '#fax': 'contact.fax',
            '#email': 'contact.email',
            //'#web': 'contact.web',
            '#facebook@href': 'contact.facebook',
            '#twitter@href': 'contact.twitter',
            '#pinterest@href': 'contact.pinterest'
        }
    },
    '#page-author-blurb': 'page-author-blurb'
    // '#page-author-link': 'page-author-link',
    // '#page-author-link-text': 'page-author-link-text'    
};