import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import ReactTypeHead from '@common/elements/ReactTypehead';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Customer.scss';
import Services from './Services/customer.service';
import Button from '@button';
import UALink from '@common/elements/UALink';

const { Customer, PointOfContact,Address } = exposedPath;
const defaultProps = {};


const customerTypeList = [
    {
        id: "standard",
        title: "Standard"
    },
    {
        id: "silver",
        title: "Silver"
    },
    {
        id: "gold",
        title: "Gold"
    },
    {
        id: "platinum",
        title: "Platinum"
    },
    {
        id: "diamond",
        title: "Diamond"
    },
    
]

const customerCategoryList = [
    {
        id: "standard",
        title: "Standard"
    },
    {
        id: "residential",
        title: "Residential"
    },
    {
        id: "retail",
        title: "Retail"
    },
    {
        id: "industrial",
        title: "Industrial"
    },
    {
        id: "enterprise",
        title: "Enterprise"
    }
]



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

const AddEditCustomer = (props) => {

    const mandatoryFields = ["firstName", "lastName", "email", "mobileNumber"];

    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState('Add New Customer');
    const [selectedDropdownValueCustomerCategory, setSelectedDropdownValueCustomerCategory] = useState(null);
    const [selectedDropdownValueCustomer, setSelectedDropdownValueCustomer] = useState(null);
    const [isButtonEnable, setButtonEnable] = useState(false);
    const [fieldValue, setFieldValue] = useState({
        firstName: "",
    })

    useEffect(() => {
        const isValidForm = mandatoryFields.every(item => Boolean(fieldValue[item]))
        setButtonEnable(isValidForm);
    }, [fieldValue]);

    const onFormSubmit = (data) => {

        if (isEditMode) {
            Services.editCustomer(data, () => props.history.push(Customer), {}, editModeData.id);
        } else {
            Services.addCustomer(data, () => props.history.push(Customer));
        }
    };

    useEffect(() => {

        const encryptedData = props?.match?.params?.editcustomer;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            const { firstName, lastName, email, mobileNumber } = data;
            setFieldValue({ firstName, lastName, email, mobileNumber });

            if (data.customerCategory) {
                const selectedData = customerCategoryList.find(item => item.id === data.customerCategory);
                setSelectedDropdownValueCustomerCategory({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }

            if (data.customerType) {
                const selectedData = customerTypeList.find(item => item.id === data.customerType);
                setSelectedDropdownValueCustomer({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }

            setTitle(`Edit Customer #${data.customerId}`);
            formConfiguration.selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }

        return () => formConfiguration.selectedValue = null;
    }, [props]);





    const handleOnChange = (key) => (value) => {
        if(!value) return;
        setFieldValue(previous => ({ ...previous, [key]: value.id }));
        switch (key) {
            case "customerCategory":
                setSelectedDropdownValueCustomerCategory(value);
                setFieldValue(previous => ({ ...previous }));
                break;
            case "customerType":
                setSelectedDropdownValueCustomer(value);
                setFieldValue(previous => ({ ...previous }));
                break;
            default:
                break;
        }
    };

    const onTextChange = (key) => (...data) => {
        if (Array.isArray(data)) {
            const fields = ['firstName', 'lastName', 'email', 'mobileNumber']
            const value = key === "isActive" ? (data[1] === "active") : (fields.includes(key) ? data[1] : data[0]);
            setFieldValue(previous => ({ ...previous, [key]: value }))
        }
    }


    return (
        <div className="mx-8 sm:mx-20 mt-12 mb-10">
            <div className='customer__wrapper'>
                <h1 className="text-center font-medium text-2xl mx-6 my-8 sm:text-left">
                    {title}
                </h1>
                <div className='customer__section flex flex-col lg:flex-row gap-3 m-6'>
                    <div className='addCategory customer__sidebar basis__20 pt-4 px-3 bg-white rounded-md'>
                        <ul className='side_menubar text-center md:text-left'>
                            <li className='active'>Personal Information</li>
                            <li onClick={() => props.history.push(PointOfContact + "/" + editModeData?.customerId, editModeData)}>Point Of Contact</li>
                            <li onClick={() => props.history.push(Address + "/" + editModeData?.customerId, editModeData)}>Addresses</li>
                        </ul>
                    </div>
                    <div className="addCategory bg-white center rounded-md w-full">

                        <div className="wrapper__1">
                            <div className="wrapper__2">
                                <div className="add-catg-form-wrapper maintenance__wrapper px-4 pt-4">
                                    <h3 className='text-base font-bold'>Personal Information</h3>
                                    <div className='customer__detail_section mt-6 flex flex-col'>
                                        <h4 className='text-xs font-bold mb-4'>Customer Details</h4>
                                        <div className='grid md:grid-cols-4 gap-4'>
                                            <Input  {...formConfiguration("firstName", "First Name")} selectedValue={fieldValue?.firstName} cb={onTextChange('firstName')} />
                                            <Input  {...formConfiguration("lastName", "Last Name")} selectedValue={fieldValue?.lastName} cb={onTextChange('lastName')} />
                                            <Input  {...costInputFieldConfigurationEmail("email", "Primary Email")} selectedValue={fieldValue?.email} cb={onTextChange('email')} />
                                            <Input  {...costInputFieldConfigurationMobile("mobileNumber", "Mobile Number")} selectedValue={fieldValue?.mobileNumber} cb={onTextChange('mobileNumber')} />
                                            <ReactTypeHead
                                                isClearable
                                                header="Customer Type"
                                                handleSelect={handleOnChange('customerType')}
                                                dataList={customerTypeList}
                                                fields={{ key: 'id', value: 'title' }}
                                                placeholder="Customer Type"
                                                value={selectedDropdownValueCustomer}
                                                parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                            />

                                            <ReactTypeHead
                                                isClearable
                                                header="Customer Category"
                                                handleSelect={handleOnChange('customerCategory')}
                                                dataList={customerCategoryList}
                                                fields={{ key: 'id', value: 'title' }}
                                                placeholder="Select Customer Category"
                                                value={selectedDropdownValueCustomerCategory}
                                                parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                            />
                                        </div>


                                    </div>

                                    <div className='POC__section my-8'>

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
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

AddEditCustomer.defaultProps = defaultProps;
export default AddEditCustomer;
