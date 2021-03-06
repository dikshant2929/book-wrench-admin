import React, { useState, useMemo } from 'react';
import { Renderer } from './Renderer';
import FormHelper from '@common/widgets/Form/FormHelper';
import Button from '@button';

const Form = (props: any) => {
    if (!props.formConfiguration || !Array.isArray(props.formConfiguration) || !props.formConfiguration.length) {
        throw new Error('You are calling Form with no config array : formConfiguration');
    }

    // const [isEnable, setButtonEnable] = React.useState(false);

    const formHelper = new FormHelper(props.formConfiguration);
    const [state, setState] = useState(formHelper.getElements());

    const formValidationSubscriber = (isValidForm: any) => {
        props?.isRequiredFulfilled?.(isValidForm);
    };

    formHelper.subscribe(formValidationSubscriber);

    const handleOnChange = (field: any) => (event: any) => {
        const value = (Array.isArray(event) && event.map(({ value }) => value)) || event?.value || null;
        setState((prevState: any) => ({ ...prevState, [field]: value }));
        props.onChange?.({ ...state, [field]: value });
    };

    const config = useMemo(() => {
        return formHelper.getConfig({ state, onChange: handleOnChange });
    }, [state]);

    const onSubmit = (e: any) => {
        e.preventDefault();
        props.onSubmit({ ...state });
    };

    return (
        <form onSubmit={onSubmit} className={`${props.className || ''}`}>
            <div className="flex flex-wrap">
                <Renderer config={config} />
            </div>
            {React.Children.count(props.children) ? (
                props.children
            ) : (
                <div className="text-center mt-6">
                    <Button 
                        disabled={!state.isValidForm ?? false}
                        title={props.buttonTitle || 'Submit'}
                        className={` ml-1 ${!state.isValidForm ?? false ? 'btn-disabled' : 'button-primary'}`}
                        display="inline-flex" 
                        width="w-auto" 
                        height="h-46px" 
                        padding="px-20px" 
                        fontSize="text-sm"
                    />
                </div>
            )}
        </form>
    );
};

export default Form;
