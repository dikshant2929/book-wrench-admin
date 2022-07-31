import React, { useState, useEffect } from 'react';
import Input from '@common/elements/Input';
import Button from '@common/elements/Button';
import Services from '../../Services/user.service';
const mandatoryFields = ["name", "email", "mobileNumber"];

const AddEditContactPerson = (props) => {

    console.log(props);

    const [isEditMode, setEditMode] = useState(false);
    const [isButtonEnable, setButtonEnable] = useState(false);
    const [fieldValue, setFieldValue] = useState({
        name: props?.contactPerson[props.currentId]?.name || "",
        designation: props?.contactPerson[props.currentId]?.designation || "",
        email: props?.contactPerson[props.currentId]?.email || "",
        mobileNumber: props?.contactPerson[props.currentId]?.mobileNumber || "",
    });

    const onTextChange = (key) => (...data) => {
       
        if (Array.isArray(data)) {
            const fields = ['name', 'designation', 'email', 'mobileNumber']
            const value = fields.includes(key) ? data[1] : data[0];
            setFieldValue(previous => ({ ...previous, [key]: value }))
        }
    }

    useEffect(() => {
        const isValidForm = mandatoryFields.every(item => Boolean(fieldValue[item]))
        setButtonEnable(isValidForm);
    }, [fieldValue]);


    useEffect(() => {
        console.log(props.currentId)
      if(props.currentId !== null) {
        setEditMode(true)
      }
    },[props])

    const onFormSubmit = (data) => {
        if (isEditMode) {
            props?.editContactPerson(data,props.currentId);
        } else {
            props?.addNewContactPerson(data);
        }
    };


    console.log(isEditMode)
    return (
        <div>
            <div className='grid md:grid-cols-2 gap-4 add__poc'>
                <Input  {...formConfiguration("name", "Name")} selectedValue={fieldValue?.name} cb={onTextChange('name')} />
                <Input  {...costInputFieldConfigurationMobile("mobileNumber", "Mobile Number")} selectedValue={fieldValue?.mobileNumber} cb={onTextChange('mobileNumber')} />
                <Input  {...costInputFieldConfigurationEmail("email", "Email")} selectedValue={fieldValue?.email} cb={onTextChange('email')} />
                <Input  {...formConfiguration("designation", "Designation")} selectedValue={fieldValue?.designation} cb={onTextChange('designation')} />
            </div>
            <div className="btn-wrapper m-auto text-center pt-9">
                <Button
                    disabled={!isButtonEnable ?? false}
                    onClick={(e) => {
                        e.preventDefault();
                        onFormSubmit(fieldValue);
                    }}
                    className={`form__button ${!isButtonEnable ?? false ? 'btn-disabled' : 'button-primary'}`}
                    title={isEditMode ? 'Update' : 'Save'}
                />
            </div>
        </div>
    )
}



const formConfiguration = (keyOfInput, label) => {
    return {
        id: keyOfInput,
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'text',
            name: keyOfInput,
            // maxLength : "3",
            'data-gsv-err-msg': label + ' is required.',
            classNameLabel: 'label__small',
            classNameInput: 'form__input_w_height',
        },
        extraProps: {
            label: label,
            validation: 'required,minLength',
            minLength: 1,
            parentId: keyOfInput,
            parentClass: 'w-full',
            newInptClass: 'newClass',
        },
        isRequired: true,
        cls: "p-0"
    }
}

const costInputFieldConfigurationMobile = (keyOfInput, label) => {
    return {
        id: keyOfInput,
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'tel',
            name: keyOfInput,
            maxLength: 10,
            'data-gsv-err-msg': label + ' is required.',
            classNameLabel: 'label__small',
            classNameInput: 'form__input_w_height',
        },
        extraProps: {
            label,
            validation: 'required,maxLength,mobile',
            parentId: keyOfInput,
            parentClass: 'w-auto',
            newInptClass: 'newClass',
        },
        isRequired: true,
        cls: "p-1"
    }
};

const costInputFieldConfigurationEmail = (keyOfInput, label) => {
    return {
        id: keyOfInput,
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'text',
            name: keyOfInput,
            maxLength: "50",
            'data-gsv-err-msg': label + ' is required.',
            classNameLabel: 'label__small',
            classNameInput: 'form__input_w_height',
        },
        extraProps: {
            label,
            validation: 'required,email',
            minLength: 1,
            parentId: keyOfInput,
            parentClass: 'w-auto',
            newInptClass: 'newClass',
        },
        isRequired: true,
        cls: "p-1"
    }
};


export default AddEditContactPerson;