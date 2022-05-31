'use strict';

import PermissionGateway from '@app/hoc/PermissionGateway';
import UALink from '@common/elements/UALink';
import exposedPath from '@ExposedPath';
import React, { useEffect, useState } from 'react';
import { Route, useLocation } from 'react-router-dom';

// import LoginIcon from '../../assets/myaccount.svg';
// import { GoogleLogout } from 'react-google-login';
// import { GOOGLE_CLIENT_ID } from './utils';
// import storage from '@storage';

const { Home } = exposedPath;
const {
    Dashboard,
    RMList,
    DealerList,
    Inventory,
    TestDrive,
    CampaginsList,
    FinanceList,
    Insurance,
    DealConfigurator
} = exposedPath;

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
            title: 'Inventory',
            link: Inventory,
            isActive: false,
            tag: 'MOD_INVENTORY',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
        },
        {
            title: 'Testdrive',
            link: TestDrive,
            isActive: false,
            tag: 'MOD_TEST_DRIVE_INVENTORY',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
        },
        {
            title: 'Dealer',
            link: DealerList,
            isActive: false,
            tag: 'MOD_DEALER',
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        {
            title: 'RM',
            link: RMList,
            isActive: false,
            tag: 'MOD_RM',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
        },
        {
            title: 'Deal Configurator',
            link: DealConfigurator,
            isActive: false,
            tag: 'MOD_OFFER',
            icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
            subMenu: [
                {title: 'Campaign', link: CampaginsList, icon: '', isActive: true},
                {title: 'Finance', link: FinanceList, icon: '', isActive: false},
                {title: 'Insurance', link: Insurance, icon: '', isActive: false}
            ]
        },
    ],
};

const SideMenu = (props: any) => {
    
    // const {name : userName} = JSON.parse(storage?.getUserInfo()?.config?.data || {});

    const location = useLocation();
    const [menuList, setMenuList] = useState(props.menuList);
    const [userMenuCls, setUserMenuCls] = useState('hidden');

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

    const checkIsActive = (title: String, menuItem: any) => {
        return { ...menuItem, isActive : title === menuItem.title};
    }

    const onSubItem = (title: any, subMenuList:any) => {
        return subMenuList.map((menuItem: any) => {
          return checkIsActive(title, menuItem);
        });
    }

    const onItemClick = (e:any, item: any) => {
        
        if(item.subMenu !== undefined){
            setUserMenuCls('');
        }else{
            setUserMenuCls('hidden');
        }
        const menus = menuList.map((menuItem: any) => {
            if(menuItem.subMenu && menuItem.subMenu.length > 0){
                const title = e.target.innerText === item.title ? menuItem.subMenu[0].title : e.target.innerText;
                menuItem.subMenu = onSubItem(title,  menuItem.subMenu);
            }
            return checkIsActive(item.title, menuItem);
        });
        setMenuList([...menus]);
    };

  
    const onUserMenuClick = () => {
        if(userMenuCls == 'hidden'){
            setUserMenuCls('');
        }
        else{
            setUserMenuCls('hidden');
        }
    }

    useEffect(() => {
        if (location) {
            const { pathname } = location;
            const menus = menuList.map((menuItem: any) => {
                if (pathname.includes(menuItem.link)) {
                    menuItem.isActive = true;
                } else {
                    menuItem.isActive = false;
                }
                return menuItem;
            });
            setMenuList([...menus]);
        }
    }, []);

    return (
        <div className="flex flex-col w-64 shadow-md h-screen fixed z-10 bg-white left-0 top-0 overflow-y-auto" >
            <div className="h-15 flex border-b py-2 px-5">
                <a className="inline-block font-bold text-2xl" href="/">
                    <img
                        className="inline-block w-auto h-full"
                        src="https://stimg.cardekho.com/pwa/img/dealconfig/bookWrench_logo3.jpg"
                        alt="logo"
                    />
                </a>
            </div>
            <nav>
                <ul className="pr-4">
                    {menuList.map((item: any, key: number) => (
                        <PermissionGateway key={key} tag={item.tag}>
                            <li key={key} onClick={(e) => onItemClick(e, item)} className="my-4">
                                {/* <a className={`py-3 px-5 block border-b border-gray-100 hover:bg-gray-200 ${item.isActive ? "bg-gray-200" : ""}`} href={item.link}>{item.title}</a> */}
                                {!item.subMenu ? <UALink
                                    className={`py-3 px-5 block font-inter font-light rounded-tr-lg rounded-br-lg ${
                                        item.isActive ? 'bg-secondaryblue' : ''
                                    }`}
                                    title={item.title}
                                    // exact
                                    to={!item.subMenu ? item.link : ''}
                                >
                                    <span className={`flex text-gray-500 group hover:text-primary ${item.isActive ? 'text-primary font-medium' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 group-hover:text-primary ${item.isActive ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                        </svg>
                                        {item.title}
                                    </span>
                                    
                                </UALink> :
                                <Route render={({ history}) => (
                                   
                                    <span className={`py-3 px-5 block font-inter font-light rounded-tr-lg rounded-br-lg cursor-pointer ${
                                    item.isActive ? 'bg-secondaryblue' : ''
                                }`} onClick={() => { history.push(item.subMenu[0].link) }}>
                                    <span className={`flex text-gray-500 group hover:text-primary ${item.isActive ? 'text-primary font-medium' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 group-hover:text-primary ${item.isActive ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                        </svg>
                                        {item.title}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto relative top-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>

                                </span>

                                    )} />
                                // <span className={`py-3 px-5 block font-inter font-light rounded-tr-lg rounded-br-lg cursor-pointer ${
                                //     item.isActive ? 'bg-secondaryblue' : ''
                                // }`} onClick={() => subMenuParentClick(item.subMenu[0].link)}>
                                //     <span className={`flex text-gray-500 group hover:text-primary ${item.isActive ? 'text-primary font-medium' : ''}`}>
                                //         <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 group-hover:text-primary ${item.isActive ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                //         </svg>
                                //         {item.title}
                                //         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto relative top-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                //     </span>

                                // </span>
                                }
                                {item.subMenu && <ul className={`bg-secondaryblue rounded-br-lg pt-4 -mt-4 ${userMenuCls}`}>
                                    {item.subMenu.map((innerItem: any, innerKey: number) => (
                                        <li key={innerKey}>
                                            <UALink 
                                                className={`py-3 px-12 block font-inter font-light text-sm rounded-tr-lg rounded-br-lg ${innerKey == 0 ? 'highlight': ''} ${innerItem.isActive ? 'text-primary font-medium': ''}`}
                                                title={innerItem.title} 
                                                to={innerItem.link}>{innerItem.title}
                                            </UALink>
                                        </li>
                                    ))}
                                </ul>}
                            </li>
                        </PermissionGateway>
                    ))}
                </ul>
            </nav>
            {/* <div className="mt-auto">
                <div className="relative">
                    <div className="h-16 bg-gray-100 py-3 px-5 relative">
                        <div className="flex items-center mt-1">
                            <span className="w-8 h-8 flex-none rounded-full bg-primary mr-4 inline-flex items-center justify-center text-white">{userName?.[0]?.toUpperCase() || "U"}</span>
                            <span className="truncate pr-4">{userName || "User"}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer absolute top-5 right-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => onUserMenuClick()}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                    <ul className={`absolute w-44 -top-10 right-1 bg-white shadow-sprade rounded-lg triangle-bottom ${usermenuCls}`}>
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
            </div> */}
        </div>
    );
};

SideMenu.defaultProps = defaultProps;
export default SideMenu;



