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
import './Maintenance.scss';
import Services from './Services/maintenance.service';
import Button from '@button';
import MultipleDocUploader from '../../../common/elements/MultipleDocUploader';
import MultipleImageUploader from '../../../common/elements/MultipleImageUploader';
import AssociatedProducts from '../../widgets/AssociatedProducts';

const { Maintenance } = exposedPath;
const defaultProps = {};


const priorityList = [
    {
        id:"high",
        title:"High"
    },
    {
        id:"medium",
        title:"Medium"
    },
    {
        id:"low",
        title:"Low"
    },
]

const formConfiguration = (keyOfInput, label) => {
    return {
    id: keyOfInput,
    componentType: 'InputBox',
    selectedValue: '',
    props: {
        type: 'text',
        name: keyOfInput,
        // maxLength : "3",
        'data-gsv-err-msg': label + ' is required.',
        classNameLabel: 'label__small',
        classNameInput: 'form__input_w_height',
    },
    extraProps: {
        label: label,
        validation: 'required,minLength',
        minLength: 1,
        parentId: keyOfInput,
        parentClass: 'w-full',
        newInptClass: 'newClass',
    },
    isRequired: true,
    cls: "p-0"
}
}
    

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

const AddEditMaintenance = (props) => {

    const mandatoryFields = ["categoryId", "title"];

   
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState('Create New Maintenance Package');
    const [selectedDropdownValue, setDropdownValue] = useState(null);
    const [selectedSubCategoryDropdownValue, setSubCategoryDropdownValue] = useState(null);
    const [selectedPriorityDropdownValue, setSelectedPriorityDropdownValue] = useState(null);
    

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
        setButtonEnable(isValidForm);
    }, [fieldValue]);

    const onFormSubmit = (data) => {
        const payload = {
            cost: {
                isTaxable:data.isTaxable,
                isDiscountable: data.isDiscountable,
                addOnPrice:data.addOnPrice || "",
                commission:data.commission || "",
                costOfMaterial:data.costOfMaterial || "",
                costOfService:data.costOfService || "",
                labourCost:data.labourCost || "",
                labourMinuites:data.labourMinuites,
                memberPrice:data.memberPrice || ""
            },
            attachments: {
                documents: data.documents || [],
                images: data.images || [],
                videos: data.videos || []
            },
            categoryId: data.categoryId || "",
            priority:data.priority || "",
            icon: data.icon || "",
            isActive: data.isActive || "",
            description: data.description || "",
            subCategoryId: data.subCategoryId || "",
            title: data.title || "",
            packageDescription:data.packageDescription || "" 
        }

        if (isEditMode) {
            Services.editMaintenance(payload, () => props.history.push(Maintenance), {}, editModeData.id);
        } else {
            Services.addMaintenance(payload, () => props.history.push(Maintenance));
        }
    };

    useEffect(() => {

        let categoryId = null;
        let subCategoryIds = null;

        const encryptedData = props?.match?.params?.editService;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            const { title, isActive, description, icon } = data;
            subCategoryIds = Array.isArray(data.subCategoryIds) && data.subCategoryIds.map(item => item.id) || [];
            setFieldValue(
                { 
                    title, 
                    isActive, 
                    description, 
                    icon,
                    subCategoryIds, 
                    categoryId:data.categoryId.id,
                    priority:data.priority,
                    isTaxable:data.cost.isTaxable,
                    isDiscountable: data.cost.isDiscountable,
                    addOnPrice:data.cost.addOnPrice,
                    commission:data.cost.commission,
                    costOfMaterial:data.cost.costOfMaterial,
                    costOfService:data.costOfService,
                    labourCost:data.cost.labourCost,
                    labourMinuites:data.cost.labourMinuites,
                    memberPrice:data.cost.memberPrice,
                    packageDescription:data.packageDescription,
                    documents: data.attachments.documents || [],
                    images: data.attachments.images || [],
                    videos: data.attachments.videos || []
                }
            );

            categoryId = data.categoryId.id;
            
            setTitle(`Edit Maintenance (${data.title})`);
            formConfiguration.selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }

        fetchCategoryList(categoryId);
        fetchSubCategoryList(categoryId,subCategoryIds) 

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

    const fetchSubCategoryList = (categoryId, subCategoryIds) => {
        Services.subCategoryList({ categoryId }, data => {
            setSubCategoryList(data);
            if (subCategoryIds && Array.isArray(subCategoryIds) && subCategoryIds.length) {
                let selectedDataList = data.filter(item => subCategoryIds.some(subCategoryId => subCategoryId === item.id));
                selectedDataList = selectedDataList.map(item => ({ ...item, label: item.title, value: item.id }))
                setSubCategoryDropdownValue([...selectedDataList]);
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
                const ids = Array.isArray(value) && value.map(item => item.id) || [];
                setSubCategoryDropdownValue(value);
                setFieldValue(previous => ({ ...previous, subCategoryId: ids }));
                break;
            case "priority":
                setSelectedPriorityDropdownValue(value);
                setFieldValue(previous => ({ ...previous}));
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

   console.log(fieldValue,"fieldValue") 
   
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
                                isMulti
                            />
                        </div>
                        <hr />
                        <div className="flex flex-col lg:flex-row file_upload_wrapper lg:items-start category__header m-10 gap-4">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Package</label>
                            </div>
                            <div className='flex-col w-full md:w-1/2'>
                                <Input  {...formConfiguration("title", "Package Name")} selectedValue={fieldValue?.title} cb={onTextChange('title')} />
                                <ReactTypeHead
                                    header="Priority"
                                    handleSelect={handleOnChange('priority')}
                                    dataList={priorityList}
                                    fields={{ key: 'id', value: 'title' }}
                                    placeholder="Select priority"
                                    value={selectedPriorityDropdownValue}
                                    parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                 />
                                <div className='flex gap-4 mt-5'>
                                     <Textarea parentClass="textArea w-1/2 ta__with-height" value={fieldValue?.packageDescription} onChange={onTextChange('packageDescription')} title="Package Description" name="packageDescription" />
                                </div>
                            </div>
                            <FileUpload parentClass='file_upload w-full md:w-[48%] lg:w-[36%]' imageURL={fieldValue.icon} title="Icon" imagePath={onTextChange('icon')} />

                        </div>
                        <hr />
                        <div className="w-auto md:w-full flex flex-col md:flex-row gap-4 m-10">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Cost</label>
                            </div>
                            <div className='w-auto md:w-full'>
                                <div className='flex basis-wrapper flex-wrap lg:flex-nowrap gap-4'>
                                    <Input  {...costInputFieldConfiguration("costOfService", "Cost Of Service")} selectedValue={fieldValue?.costOfService} cb={onTextChange('costOfService')} />
                                    <Input  {...costInputFieldConfiguration("costOfMaterial", "Cost Of Material")} selectedValue={fieldValue?.costOfMaterial} cb={onTextChange('costOfMaterial')} />
                                    <Input  {...costInputFieldConfiguration("commission", "Commission")} selectedValue={fieldValue?.commission} cb={onTextChange('commission')} />
                                    <Input {...costInputFieldConfiguration("labourMinuites", "Labour Minuites")}  selectedValue={fieldValue?.labourMinuites} cb={onTextChange('labourMinuites')} />
                                    <Input {...costInputFieldConfiguration("labourCost", "Labour Cost")}  selectedValue={fieldValue?.labourCost} cb={onTextChange('labourCost')} />
                                </div>
                                <div className='flex items-center flex-wrap lg:flex-nowrap basis-wrapper gap-4 mt-5'>
                                    <Input  {...costInputFieldConfiguration("memberPrice", "Member Price")} selectedValue={fieldValue?.memberPrice} cb={onTextChange('memberPrice')} />
                                    <Input  {...costInputFieldConfiguration("addOnPrice", "Add On Price")} selectedValue={fieldValue?.addOnPrice} cb={onTextChange('addOnPrice')} />
                                    <CheckBox value="Taxeable" defaultValue={(fieldValue?.isTaxable) ? true : false} cb={onTextChange('isTaxable')} />
                                    <CheckBox value="Discountable" defaultValue={(fieldValue?.isDiscountable) ? true : false} cb={onTextChange('isDiscountable')} />
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
                            <MultipleDocUploader list={fieldValue?.documents} onListUpdate={onTextChange("documents")} />
                            </div>
                            
                            <div className='attachment__wrapper w-full flex flex-col'>
                               <MultipleImageUploader list={fieldValue?.images} onListUpdate={onTextChange("images")}/>
                            </div>
                            <MultipleVideoUploader list={fieldValue?.videos} onListUpdate={onTextChange("videos")} />
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
                                title={isEditMode ? 'Update' : 'Save'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddEditMaintenance.defaultProps = defaultProps;
export default AddEditMaintenance;
