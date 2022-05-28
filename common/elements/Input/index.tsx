'use strict';
import React, { PropsWithChildren } from 'react';
import HtmlTag from '@common/elements/HtmlTag';
import globals from '@globals';
import validateUtility from '@common-utils/ValidateUtility';
import Tooltip from '@common/elements/Tooltip';
import { InputBoxProps, InputState } from './interfaces';

class Input extends React.Component<PropsWithChildren<InputBoxProps>, InputState> {
    el: any;
    constructor(props: PropsWithChildren<InputBoxProps>) {
        super(props);
        this.state = {
            ...this.props.extraProps,
            selectedValue: props.selectedValue || '',
            error: { status: true, message: '' },
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            this.setState({
                placeHolder: this.props.extraProps?.label,
                labelClass: 'active',
                selectedValue: event.target.value,
            });
        } else {
            this.setState({
                selectedValue: '',
            });
        }

        if (typeof this.props.cb === 'function') {
            this.props.cb(this.props.props?.name || this.props.name, event.target.value, event);
        }
    }

    componentWillReceiveProps(nextProps: any) {
        const placeHolder = this.state.selectedValue ? this.props.extraProps?.label : this.state.placeHolder;
        this.setState(
            {
                ...nextProps,
                placeHolder: placeHolder,
                selectedValue: nextProps.selectedValue || '',
                labelClass: nextProps.selectedValue ? 'active' : '',
            },
            () => {
                if (nextProps.selectedValue) {
                    validateUtility.validate(this.el, this);
                }
            },
        );
    }

    onFocus = (event: any) => {
        if (!this.props.noScrollFlag) globals.scrollIntoView(event.target);

        // this.setState({
        // 	placeHolder: this.props.extraProps?.label,
        // 	labelClass: 'active'
        // });

        if (typeof this.props.focusCB === 'function') {
            this.props.focusCB(this.props.props?.name || this.props.name, event.target.value, event);
        }
    };
    onBlur = (event: any) => {
        if (typeof event.target.value != 'undefined' && event.target.value.length <= 0) {
            // this.setState({
            // 	placeHolder: this.props.extraProps?.placeHolder,
            // 	labelClass: ''
            // });
        }

        if (typeof this.props.blurCB === 'function') {
            this.props.blurCB(this.props.props?.name || this.props.name, event.target.value);
        }
    };

    render() {
        // console.log(this.props);
        const self = this;
        const props = globals.cloneObject(this.props.props);
        // console.log(props);
        // if(!props){
        // 	return null;
        // }
        const gsfName = globals.cloneObject(props.name);
        props.name = `${props.name}${Math.random().toString(16).slice(2)}`;
        const options = this.props.extraProps || {};
        const error = this.state.error;
        //let errorCls = this.state.errorCls ? this.state.errorCls :
        return (
            <div className={`p-1 min-w-1/4 mb-2 inline-block ${options.parentClass || 'w-full'}`} id={options.parentId || `parent-${props.name}`}>
                <div className={`relative ${options.newInptClass}`}>
                    {this.state.IconName && <i className="connecto-icons">{this.state.IconName}</i>}
                    <label className={`${props.classNameLabel} block text-xs text-gray-700 mb-1 text-left truncate`} htmlFor={options.id}>
                        {options.label}
                    </label>
                    <input
                        {...props}
                        value={this.state.selectedValue}
                        data-gsv-type={options.validation}
                        data-gsv-min-length={options.minLength}
                        data-gsf-name={gsfName}
                        onFocus={(e) => this.onFocus(e)}
                        onBlur={(e) => this.onBlur(e)}
                        onChange={(e) => this.handleChange(e)}
                        autoComplete="new-password"
                        onKeyUp={(e) => {
                            validateUtility.validate(e.target, self);
                        }}
                        onKeyPress={(e) => validateUtility.stopDefault(e)}
                        ref={(node) => (this.el = node)}
                        className={`${props.classNameInput} block w-full rounded-md border border-gray-200 h-46px focus:ring-0 text-sm`}
                        placeholder={props.placeholder}
                    />
                    
                    {!error.status && (
                        <span
                            data-gsv-error="1"
                            className={`text-red-700 text-tiny absolute right-0 -bottom-4  mt-1 ${this.state.errorCls}`}
                        >
                            {error.message}
                        </span>
                    )}
                    {/* <span data-gsv-error="1" className={`error ${this.props.errorCls ? this.props.errorCls : 'hide'}`}>This field is required</span> */}
                    {this.props.children}

                    {this.props.tooltipData && (
                        <Tooltip
                            items={this.props.tooltipData}
                            direction="right"
                            line={gsfName == 'text' ? 'singleline' : 'multiline'}
                        />
                    )}
                </div>
                
            </div>
        );
    }
}

export default Input;
