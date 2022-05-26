'use strict';
import React, { useRef, useState } from 'react';
import { TostProps } from './interfaces';
export let showToster: (status: TostProps) => any;

const ToastNotification = () => {
    const toastElement = useRef<any>({});
    let tosterImages: any;
    const [state, setstate] = useState({
        msg: 'No Message',
        class: 'bg-blue-100',
        img: null,
    });

    showToster = (args: TostProps) => {
        const element: any = toastElement.current;
        switch (args.status) {
            case 'Success' || 'success':
                tosterImages = (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f2ecec"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                );
                setstate({ msg: args.msg, class: 'bg-green-800', img: tosterImages });
                element.className = element.className.replace('hidden', 'block');
                break;
            case 'Error':
                tosterImages = (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f2ecec"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                );
                setstate({ msg: args.msg, class: 'bg-red-800', img: tosterImages });
                element.className = element.className.replace('hidden', 'block');
                break;
            case 'Info':
                tosterImages = (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f2ecec"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                );
                setstate({ msg: args.msg, class: 'bg-blue-800', img: tosterImages });
                element.className = element.className.replace('hidden', 'block');
                break;
            case 'Warning':
                tosterImages = (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f2ecec"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                );
                setstate({ msg: args.msg, class: 'bg-yellow-500', img: tosterImages });
                element.className = element.className.replace('hidden', 'block');
                break;
            default:
                tosterImages = (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#171616"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                );
                setstate({ msg: args.msg, class: 'bg-blue-100', img: tosterImages });
                element.className = element.className.replace('hidden', 'block');
        }

        setTimeout(() => {
            element.className = element.className.replace('block', 'hidden');
        }, 3000);
    };

    return (
        <div
            className="w-auto h-14 shadow-lg border hidden m-auto text-black rounded fixed right-4 top-10 bg-white overflow-hidden z-10"
            id="toast"
            ref={toastElement}
        >
            <span className={`inline-block align-middle w-14 h-14 text-center pt-1.5 pl-1.5 ${state.class}`}>
                {state.img}
            </span>
            <div
                className="px-4 inline-block align-middle"
                id="desc"
                //@ts-ignore
                dangerouslySetInnerHTML={{ __html: state.msg }}
            ></div>
        </div>
    );
};
export default ToastNotification;
