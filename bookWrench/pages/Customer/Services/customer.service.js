import API from '@API';
import { showToster } from '@common/elements/ToastNotification/new_index';

export default class Services {
    static async addCustomer(dataObject, cb) {
        try {
            const data = await API.post('customer', dataObject);
            showToster({ status: 'Success', msg: "Customer has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  
    
    static async editCustomer(dataObject, cb, params = {}, id) {
        try {
            const data = await API.put('customer', dataObject, params, id);
            showToster({ status: 'Success', msg: "Customer has been updated successfully" });
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
            const data = await API.post('customer', dataObject, id + "/contact-person");
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
            const data = await API.put('customer', dataObject, {}, id + "/contact-address/" + _id);
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
            const data = await API.post('customerMaintenance', dataObject);
            showToster({ status: 'Success', msg: "maintenance has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    }  

    static async removeContactPerson(customerId, contactPersonId , cb ) {
        try {
            const data = await API.delete('customer', customerId + "/contact-person/" + contactPersonId);
            showToster({ status: 'Success', msg: "Customer has been removed successfully" });
            return cb && cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 

    static async removeAddress(customerId, addressId , cb ) {
        try {
            const data = await API.delete('customer', customerId + "/contact-address/" + addressId);
            showToster({ status: 'Success', msg: "Address has been removed successfully" });
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
            const data = await API.put('customer', dataObject, {}, id + "/contact-person/" + _id);
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

    static async maintenanceCustomerList(cb) {
        try {
            const data = await API.get('customerMaintenance');
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 


    

    static async customerList(cb, params = {}) {
        try {
            const data = await API.get('customer', params);
            // showToster({ status: 'Success', msg: "Category has been added successfully" });
            return cb(data?.data);
        } catch (error) {
            const msg = error?.response?.data?.message || 'Something went wrong shankar';
            showToster({ status: 'Error', msg: msg });
            console.log(error);
            return error;
        }
    } 
    
    static async deleteCustomer(dataObject,params = {}, id,cb) {
        try {
            const data = await API.delete('customer', dataObject, params, id);
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