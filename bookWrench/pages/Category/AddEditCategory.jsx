import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import RadioBox from '@common/elements/Radiobox';
import Textarea from '@common/elements/Textarea';
import ReactTypeHead from '@common/elements/ReactTypehead';
import FileUpload from '@app/widgets/FileUpload';

import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Category.scss';
import Service from './Services/category.service';
import Button from '@button';

const { Category } = exposedPath;
const defaultProps = {};

const formConfiguration = {
        id: 'title',
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'text',
            name: 'title',
            // maxLength : "3",
            'data-gsv-err-msg': 'Title is required.',
            classNameLabel: 'label__small',
            classNameInput: 'form__input_w_height',
        },
        extraProps: {
            label: 'Category Title',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'title',
            parentClass: '',
            newInptClass: 'newClass',
        },
        isRequired: true,
    }
    // {
    //     id: "qualitification",
    //     componentType: "Dropdown",
    //     selectedValue : "",
    //     className: "mb-6 leading-8 block w-full rounded-md outline-none",
    //     classNamePrefix: "outline-none bg-gray-100 border-transparent border-none ",
    //     options : [
    //         {
    //             value : "tenth",
    //             label : "Secondary",
    //         },
    //         {
    //             value : "twelth",
    //             label : "Senior Secendory",
    //         },
    //         {
    //             value : "bachelors",
    //             label : "Graduation",
    //         },
    //         {
    //             value : "masters",
    //             label : "Post Graduation",
    //         }
    //     ]
    // },
;

const AddEditCategory = (props) => {

    const  mandatoryFields = ["departmentId", "title"];

    const [isShimmerVisible, setShimmer] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState('Create New Category');
    const [selectedDropdownValue, setDropdownValue] = useState(null);
    const [ isButtonEnable, setButtonEnable] = useState(false);

    const [departmentList, setDepartmentList] = useState([]);

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

    // console.log(props);
    const onFormSubmit = (data) => {
        console.log(fieldValue);
        // const { isValidForm, ...request } = data;
        if (isEditMode) {
            Service.editCategory(fieldValue, () => props.history.push(Category), {}, editModeData.id);
        } else {
            Service.addCategory(fieldValue, () => props.history.push(Category));
        }
    };

    useEffect(() => {

        let departmentId = null;

        const encryptedData = props?.match?.params?.editCategory;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            
            const { title, isActive, description, icon } = data;
            setFieldValue({ title, isActive, description, icon, departmentId : data.departmentId.id });
            
            departmentId = data.departmentId.id;
            setTitle(`Edit Category (${data.title})`);
            formConfiguration.selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }

        fetchDepartmentList(departmentId);

        return () => formConfiguration.selectedValue = null;
    }, [props]);

    const fetchDepartmentList = (departmentId) => {
        Service.departmentList(data => {
            setDepartmentList(data);
            console.log(departmentId);
            if(departmentId){
                const selectedData = data.find(item => item.id === departmentId);
                console.log(selectedData);
                setDropdownValue({...selectedData, label : selectedData.title, value: selectedData.id})
            }
            
        })
    }
    

    const handleOnChange = (key) => (value) => {
        console.log(value);
        setDropdownValue(value);
        setFieldValue(previous => ({...previous, [key] : value.id }))
    };

    const onTextChange = (key) => (...data) => {
        if(Array.isArray(data)){
            const value = key === "isActive" ? (data[1] === "active") : ( key === "title" ? data[1] : data[0]);
            setFieldValue(previous => ({...previous, [key] : value }))
        }
    }

    return (
        <div className="addCategory bg-white center mx-8 sm:mx-20 mt-12 mb-10 rounded-md">
            <h1 className="text-center font-medium text-2xl px-10 py-8 sm:text-left border-b-2 border-[#EDEFFB]">
                {title}
            </h1>
            <div className="wrapper__1">
                <div className="wrapper__2">
                    <div className="add-catg-form-wrapper">
                        <div className="flex items-center w-full department__header m-10 gap-4">
                            <ReactTypeHead
                                header="Industry"
                                handleSelect={handleOnChange('departmentId')}
                                dataList={departmentList}
                                fields={{ key: 'id', value: 'title' }}
                                placeholder="Select Industry"
                                value={selectedDropdownValue}
                                parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                            />
                            <Input selectedValue={editModeData?.title} {...formConfiguration} cls="p-1 min-w-1/4 inline-block" cb={onTextChange('title')} />
                            <div className="status">
                                <RadioBox
                                    defaultValue={(fieldValue.isActive) ? 'active' : 'inactive'}
                                    cb={onTextChange('isActive')}
                                />
                            </div>
                        </div>
                        <div className="file_upload_wrapper w-full flex gap-4 mx-10 mb-10">
                            <Textarea value={editModeData?.description} onChange={onTextChange('description')} />
                            <FileUpload imageURL={fieldValue.icon} title="Upload Department Image" imagePath={onTextChange('icon')} />
                        </div>
                        <div className="btn-wrapper m-auto text-center border-t-2 border-[#EDEFFB] py-6">
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

AddEditCategory.defaultProps = defaultProps;
export default AddEditCategory;
