import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {
    static async doLogin(dataObject, cb) {
        try {
            const data = await API.post('login', dataObject);
            const msg = data?.data?.responseMessage || data?.data?.message || 'Something went wrong';
            showToster({ status: 'Success', msg: msg });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }    
}
