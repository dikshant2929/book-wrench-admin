import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {
    static async addVendorManagement(dataObject, cb) {
        try {
            const data = await API.post('vendor', dataObject);
            showToster({ status: 'Success', msg: "Vendor has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
    
    static async editVendorManagement(dataObject, cb, params = {}, id) {
        try {
            const data = await API.put('vendor', dataObject, params, id);
            showToster({ status: 'Success', msg: "Vendor has been updated successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async VendorManagementList(cb) {
        try {
            const data = await API.get('vendor');
            // showToster({ status: 'Success', msg: "Department has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
    static async deleteVendorManagement(dataObject,params = {}, id,cb) {
        try {
            const data = await API.delete('vendor', dataObject, params, id);
            //showToster({ status: 'Success', msg: "Department has been updated successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
           // showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 
}
