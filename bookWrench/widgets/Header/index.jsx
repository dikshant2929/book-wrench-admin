'use strict';

import React, { useEffect, useState } from 'react';
import exposedPath from '@ExposedPath';
import storage from '@storage';
import UALink from '@common/elements/UALink';
import { Route, useLocation } from 'react-router-dom';
import './header.scss';

const { Home, Dashboard, Category, SubCategory, Department } = exposedPath;


const defaultProps = {
    menuList: [
        {
            title: 'Dashboard',
            link: Dashboard,
            isActive: false,
            tag: 'MOD_DASHBOARD',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
        },
        {
            title: 'Service Requests',
            link: Dashboard,
            isActive: false,
            tag: 'MOD_SERVICE_REQUEST',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
        },
        {
            title: 'Scheduler',
            link: Dashboard,
            isActive: false,
            tag: 'MOD_SCHEDULER',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
        },
        {
            title: 'Dispatcher',
            link: Dashboard,
            isActive: false,
            tag: 'MOD_DISPATCHER',
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        {
            title: 'Customers',
            link: Dashboard,
            isActive: false,
            tag: 'MOD_CUSTOMERS',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
        },
        {
            title: 'Settings',
            link: Dashboard,
            isActive: false,
            tag: 'MOD_OFFER',
            icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
            subMenu: [
                { title: 'Department', link: Department, icon: '', isActive: true },
                { title: 'Category', link: Category, icon: '', isActive: true },
                { title: 'Sub-Category', link: SubCategory, icon: '', isActive: false },
            ]
        },
    ]
};



Header.defaultProps = defaultProps;

export default function Header(props) {

    const [menuList, setMenuList] = useState(props.menuList);
    const [userMenuCls, setUserMenuCls] = useState('hidden');
    const [isSubMenuVisible, setSubMenuItemVisibility] = useState(false);

    const { name: userName = null } = storage?.getUserInfo()?.config?.data ? JSON.parse(storage?.getUserInfo()?.config?.data) : {};
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

    const checkIsActive = (title, menuItem) => ({ ...menuItem, isActive: title === menuItem.title });

    const onSubItem = (title, subMenuList) => subMenuList.map((menuItem) => checkIsActive(title, menuItem));

    const onMenuItemClick = (event, item) => {

        setSubMenuItemVisibility(previous => (!(item.subMenu === undefined) && !previous));

        const menus = menuList.map((menuItem) => {
            if (menuItem.subMenu && menuItem.subMenu.length > 0) {
                const title = event.target.innerText === item.title ? menuItem.subMenu[0].title : event.target.innerText;
                menuItem.subMenu = onSubItem(title, menuItem.subMenu);
            }
            return checkIsActive(item.title, menuItem);
        });
        setMenuList([...menus]);
    };

    return (
        <>
            <header className="header top-0 left-0 w-full z-10 bg-white shadow-md">
                <div className="flex flex-col md:flex-row h-[9.75rem] md:h-[4.75rem] items-center lg:px-5 justify-between ">
                    <div className="dash-logo">
                        <img className="main-header-logo" src="/bookWrench/assets/images/bookWrench_logo.svg" alt="logo" />
                    </div>
                    <div className="navbar">
                        <ul className="flex">
                            {menuList.map((item, key) => (
                                <li className={key === menuList.length - 1 ? 'group' : ''} key={key} onClick={(e) => onMenuItemClick(e, item)} >
                                    {!item.subMenu ?
                                        <UALink
                                            className={`hover:text-primary lg:py-3 md:px-5 block font-inter rounded-tr-lg rounded-br-lg ${item.isActive ? 'text-primary' : ''
                                                }`}
                                            title={item.title}
                                            to={!item.subMenu ? item.link : ''}>
                                            {item.title}
                                        </UALink> :
                                        <>
                                            <div className='relative lg:py-3 lg:px-5'>
                                                <span className="relative flex hover:text-primary cursor-pointer">
                                                    {item.title}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-px ml-1 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </span>
                                                {
                                                    <ul className='absolute w-44 top-11 right-0 bg-white shadow-sprade rounded-lg triangle-top hidden group-hover:block'>
                                                        {item.subMenu.map((item, key) => <li key={`Inner_${key}`} className="cursor-pointer mr-0 ml-auto block py-3 px-5 text-sm">
                                                            <UALink
                                                                className="hover:text-primary block"
                                                                title={item.title}
                                                                to={item.link}>{item.title}
                                                            </UALink>
                                                        </li>)}
                                                    </ul>
                                                }
                                            </div>
                                        </>

                                    }

                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className="user-img">
                        <div className="relative group">
                            <div className="h-16 py-3 relative ">
                                <div className="flex items-center mt-1">
                                    <span className="w-8 h-8 order-3 rounded-full bg-gray-200 mx-2 inline-flex items-center justify-center text-black">{userName?.[0]?.toUpperCase() || "U"}</span>
                                    <span>{userName || "User"}</span>
                                    <i><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg></i>
                                </div>
                            </div>
                            <ul className={`absolute w-44 -bottom-15 right-0 bg-white shadow-sprade rounded-lg triangle-top hidden group-hover:block`}>
                                <li onClick={logout} className="cursor-pointer mr-0 ml-auto block py-3 px-5 text-sm">
                                    <span>Logout</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
