import React, { useState, useEffect } from 'react';
import Input from '@common/elements/Input';
import Button from '@common/elements/Button';
import CheckBox from '@common/elements/CheckBox';
import ReactTypeHead from '@common/elements/ReactTypehead';
import Services from '../../Services/customer.service';
const mandatoryFields = ["locality"];

const AddEditContactAddress = (props) => {

    const [selectedDropdownValueCustomer, setSelectedDropdownValueCustomer] = useState(null);
    const [contactList, setContactList] = useState([]);
    const [isEditMode, setEditMode] = useState(false);
    const [isButtonEnable, setButtonEnable] = useState(false);
    const [fieldValue, setFieldValue] = useState({
        // name: props?.contactPerson[props.currentId]?.name || "",
        // designation: props?.contactPerson[props.currentId]?.designation || "",
        // email: props?.contactPerson[props.currentId]?.email || "",
        // mobileNumber: props?.contactPerson[props.currentId]?.mobileNumber || "",
        locality: props?.contactAddress[props.currentId]?.location || "",
        gateNumber: props?.contactAddress[props.currentId]?.gateNumber || "",
    });

    const onTextChange = (key) => (...data) => {
        if (Array.isArray(data)) {
            const fields = ['locality', 'gateNumber'];
            const value = fields.includes(key) ? data[1] : data[0];
            setFieldValue(previous => ({ ...previous, [key]: value }))
        }
    }

    useEffect(() => {
        console.log(fieldValue);
        const isValidForm = mandatoryFields.every(item => Boolean(fieldValue[item]))
        setButtonEnable(isValidForm);
    }, [fieldValue]);


    useEffect(() => {
        if (Array.isArray(props.contactPerson) && props.contactPerson.length) {
            const list = [];
            props.contactPerson.forEach(contactPerson => { 
                const data = {...contactPerson, label: contactPerson.name, value: contactPerson._id } 
                if(contactPerson._id === props?.contactAddress[props.currentId]?.contactPerson ){
                    setFieldValue(prev => ({...prev, contactPerson : contactPerson._id}))
                    setSelectedDropdownValueCustomer({ ...data });
                }
                list.push(data);
            });
            setContactList([...list]);
        }

        if (props.currentId !== null) {
            setEditMode(true);
            setButtonEnable(true);
        }

    }, [props])

    const onFormSubmit = (data) => {
        if (isEditMode) {
            props?.editAddress(data, props.currentId);
        } else {
            props?.addNewAddress(data);
        }
    };


    const handleOnChange = (key) => (value) => {
        if(!value) return;
        setFieldValue(previous => ({ ...previous, [key]: value._id }));
        switch (key) {
            case "contactPerson":
                setSelectedDropdownValueCustomer(value);
                setFieldValue(previous => ({ ...previous }));
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <div className='grid md:grid-cols-2 gap-2 add__address'>
                <Input  {...formConfiguration("locality", "Locality")} selectedValue={fieldValue?.locality} cb={onTextChange('locality')} />
                <Input  {...formConfiguration("gateNumber", "Gate Number (If gated property)")} selectedValue={fieldValue?.gateNumber} cb={onTextChange('gateNumber')} />
                {/* <Input  {...formConfiguration("houseNumber", "House/Apartment name and number")} selectedValue={fieldValue?.houseNumber} cb={onTextChange('houseNumber')} />
                    <Input  {...formConfigurationNumber("pincode", "Pincode")} selectedValue={fieldValue?.pincode} cb={onTextChange('pincode')} />
                    <Input  {...formConfiguration("state", "State")} selectedValue={fieldValue?.state} cb={onTextChange('state')} />
                    <Input  {...formConfiguration("country", "Country")} selectedValue={fieldValue?.country} cb={onTextChange('country')} /><br />
                    <CheckBox value="Use as billing address" defaultValue={(fieldValue?.isbillingAdd) ? true : false} cb={onTextChange('isbillingAdd')} /> */}
            </div>
            <div className='pb-6'>
                <h4 className='text-[#3F4753] text-xs font-semibold text-left py-5'>POC(Point of Contact)</h4>
                <div className='flex gap-4'>
                    <div className='flex basis__40 bg-[#F2F3F7] justify-start items-center py-2.5 pl-2.5 gap-2 rounded-lg'>
                        <span className='bg-[#DBDDE3] flex justify-center items-center h-8 w-8 rounded-3xl'><svg xmlns="http://www.w3.org/2000/svg" class=" icon__plus__small" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></span>
                        <span className='text-[#6F757E] text-sm font-semibold'>New Contact</span>
                    </div>
                    <div className='flex basis__40 bg-[#F2F3F7] justify-start items-center py-2.5 pl-2.5 gap-2 rounded-lg'>
                        <span className='bg-[#DBDDE3] flex justify-center items-center h-8 w-8 rounded-3xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H10.6667L14 5.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14Z" stroke="#858585" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.3337 13.9993V8.66602H4.66699V13.9993" stroke="#858585" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4.66699 2V5.33333H10.0003" stroke="#858585" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span className='text-[#6F757E] text-sm font-semibold'>Select from Existing</span>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='grid select__poc'>
                    {/* <Input  {...formConfiguration("contactName", "Contact Name")} selectedValue={fieldValue?.contactName} cb={onTextChange('contactName')} /> */}
                    <ReactTypeHead
                        id="selectPOC"
                        options={contactList}
                        handleSelect={handleOnChange('contactPerson')}
                        placeholder="Select Contact"
                        value={selectedDropdownValueCustomer}
                    />
                </div>
            </div>
            <div className="btn-wrapper m-auto text-center border-t-2 border-[#EDEFFB] py-6">
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
const formConfigurationNumber = (keyOfInput, label) => {
    return {
        id: keyOfInput,
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'number',
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


export default AddEditContactAddress;