window.page.directive = {
    '#heading': 'page-heading',
    '#banner .heading': 'banner-heading',
    '#banner-link': 'banner-heading',
    '.slides section': {
        'splash<-splashes':{
            '.heading':'splash.heading',
            'a@href': 'splash.link',
            'img@src':'splash.img1'
        }
    },
    '#portfolio-link': 'portfolio-heading',
    '#portfolio .section-title': 'portfolio-heading',
    '#portfolio .section-description': 'portfolio-description',
    '#portfolio .gallery-item': {
        'video<-videos':{
            'a@href': 'video.url',
            'img@src': 'video.thumbnail',
            'h4': 'video.title',
            'p > i': 'video.subtitle'
        }
    },
    '#mentions .section-title': 'mentions-heading',
    '#mentions .section-description': 'mentions-description',
    '#mentions  div.column': {
        'mention<-mentions':{
            'img@alt': 'mention.alt',
            'img@src': 'mention.img',
            'a@href': 'mention.link'
        }
    },
    '#about .section-title': 'about-heading',
    '#about .section-description': 'about-description',
    '#about-link': 'about-heading',
    '#about-blurb .original > h3': 'about-blurb-heading',
    '#about-blurb .original > p': 'about-blurb',
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
    '#events .section-title': 'events-heading',
    '#events-link': 'events-heading',
    '#events .section-description': 'events-description',
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
    '#sitemap .column': {
        'map<-sitemap': {
            'h6': 'map.header',
            'div': {
                'link<-map.links': {
                    'a@href': 'link.link',
                    'a': 'link.text'
                }
            }
        }
    },
    '#contact h3': 'contact-heading',
    '#contact p': 'contact-blurb'
};