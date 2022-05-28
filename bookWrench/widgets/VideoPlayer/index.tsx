import React, { useState, useEffect } from 'react';
import VideoIcon from '@common/icons/VideoIcon';
import { Player } from 'video-react';
import './video-react.css'; // import css

//Documentation of video-react : https://video-react.js.org/components/player/

const defaultProps = {
    link: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    title : "You Tube Video",
    height: 405,
    width: 720,
    autoPlay: true
};

const VideoPlayer = ({ ...props }: any) => {

    const overlayClasses = 'fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-10';
    const contentClasses = 'max-h-900px fixed top-1/2 left-1/2 bg-white rounded-lg min-w-4/5 overflow-y-auto z-20 p-9 text-center box-border';
    const closeBtnClasses = 'absolute top-3 right-3 cursor-pointer';
    const titleClasses = 'text-left font-medium text-lg mb-4';

    const [isPlayerVisible, setPlayerVisibility] = useState(false);

    useEffect(() => {
        // to add listener (when togglePopup get true) when popup get opened.
        const rootElement = document.getElementById('popupContainer');
        if (rootElement != null && isPlayerVisible == true) {
            rootElement.focus();
            rootElement.addEventListener('keydown', escKeyListener);
        }
        // no need to remove listener because whole element get removed (when false)
        if(isPlayerVisible){
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isPlayerVisible]);

    const escKeyListener = (event: any) => {
        if (event.keyCode == 27) {
            setPlayerVisibility(false);
        }
    };

    const onInfoIconClicked = () => {
        setPlayerVisibility(value => !value);
    };

    return (
        <>
            
            <a className="mr-1 button-default h-46px px-20px text-sm inline-flex justify-center items-center cursor-pointer" onClick={onInfoIconClicked}>
                <VideoIcon className="mr-1 inline-block"/>
                Panel Guide
            </a>
            {
                isPlayerVisible && 
                <div id="popupContainer" tabIndex={-1} className="font-inter absolute">
                    {/* 'tabIndex' to put the focus on the popup (so that listener could work) */}
                    <div className={overlayClasses} onClick={() => setPlayerVisibility(false)}></div>
                    <div style={{ transform: 'translate(-50%,-50%) scale(1)', overflow : "hidden"}} className={contentClasses}>
                        <div className={closeBtnClasses} onClick={() => setPlayerVisibility(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </div>
                        <h1 className={titleClasses}>
                            {props.title}
                        </h1>
                        <Player  
                            {...props}
                            fluid={false} 
                            >
                            <source src= {props.link} className="h-80"/>
                        </Player>
                    </div>
                </div>
            }
        </>
    );
};

VideoPlayer.defaultProps = defaultProps;
export default VideoPlayer;
