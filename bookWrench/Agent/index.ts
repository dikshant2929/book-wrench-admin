import axios from 'axios';
import { confAPI, configs } from '@configs';

const _headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Request-Source': 'WEB',
};
const conf_api: any = confAPI;
const instance = axios.create({
    baseURL: configs.baseUrl,
    // withCredentials: true,
    headers: {
        ..._headers,
    },
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // whatever you want to do with the error
        if (error?.response) {
            const { status, data } = error.response;
            const url = error?.response?.config?.url || '';
            const loginUrl = 'bookWrench/sociallogin';
            if (url !== loginUrl && status === 401) {
                console.error(data);
                try {
                    //@ts-ignore
                    cookies?.remove?.('isauth');
                    //@ts-ignore
                    cookies?.remove?.('X-Authorization');
                } catch (error) {
                    console.error(error);
                } finally {
                    //@ts-ignore
                    window?.logout?.();
                }
            }
        }
        //(error?.response?.status && error?.response?.status === 401) && window.location.replace('/');
        throw error;
    },
);

const API = {
    get: (key: any, parameters = {}, id = '', headers = {}) => {
        // console.log(conf_api[key].url);

        // const tokenHeader = {
        //     'Cookie' : `Cookie_2=value; X-Authorization=${storage.getToken()||''}`
        // }
        return instance({
            method: 'GET',
            url: conf_api[key].url.concat(id),
            params: parameters,
            headers: { ..._headers, ...headers },
        });
        // return new Promise((resolve,reject) => {
        //         console.log(data)
        //         resolve({data:data[key]})
        // })
    },

    post: (key: any, data: any, id = '', headers = {}) => {
        // console.log(conf_api[key].url);
        // const tokenHeader = {
        //     'Cookie' : `Cookie_2=value; X-Authorization=${storage.getToken()||''}`
        // }
        return instance({
            method: 'POST',
            url: conf_api[key].url.concat(id),
            data: data,
            headers: { ..._headers, ...headers },
            // withCredentials: true,
        });
    },

    upload : (key: any, formData: any, id = '') => {
        // console.log(conf_api[key].url);
        // const tokenHeader = {
        //     'Cookie' : `Cookie_2=value; X-Authorization=${storage.getToken()||''}`
        // }
        const config = {
            headers: {
                ..._headers,
                'content-type': 'multipart/form-data'
            }
        };
        return instance.post(
            conf_api[key].url.concat(id),
            formData,
            config
        );
    },

    put: (key: any, data: any, parameters = {}, id = '', headers = {}) => {
        console.log(conf_api[key].url);
        // const tokenHeader = {
        //     'Cookie' : `Cookie_2=value; X-Authorization=${storage.getToken()||''}`
        // }

        return instance({
            method: 'PUT',
            url: conf_api[key].url.concat(id),
            data: data,
            params: parameters,
            headers: { ..._headers, ...headers },
        });
    },
};

export default API;
