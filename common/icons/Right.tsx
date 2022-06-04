import React from 'react';

const RightMark = ({ onClick }: any,props:any) => (
    <div
        className={`${props.className} ${props.disabled ? "btn-disabled" : ""} inline-block bg-green-500 text-white cursor-pointer mx-1 px-5 py-2 rounded-md text-sm`}
        onClick={onClick}>          
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
        </svg> 
    </div>
);

export default RightMark;
