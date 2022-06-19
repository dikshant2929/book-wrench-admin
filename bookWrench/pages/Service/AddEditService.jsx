import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import RadioBox from '@common/elements/Radiobox';
import Textarea from '@common/elements/Textarea';
import ReactTypeHead from '@common/elements/ReactTypehead';
import FileUpload from '@app/widgets/FileUpload';

import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Service.scss';
import Service from './Services/service.service';
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
            'data-gsv-err-msg': 'Name is required.',
            classNameLabel: 'label__small',
            classNameInput: 'form__input_w_height',
        },
        extraProps: {
            label: 'Service Name',
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'title',
            parentClass: 'w-full',
            newInptClass: 'newClass',
        },
        isRequired: true,
        cls : "p-1"
    }
;

const costInputFieldConfiguration = (keyOfInput, label) => {
    return {
        id: keyOfInput,
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'number',
            name: keyOfInput,
            // maxLength : "3",
            'data-gsv-err-msg': label +' is required.',
            classNameLabel: 'label__small',
            classNameInput: 'form__input_w_height',
        },
        extraProps: {
            label,
            validation: 'required,minLength',
            minLength: 1,
            parentId: keyOfInput,
            parentClass: 'w-auto',
            newInptClass: 'newClass',
        },
        isRequired: true,
        cls : "p-1"
    }
}
    ;

const AddEditService = (props) => {

    const  mandatoryFields = ["categoryId", "title"];

    const [isShimmerVisible, setShimmer] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState('Create New Service');
    const [selectedDropdownValue, setDropdownValue] = useState(null);
    const [selectedSubCategoryDropdownValue, setSubCategoryDropdownValue] = useState(null);

    const [ isButtonEnable, setButtonEnable] = useState(false);

    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);

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

    const onFormSubmit = (data) => {
        if (isEditMode) {
            Service.editCategory(fieldValue, () => props.history.push(Category), {}, editModeData.id);
        } else {
            Service.addCategory(fieldValue, () => props.history.push(Category));
        }
    };

    useEffect(() => {

        let categoryId = null;

        const encryptedData = props?.match?.params?.editCategory;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            
            const { title, isActive, description, icon } = data;
            setFieldValue({ title, isActive, description, icon, categoryId : data.categoryId.id });
            
            categoryId = data.categoryId.id;
            setTitle(`Edit Service (${data.title})`);
            formConfiguration.selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }

        fetchCategoryList(categoryId);

        return () => formConfiguration.selectedValue = null;
    }, [props]);

    const fetchCategoryList = (categoryId) => {
        Service.categoryList(data => {
            setCategoryList(data);
            if(categoryId){
                const selectedData = data.find(item => item.id === categoryId);
                setDropdownValue({...selectedData, label : selectedData.title, value: selectedData.id})
            }
            
        })
    }
    
    const fetchSubCategoryList = (categoryId, subCategoryId) => {
        Service.subCategoryList({categoryId} , data => {
            setSubCategoryList(data);
            if(subCategoryId){
                const selectedData = data.find(item => item.id === subCategoryId);
                setSubCategoryDropdownValue({...selectedData, label : selectedData.title, value: selectedData.id})
            }
            
        })
    }

    const handleOnChange = (key) => (value) => {
        setFieldValue(previous => ({...previous, [key] : value.id }));

        switch(key){
            case "categoryId":
                setSubCategoryList([])
                setSubCategoryDropdownValue(null);
                setDropdownValue(value);
                fetchSubCategoryList(value.id);
                setFieldValue(previous => ({...previous, subCategoryId: undefined}));
                break;
            case "subCategoryId":
                setSubCategoryDropdownValue(value);
                break;
            default:
                break;
        }
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
                        <div className="flex items-center w-full category__header m-10 gap-4">
                            <label>Category</label>
                            <ReactTypeHead
                                header="Category"
                                handleSelect={handleOnChange('categoryId')}
                                dataList={categoryList}
                                fields={{ key: 'id', value: 'title' }}
                                placeholder="Select Category" 
                                value={selectedDropdownValue} 
                                parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                            />

                            <ReactTypeHead
                                header="Sub Category"
                                handleSelect={handleOnChange('subCategoryId')}
                                dataList={subCategoryList}
                                fields={{ key: 'id', value: 'title' }}
                                placeholder="Select Sub-Category" 
                                value={selectedSubCategoryDropdownValue} 
                                parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                            />

                            {/* 
                            <div className="status">
                                <RadioBox
                                    defaultValue={(fieldValue.isActive) ? 'active' : 'inactive'}
                                    cb={onTextChange('isActive')}
                                />
                            </div> */}
                        </div>
                        <hr/>
                        <div className="flex file_upload_wrapper items-center w-full category__header m-10 gap-4">
                            <label>Service</label>
                            <div className='flex-col w-1/2'>
                                <Input selectedValue={editModeData?.title} {...formConfiguration} cb={onTextChange('title')} />
                                <div className='flex gap-2'>
                                    <Textarea parentClass="textArea w-1/2" value={editModeData?.description} onChange={onTextChange('serviceDescription')} title="Service Description" name="serviceDescription"/>
                                    <Textarea parentClass="textArea w-1/2" value={editModeData?.description} onChange={onTextChange('warrentyDescription')} title="Warrenty Description" name="serviceDescription"/>
                                </div>
                            </div>
                            <FileUpload parentClass='file_upload w-[36%] self-start' imageURL={fieldValue.icon} title="Upload Department Image" imagePath={onTextChange('icon')} />
                            
                        </div>
                        <hr/>
                        <div className="w-auto flex gap-4 m-10">
                            <label>Cost</label>
                            <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("constOfService", "Cost Of Service")} cb={onTextChange('costOfService')} />
                            <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("costOfMaterial", "Cost Of Material")} cb={onTextChange('costOfMaterial')} />
                            <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("commission", "Commission")} cb={onTextChange('commission')} />
                            <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("labourMinuites", "Labour Minuites")} cb={onTextChange('labourMinuites')} />
                            <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("labourCost", "Labour Cost")} cb={onTextChange('labourCost')} />
                            <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("memberPrice", "Member Price")} cb={onTextChange('memberPrice')} />
                            <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("addOnPrice", "Add On Price")} cb={onTextChange('addOnPrice')} />
                            <label><input type="checkbox" />Taxeable</label>
                            <label><input type="checkbox" />Discountable</label>
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

AddEditService.defaultProps = defaultProps;
export default AddEditService;
