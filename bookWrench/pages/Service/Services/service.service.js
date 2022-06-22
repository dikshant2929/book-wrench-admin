import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {
    static async addService(dataObject, cb) {
        try {
            const data = await API.post('service', dataObject);
            showToster({ status: 'Success', msg: "service has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
    
    static async editService(dataObject, cb, params = {}, id) {
        try {
            const data = await API.put('service', dataObject, params, id);
            showToster({ status: 'Success', msg: "service has been updated successfully" });
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
    
    static async serviceList(cb) {
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

    static async departmentList(cb) {
        try {
            const data = await API.get('department');
            // showToster({ status: 'Success', msg: "Department has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 
    static async deleteService(dataObject,params = {}, id,cb) {
        try {
            const data = await API.delete('service', dataObject, params, id);
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
