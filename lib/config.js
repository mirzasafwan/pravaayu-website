
// var ENVIRONMENT = 'production';
let ENVIRONMENT = process.env.NODE_ENV;
// console.log('Website IS IN--"' + process.env.NODE_ENV + '" ENVIRONMENT');
var config = {};
var initialise = function (ENVIRONMENT) {
    switch (ENVIRONMENT) {
        case 'production': {
            config = {
                BASE_URL:'https://www.bookeventz.com/',
                SCRIPT_BASE:'https://www.bookeventz.com/',
                BOOK_EVENTZ_API :'https://api.bookeventz.com/',
                IMG_BASE :'https://media.bookeventz.com/html/bookeventz.com/',
                IMG_SHORT_BASE :'//media.bookeventz.com/',
                WEBSITE_BASE :'https://www.bookeventz.com/'
            };
            break;

        }
        case 'development': {
            config = {
                BASE_URL:'http://localhost:8000/',
                SCRIPT_BASE:'http://localhost:8000/',
                BOOK_EVENTZ_API :'https://apitest.bookeventz.com/',
                IMG_BASE :'//media.bookeventz.com/html/bookeventz.com/',
                IMG_SHORT_BASE :'//media.bookeventz.com/',
                WEBSITE_BASE :'https://staging.bookeventz.com/'
            };
            break;

        }
        case 'local': {
            config = {
                BASE_URL:'https://ssr.bookeventz.com/',
                SCRIPT_BASE:'https://ssr.bookeventz.com/',
                BOOK_EVENTZ_API :'https://api.bookeventz.com/',
                IMG_BASE :'//media.bookeventz.com/html/bookeventz.com/',
                IMG_SHORT_BASE :'//media.bookeventz.com/',
                WEBSITE_BASE :'https://www.bookeventz.com/'
            };
            break;
        }
        default :
            config = {
                BASE_URL:'http://www.bookeventz.com/',
                SCRIPT_BASE:'http://www.bookeventz.com/',
                BOOK_EVENTZ_API :'https://api.bookeventz.com/',
                IMG_BASE :'//media.bookeventz.com/html/bookeventz.com/',
                IMG_SHORT_BASE :'//media.bookeventz.com/',
                WEBSITE_BASE :'https://www.bookeventz.com/'
            };
            break;
    }
};
initialise(ENVIRONMENT);
// initialise('production');
config.GOOGLE_API_KEY = "AIzaSyALq5u7bfkZZaR6QGnWgM_ZriXO_Cpjwps";



module.exports = config;