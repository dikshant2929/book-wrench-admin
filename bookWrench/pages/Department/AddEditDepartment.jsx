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
        classNameLabel: 'labelClass mt-8',
        classNameInput: 'inputClass mb-6'
    },
    extraProps: {
        label: 'Department Title',
        validation: 'required,minLength',
        minLength: 1,
        parentId: 'title',
        parentClass: '',
        newInptClass: 'newClass'

    },
    isRequired: true,
}


const AddEditDepartment = (props) => {

    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState("Create New Department");
    const [fieldValue, setFieldValue] = useState({
        title:"",
        isActive: false,
        description: "",
        icon: ""
    })

    const onFormSubmit = (data) => {
    
        //const { isValidForm=true, ...request } = data;
    
        if (isEditMode) {
            Service.editDepartment({...fieldValue}, () => props.history.push(Department), {}, editModeData.id);
        } else {
            Service.addDepartment({...fieldValue}, () => props.history.push(Department))
        }
    };

    const radioValue = (name, val, key) => {
        setFieldValue(prevState => ({...prevState,isActive:(val === "active")}))
    }
    const titleName =(name,value,e) => {
        setFieldValue(prevState => ({...prevState,title:value}))
    }

    const textareaValue = (name) => {
        setFieldValue(prevState => ({...prevState,description:name}))

    }
    const imagePath = (path) => {
        setFieldValue(prevState => ({...prevState,icon:path}))
    }

    useEffect(() => {
        const encryptedData = props?.match?.params?.editDepartment;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            setTitle(`Edit Department (${data.title})`)
           // formConfiguration[0].selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }
        return () => {
            formConfiguration[0].selectedValue = "";
        }
    }, [props]);

    return (
        <div className="addDepartment bg-white center mx-8 sm:mx-20 mt-12 mb-10 rounded-md">
            <h1 className="text-center font-medium text-2xl px-10 py-8 sm:text-left border-b-2 border-[#EDEFFB]">{title}</h1>
            <div className="">
                <div className="">
                    <div className="add-catg-form-wrapper">
                            <div className='flex items-center w-full department__header m-10 gap-4'>
                            <Input  selectedValue={editModeData?.title} {...formConfiguration} cb={titleName}/>
                            <div className='status'>
                            <RadioBox defaultValue={editModeData?.isActive ? "active" : "inactive"} cb={radioValue} />
                            </div>
                            </div>
                            <div className="file_upload_wrapper w-full flex gap-4 mx-10 mb-10">
                                <Textarea value={editModeData?.description} cb={textareaValue} />
                                <FileUpload title="Upload Department Image" imagePath={imagePath}/>
                            </div>
                            <div className='btn-wrapper m-auto text-center border-t-2 border-[#EDEFFB] py-8'>
                            <button onClick={(e) => {e.preventDefault();onFormSubmit()}} className="button-primary inline-flex px-12 py-5 text-sm h-46px ">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddEditDepartment.defaultProps = defaultProps;
export default AddEditDepartment;
