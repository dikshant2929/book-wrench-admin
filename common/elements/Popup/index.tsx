import React, { useState, useEffect } from 'react';
import { PopUpArgs } from './interfaces';
export let popupContents: (args: PopUpArgs) => any;
export let popupToggler: (visible?: boolean) => any;

const Popup: any = (props: any) => {
    const overlayClasses = 'fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-10';
    const contentClasses =
        'max-h-600px fixed top-1/2 left-1/2 bg-white rounded-lg w-4/5 max-w-screen-sm overflow-y-auto z-20 p-9 text-center box-border';
    const closeBtnClasses = 'absolute top-3 right-3 cursor-pointer';
    const titleClasses = 'text-left font-medium text-lg mb-4';

    const [isVisible, setIsVisible] = useState<boolean | undefined>(false);
    const [popupView, setPopupView] = useState({
        title: 'No Title',
        contents: 'No Content',
    });

    useEffect(() => {
        // to add listener (when togglePopup get true) when popup get opened.
        const rootElement = document.getElementById('popupContainer');
        if (rootElement != null && isVisible == true) {
            // rootElement.focus();
            rootElement.addEventListener('keydown', escKeyListener);
        }
        // no need to remove listener because whole element get removed (when false)
        if(isVisible){
           // document.body.style.overflow = 'hidden';
          
    
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isVisible]);

    const escKeyListener = (event: any) => {
        if (event.keyCode == 27) {
            setIsVisible(false);
        }
    };

    popupContents = ({ title, contents }) => {
        setPopupView({ title, contents });
    };

    popupToggler = (visible?: boolean) => setIsVisible((previous) => (visible === undefined ? !previous : visible));

    return (
        isVisible && (
            <div id="popupContainer" tabIndex={-1} className="font-inter">
                {' '}
                {/* 'tabIndex' to put the focus on the popup (so that listener could work) */}
                <div className={overlayClasses} onClick={() => setIsVisible(false)}></div>
                <div style={{ transform: 'translate(-50%,-50%) scale(1)' }} className={contentClasses}>
                    <div className={closeBtnClasses} onClick={() => setIsVisible(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </div>
                    <h1 className={titleClasses}>
                        {popupView.title}
                    </h1>
                    <div className="">{popupView.contents}</div>
                </div>
            </div>
        )
    );
};

export default Popup;
