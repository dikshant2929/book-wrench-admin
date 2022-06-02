import React, { useEffect, useState } from 'react';
import Form from '@common/widgets/Form';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Department.scss';
import Service from "./Services/department.service";

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
        },
        extraProps: {
            label: 'Department Title',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'title',
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
        const { isValidForm, ...request} = data;
        if(isEditMode){
            Service.editCategory(request, () => props.history.push(Category), { }, editModeData.id);
        }else{
            Service.addCategory(request, () => props.history.push(Category))
        }
    };

    useEffect(() => {
        const encryptedData = props?.match?.params?.editCategory;
        if(encryptedData){
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
        <div className="addDepartment bg-white center mx-8 sm:mx-20 mt-12 mb-10 py-20 rounded-md">
            <div className="max-w-[600px] mx-4 md:mx-auto ">
                <h1 className="text-center font-medium text-2xl mb-2 sm:text-left">{title}</h1>
                <div className="p-6 add-catg-form-wrapper shadow-xl rounded-md sm:p-10">   
                    <Form formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle={`${isEditMode ? "Update" : "Save"}`}></Form>
                </div>
            </div>
        </div>
    );
};

AddEditDepartment.defaultProps = defaultProps;
export default AddEditDepartment;
