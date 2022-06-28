import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {

   
    static async productList(parameters = {}, cb) {
        try {
            const data = await API.get('products',parameters,);
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

}