import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {
    static async addUser(dataObject, cb) {
        try {
            const data = await API.post('user', dataObject);
            showToster({ status: 'Success', msg: "User has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
    
    static async editUser(dataObject, cb, params = {}, id) {
        try {
            const data = await API.put('user', dataObject, params, id);
            showToster({ status: 'Success', msg: "User has been updated successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async addContactPerson(dataObject, id , cb ) {
        try {
            const data = await API.post('user', dataObject, id + "/contact-person");
            showToster({ status: 'Success', msg: "Contact Person has been added successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async editAddress(dataObject, id,_id , cb ) {
        try {
            const data = await API.put('user', dataObject, {}, id + "/contact-address/" + _id);
            showToster({ status: 'Success', msg: "Address has been updated successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async addMaintenance(dataObject, cb) {
        try {
            const data = await API.post('userMaintenance', dataObject);
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
            const data = await API.put('userMaintenance', dataObject, params, id);
            showToster({ status: 'Success', msg: "User's maintenance has been updated successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async removeContactPerson(userId, contactPersonId , cb ) {
        try {
            const data = await API.delete('user', userId + "/contact-person/" + contactPersonId);
            showToster({ status: 'Success', msg: "User has been removed successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async removeMaintenanceList(userId , cb ) {
        try {
            const data = await API.delete('userMaintenance', userId);
            showToster({ status: 'Success', msg: "User Maintenance has been removed successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async editContactPerson(dataObject, id,_id , cb ) {
        try {
            const data = await API.put('user', dataObject, {}, id + "/contact-person/" + _id);
            showToster({ status: 'Success', msg: "Contact Person has been updated successfully" });
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

    static async maintenanceUserList(cb) {
        try {
            const data = await API.get('userMaintenance');
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 


    

    static async userList(cb, params = {}) {
        try {
            const data = await API.get('user', params);
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 
    
    static async deleteUser(dataObject,params = {}, id,cb) {
        try {
            const data = await API.delete('user', dataObject, params, id);
           // showToster({ status: 'Success', msg: "Category has been updated successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
           // showToster({ status: 'Error', msg: msg });
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
}
// 