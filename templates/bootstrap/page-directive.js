window.page.directive = {
    '#heading': 'heading',
    '#specs h2': 'specs-title',
    '#specs p': 'specs-blurb',
    '#portfolio .gallery-item': {
        'video<-videos':{
            'iframe@src': 'video.url',
            'iframe@title': 'video.title',
        }
    },
    // '#mentions  div.column': {
    //     'mention<-mentions':{
    //         // 'img@alt': 'mention.alt',
    //         // 'img@src': 'mention.img'
    //     }
    // },
    '#services  div.service-item': {
        'service<-services':{
            'span': 'service.image',
            'h4 > strong': 'service.name',
            'p': 'service.text',
            'a@href': 'service.link',
            'a': 'service.link-text'
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
    '#callout h1': 'about-blurb-heading',
    '#callout p': 'about-blurb',
    '#callout-image': 'about-image',
    '#page-author-blurb': 'page-author-blurb'
    // '#page-author-link': 'page-author-link',
    // '#page-author-link-text': 'page-author-link-text'    
};