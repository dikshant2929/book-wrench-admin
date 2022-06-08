import React, { useEffect, useState } from 'react';
import Form from '@common/widgets/Form';
import RadioBox from '@common/elements/Radiobox';
import Textarea from '@common/elements/Textarea';

import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Department.scss';
import Service from "./Services/department.service";
import FileUpload from '@app/widgets/FileUpload';

const { Department } = exposedPath;
const defaultProps = {

};


const formConfiguration = [
    {
        id: 'title',
        componentType: 'InputBox',
        selectedValue: '',
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
    },
];


const AddEditDepartment = (props) => {
   
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState("Create New Department");

    console.log(props);
    const onFormSubmit = (data) => {
        
        const { isValidForm, ...request } = data;
        console.log(isValidForm,request)
        if (isEditMode) {
            Service.editDepartment(request, () => props.history.push(Department), {}, editModeData.id);
        } else {
            Service.addDepartment(request, () => props.history.push(Department))
        }
    };

    const radioValue = (name, val,key) => {
        console.log(name, val,key)

    }

    const textareaValue = (name) => {
        console.log(name)

    }

    

    useEffect(() => {
        const encryptedData = props?.match?.params?.editDepartment;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            setTitle(`Edit Department (${data.title})`)
            formConfiguration[0].selectedValue = data.title;
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
        <div className="q">           
            <div className="a">
                
                <div className="add-catg-form-wrapper">                    
                    <Form buttonClass="" buttonWidth='' formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle={`${isEditMode ? "Update" : "Save"}`}>
                        <div className='secondDiv pl-10 mb-10'>
                            <div className='status mb-8'>
                               <RadioBox defaultChecked="active" cb={radioValue}/>
                            </div>
                            <div className='textArea w-4/12 mb-8'>
                                <Textarea value="test text" cb={textareaValue}/>
                            </div>
                            <FileUpload/>
                           
                        </div>
                        <div className='btn-wrapper m-auto text-center border-t-2 border-[#EDEFFB] py-8'>
                        <button className="button-primary inline-flex w-1/3 px-20px text-sm h-46px ">Save</button>
                    </div>
                    </Form>
                     
                </div>                
            </div>
        </div>
        </div>
    );
};

AddEditDepartment.defaultProps = defaultProps;
export default AddEditDepartment;
