import React, { useState, useEffect, PropsWithChildren } from 'react';
import { RadioProps } from './interfaces';
const defaultProps = {
    defaultValue: "",
    title:"",
    titleClass:"label__small text-left",
    parentClass:" w-auto  p-1 ",
    childClass:"form-check-inline flex items-center pr-8 mt-[0.312rem]",
    inputClass:"no-outline border-2 border-[#D6D6D6] rounded w-5 h-5 mr-2",
    labelClass:"label__small m-0",
    name:"checkbox",
    
};


const CheckBox = (props: PropsWithChildren<RadioProps>) => {
    
    const [isChecked, setIsChecked] = useState(props.defaultValue);

    const handleClick = (e: any) => {
       // console.log($(e.target).is(':checked'))

        const val = e.target.checked;
        setIsChecked(val)
        props.cb(props.value, val);
    }

    useEffect(() => {
        setIsChecked(props.defaultValue)
    }, [props]);
    
    return (

        <div className={props.parentClass}>
            {props.titleClass && <div className={props.titleClass}>{props.title}</div>}
            <div className="flex items-center h-46px ">
            <div className={props.childClass}>
                    <input 
                        onClick={(e) => handleClick(e)} 
                        onChange={(e) => handleClick(e)}
                        type="checkbox" 
                        className={props.inputClass} 
                        checked={isChecked} 
                        // defaultChecked={isChecked == item.value}
                        name={props.value} 
                        id={props.id} 
                        value={props.value} />
                    <label className={props.labelClass} htmlFor={props.id}>{props.value}</label>
                </div>
            </div>
        </div>
    );
};

CheckBox.defaultProps = defaultProps;
export default CheckBox;



