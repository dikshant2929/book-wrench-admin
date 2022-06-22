import React, { useEffect, useState } from 'react';
import Form from '@common/widgets/Form';
import RadioBox from '@common/elements/Radiobox';
import Textarea from '@common/elements/Textarea';

import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Department.scss';
import Service from "./Services/department.service";
import FileUpload from '@app/widgets/FileUpload';
import Input from '@common/elements/Input';
import Button from '@button';
const { Department } = exposedPath;
const defaultProps = {

};


const formConfiguration = {
    id: 'title',
    componentType: 'InputBox',
   
    props: {
        type: 'text',
        name: 'title',
        // maxLength : "3",
        'data-gsv-err-msg': 'Title is required.',
        classNameLabel:"label__small",
        classNameInput:"form__input_w_height"
    },
    extraProps: {
        label: 'Department Title (*)',
        validation: 'required,minLength',
        minLength: 1,
        parentId: 'title',
        parentClass: '',
        newInptClass: 'newClass'

    },
    isRequired: true,
}


const AddEditDepartment = (props) => {
    const  mandatoryFields = ["title", "icon"];
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState("Create New Department");
    const [ isButtonEnable, setButtonEnable] = useState(false);
    const [fieldValue, setFieldValue] = useState({
        title:"",
        isActive: true,
        description: "",
        icon: ""
    })

    useEffect(() => {
        const isValidForm = mandatoryFields.every(item => Boolean(fieldValue[item]))
        setButtonEnable(isValidForm);
    }, [fieldValue]);

    const onFormSubmit = (fieldValue) => {
     if (isEditMode) {
            Service.editDepartment({...fieldValue}, () => props.history.push(Department), {}, editModeData.id);
        } else {
            Service.addDepartment({...fieldValue}, () => props.history.push(Department))
        }
    };

    const onTextChange = (key) => (...data) => {
        if(Array.isArray(data)){
            const value = key === "isActive" ? (data[1] === "active") : ( key === "title" ? data[1] : data[0]);
            setFieldValue(previous => ({...previous, [key] : value }))
        }
    }

    useEffect(() => {
        const encryptedData = props?.match?.params?.editDepartment;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            setTitle(`Edit Department (${data.title})`)
            setEditModeData(data);
            setEditMode(true);
            const {title,isActive,description,icon} = data
            setFieldValue({title,isActive,description,icon})
        }
        return () => {
            setFieldValue(prevState => ({...prevState,title:""}))
        }
    }, [props]);

    return (
        <div className="addDepartment bg-white center mx-8 sm:mx-20 mt-12 mb-10 rounded-md">
            <h1 className="text-center font-medium text-2xl px-10 py-8 sm:text-left border-b-2 border-[#EDEFFB]">{title}</h1>
            <div className="wrapper__1">
                <div className="wrapper__2">
                    <div className="add-catg-form-wrapper">
                            <div className='flex flex-col md:flex-row items-center w-full department__header md:m-10 gap-4'>
                            <Input  selectedValue={editModeData?.title} {...formConfiguration} cb={onTextChange('title')}/>
                            <div className='status'>
                                <RadioBox defaultValue={(fieldValue.isActive) ? "active" : "inactive"} cb={onTextChange('isActive')} />
                            </div>
                            </div>
                            <div className="file_upload_wrapper w-full flex-col md:flex-row flex gap-4 md:mx-10 mb-10">
                                <Textarea value={editModeData?.description} cb={onTextChange('description')} />
                                <FileUpload imageURL={fieldValue.icon} title="Upload Department Image (*)" imagePath={onTextChange('icon')}/>
                            </div>
                            <div className='btn-wrapper m-auto text-center border-t-2 border-[#EDEFFB] py-6'>
                            <Button                            
                                disabled={!isButtonEnable ?? false}  
                                onClick={(e) => {
                                    e.preventDefault();
                                    onFormSubmit(fieldValue);
                                }}
                                className={`form__button ${!isButtonEnable ?? false ? 'btn-disabled' : 'button-primary'}`}
                                title = {isEditMode ? 'Update' : 'Save'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddEditDepartment.defaultProps = defaultProps;
export default AddEditDepartment;
