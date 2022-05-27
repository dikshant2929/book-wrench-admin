import React from 'react';
import View from './View';

const Login = (props) => {
    return (
        <div className="wrapper">
            <header>
                <div className="h-15 bg-white shadow-lg shadow-cyan-500/50"></div>
            </header>
        <div className="login-page">
            <div className="mx-auto flex justify-center items-center sm:px-4">
            <div className="bg-white w-full  sm:w-[448px] border-solid border mx-auto text-center rounded-lg my-16">
                <View {...props} />
            </div>
        </div>
        <footer>
            <div className="foot-item-wraper w-full flex bg-[#35324A] text-[#FFFFFF] justify-between items-center p-3 sm:p-4 md:p-8 ">
               <div className="">
                    <ul className="text-sm flex flex-col text-center md:flex md:flex-row">
                        <li className="pr-3 sm:flex-grow[2]"><a href="#" className="">Copyright 2022 - BookWrench</a></li>
                        <li className="pr-3 flex-grow"><a href="#" className="">Support</a></li>
                        <li className="pr-3 flex-grow"><a href="#" className="">About</a></li>
                        <li className="pr-3 flex-grow"><a href="#" className="">Terms of Service</a></li>
                        <li className="pr-3 flex-grow"><a href="#" className="">Privacy Policy</a></li>
                    </ul>
               </div>
               <div className="">
                    <ul className="text-sm flex flex-col text-center md:flex md:flex-row">
                        <li className="pr-3 "><a href="#" className="">Connect with us</a></li>
                        <li className="pr-3"><a href="#" className="">Insta</a></li>
                        <li className="pr-3"><a href="#" className="">FB</a></li>
                        <li className="pr-3"><a href="#" className="">Twitter</a></li>
                    </ul>
               </div>
            </div>
        </footer>

        </div>
        </div>

    );
};

export default Login;
