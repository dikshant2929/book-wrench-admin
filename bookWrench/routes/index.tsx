'use strict';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from '@app/hoc/Layout';
import NotFoundPage from '@pages/NotFound';
import loadable from '@loadable/component';
import globals from '@globals';
import exposedPath from '@ExposedPath';
const {
    Root,
    Home,
    Dashboard,
    Login,
    ForgotPassword,
    ResetPassword,
    Category,
    CategoryCreate,
    CategoryEdit,
    SubCategory,
    SubCategoryCreate,
    SubCategoryEdit,
    Department,
    DepartmentCreate,
    DepartmentEdit,

    Service,
    ServiceCreate,
    ServiceEdit,
    ServiceView,

    VendorManagement,
    VendorManagementCreate,
    VendorManagementEdit,

    

    Product,
    ProductCreate,
    ProductEdit,
    ProductView,

    Maintenance,
    MaintenanceCreate,
    MaintenanceEdit,
    MaintenanceView,


    Customer,
    CustomerCreate,
    CustomerEdit,
    

    User,
    UserCreate,
    UserEdit,
    
    
    
    EditPointOfContact,
    PointOfContact,
    EditPasswordOfUser,
    EditAddress,
    Address,
    EditMaintenance
    

} = exposedPath;

const ROUTE_PREFIX = Root;

const publicRouteConfig = [
    { name: 'home', path: Home, componentName: 'Home', exact: true },
    { name: 'login', path: Login, componentName: 'Login', exact: true },
    { name: 'forgotpassword', path: ForgotPassword, componentName: 'ForgotPassword', exact: true },
    { name: 'resetpassword', path: ResetPassword, componentName: 'ResetPassword', exact: true },
    
];

const privateRouteConfig = [
    { name: 'dashboard', path: Dashboard, componentName: 'Dashboard' },
    
    { name: 'category-edit', path: CategoryEdit, componentName: 'CategoryCreate'},
    { name: 'category-create', path: CategoryCreate, componentName: 'CategoryCreate', exact: true },
    { name: 'category', path: Category, componentName: 'Category', exact: true },

    { name: 'sub-category-edit', path: SubCategoryEdit, componentName: 'SubCategoryCreate'},
    { name: 'sub-category-create', path: SubCategoryCreate, componentName: 'SubCategoryCreate', exact: true },
    { name: 'sub-category', path: SubCategory, componentName: 'SubCategory', exact: true },

    { name: 'department-edit', path: DepartmentEdit, componentName: 'DepartmentCreate'},
    { name: 'department-create', path: DepartmentCreate, componentName: 'DepartmentCreate', exact: true },
    { name: 'department', path: Department, componentName: 'Department', exact: true },
    
    { name: 'service-edit', path: ServiceEdit, componentName: 'ServiceCreate'},
    { name: 'service-create', path: ServiceCreate, componentName: 'ServiceCreate', exact: true },
    { name: 'service-view', path: ServiceView, componentName: 'ServiceView', exact: true },
    { name: 'service', path: Service, componentName: 'Service', exact: true },

    { name: 'product-edit', path: ProductEdit, componentName: 'ProductCreate'},
    { name: 'product-create', path: ProductCreate, componentName: 'ProductCreate', exact: true },
    { name: 'product-view', path: ProductView, componentName: 'ProductView', exact: true },
    { name: 'product', path: Product, componentName: 'Product', exact: true },


    { name: 'maintenance-edit', path: MaintenanceEdit, componentName: 'MaintenanceCreate'},
    { name: 'maintenance-create', path: MaintenanceCreate, componentName: 'MaintenanceCreate', exact: true },
    { name: 'maintenance-view', path: MaintenanceView, componentName: 'MaintenanceView', exact: true },
    { name: 'maintenance', path: Maintenance, componentName: 'Maintenance', exact: true },

    { name: 'point-of-contact', path: EditPointOfContact, componentName: 'PointOfContact'},
    { name: 'user-password', path: EditPasswordOfUser, componentName: 'UserPassword'},
    
    { name: 'address', path: EditAddress, componentName: 'Address'},
    { name: 'customer-maintenance', path: EditMaintenance, componentName: 'MaintenanceCustomer'},
    
    { name: 'customer-edit', path: CustomerEdit, componentName: 'CustomerCreate'},
    { name: 'customer-create', path: CustomerCreate, componentName: 'CustomerCreate', exact: true },
    { name: 'customer', path: Customer, componentName: 'Customer', exact: true },
    


    { name: 'user-edit', path: UserEdit, componentName: 'UserCreate'},
    { name: 'user-create', path: UserCreate, componentName: 'UserCreate', exact: true },
    { name: 'user', path: User, componentName: 'User', exact: true },

    { name: 'vendor-management-edit', path: VendorManagementEdit, componentName: 'VendorManagementCreate'},
    { name: 'vendor-management-create', path: VendorManagementCreate, componentName: 'VendorManagementCreate', exact: true },
    { name: 'vendor-management', path: VendorManagement, componentName: 'VendorManagement', exact: true },
];

