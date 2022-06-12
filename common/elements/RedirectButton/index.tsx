import React, { PropsWithChildren, useState } from 'react';
import { ReidrectProps } from './interfaces';
import UALink from '@common/elements/UALink';

const defaultProps = {
    link: '#',
    title: "",
    className: "",
    display: "inline-flex",
    width: "w-auto",
    height: "h-46px",
    padding: "px-20px",
    fontSize: "text-sm",
    disabled: "",
    icon: "",
};

const RedirectButton = (props: PropsWithChildren<ReidrectProps>) => {
    return (
        <UALink
            title={props.title}
            to={props.link}
            className={`
                ${props.className} 
                ${props.display} 
                ${props.width} 
                ${props.padding} 
                ${props.fontSize} 
                ${props.height} 
                ${props.disabled ? "btn-disabled" : ""}
            `}
        >
            {props.icon && (
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 icon__plus__small" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={props.icon} />
                </svg>
            )}
            {props.title}
        </UALink>
    );
};

RedirectButton.defaultProps = defaultProps;

export default RedirectButton;
