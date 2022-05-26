import React from 'react';

//inline-block bg-green-500 text-white p-1 cursor-pointer mx-1 px-4 py-2 rounded-md text-sm
const InfoIcon = ({ onClick, ...props }: any) => {

    return (
        <div
            className={`${props.className} ${
                props.disabled ? 'btn-disabled' : ''
            }`}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
    );
}

export default InfoIcon;