const asyncLoad = (component: any) => {
    switch (component) {
        case 'Home':
            return loadable(() => import(/* webpackChunkName: 'Home' */ '@pages/Home'));
        case 'Login':
            return loadable(() => import(/* webpackChunkName: 'Login' */ '@pages/Login'));
        case 'Dashboard':
            return loadable(() => import(/* webpackChunkName: 'Dashboard' */ '@pages/Dashboard'));
        case 'ForgotPassword':
            return loadable(() => import(/* webpackChunkName: 'ForgotPassword' */ '@pages/ForgotPassword'));
        case 'ResetPassword':
            return loadable(() => import(/* webpackChunkName: 'ResetPassword' */ '@pages/ResetPassword'));
        case 'Category':
            return loadable(() => import(/* webpackChunkName: 'Category' */ '@pages/Category'));
        case 'CategoryCreate':
            return loadable(() => import(/* webpackChunkName: 'AddEditCategory' */ '@pages/Category/AddEditCategory'));
        case 'SubCategory':
            return loadable(() => import(/* webpackChunkName: 'SubCategory' */ '@pages/SubCategory'));
        case 'SubCategoryCreate':
                return loadable(() => import(/* webpackChunkName: 'AddEditSubCategory' */ '@pages/SubCategory/AddEditSubCategory'));
        case 'Department':
            return loadable(() => import(/* webpackChunkName: 'Department' */ '@pages/Department'));
        case 'DepartmentCreate':
            return loadable(() => import(/* webpackChunkName: 'AddEditDepartment' */ '@pages/Department/AddEditDepartment'));
        case 'Service':
            return loadable(() => import(/* webpackChunkName: 'Service' */ '@pages/Service'));
        case 'ServiceCreate':
            return loadable(() => import(/* webpackChunkName: 'AddEditService' */ '@pages/Service/AddEditService'));
        case 'ServiceView':
            return loadable(() => import(/* webpackChunkName: 'ServiceView' */ '@pages/Service/ViewService'));
        case 'Product':
            return loadable(() => import(/* webpackChunkName: 'Product' */ '@pages/Product'));
        case 'ProductCreate':
            return loadable(() => import(/* webpackChunkName: 'AddEditProduct' */ '@pages/Product/AddEditProduct'));
        case 'ProductView':
            return loadable(() => import(/* webpackChunkName: 'ProductView' */ '@pages/Product/ViewProduct'));

        case 'Maintenance':
            return loadable(() => import(/* webpackChunkName: 'Maintenance' */ '@pages/Maintenance'));
        case 'MaintenanceCreate':
            return loadable(() => import(/* webpackChunkName: 'AddEditMaintenance' */ '@pages/Maintenance/AddEditMaintenance'));
        case 'MaintenanceView':
            return loadable(() => import(/* webpackChunkName: 'MaintenanceView' */ '@pages/Maintenance/ViewMaintenance'));
        case 'Customer':
            return loadable(() => import(/* webpackChunkName: 'Customer' */ '@pages/Customer'));
        case 'CustomerCreate':
            return loadable(() => import(/* webpackChunkName: 'AddEditCustomer' */ '@pages/Customer/AddEditCustomer'));
        case 'User':
            return loadable(() => import(/* webpackChunkName: 'User' */ '@pages/User'));
        case 'UserCreate':
            return loadable(() => import(/* webpackChunkName: 'AddEditUser' */ '@pages/User/AddEditUser'));
            case 'VendorManagement':
            return loadable(() => import(/* webpackChunkName: 'VendorManagement' */ '@pages/VendorManagement'));
        case 'VendorManagementCreate':
            return loadable(() => import(/* webpackChunkName: 'AddEditVendorManagement' */ '@pages/VendorManagement/AddEditVendorManagement'));
        case 'PointOfContact':
            return loadable(() => import(/* webpackChunkName: 'PointOfContactList' */ '@pages/Customer/sub-module/point-of-contact'));
        case 'UserPassword':
            return loadable(() => import(/* webpackChunkName: 'UserPassword' */ '@pages/User/sub-module/user-password'));
        case 'MaintenanceCustomer':
                return loadable(() => import(/* webpackChunkName: 'MaintenanceCustomer' */ '@pages/Customer/sub-module/maintenance'));
        case 'Address':
            return loadable(() => import(/* webpackChunkName: 'Address' */ '@pages/Customer/sub-module/address'));

            
    }
};

