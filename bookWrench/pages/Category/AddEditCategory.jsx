import React, { useEffect, useState } from 'react';
import Form from '@common/widgets/Form';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Category.scss';
import Service from "./Services/category.service";

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
            classNameLabel:"label__small",
            classNameInput:"form__input_w_height"
        },
        extraProps: {
            label: 'Category Title',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'title',
            parentClass: '',
            newInptClass: 'newClass'
        },
        isRequired: true,
    },
];


const AddEditCategory = (props) => {
    const [isShimmerVisible, setShimmer] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState("Create New Category");

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
            setTitle(`Edit Category (${data.title})`)
            formConfiguration[0].selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }
        return () => {
            formConfiguration[0].selectedValue = "";
        }
    }, [props]);

    return (

        <div className='addCategory mx-8 sm:mx-20 mt-12 '>
            <h1 className="text-center bg-white px-10 py-8 font-medium text-2xl sm:text-left border-b-2 border-[#EDEFFB] rounded-t-md">{title}</h1>
            <div className=" bg-white center rounded-b-md">
                <div className="">
                    <div className=" add-catg-form-wrapper p-10">
                        <Form className='categoryForm' formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle={`${isEditMode ? "Update" : "Save"}`}>
                           <></> 
                        </Form>
                    </div>
                </div>
                <div className='btn-wrapper m-auto text-center border-t-2 border-[#EDEFFB] py-6'>
                <button className="button-primary form__button">Save</button>
                </div>                
            </div>
        </div>

    );
};

AddEditCategory.defaultProps = defaultProps;
export default AddEditCategory;
