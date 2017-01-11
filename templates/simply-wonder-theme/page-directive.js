window.page.directive = {
    '#heading': 'heading',
    '.slides section': {
        'splash<-splashes':{
            '#heading':'splash.heading',
            'img.delay1':'splash.img1',
            'img.delay2':'splash.img2',
            'img.delay3':'splash.img3'
        }
    },
    '#about-title': 'about-title',
    '#about-link': 'about-title',
    '#about-blurb .original > h3': 'about-blurb-heading',
    '#about-blurb .original > p': 'about-blurb',
    '#portfolio-link': 'portfolio-heading',
    '#portfolio .section-title': 'portfolio-heading',
    '#portfolio .gallery-item': {
        'video<-videos':{
            'a@href': 'video.url',
            'img@src': 'video.thumbnail',
            'h4': 'video.title',
            'p > i': 'video.subtitle'
        }
    },
    '#mentions .section-title': 'Mentioned In',
    '#mentions  div.column': {
        'mention<-mentions':{
            'img@alt': 'mention.alt',
            'img@src': 'mention.img'
        }
    },
    '#team  div.rows': {
        'member<-members':{
            '.our-team-img img@src': 'member.img',
            'h6': 'member.name',
            'p': 'member.blurb',
            '.email@href': 'member.email',
            '.facebook@href': 'member.facebook',
            // '.twitter@href': 'member.twitter',
            '.linkedin@href': 'member.linkedin',
            // '.pinterest@href': 'member.pinterest',
        }
    },
    "#events .event": {
        'event<-events': {
            '.img@src': 'event.image',
            '.date-bubble@title': 'event.date',
            '.month': 'event.month',
            '.day': 'event.day',
            '.link a': 'event.link-text',
            '.link a@href': 'event.link',
            '.map span': 'event.where',
            '.date span': 'event.when',
            '.description span': 'event.description'
        } 
    },
    '#contact':{        
        'contact<-contact': {
            'p > b':'contact.company-name',
            '#address-1': 'contact.address-1',
            '#address-2': 'contact.address-2',
            '#phone': 'contact.phone',
            // '#fax': 'contact.fax',
            '#email': 'contact.email',
            '#web': 'contact.web',
            '#facebook@href': 'contact.facebook',
            '#twitter@href': 'contact.twitter',
            '#pinterest@href': 'contact.pinterest'
        }
    }    
};