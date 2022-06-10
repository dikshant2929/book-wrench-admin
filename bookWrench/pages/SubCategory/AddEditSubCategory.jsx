import React, { useEffect, useState } from 'react';
import Form from '@common/widgets/Form';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './SubCategory.scss';
import Service from "./Services/SubCategory.service";

const { SubCategory } = exposedPath;
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
            classNameLabel: 'labelClass',
            classNameInput: 'inputClass'
        },
        extraProps: {
            label: 'Sub-Category Title',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'title',
            parentClass: '',
            newInptClass: 'newClass'
        },
        isRequired: true,
    },
];


const AddEditSubCategory = (props) => {
    const [isShimmerVisible, setShimmer] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState("Create New Sub-Category");

   
    const onFormSubmit = (data) => {
        const { isValidForm, ...request} = data;
        if(isEditMode){
            Service.subeditCategory(request, () => props.history.push(SubCategory), { }, editModeData.id);
        }else{
            Service.subaddCategory(request, () => props.history.push(SubCategory))
        }
    };

    useEffect(() => {
        const encryptedData = props?.match?.params?.editSubCategory;
        if(encryptedData){
            const data = JSON.parse(encrypt.decode(encryptedData));
            setTitle(`Edit Sub-Category (${data.title})`)
            formConfiguration[0].selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }
        return () => {
            formConfiguration[0].selectedValue = "";
        }
    }, [props]);

    return (
        <div className="add_Sub_Category bg-white center mx-8 sm:mx-20 mt-12 mb-10 rounded-md">
           
           <h1 className="text-center font-medium text-2xl px-10 py-8 sm:text-left border-b-2 border-[#EDEFFB]">{title}</h1>
                <div className="p-6 add-catg-form-wrapper rounded-md sm:px-10">   
                    <Form buttonClass="" buttonWidth='' className='categoryForm' formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle={`${isEditMode ? "Update" : "Save"}`}>
                        <span></span>
                    </Form>
                   
                </div> 
                <div className='btn-wrapper m-auto text-center border-t-2 border-[#EDEFFB] py-8'>
                            <button className="button-primary inline-flex px-12 py-5 text-sm h-46px ">Save</button>
                        </div>           
        </div>
    );
};

AddEditSubCategory.defaultProps = defaultProps;
export default AddEditSubCategory;
