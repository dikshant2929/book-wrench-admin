import React, { useState } from "react";
import { ButtonProps } from "./interfaces";

const defaultProps = {
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







const Button = (props: ButtonProps) => {
    return (
        <button
            {...props}
            title={props.title}
            className={`
                ${props.className} 
                ${props.display} 
                ${props.width} 
                ${props.padding} 
                ${props.fontSize} 
                ${props.height} 
                ${props.disabled ? "btn-disabled" : ""}
            `}
            onClick={props.onClick}
        >
            {props.icon && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={props.icon} />
                </svg>
            )}
            {props.title}
        </button>
    );
};

Button.defaultProps = defaultProps;

export default Button;

