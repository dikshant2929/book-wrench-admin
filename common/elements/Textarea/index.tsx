import React, { useState, useEffect, PropsWithChildren } from 'react';
import { TextareaProps } from './interfaces';
const defaultProps = {
    title:"Description",
    titleClass:" block text-xs text-gray-700 mb-1 text-left",
    parentClass:"",
    textareaClass:"w-full rounded-md border border-gray-200 focus:ring-0",
    rows:"3",
    cols:"3",
    name:"description",
    value:""
    
};

const Textarea = (props: PropsWithChildren<TextareaProps>) => {
    
    const handleClick = (e: any) => {
        const value = e?.target?.value;
        props.cb(value);
    } 

    return (
        <div className={props.parentClass}>
            {props.titleClass && <div className={props.titleClass}>{props.title} </div>}
            <textarea  
                onBlur={(e) => handleClick(e)}  
                className={props.textareaClass}
                rows={props.rows}
                cols={props.cols}
                name={props.name}
                >
                {props.value}
             </textarea>
        </div>
    );
};

Textarea.defaultProps = defaultProps;
export default Textarea;