const configureComponent = (routesConfig: any) => {
    return (
        routesConfig &&
        routesConfig.map((item: any) => {
            item.component = asyncLoad(item.componentName);
            return item;
        })
    );
};

const appAuth = {
    isAuthenticated: false,
    authenticate(cb: any) {
        globals.setCookie('isauth', 1, 1, true);
        appAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: any) {
        globals.setCookie('isauth', '', -1);
        // console.log("signout")
        appAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    },
    isUserAuthenticated() {
        appAuth.isAuthenticated = globals.getCookie('isauth') ? true : false;

        // console.log("Is Auth from cookie", globals.getCookie('isauth') ? true : false);
        // console.log('IsAuth', appAuth.isAuthenticated);
        // return true;
        return appAuth.isAuthenticated;
        // return storage.isUserAvailable() ? true : false;
    },
};

const routes = () => (
    <Layout auth={appAuth}>
        <Switch>
            <Redirect from="/login" to="/" />
            {configureComponent(publicRouteConfig).map((item: any, index: number) => (
                <Route
                    key={index}
                    path={item.path}
                    exact={item.exact}
                    component={(props: any) => <item.component auth={appAuth} {...props} />}
                />
            ))}
            ;{/* Redirect to Home page if not authenticated */}
            {appAuth.isUserAuthenticated() === false && <Redirect to="/" />}
            {/* {configureComponent(adminRouteConfig).map((item, index) =>
                <Route key={index} path={ADMIN_PREFIX.concat(item.path)} exact component={(props) => <AdminController {...props}><item.component auth={appAuth} {...props}/></AdminController>} />
            )}; */}
            {configureComponent(privateRouteConfig).map((item: any, index: number) => (
                <Route
                    key={index}
                    path={item.path}
                    exact={item.exact}
                    component={(props: any) => <item.component auth={appAuth} {...props} />}
                />
            ))}
            ;{/* <Layout> */}
            {/* {configureComponent(adminRouteConfig).map((item, index) =>
                    <PrivateRoute key={index} path={ADMIN_PREFIX.concat(item.path)} exact component={(props) => <AdminController {...props}><item.component auth={appAuth} {...props}/></AdminController>} />
                )}; */}
            {/* {configureComponent(privateRouteConfig).map((item, index) =>
                    <PrivateRoute key={index} path={item.path} exact={item.exact} component={(props) => <item.component auth={appAuth} {...props}/>} />
                )}; */}
            {/* </Layout> */}
            {/* If Page path is not exist */}
            <Route path="*">
                <NotFoundPage />
                {/* <Redirect to="/" /> */}
            </Route>
        </Switch>
    </Layout>
);

// const PrivateRoute = ({ children, component: Component, ...rest }) => {
//     console.log(...rest)
//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 appAuth.isAuthenticated === true
//                     ? <Component {...props} />
//                     :  <Component {...props} /> //<Redirect to= '/' />
//             }
//         />
//     );
// }

function addRouteLevelPrefix(path: any) {
    return ROUTE_PREFIX.concat(path);
}

export default routes;
