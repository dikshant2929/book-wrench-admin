import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import ReactTypeHead from '@common/elements/ReactTypehead';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './User.scss';
import Services from './Services/user.service';
import Button from '@button';
import UALink from '@common/elements/UALink';

const { User, PointOfContact,Address,UserMaintenance } = exposedPath;
const defaultProps = {};


const userTypeList = [
    {
        id: "admin",
        title: "Admin"
    },
    {
        id: "user",
        title: "User"
    },
    // {
    //     id: "gold",
    //     title: "Gold"
    // },
    // {
    //     id: "platinum",
    //     title: "Platinum"
    // },
    // {
    //     id: "diamond",
    //     title: "Diamond"
    // },
    
]

const userCategoryList = [
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

const formConfigurationPassword = (keyOfInput, label) => {
    return {
        id: keyOfInput,
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'password',
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

const mandatoryFields = ["username", "name", "password"];

const AddEditUser = (props) => {    

    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState('Add New User');
    const [selectedDropdownValueUserCategory, setSelectedDropdownValueUserCategory] = useState(null);
    const [selectedDropdownValueUser, setSelectedDropdownValueUser] = useState(null);
    const [isButtonEnable, setButtonEnable] = useState(false);
    const [fieldValue, setFieldValue] = useState({
    })

    useEffect(() => {
        const isValidForm = mandatoryFields.every(item => Boolean(fieldValue[item]))
        setButtonEnable(isValidForm);
    }, [fieldValue]);

    const onFormSubmit = (data) => {

        // console.log(data);
        if (isEditMode) {
            delete data.username;
            Services.editUser(data, () => props.history.push(User), {}, editModeData.id);
        } else {
            Services.addUser(data, () => props.history.push(User));
        }
    };

    useEffect(() => {

        const encryptedData = props?.match?.params?.usercustomer;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            const { name, username, email, phoneNumber, role } = data;
            setFieldValue({ name, username, email, phoneNumber, role });

            if (data.role) {
                const selectedData = userTypeList.find(item => item.id === data.role);
                setSelectedDropdownValueUser({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }

            setTitle(`Edit User #${data.username}`);
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
            case "userCategory":
                setSelectedDropdownValueUserCategory(value);
                setFieldValue(previous => ({ ...previous }));
                break;
            case "role":
                setSelectedDropdownValueUser(value);
                setFieldValue(previous => ({ ...previous }));
                break;
            default:
                break;
        }
    };

    const onTextChange = (key) => (...data) => {
        if (Array.isArray(data)) {
            const fields = ['username', 'name', 'email', 'phoneNumber', "password"]
            const value = key === "isActive" ? (data[1] === "active") : (fields.includes(key) ? data[1] : data[0]);
            setFieldValue(previous => ({ ...previous, [key]: value }))
        }
    }


    return (
        <div className="mx-8 sm:mx-20 mt-12 mb-10">
            <div className='user__wrapper'>
                <h1 className="text-center font-medium text-2xl mx-6 my-8 sm:text-left">
                    {title}
                </h1>
                <div className='user__section flex flex-col lg:flex-row gap-3 m-6'>
                    <div className='addCategory user__sidebar basis__20 pt-4 px-3 bg-white rounded-md'>
                        <ul className='side_menubar text-center md:text-left'>
                            <li className='active'>Personal Information</li>
                            { isEditMode && <>
                                <li onClick={() => props.history.push(PointOfContact + "/" + editModeData?.userId, editModeData)}>Password</li>
                            </>
                            }
                        </ul>
                    </div>
                    <div className="addCategory bg-white center rounded-md w-full">

                        <div className="wrapper__1">
                            <div className="wrapper__2">
                                <div className="add-catg-form-wrapper maintenance__wrapper px-4 pt-4">
                                    <h3 className='text-base font-bold'>Personal Information</h3>
                                    <div className='user__detail_section mt-6 flex flex-col'>
                                        <h4 className='text-xs font-bold mb-4'>User Details</h4>
                                        <div className='grid md:grid-cols-4 gap-4'>
                                            {/* <Input  {...formConfiguration("firstName", "First Name")} selectedValue={fieldValue?.firstName} cb={onTextChange('firstName')} /> */}
                                            <Input  {...formConfiguration("name", "Name")} selectedValue={fieldValue?.name} cb={onTextChange('name')} />
                                            <Input  {...costInputFieldConfigurationEmail("email", "Primary Email")} selectedValue={fieldValue?.email} cb={onTextChange('email')} />
                                            <Input  {...costInputFieldConfigurationMobile("phoneNumber", "Phone Number")} selectedValue={fieldValue?.phoneNumber} cb={onTextChange('phoneNumber')} />
                                            <ReactTypeHead
                                                isClearable
                                                header="User Type"
                                                handleSelect={handleOnChange('role')}
                                                dataList={userTypeList}
                                                fields={{ key: 'id', value: 'title' }}
                                                placeholder="User Type"
                                                value={selectedDropdownValueUser}
                                                parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                            />

                                            <Input  {...formConfiguration("username", "Username")} selectedValue={fieldValue?.username} cb={onTextChange('username')} disabled={isEditMode}/>
                                            <Input  {...formConfigurationPassword("password", "Password")} selectedValue={fieldValue?.password} cb={onTextChange('password')} />
                                            {/* <ReactTypeHead
                                                isClearable
                                                header="User Category"
                                                handleSelect={handleOnChange('userCategory')}
                                                dataList={userCategoryList}
                                                fields={{ key: 'id', value: 'title' }}
                                                placeholder="Select User Category"
                                                value={selectedDropdownValueUserCategory}
                                                parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                            /> */}
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

AddEditUser.defaultProps = defaultProps;
export default AddEditUser;
