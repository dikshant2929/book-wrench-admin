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
    const [fieldValue, setFieldValue] = useState({
        isActive: false,
        description: "",
        icon: ""
    })

    const onFormSubmit = (data) => {

        const { isValidForm, ...request } = data;
        request.isActive = fieldValue.isActive;
        request.description = fieldValue.description
        if (isEditMode) {
            Service.editDepartment(request, () => props.history.push(Department), {}, editModeData.id);
        } else {
            Service.addDepartment(request, () => props.history.push(Department))
        }
    };

    const radioValue = (name, val, key) => {
        const prevState = fieldValue;
        prevState.isActive = (val === "active" ? true : false)
        setFieldValue(prevState)

    }

    const textareaValue = (name) => {
        const prevState = fieldValue;
        prevState.description = name
        setFieldValue(prevState)

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
            <div className="">
                <div className="">
                    <div className="add-catg-form-wrapper">
                        <Form buttonClass="" buttonWidth='' formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle={`${isEditMode ? "Update" : "Save"}`}>
                            <div className='status p-1 min-w-1/4 mb-2 inline-block w-[49%]'>
                                {/* <RadioBox defaultValue={editModeData?.isActive ? "active" : "inactive"} cb={radioValue} /> */}
                                <label class="labelClass mt-8 block text-xs text-gray-700 mb-1 text-left truncate">Active?</label>
                                <div className='switch flex items-center h-46px'>
                                    <input type="checkbox" id="checkbox_switch" className='order-2' />
                                    <label htmlFor="checkbox_switch" className='mb-0'>
                                        <div className='pt-1.5 px-1.5'>
                                            <span className='text-white px-1 hidden switch_yes'>Yes</span>
                                            <span className='text-white px-1 hidden switch_no'>No</span>
                                        </div>

                                    </label>
                                </div>


                            </div>
                            <div className="file_upload_wrapper w-full flex gap-4">
                                <Textarea value={editModeData?.description} cb={textareaValue} />
                                <FileUpload />
                            </div>


                        </Form>
                        <div className='btn-wrapper m-auto text-center border-t-2 border-[#EDEFFB] py-8'>
                            <button className="button-primary inline-flex px-12 py-5 text-sm h-46px ">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddEditDepartment.defaultProps = defaultProps;
export default AddEditDepartment;
