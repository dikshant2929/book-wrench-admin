import encrypt from './encrypt';
import { USER_INFO, USER_APP_SETTINGS, DEFAULT_PROPERTIES, USER_ROLE } from './constant';

//Store Settings
const storeOption: any = typeof window != 'undefined' ? window.localStorage : {};

//Setters
const setData = (key: any, value: any) => {
    let valueConversion = typeof value === 'object' ? JSON.stringify(value) : value;
    valueConversion = encrypt.encode(valueConversion);
    storeOption.setItem(key, valueConversion);
};

//Getters
const getData = (key: any) => {
    let data = storeOption.getItem(key);
    try {
        if (data) {
            data = encrypt.decode(data);
            data = JSON.parse(data);
        }
    } catch (error) {
        console.log(error);
    } finally {
        return data;
    }
};

const removeData = (key: any) => storeOption.removeItem(key);

const storage = {
    //User Info
    setUserInfo(data: any) {
        setData(USER_INFO, data);
    },

    getUserInfo() {
        return getData(USER_INFO);
    },

    getToken() {
        const userInfo = this.getUserInfo();
        if (!userInfo) {
            return null;
        }
        return JSON.parse(userInfo.config.data).idToken;
    },
    //User Role Info
    setUserRoleInfo(data: any) {
        setData(USER_ROLE, data);
    },

    getUserRoleInfo() {
        return getData(USER_ROLE);
    },

    getJWTToken() {
        const userData = getData(USER_APP_SETTINGS);
        return userData?.user?.oneView?.jwtToken;
    },

    isUserAvailable() {
        try {
            const userInfo = this.getUserInfo();
            if (!userInfo) {
                return false;
            }
            const key = '_id';
            return key in userInfo && userInfo[key] !== null && userInfo[key] !== undefined;
        } catch {
            return false;
        }
    },

    isAdmin() {
        const userInfo = this.getUserInfo();
        return !Boolean(userInfo?.isStaff);
    },

    removeUserInfo() {
        removeData(USER_INFO);
    },

    //App Settings
    setUserAppSetting(data: any) {
        setData(USER_APP_SETTINGS, data);
    },

    getUserAppSetting() {
        return getData(USER_APP_SETTINGS);
    },

    getProjectIdOfLoginInUser() {
        const appSetting = getData(USER_APP_SETTINGS);
        return appSetting?.runningAsUser?.projectId;
    },

    getWriteKey() {
        const appSetting = getData(USER_APP_SETTINGS);
        return appSetting?.projects?.[0]?.writeKey;
    },
    setPropertyInfo(data: any) {
        setData(DEFAULT_PROPERTIES, data);
    },

    getPropertyInfo() {
        return getData(DEFAULT_PROPERTIES);
    },
    getPropertyId(platForm: any) {
        const properties = getData(DEFAULT_PROPERTIES)?.value;
        return properties.filter((i: any) => i.type == platForm)?.[0]?.propertyId;
    },
};

export default storage;
