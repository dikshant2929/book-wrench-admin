import React from 'react';

const RightMark = ({ onClick }: any,props:any) => (
    <div
        className={`${props.className} ${props.disabled ? "btn-disabled" : ""} inline-block bg-green-500 text-white p-1 cursor-pointer mx-1 px-4 py-2 rounded-md text-sm`}
        onClick={onClick}
    >
        Proceed
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg> */}
    </div>
);

export default RightMark;
