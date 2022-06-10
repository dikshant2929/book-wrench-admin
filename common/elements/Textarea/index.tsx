import React, { useState, useEffect, PropsWithChildren } from 'react';
import { TextareaProps } from './interfaces';
const defaultProps = {
    title:"Description",
    titleClass:"text-xs text-gray-700 mb-1 text-left",
    parentClass:"",
    textareaClass:"w-full rounded-md border h-20 border-gray-200 focus:ring-0",
    rows:"4",
    cols:"4",
    name:"description",
    value:""
    
};

const Textarea = (props: PropsWithChildren<TextareaProps>) => {
    
    const [value, setValue] = useState(props.value);

    const handleClick = (e: any) => {
        const valuetextarea = e?.target?.value;
        setValue(valuetextarea)
        props.cb(valuetextarea);
    } 

    useEffect(() => {
        setValue(props.value)
     }, [props]);

    return (
        <div className={props.parentClass ? '' : 'textArea w-[28%]'}>
            {props.titleClass && <label className={props.titleClass}>{props.title} </label>}
            <textarea  
                onBlur={(e) => handleClick(e)}  
                className={props.textareaClass}
                rows={props.rows}
                cols={props.cols}
                name={props.name}
                defaultValue={value}
                >
             </textarea>
        </div>
    );
};

Textarea.defaultProps = defaultProps;
export default Textarea;
