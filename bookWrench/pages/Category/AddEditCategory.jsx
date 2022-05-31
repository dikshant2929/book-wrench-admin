import React, { useEffect, useState } from 'react';
import Form from '@common/widgets/Form';
import exposedPath from '@ExposedPath';
import './Category.scss';

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
            label: 'Category Title',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'title',
        },
        isRequired: true,
    },
];


const AddEditCategory = (props) => {
    const [isShimmerVisible, setShimmer] = useState(false);

    const onFormSubmit = (data) => {
        const { isValidForm, ...request} = data;
        console.log(request);
    };

    return (
        <div className="addCategory bg-white center m-20 py-20">
            <div className="w-600px mx-auto ">
                <h1 className="font-medium text-2xl mb-2">Create New Category</h1>
                <div className="add-catg-form-wrapper shadow rounded-md p-10">   
                    <Form formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle="Save"></Form>
                </div>
            </div>
        </div>
    );
};

AddEditCategory.defaultProps = defaultProps;
export default AddEditCategory;
