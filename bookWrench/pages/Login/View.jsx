import React, { useState } from 'react';
import Form from '@common/widgets/Form';
import ToastNotification from '@common/elements/ToastNotification';
import Service from "./Services/login.service";
import exposedPath from '@ExposedPath';
const { Dashboard } = exposedPath;

const formConfiguration = [
    {
        id: 'username',
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'text',
            name: 'username',
            // maxLength : "3",
            'data-gsv-err-msg': 'Username is required.',
        },
        extraProps: {
            label: 'Username',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'username',
        },
        isRequired: true,
    },
    {
        id: 'password',
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'password',
            name: 'password',
            maxLength: '50',
            'data-gsv-err-msg': 'Password is required.',
        },
        extraProps: {
            label: 'Password',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'password',
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
            <h1 className="text-center text-[#35324A] py-5 font-medium text-2xl mb-6">Sign In to BookWrench</h1>
            
            <div className="bg-white rounded-md ">  
             
                <Form formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle="Sign In"></Form>
                
            </div>
            
            <ToastNotification
                flag={toastState.visibility}
                message={toastState.message}
                isSuccess={toastState.isSuccess}
            />
            
        </div>
        <div className="account-ref py-5">
            <h1 className="text-base">Don't have an account <span className="text-blue-900"><strong>Sign Up Now</strong></span></h1>
        </div>
        </div>
    );
};

export default View;
