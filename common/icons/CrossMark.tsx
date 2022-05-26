import React from 'react';

const CrossMark = ({ onClick }: any,props:any) => (
    <div 
         className={`${props.className} ${props.disabled ? "btn-disabled" : ""} inline-block bg-red-500 text-white p-1 cursor-pointer mx-1 px-4 py-2 rounded-md text-sm`}
         onClick={onClick}>
             Cancel
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg> */}
    </div>
);

export default CrossMark;
