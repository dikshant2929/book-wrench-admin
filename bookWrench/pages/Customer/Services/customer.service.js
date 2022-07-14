import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {
    static async addMaintenance(dataObject, cb) {
        try {
            const data = await API.post('maintenance', dataObject);
            showToster({ status: 'Success', msg: "maintenance has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
    
    static async editMaintenance(dataObject, cb, params = {}, id) {
        try {
            const data = await API.put('maintenance', dataObject, params, id);
            showToster({ status: 'Success', msg: "maintenance has been updated successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async categoryList(cb) {
        try {
            const data = await API.get('category');
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 
    
    static async maintenanceList(cb) {
        try {
            const data = await API.get('maintenance');
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async subCategoryList(parameters = {}, cb) {
        try {
            const data = await API.get('subCategory',parameters);
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 
    
    static async productList(cb) {
        try {
            const data = await API.get('products');
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }
    
    static async servicesList(cb) {
        try {
            const data = await API.get('service');
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }

    

    static async deleteMaintenance(dataObject,params = {}, id,cb) {
        try {
            const data = await API.delete('maintenance', dataObject, params, id);
           // showToster({ status: 'Success', msg: "Category has been updated successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
           // showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
}
