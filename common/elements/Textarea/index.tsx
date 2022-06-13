import React, { useState, useEffect, PropsWithChildren } from 'react';
import { TextareaProps } from './interfaces';
const defaultProps = {
    title:"Description",
    titleClass:"label__small text-left",
    parentClass:"",
    textareaClass:"w-full form__input__border text-sm h-20 focus:ring-0 resize-none",
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
        props.cb && props.cb(valuetextarea);
    } 

    useEffect(() => {
        setValue(props.value)
     }, [props]);

    const onChange = (event : any) => {
        const value = event.target.value;
        setValue(value);
        props.onChange && props.onChange(value);
    }
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
                onChange={onChange}
                >
             </textarea>
        </div>
    );
};

Textarea.defaultProps = defaultProps;
export default Textarea;
