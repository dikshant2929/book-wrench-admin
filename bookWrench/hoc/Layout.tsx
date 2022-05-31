'use strict';

import React, { useEffect, useState } from 'react';
import Header from '@widgets/Header';
import SideMenu from '@widgets/SideMenu';
import Popup from '@common/elements/Popup';
import ToastNotification from '@common/elements/ToastNotification/new_index';

export default function Layout(props: any) {
    const { auth } = props;
    const [isLoggedIn, setIsLoogedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsLoogedIn((auth && auth.isUserAuthenticated()) || false);
    }, [props]);

    // useEffect(() => {
    //     console.log('isLoggedIn : '+isLoggedIn);
    // }, [isLoggedIn]);

    const isAuthenticated = auth && auth.isUserAuthenticated();
    return (
        <div className="app-container Main">
            {isAuthenticated && (
                <>
                    <Header isLoggedIn={isLoggedIn} auth={auth} />
                    {/* <SideMenu isLoggedIn={isLoggedIn} auth={auth}/> */}
                </>
            )}
            <div className="app-content font-inter">
                <div className="max-w-full">{props.children}</div>
            </div>
            <Popup />
            <ToastNotification />
        </div>
    );
}
