'use strict'
import React, { useState, useEffect,PropsWithChildren } from 'react';
import globals from '@globals';
import HtmlTag from '@common/elements/HtmlTag';
import validateUtility from '@common-utils/ValidateUtility'
import { InputBoxProps, InputState } from './interfaces';

const defaultProps = {
	showMessage: true,
	pressEnter: false,
	autoFocusFlag: false,
	isCustomValidate: false,
	errCls: '',
	allowPaste: false,
	props : {
		classNameLabel:"label__small",
		classNameInput:"form__input_w_height"
	},
	cls : "md:p-1 min-w-1/4 mb-2 inline-block w-full"
}

const Input = (props: PropsWithChildren<InputBoxProps>) => {
	let el;
	const [state, setState] = useState({ ...props.extraProps, error: { status: true, message: "", }, selectedValue: props.selectedValue ? props.selectedValue : '' })

	function onBlur(event:any) {
		if (typeof event.target.value != 'undefined' && event.target.value.length <= 0) {
			error.status = true
			setState((prevState:any) => ({
				...state,
				...prevState,
				placeHolder: props.extraProps?.placeHolder || {},
				//labelClass: '',
				error: error
			}));
		}

		if (typeof props.blurCB === 'function') {
			props.blurCB(props.props.name, event.target.value);
		}
		if (typeof props.toggleExpandCollapseCB === 'function') {
			props.toggleExpandCollapseCB(props.editId, "collapsed")
		}
	}

	useEffect(() => {
		// let placeHolder = state.selectedValue ? props.extraProps.label : state.placeHolder;
		let placeHolder = state.selectedValue ? props.extraProps?.label : props.extraProps?.placeHolder ? props.extraProps.placeHolder : state.placeHolder;
		let labelClass = (state.selectedValue || state.labelClass) ? 'active' : "";
		setState((prevState:any) => ({ ...state, ...prevState, ...props, ...{ placeHolder: placeHolder, labelClass: labelClass } }));
		if (props.autoFocusFlag) {
			setTimeout(function () {
				if (el) {
					el.focus();
					el.click();
				}
			}, 300)
		}
		
	}, [props])

	function onFocus(event:any) {
		if (!props.noScrollFlag) globals.scrollIntoView(event.target);

		setState((prevState:any) => ({
			...state,
			...prevState,
			placeHolder: props.extraProps?.label || "",
			//labelClass: 'active'
		}));

		if (typeof props.focusCB === 'function') {
			props.focusCB(props.props.name, event.target.value, event);
		}
		if (typeof props.toggleExpandCollapseCB === 'function') {
			props.toggleExpandCollapseCB(props.editId, "noAutoFill")
		}
	}

	function handleChange(event:any) {
		if (event.target.value) {
			let val = event.target.value
			setState((prevState:any) => ({
				...state,
				...prevState,
				placeHolder: props.extraProps?.label || "",
				//labelClass: 'active',
				selectedValue: val,
			}));
		} else {
			setState((prevState:any) => ({
				...state,
				...prevState,
				selectedValue: '',
				//labelClass: 'active',
			}));
		}

		if (typeof props.cb === 'function') {
			props.cb(props.props.name, event.target.value, event);
		}
	}

	let prps = globals.cloneObject(props.props);
	let gsfName = globals.cloneObject(prps.name);
	let error = state.error;
	prps.name = prps.defaultName ? prps.name : `${prps.name}${Math.random().toString(16).slice(2)}`
	let options = props.extraProps || {};
	
	if (props.disabled) {
		prps.disabled = 'disabled';
	}

	if (props.readonly) {
		prps.readonly = 'readonly';
	}
	
	return (
		<div className={` ${options.parentClass} ${!error.status && props.showMessage ? 'errorField' : ''} ${props.cls || ""} ${options.isActiveCls ? state.labelClass : ""}`} id={options.parentId ? options.parentId : ''}>
			<label className={prps.classNameLabel} htmlFor={options.id}><HtmlTag>{options.label}</HtmlTag></label>
			<input {...prps}
				//value={state.selectedValue}
				defaultValue={state.selectedValue ? state.selectedValue : ""}
				ref={(node) => el = node}
				autoComplete='new-password'
				onKeyUp={(e) => { !props.isCustomValidate && validateUtility.validate(e.target, { setState: setState }, state) }}
				onKeyPress={(e) => validateUtility.stopDefault(e)}
				onKeyDown={(e) => { e.keyCode === 13 && props.pressEnter && e.preventDefault() }}
				onFocus={(e) => onFocus(e)}
				onBlur={(e) => onBlur(e)}
				data-gsv-type={options.validation}
				data-gsv-min-length={options.minLength}
				data-gsv-min-value={options.minValue}
				onChange={(e) => handleChange(e)}
				data-gsf-name={gsfName}
				className={prps.classNameInput || prps.className}
			//autoFocus={props.autoFocusFlag}
			/>
			{props.toolTip && <HtmlTag tag="span" className="icon-info "><div className="infoTxt">{props.toolTip}</div></HtmlTag>}
			{!error.status && props.showMessage && <HtmlTag tag="span" data-gsv-error="1" className={`error error_msg_red ${props.errCls}`}>{error.message}</HtmlTag>}
			{props.children}
		</div>
	);
}

Input.defaultProps = defaultProps;
export default Input