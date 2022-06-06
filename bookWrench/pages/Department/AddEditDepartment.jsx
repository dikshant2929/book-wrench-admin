import React, { useEffect, useState } from 'react';
import Form from '@common/widgets/Form';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Department.scss';
import Service from "./Services/department.service";
import FileUpload from '@app/widgets/FileUpload';

const { Category } = exposedPath;
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
    const [isShimmerVisible, setShimmer] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState("Create New Department");

    console.log(props);
    const onFormSubmit = (data) => {
        const { isValidForm, ...request } = data;
        if (isEditMode) {
            Service.editCategory(request, () => props.history.push(Category), {}, editModeData.id);
        } else {
            Service.addCategory(request, () => props.history.push(Category))
        }
    };

    useEffect(() => {
        const encryptedData = props?.match?.params?.editCategory;
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
                            <label className=" block text-xs text-gray-700 mb-1 text-left">Status </label>
                            <div className="flex">
                                <div className="form-check-inline pr-8">
                                    <input className="text-green-300 outline-green-300 form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-green-300 bg-green checked:bg-green-300 checked:border-green-300 focus:outline transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer focus:ring-green-300" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                    <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Active</label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="text-green-300 form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-green-300 bg-white outline-green-300 checked:bg-green-300 checked:border-green-300 focus:outline transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer focus:ring-green-300" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio20">Inactive</label>
                                </div>
                            
                            </div>
                            </div>
                            <div className='textArea w-4/12 mb-8'>
                            <label className=" block text-xs text-gray-700 mb-1 text-left">Description </label>
                            <textarea className='w-full rounded-md border border-gray-200 focus:ring-0' rows="3"></textarea>
                            </div>
                            <FileUpload></FileUpload>
                           
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
