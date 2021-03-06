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
} = exposedPath;

const ROUTE_PREFIX = Root;

const publicRouteConfig = [
    { name: 'home', path: Home, componentName: 'Home', exact: true },
    { name: 'login', path: Login, componentName: 'Login', exact: true },
];

const privateRouteConfig = [
    { name: 'dashboard', path: Dashboard, componentName: 'Dashboard' },
];

const asyncLoad = (component: any) => {
    switch (component) {
        case 'Home':
            return loadable(() => import(/* webpackChunkName: 'Home' */ '@pages/Home'));
        case 'Login':
            return loadable(() => import(/* webpackChunkName: 'Login' */ '@pages/Login'));
        case 'Dashboard':
            return loadable(() => import(/* webpackChunkName: 'Dashboard' */ '@pages/Dashboard'));
        ;
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
