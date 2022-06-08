import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {
    static async addDepartment(dataObject, cb) {
        try {
            const data = await API.post('department', dataObject);
            showToster({ status: 'Success', msg: "Department has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
    
    static async editDepartment(dataObject, cb, params = {}, id) {
        try {
            const data = await API.put('department', dataObject, params, id);
            showToster({ status: 'Success', msg: "Department has been updated successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async DepartmentList(cb) {
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
}
