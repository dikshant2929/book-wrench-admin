import React from 'react';

const Pencil = ({ onClick }: any,props:any) => (
    <div className={`${props.className} ${props.disabled ? "btn-disabled" : ""} inline-block bg-green-500 text-white p-1 cursor-pointer mx-1 px-4 py-2 rounded-md text-sm`} onClick={onClick}>
        Proceed
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
        </svg> */}
    </div>
);

export default Pencil;
