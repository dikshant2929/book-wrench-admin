import React, { useState } from 'react';
import Form from '@common/widgets/Form';
import ToastNotification from '@common/elements/ToastNotification';
import Service from "./Services/forgotpassword.service";
import exposedPath from '@ExposedPath';
const { Dashboard, Login } = exposedPath;
import UALink from '@common/elements/UALink';

const formConfiguration = [
    {
        id: 'ForgotPassword',
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'email',
            name: 'ForgotPassword',
            // maxLength : "3",
            'data-gsv-err-msg': 'Enter your Email Address is required.',
            placeHolder: "Enter your Email Address",
            classNameLabel: "hidden",
            classNameInput: "inputLogin"
        },
        extraProps: {
            label: 'ForgotPassword',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'ForgotPassword',
        },
        isRequired: true,
    },

];

const View = (props) => {
    const [toastState, setToastState] = useState({
        visibility: false,
        message: null,
        isSuccess: false,
    });

    const onFormSubmit = (data) => {
        const { isValidForm, ...request } = data;
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
                <h1 className="text-center text-[#35324A] py-5 font-medium text-2xl mb-6">Forgot Password ?</h1>

                <div className="bg-white rounded-md ">
                    <Form  formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle="Reset Password"></Form>
                </div>

                <div className="">
                       
                       <div className="or">Or</div>
                        <div className="">
                            <UALink 
                                className={`text-[#1C5A9C] text-sm`}
                                title="Back to Login"
                                to={Login}>
                                   Login
                            </UALink>
                        </div>
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
