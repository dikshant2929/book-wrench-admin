let cfg: any;
import dynamicConfig from '@dynamicConfig';
cfg = { ...dynamicConfig };
//await import (`./config-${configs}.js`);

// import (`./config-${configs}.js`).then(data => {
// 	cfg = {...cfg, ...data.default}

// 	console.log(cfg);
// });

const baseConfig = {
    cachingServer: 'localhost',
    cachePort: '11211',
    cacheStoreTime: 120,
    isCachingEnabled: false,
    cookieDomain: '.cardekho.com',
    logoImage: 'CarDekho-Logo.svg',
    //logoImage:"CarDekho-Holi-Logo.png",
    twitterID: '@CarDekho',
    metaData: {
        themeColor: '#24272c',
        dnsPrefetch: [
            //'https://www.googletagservices.com/tag/js/gpt.js'
            //'//staticcont.cardekho.com',
            //'//www.cardekho.com',
            //'//stimg.cardekho.com',
            //'//stimg2.cardekho.com',
            //'//img1.gaadicdn.com',
            //'//img2.gaadicdn.com'
        ],
        preconnect: [
            'https://staticcont.cardekho.com',
            'https://stimg.cardekho.com',
            'https://connect.facebook.net',
            'https://www.googletagmanager.com',
            'https://www.google-analytics.com',
            'https://www.googletagservices.com',
            'https://api.connecto.io',
        ],
        //"favIcon": "cardekho-favicon-white-16X16.ico",
        //"favIcon": "cardekho-favicon-orange-16X16.ico",
        favIcon: 'favicon/cd-favicon-48x48.ico',
        productName: 'CarDekho',
        productDomain: 'Cardekho.com',
        athIconPrefix: 'cd_logo_',
        fbAppId: '378375538857104',
        googleClientId: '257259688347-696lakst0kjrs0gjtimroqfp6223a84o.apps.googleusercontent.com',
        fbPageId: '179167414600',
        gPlusPublisher: 'https://plus.google.com/+cardekho',
        //"chromeWebstoreItem": "https://chrome.google.com/webstore/detail/nfgiomdbklbajoehfoaiijdogmlacjha",
        androidAppURL: '//com.girnarsoft.cardekho/https/www.cardekho.com',
        iphoneAppURL: '//www.cardekho.com',
        androidPackage: 'com.girnarsoft.cardekho',
        athIconDirectory: '',
        youTubeChannelId: 'UCMSjsvDuobchFSw5U1SDaqg',
        logo: 'https://img.gaadicdn.com/pwa/img/logo/CD-108x19.png',
    },
    bmv: {
        brand: {
            value: 'oem',
            text: 'oem',
            id: 'OID',
            listingSearchKey: 'OID',
        },
        model: {
            value: 'SLG',
            text: 'MSN',
            id: 'MID',
            fullName: 'MN',
        },
    },
    city: {
        value: 'CN',
        text: 'CDN',
    },
    aeIndexSlug: '/auto-expo.html',
    logoTitle: 'CarDekho.com - Best place to buy New and Used Cars in India',
    domainName: 'CarDekho',
    headerSearchPlaceholer: 'Search Cars or Brands eg. Swift, or Maruti',
    cityPopupLabel: 'Type your city, e.g. Jaipur, New Delhi',
    servewebp: true,
    preCache: true,
    subCities: ['105', '280', '338', '201', '49', '1650'],
    googleMapApiKey: 'AIzaSyBVuk3CLChQ3EJhJ6uv9hOjY4VwVp4T2rI',
    excludeCitiName: ['delhi', 'Delhi'],
    appJsParams: '',
    leadFormJs: '',
    //customGAAccount: 'UA-3882094-36',
    appDownloadAndroid:
        'https://play.google.com/store/apps/details?id=com.girnarsoft.cardekho&referrer=utm_source=cddfp&utm_campaign=appdownloads_data',
    appDownloadiPhone:
        'https://itunes.apple.com/in/app/cardekho/id903373747?mt=8&utm_source=cd&utm_campaign=appdownloads_data',
    browserNotification: true,
    linkDefaultBehavior: true,

    otherAPIDomain: {
        gaadi: 'https://www.gaadi.com/',
        gaadiBaseUrl: 'https://webapi.gaadi.com/',
    },
    isMJSSupported: true,
};

