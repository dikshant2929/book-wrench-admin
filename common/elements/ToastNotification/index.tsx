'use strict';
import React, { useRef, useEffect, PropsWithChildren, useState } from 'react';
import { TosterProps } from './interfaces';

const defaultProps = {
    flag: false,
    message: '',
};

const ToastNotification = (props: PropsWithChildren<TosterProps>) => {
    const toastElement = useRef<any>({});

    useEffect(() => {
        const element: any = toastElement.current;
        if (props.flag) {
            element.className = element.className.replace('hidden', 'block');
        } else {
            element.className = element.className.replace('block', 'hidden');
        }
    }, [props]);

    return (
        <div
            className="w-auto h-14 shadow-lg border hidden m-auto text-black rounded fixed right-4 top-10 bg-white overflow-hidden z-10"
            id="toast"
            ref={toastElement}
        >
            <span
                className={`inline-block align-middle w-14 h-14 text-center ${
                    props.isSuccess ? 'bg-green-800' : 'bg-red-800'
                }`}
            >
                {props.isSuccess ? (
                    <svg
                        className="inline-block relative top-2/4 transform -translate-y-1/2"
                        width="30px"
                        height="30px"
                        fill="#fff"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m369.16 174.77c7.8125 7.8125 7.8125 20.477 0 28.285l-134.17 134.18c-7.8125 7.8086-20.473 7.8086-28.285 0l-63.871-63.875c-7.8125-7.8086-7.8125-20.473 0-28.281 7.8086-7.8125 20.473-7.8125 28.281 0l49.73 49.73 120.03-120.04c7.8125-7.8086 20.477-7.8086 28.285 0zm142.84 81.23c0 141.5-114.52 256-256 256-141.5 0-256-114.52-256-256 0-141.5 114.52-256 256-256 141.5 0 256 114.52 256 256zm-40 0c0-119.39-96.621-216-216-216-119.39 0-216 96.621-216 216 0 119.39 96.621 216 216 216 119.39 0 216-96.621 216-216z" />
                    </svg>
                ) : (
                    <svg
                        className="inline-block relative top-2/4 transform -translate-y-1/2"
                        width="30px"
                        height="30px"
                        fill="#fff"
                        version="1.1"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m437.13 74.939c-99.826-99.826-262.31-99.826-362.13 0-48.356 48.375-74.993 112.68-74.993 181.07s26.637 132.69 74.993 181.05c49.923 49.923 115.5 74.874 181.07 74.874s131.14-24.951 181.07-74.874c99.826-99.826 99.826-262.27 1e-3 -362.11zm-28.046 334.07c-84.375 84.375-221.67 84.375-306.04 0-40.858-40.858-63.37-95.204-63.37-153s22.512-112.14 63.37-153.02c84.375-84.375 221.67-84.355 306.04 0 84.355 84.375 84.355 221.67 0 306.02z" />
                        <path d="m341.52 310.83-56.151-56.071 56.151-56.071c7.735-7.735 7.735-20.29 0.02-28.046-7.755-7.775-20.31-7.755-28.065-0.02l-56.19 56.111-56.19-56.111c-7.755-7.735-20.31-7.755-28.065 0.02-7.735 7.755-7.735 20.31 0.02 28.046l56.151 56.071-56.151 56.071c-7.755 7.735-7.755 20.29-0.02 28.046 3.868 3.887 8.965 5.811 14.043 5.811s10.155-1.944 14.023-5.792l56.19-56.111 56.19 56.111c3.868 3.868 8.945 5.792 14.023 5.792s10.175-1.944 14.043-5.811c7.733-7.756 7.733-20.311-0.022-28.046z" />
                    </svg>
                )}
            </span>
            <div
                className="px-4 inline-block align-middle"
                id="desc"
                //@ts-ignore
                dangerouslySetInnerHTML={{ __html: props.message }}
            ></div>
        </div>
    );
};
ToastNotification.defaultProps = defaultProps;
export default ToastNotification;
