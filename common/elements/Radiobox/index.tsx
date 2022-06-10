import React, { useState, useEffect, PropsWithChildren } from 'react';
import { RadioProps } from './interfaces';
const defaultProps = {
    defaultValue: "",
    title:"Status",
    titleClass:"block text-xs text-gray-700 mb-1 text-left",
    parentClass:"",
    childClass:"form-check-inline pr-8",
    inputClass:"text-green-300 outline-green-300 form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-green-300 bg-green checked:bg-green-300 checked:border-green-300 focus:outline transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer focus:ring-green-300",
    labelClass:"form-check-label inline-block text-gray-800",
    name:"radio",
    options:[
        { key: 'Active', value: 'active' },
        { key: 'InActive', value: 'inactive' },
    ]
};

const RadioBox = (props: PropsWithChildren<RadioProps>) => {
    
    const [isChecked, setIsChecked] = useState(props.defaultValue);

    const handleClick = (e: any,val: any,key: any) => {
        setIsChecked(val)
        props.cb(props.name, val,key);
    }

    useEffect(() => {
       setIsChecked(props.defaultValue)
    }, [props]);

    return (

        <div className={props.parentClass}>
            {props.titleClass && <div className={props.titleClass}>{props.title} </div>}
            <div className="flex">
             {props.options && props.options.map((item, index) => <div key={index} className={props.childClass}>
                    <input 
                        onClick={(e) => handleClick(e, item.value, item.key)} 
                        onChange={(e) => handleClick(e, item.value, item.key)}
                        type="radio" 
                        className={props.inputClass} 
                        checked={isChecked === item.value} 
                        name={props.name} 
                        id={item.value} 
                        value={item.value} />
                    <label className={props.labelClass} htmlFor="inlineRadio10">{item.key}</label>
                </div>
            )}
                
            
            </div>
        </div>
    );
};

RadioBox.defaultProps = defaultProps;
export default RadioBox;
