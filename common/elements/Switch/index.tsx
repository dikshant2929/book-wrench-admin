import React, { useState, useEffect, PropsWithChildren } from 'react';
import { SwitchProps } from './interfaces';
const defaultProps = {
    defaultValue: true,
    isDisable: false,
};

const Switch = (props: PropsWithChildren<SwitchProps>) => {
    const id = `switch_${Math.random().toString(16).slice(2)}`;
    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = (field: any) => (event: any) => {
        const { checked } = event?.target || {};
        setIsChecked(checked);
        props.onChange && props.onChange(field)({ value: checked });
    };

    useEffect(() => {
        setIsChecked(props.defaultValue);
    }, [props.defaultValue]);

    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    className="switchBtn sr-only"
                    type="checkbox"
                    id={id}
                    checked={isChecked}
                    // defaultChecked={isChecked}
                    disabled={props.isDisable}
                    onChange={handleOnChange(props.id || props.name || id)}
                />
                <div className="block bg-gray-300 border border-gray-300 w-7 h-3 rounded-full"></div>
                <div className="dot absolute -left-1 -top-0.5 bg-white w-4 h-4 shadow-md rounded-full transition"></div>
            </div>
        </label>
    );
};

Switch.defaultProps = defaultProps;
export default Switch;
