import { configs } from '@configs';
import detect from '@common-utils/detect';

const globals = {
    getCookie(cname, cookiesFrmServer) {
        try {
            var name = cname + '=';
            var cookies = [];

            if (cookiesFrmServer != null && cookiesFrmServer !== undefined && cookiesFrmServer.length > 0) {
                cookies = cookiesFrmServer.split('; ');
            } else if (typeof document != 'undefined') {
                cookies = document.cookie.split('; ');
            }
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = decodeURIComponent(parts.shift());
                var cookie = parts.join('=');

                if (cname && cname === name) {
                    if (cookie.indexOf('"') === 0)
                        // This is a quoted cookie as according to RFC2068, unescape...
                        cookie = cookie.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                    try {
                        var pluses = /\+/g;
                        // Replace server-side written pluses with spaces.
                        // If we can't decode the cookie, ignore it, it's unusable.
                        // If we can't parse the cookie, ignore it, it's unusable.
                        cookie = decodeURIComponent(cookie.replace(pluses, ' '));
                        cookie =
                            typeof JSON.parse(cookie) === 'object' && !Array.isArray(JSON.parse(cookie))
                                ? JSON.parse(cookie)
                                : cookie;
                        return cookie;
                    } catch (e) {
                        return cookie;
                    }
                }

                // Prevent storing a cookie that we couldn't decode.
                // if (!cname && (cookie = this.parseCookieValue(cookie)) !== undefined)
                //     result[name] = cookie;
            }
        } catch (e) {
            console.log('ERR: Globals.getcookie: ', e.toString());
        }
        return '';
    },

    setCookie: function (cname, cvalue, exdays, sessionCookieFlag, encodeFlag, sameSite = 'Lax') {
        //to remove cookie, cvalue="",exdays=-1
        if (cname !== undefined && cvalue !== undefined && typeof cvalue !== 'function') {
            if (typeof cvalue === 'object') cvalue = JSON.stringify(cvalue);
            // cname = encodeURIComponent(cname); cvalue = encodeURIComponent(cvalue);
            // globals.removeDomainCookie(cname); //Check if cookie have 2 occurences

            var domain = globals.getCookieDomain();
            var d = new Date();
            d.setTime(d.getTime() + (exdays || 30) * 24 * 60 * 60 * 1000);
            var expires = 'expires=' + d.toUTCString();

            document.cookie = `${cname}=${encodeFlag ? encodeURIComponent(cvalue) : cvalue};${
                configs.env != 'production' ? '' : 'secure;'
            }${sessionCookieFlag ? '' : `${expires};`}${domain ? `domain=${domain};` : ''}path=/;SameSite=${sameSite};`;
        }
    },

    getCookieDomain() {
        // return configs?.cookieDomain || false;
        return false;
    },

    isEmptyObject(obj) {
        try {
            if (typeof obj === 'undefined' || obj == null || Object.keys(obj).length == 0) {
                if (typeof obj == 'Array' && obj.length > 0) {
                    return false;
                }
                return true;
            }
            return false;
        } catch (e) {
            return true;
        }
    },

    cloneObject(obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || 'object' != typeof obj) return obj;

        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.cloneObject(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneObject(obj[attr]);
            }
            return copy;
        }
        return obj;
    },

    scrollIntoView(el, desktopFlag) {
        // console.log(el)
        if (!detect.isDesktop()) {
            setTimeout(function () {
                el.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }, 1000);
        }
        if (desktopFlag) {
            el.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    },
};

export default globals;
