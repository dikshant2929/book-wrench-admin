import React, { useState } from 'react';
import Form from '@common/widgets/Form';
import ToastNotification from '@common/elements/ToastNotification';
import Service from "./Services/ResetPassword.service";
import exposedPath from '@ExposedPath';
const { Dashboard } = exposedPath;

const formConfiguration = [
    {
        id: 'passwordNew',
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'password',
            name: 'password',
            maxLength: '50',
            placeHolder:"New Password",
            'data-gsv-err-msg': 'Password is required.',
            classNameLabel:"hidden",
            classNameInput:"inputLogin"
        },
        extraProps: {
            label: 'passwordNew',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'passwordNew',
        },
        isRequired: true,
    },
    {
        id: 'passwordConform',
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'password',
            name: 'password',
            maxLength: '50',
            placeHolder:"Conform Password",
            'data-gsv-err-msg': 'Password is required.',
            classNameLabel:"hidden",
            classNameInput:"inputLogin"
        },
        extraProps: {
            label: 'passwordConform',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'passwordConform',
        },
        isRequired: true,
    }
    
];

const View = (props) => {
    const [toastState, setToastState] = useState({
        visibility: false,
        message: null,
        isSuccess: false,
    });

    const onFormSubmit = (data) => {
        const {isValidForm, ...request} = data;
        // const request = globals.cloneObject(data);
        // delete request.isValidForm;
        sendRequest(request);
        // console.log(request);
    };

    const showSuccessMessage = (data) => {
        const msg = data?.data?.responseMessage || data?.data?.message || 'Something went wrong';
        setToastState({ ...{ visibility: true, isSuccess: true, message: msg } });
        setTimeout(() => {
            setToastState({ ...{ visibility: false, isSuccess: false, message: null } });
            props?.auth?.authenticate(() => {
                window.location.replace(Dashboard);
            });
        }, 2000);
    };

    const sendRequest = (request) => {
        Service.doLogin(request, (data) => showSuccessMessage(data));
    };

    return (
        <div className="form-wrapper">
        <div className="p-3">
            <h1 className="text-center text-[#35324A] py-5 font-medium text-2xl mb-6">Reset Password</h1>
            
            <div className="bg-white rounded-md ">  
                <Form isRemember={false} isForgotPassword={false} formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle="Update Password"></Form>
            </div>
            
            <ToastNotification
                flag={toastState.visibility}
                message={toastState.message}
                isSuccess={toastState.isSuccess}
            />
            
        </div>
        
        </div>
    );
};

export default View;
