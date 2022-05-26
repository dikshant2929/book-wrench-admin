'use strict';

import React, { useEffect } from 'react';
import menuicon from '../../assets/menu.svg';
import LoginIcon from '../../assets/myaccount.svg';
import { GoogleLogout } from 'react-google-login';
import exposedPath from '@ExposedPath';
const { Home } = exposedPath;
import { GOOGLE_CLIENT_ID } from './utils';
import storage from '@storage';

export default function Header(props: any) {
    const {name : userName = null} = storage?.getUserInfo()?.config?.data ? JSON.parse(storage?.getUserInfo()?.config?.data) : {};
    const { auth, isLoggedIn } = props;

    const logout = () => {
        auth.signout(() => {
            window.location.replace(Home);
        });
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        !window.logout && (window.logout = logout);
    }, []);
    return (
        <>
            <header className="header top-0 left-0 w-full z-10 fixed bg-white h-15 shadow-md">
                <div className="flex h-14 items-center px-5">
                    <div className="w-6 cursor-pointer mr-3">
                        <img src={menuicon} alt="" />
                    </div>
                    <div className="text-lg">NCT</div>
                    {/* <GoogleLogout
                        className="cursor-pointer mr-0 ml-auto"
                        clientId={GOOGLE_CLIENT_ID}
                        onLogoutSuccess={logout}
                        render={(renderProps: any) => (
                            <a
                                onClick={renderProps.onClick}
                                // disabled={renderProps.disabled }
                                className="cursor-pointer mr-0 ml-auto"
                                title="Logout"
                            >
                                <img className="inline-block mr-1" src={LoginIcon} />
                                {isLoggedIn ? 'Logout' : 'Login'}
                            </a>
                        )}
                    ></GoogleLogout> */}
                    <div className="ml-auto">
                <div className="relative group">
                    <div className="h-16 py-3 relative ">
                        <div className="flex items-center mt-1">
                            <span className="w-8 h-8 flex-none rounded-full bg-gray-200 mr-4 inline-flex items-center justify-center text-black">{userName?.[0]?.toUpperCase() || "U"}</span>
                            <span>{userName || "User"}</span>
                            <i><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg></i>
                        </div>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer absolute top-5 right-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => onUserMenuClick()}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg> */}
                    </div>
                    <ul className={`absolute w-44 -bottom-15 right-0 bg-white shadow-sprade rounded-lg triangle-top hidden group-hover:block`}>
                        <li>
                        <GoogleLogout
                            className="cursor-pointer mr-0 ml-auto"
                            clientId={GOOGLE_CLIENT_ID}
                            onLogoutSuccess={logout}
                            render={(renderProps: any) => (
                                <a
                                    onClick={renderProps.onClick}
                                    // disabled={renderProps.disabled }
                                    className="cursor-pointer mr-0 ml-auto block py-3 px-5 text-sm"
                                    title="Logout"
                                >
                                    <img className="inline-block mr-1" src={LoginIcon} />
                                    {isLoggedIn ? 'Logout' : 'Login'}
                                </a>
                            )}
                        ></GoogleLogout>
                        </li>
                    </ul>
                </div>
            </div>
                </div>
            </header>
        </>
    );
}
