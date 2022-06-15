import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {
    static async subaddCategory(dataObject, cb) {
        try {
            const data = await API.post('subCategory', dataObject);
            showToster({ status: 'Success', msg: "Sub-Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
    static async subeditCategory(dataObject, cb, params = {}, id) {
        try {
            const data = await API.put('subCategory', dataObject, params, id);
            showToster({ status: 'Success', msg: "Category has been updated successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }
    
    static async subcategoryList(cb) {
        try {
            const data = await API.get('subCategory');
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
    static async categoriesList(cb) {
        try {
            const data = await API.get('category');
            // showToster({ status: 'Success', msg: "Department has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }

    static async deleteSubCategory(dataObject,params = {}, id,cb) {
        try {
            const data = await API.delete('subCategory', dataObject, params, id);
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
