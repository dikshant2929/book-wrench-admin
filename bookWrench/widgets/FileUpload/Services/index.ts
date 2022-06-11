import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {

    static async uploadInventoryFileValidation(key: string, formData: FormData, cb: (arg: any) => any, errorCallback: (arg: any) => any) {
        try {
            const data = await API.upload(key, formData);
            return cb(data?.data?.data);
        } catch (error: any) {
            const msg = error?.response?.data?.errorResult?.error ||  error?.response?.data?.error || 'Something went wrong';
            showToster({ status: 'Error', msg });
            errorCallback(msg);
            return error;
        }
    }

    static async createInventoryFromFile(key: string, formData: FormData, cb: (arg: any) => any, errorCallback: (arg: any) => any) {
        try {
            const data = await API.upload(key, formData);
            return cb(data.data);
        } catch (error: any) {
            const msg = error?.response?.data?.errorResult?.error ||  error?.response?.data?.error || 'Something went wrong';
            showToster({ status: 'Error', msg });
            errorCallback(msg);
            return error;
        }
    }

}