//const env = process.env.configs || 'production';
// const bundleDir = 'bundle' + (process.env.lang ? '-' + process.env.lang : "");

// if(typeof process.env.lang != 'undefined' &&  process.env.lang != 'en')
// 	cfg = require(`./${process.env.lang}/config-${process.env.configs}`);
// else
cfg = Object.assign(baseConfig, cfg);
//Common settings for all
// cfg.bundleDir = bundleDir;

cfg.noImagePath = cfg.imgPath + 'noimage.svg';
cfg.getCitiesUrl = cfg.apiBaseUrl + 'api/v1/usedcar/mmvdata?_format=json';
//cfg.getMMVTransAPIUrl = `${cfg.apiBaseUrl}api/v1/cardekho/veractranslateddata?_format=json&lang_code=${process.env.lang}&regionId=0`;
cfg.getUsedCarFiltersUrl = cfg.apiBaseUrl + 'api/v1/home/filter?_format=json';
cfg.getUsedCarModels =
    'https://www.cardekho.com/api/v1/usedcar/landing?&cityId=&connectoid=2f8b7b7d-56a7-8a32-0913-dcd8bc5a1eec&sessionid=9580bc2e-0063-4220-8475-65ccd723109d&lang_code=en&regionId=0&otherinfo=all&CityId=&url=%2FusedCars';
cfg.getYouTubeSubscriptionCount =
    'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCMSjsvDuobchFSw5U1SDaqg&key=AIzaSyC9C226tJZmcZ-U-93xa68knj_BxwwKP0U';
cfg.getTrustedUsedCarFiltersUrl = cfg.apiBaseUrl + 'api/v1/home/tuc?cityId=49';
cfg.sessionCookieName = 'cd_session_id';
cfg.connectoWriteKey = 'Q3B1q3vQULiMC96G';
cfg.productDomain = 'Cardekho.com';
cfg.apiTimeout = 30000; // 20Sec;
cfg.termNConditionUrl = '/info/terms_and_condition';
cfg.imgPath1 = 'https://stimg.cardekho.com/';
cfg.whatsappAPIUrl = 'https://api.whatsapp.com/send?phone=91';
cfg.truecallerAPIUrl = 'truecallersdk://truesdk/web_verify?partnerName=Cardekho&title=register&skipOption=skip';
//cfg.getCommonTransAPIUrl = `${cfg.apiBaseUrl}api/v1/cardekho/commonTranslateddata?_format=json&lang_code=${process.env.lang}&regionId=0`;
//Add to HomeScreen Configs
cfg.ATH = {
    imagePath: 'cd_logo_48.png',
    title: 'Cardekho Desktop App',
    mobiTitle: 'CarDekho Homescreen App',
    description: 'Get 2x faster experience with less data consumption. Access CarDekho directly through your desktop',
    mobiDescription:
        'Get 2X faster experience with less data consumption. Access CarDekho directly from your home screen.',
    cta: 'Create Desktop Shortcut',
    mobiCta: 'Add To Homescreen',
};
//cfg.lang = process.env.lang || '';
cfg.getModelofBrand = cfg.apiBaseUrl + 'api/v1/brand/models?_format=json';

cfg.ftcimagesiteurl = 'https://stimg.cardekho.com';
cfg.nodeCacheOptions = {
    flag: false,
    key: 'url',
};

// cfg.GaadiBot = {
// 	'data-token' : "I0SFNTQ137UNKO38T4XHDZITEOVQ8QN1",
//     'src' : "https://link.makerobos.com/C8I6YI7S",
//     'id' : "makerobos_v1"
// }
export default cfg;
