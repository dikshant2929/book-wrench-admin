import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {

    static async removefile(key:string,filename:any, cb: (arg: any) => any, errorCallback: (arg: any) => any) {
        try {
            const data = await API.delete(key,filename);
            return cb(data?.data?.data);
        } catch (error: any) {
            const msg = error?.response?.data?.errorResult?.error ||  error?.response?.data?.error || 'Something went wrong';
            showToster({ status: 'Error', msg });
            errorCallback(msg);
            return error;
        }
    }
}