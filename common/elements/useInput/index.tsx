import React, { useState, useRef, useEffect } from 'react';
import validateUtility from '@common/utils/ValidateUtility';
import { UseInputProps } from './interfaces';
const defaultProps = {
    type: 'text',
    value: '',
    onChange: null,
    onFocus: null,
    onBlur: null,
    onKeyDown: null,
    labelClass: '',
    extraprops: {
        id: '',
        parentId: '',
        parentClass: 'inputfield',
        placeHolder: '',
        validation: '',
        scrollIntoView: true,
    },
    error: {
        errorClass: '',
        message: '',
    },
};

const useInput = ({ children, ...props }: React.PropsWithChildren<UseInputProps>) => {
    //Reference
    const inputElement = useRef<any>(null);
    const { extraprops } = props;
    const { placeHolder }: any = extraprops;
    delete props.extraprops;

    //State Variables
    const [inputValue, setValue] = useState(props.value);
    const [labelClass, setLabelClass] = useState(props.labelClass);
    // const [placeHolder, setPlaceHolder] = useState(extraprops.placeHolder);
    const [error, setError] = useState<any>(extraprops?.error);

    //Handlers
    const handleChange = (event: any) => {
        const value = event?.target?.value;

        setValue(value || '');
        setLabelClass(value ? 'active' : '');

        commonUtils(event, props.onChange);
    };

    const handleFocus = (event: any) => {
        extraprops?.scrollIntoView && inputElement.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        setLabelClass('active');
        commonUtils(event, props.onFocus);
    };

    const handleBlur = (event: any) => {
        setLabelClass('');
        commonUtils(event, props.onBlur);
    };

    const commonUtils = (event: any, callback: any) => {
        callback && typeof callback === 'function' && callback(event);
    };

    const handleKeyDown = (event: any) => {
        props.onKeyDown && typeof props.onKeyDown === 'function' && props.onKeyDown(event);
    };

    const InputJSX = (
        <div className={extraprops?.parentClass} id={extraprops?.parentId}>
            {children && typeof children === 'function' && children()}
            {props.iconName ? <i className="connecto-icons">{props.iconName}</i> : ''}
            <input
                {...props}
                ref={inputElement}
                data-gsv-type={extraprops?.validation}
                data-gsv-min-length={extraprops?.minLength}
                data-gsf-name={props.name}
                value={inputValue}
                onChange={(e) => handleChange(e)}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                type={props.type}
                onKeyUp={(e) => {
                    validateUtility.validate(e.target, setError);
                }}
                onKeyPress={(e) => validateUtility.stopDefault(e)}
                onKeyDown={handleKeyDown}
            />
            <label className={labelClass || (inputValue && 'active')} htmlFor={extraprops?.id}>
                {placeHolder}
            </label>
            {error?.message && (
                <span data-gsv-error="1" className={`error ${error.errorClass}`}>
                    {error.message}
                </span>
            )}
        </div>
    );

    return [inputValue, InputJSX];
};

useInput.defaultProps = defaultProps;
export default useInput;
