'use strict';
import React, { useEffect } from 'react';
export default function FooterLogin(props: any) {
    return (
       
        <footer>
            <div className="foot-item-wraper w-full flex bg-[#35324A] text-[#FFFFFF] justify-between items-baseline p-3 sm:p-4 md:p-8 ">
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
       
    );
}
