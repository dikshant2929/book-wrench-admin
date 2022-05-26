import React from 'react';

//inline-block bg-green-500 text-white p-1 cursor-pointer mx-1 px-4 py-2 rounded-md text-sm
const VideoIcon = ({ onClick, ...props }: any) => {
    return (
        <div className={`${props.className} ${props.disabled ? 'btn-disabled' : ''}`} onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
            </svg>
        </div>
    );
};

export default VideoIcon;
