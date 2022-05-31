import React, { useEffect, useState } from 'react';
import Form from '@common/widgets/Form';
import exposedPath from '@ExposedPath';

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
        <div className="bg-white center m-20 p-20">
            <center>
                <h1 className="text-left font-medium text-4xl mb-6 inline-block">Create New Category</h1>
                <div className="shadow rounded-md  p-4 mb-4 w-600px">   
                    <Form formConfiguration={formConfiguration} onSubmit={onFormSubmit} buttonTitle="Save"></Form>
                </div>
            </center>
        </div>
    );
};

AddEditCategory.defaultProps = defaultProps;
export default AddEditCategory;
