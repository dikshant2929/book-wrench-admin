import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import RadioBox from '@common/elements/Radiobox';
import CheckBox from '@common/elements/CheckBox';
import MultipleVideoUploader from '@common/elements/MultipleVideoUploader';



import Textarea from '@common/elements/Textarea';
import ReactTypeHead from '@common/elements/ReactTypehead';
import FileUpload from '@app/widgets/FileUpload';

import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Service.scss';
import Services from './Services/service.service';
import Button from '@button';
import MultipleDocUploader from '../../../common/elements/MultipleDocUploader';
import MultipleImageUploader from '../../../common/elements/MultipleImageUploader';
import AssociatedProducts from '../../widgets/AssociatedProducts';

const { Service } = exposedPath;
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
    cls: "p-0"
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
            'data-gsv-err-msg': label + ' is required.',
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
        cls: "p-1"
    }
}
    ;

const ViewService = (props) => {

    const mandatoryFields = ["categoryId", "title"];

   
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState('Create New Service');
    const [selectedDropdownValue, setDropdownValue] = useState(null);
    const [selectedSubCategoryDropdownValue, setSubCategoryDropdownValue] = useState(null);

    const [isButtonEnable, setButtonEnable] = useState(false);

    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);

    const [fieldValue, setFieldValue] = useState({
        title: "",
        isActive: true,
        description: "",
        icon: ""
    })

    useEffect(() => {
        const isValidForm = mandatoryFields.every(item => Boolean(fieldValue[item]))
        setButtonEnable(true);
    }, [fieldValue]);

    const onFormSubmit = (data) => {
        const encryptedData = props?.match?.params?.editService;
        const editPath = `${Service}/edit/${encryptedData}`;
        props.history.push(editPath);
    };

    useEffect(() => {

        let categoryId = null;
        let subCategoryId = null;

        const encryptedData = props?.match?.params?.editService;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            const { title, isActive, description, icon } = data;
            setFieldValue(
                { 
                    title, 
                    isActive, 
                    description, 
                    icon,
                    subCategoryId:data.subCategoryId.id, 
                    categoryId:data.categoryId.id,
                    isTaxable:data.cost.isTaxable,
                    isDiscountable: data.cost.isDiscountable,
                    addOnPrice:data.cost.addOnPrice,
                    commission:data.cost.commission,
                    costOfMaterial:data.cost.costOfMaterial,
                    costOfService:data.costOfService,
                    labourCost:data.cost.labourCost,
                    labourMinuites:data.cost.labourMinuites,
                    memberPrice:data.cost.memberPrice,
                    warrentyDescription:data.warrentyDescription,
                    documents: data.attachments.documents || [],
                    images: data.attachments.images || [],
                    videos: data.attachments.videos || []
                }
            );

            categoryId = data.categoryId.id;
            subCategoryId = data.subCategoryId.id
            setTitle(`${data.title}`);
            formConfiguration.selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }

        fetchCategoryList(categoryId);
        fetchSubCategoryList(categoryId,subCategoryId) 

        return () => formConfiguration.selectedValue = null;
    }, [props]);

    const fetchCategoryList = (categoryId) => {
        Services.categoryList(data => {
            setCategoryList(data);
            if (categoryId) {
                const selectedData = data.find(item => item.id === categoryId);
                setDropdownValue({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }

        })
    }

    const fetchSubCategoryList = (categoryId, subCategoryId) => {
        Services.subCategoryList({ categoryId }, data => {
            setSubCategoryList(data);
            if (subCategoryId) {
                const selectedData = data.find(item => item.id === subCategoryId);
                setSubCategoryDropdownValue({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }

        })
    }

    const handleOnChange = (key) => (value) => {
        setFieldValue(previous => ({ ...previous, [key]: value.id }));

        switch (key) {
            case "categoryId":
                setSubCategoryList([])
                setSubCategoryDropdownValue(null);
                setDropdownValue(value);
                fetchSubCategoryList(value.id);
                setFieldValue(previous => ({ ...previous, subCategoryId: undefined }));
                break;
            case "subCategoryId":
                setSubCategoryDropdownValue(value);
                break;
            default:
                break;
        }
    };

    const onTextChange = (key) => (...data) => {
        if (Array.isArray(data)) {
            const fields = ['title','costOfService','costOfMaterial','commission','labourMinuites','labourCost','memberPrice','addOnPrice','isTaxable','isDiscountable']
            const value = key === "isActive" ? (data[1] === "active") : (fields.includes(key) ? data[1] : data[0]);
            setFieldValue(previous => ({ ...previous, [key]: value }))
        }
    }

    
   
    return (
        <div className="addCategory bg-white center mx-8 md:mx-20 mt-12 mb-10 rounded-md">
            <h1 className="text-center font-medium text-2xl px-10 py-8 sm:text-left border-b-2 border-[#EDEFFB]">
                {title}
            </h1>
            <div className="wrapper__1">
                <div className="wrapper__2">
                    <div className="add-catg-form-wrapper">
                        <div className="flex flex-col lg:flex-row lg:items-center category__header m-10 gap-4">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Category</label>
                            </div>

                            <ReactTypeHead
                                header="Category"
                                handleSelect={handleOnChange('categoryId')}
                                dataList={categoryList}
                                fields={{ key: 'id', value: 'title' }}
                                placeholder="Select Category"
                                disabled={true}
                                value={selectedDropdownValue}
                                parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                            />

                            <ReactTypeHead
                                header="Sub Category"
                                handleSelect={handleOnChange('subCategoryId')}
                                dataList={subCategoryList}
                                fields={{ key: 'id', value: 'title' }}
                                placeholder="Select Sub-Category"
                                disabled={true}
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
                        <hr />
                        <div className="flex flex-col lg:flex-row file_upload_wrapper lg:items-start category__header m-10 gap-4">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Service</label>
                            </div>
                            <div className='flex-col w-full md:w-1/2'>
                                <Input disabled selectedValue={fieldValue?.title} {...formConfiguration} cb={onTextChange('title')} />
                                <div className='flex gap-4 mt-5'>
                                    <Textarea  disabled={true} parentClass="textArea w-1/2 ta__with-height" value={fieldValue?.description} onChange={onTextChange('description')} title="Service Description" name="serviceDescription" />
                                    <Textarea  disabled={true} parentClass="textArea w-1/2 ta__with-height" value={fieldValue?.warrentyDescription} onChange={onTextChange('warrentyDescription')} title="Warranty Description" name="serviceDescription" />
                                </div>
                            </div>
                            <FileUpload  disabled={true} parentClass='file_upload w-full md:w-[48%] lg:w-[36%]' imageURL={fieldValue.icon} title="Upload Icon" imagePath={onTextChange('icon')} />

                        </div>
                        <hr />
                        <div className="w-auto md:w-full flex flex-col md:flex-row gap-4 m-10">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Cost</label>
                            </div>
                            <div className='w-auto md:w-full'>
                                <div className='flex basis-wrapper flex-wrap lg:flex-nowrap gap-4'>
                                    <Input disabled  {...costInputFieldConfiguration("costOfService", "Cost Of Service")} selectedValue={fieldValue?.costOfService} cb={onTextChange('costOfService')} />
                                    <Input  disabled {...costInputFieldConfiguration("costOfMaterial", "Cost Of Material")} selectedValue={fieldValue?.costOfMaterial} cb={onTextChange('costOfMaterial')} />
                                    <Input  disabled{...costInputFieldConfiguration("commission", "Commission")} selectedValue={fieldValue?.commission} cb={onTextChange('commission')} />
                                    <Input disabled{...costInputFieldConfiguration("labourMinuites", "Labour Minuites")}  selectedValue={fieldValue?.labourMinuites} cb={onTextChange('labourMinuites')} />
                                    <Input disabled {...costInputFieldConfiguration("labourCost", "Labour Cost")}  selectedValue={fieldValue?.labourCost} cb={onTextChange('labourCost')} />
                                </div>
                                <div className='flex items-center flex-wrap lg:flex-nowrap basis-wrapper gap-4 mt-5'>
                                    <Input disabled {...costInputFieldConfiguration("memberPrice", "Member Price")} selectedValue={fieldValue?.memberPrice} cb={onTextChange('memberPrice')} />
                                    <Input  disabled {...costInputFieldConfiguration("addOnPrice", "Add On Price")} selectedValue={fieldValue?.addOnPrice} cb={onTextChange('addOnPrice')} />
                                    <CheckBox disabled={true} value="Taxeable" defaultValue={(fieldValue?.isTaxable) ? true : false} cb={onTextChange('isTaxable')} />
                                    <CheckBox disabled={true} value="Discountable" defaultValue={(fieldValue?.isDiscountable) ? true : false} cb={onTextChange('isDiscountable')} />
                                </div>
                            </div>


                        </div>
                        <hr /> 
                        <div className="w-auto flex flex-col md:flex-row gap-4 m-10">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Attachments</label>
                            </div>
                            <div className=''>
                            <div className=''>
                            <MultipleDocUploader  disabled={true} list={fieldValue?.documents} onListUpdate={onTextChange("documents")} />
                            </div>
                            
                            <div className='attachment__wrapper w-full flex flex-col'>
                               <MultipleImageUploader  disabled={true} list={fieldValue?.images} onListUpdate={onTextChange("images")}/>
                            </div>
                            <MultipleVideoUploader  disabled={true} list={fieldValue?.videos} onListUpdate={onTextChange("videos")} />
                            </div>                            
                        </div>
                        
                        {editModeData?.id && isEditMode && <AssociatedProducts serviceId={editModeData?.id}/>}
                        

                        <hr />
                       
                        <div className="btn-wrapper m-auto text-center border-t-2 border-[#EDEFFB] py-6">
                            <Button
                                disabled={!isButtonEnable ?? false}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onFormSubmit(fieldValue);
                                }}
                                className={`form__button ${!isButtonEnable ?? false ? 'btn-disabled' : 'button-primary'}`}
                                title="Edit"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ViewService.defaultProps = defaultProps;
export default ViewService;
