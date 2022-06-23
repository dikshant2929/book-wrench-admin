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
    cls: "p-1"
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

const AddEditService = (props) => {

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
        setButtonEnable(isValidForm);
    }, [fieldValue]);

    const onFormSubmit = (data) => {
        const payload = {
            cost: {
                isTaxable:data.isTaxable || "",
                isDiscountable: data.isDiscountable || "",
                addOnPrice:data.addOnPrice || "",
                commission:data.commission || "",
                costOfMaterial:data.costOfMaterial || "",
                costOfService:data.costOfService || "",
                labourCost:data.labourCost || "",
                labourMinuites:data.labourMinuites || "",
                memberPrice:data.memberPrice || ""
            },
            attachments: {
                documents: data.documents || [],
                images: data.images || [],
                videos: data.videos || []
            },
            categoryId: data.categoryId || "",
            icon: data.icon || "",
            isActive: data.isActive || "",
            description: data.description || "",
            subCategoryId: data.subCategoryId || "",
            title: data.title || "",
            warrentyDescription:data.warrentyDescription || "" 
        }

        if (isEditMode) {
            Services.editService(payload, () => props.history.push(Service), {}, editModeData.id);
        } else {
            Services.addService(payload, () => props.history.push(Service));
        }
    };

    useEffect(() => {

        let categoryId = null;
        let subCategoryId = null;

        const encryptedData = props?.match?.params?.editService;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            console.log(data)
            const { title, isActive, description, icon } = data;
            setFieldValue(
                { 
                    title, 
                    isActive, 
                    description, 
                    icon,
                    subCategoryId:data.subCategoryId, 
                    categoryId:data.categoryId,
                    isTaxable:data.cost.isTaxable,
                    isDiscountable: data.cost.isDiscountable,
                    addOnPrice:data.cost.addOnPrice,
                    commission:data.cost.commission,
                    costOfMaterial:data.cost.costOfMaterial,
                    costOfService:data.costOfService,
                    labourCost:data.cost.labourCost,
                    labourMinuites:data.cost.labourMinutes,
                    memberPrice:data.cost.memberPrice,
                    warrentyDescription:data.warrentyDescription,
                    documents: data.attachments.documents || [],
                    images: data.attachments.images || [],
                    videos: data.attachments.videos || []
                }
            );

            categoryId = data.categoryId;
            subCategoryId = data.subCategoryId
            setTitle(`Edit Service (${data.title})`);
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
            console.log(data)
            const fields = ['title','costOfService','costOfMaterial','commission','labourMinuites','labourCost','memberPrice','addOnPrice','isTaxable','isDiscountable']
            const value = key === "isActive" ? (data[1] === "active") : (fields.includes(key) ? data[1] : data[0]);
            setFieldValue(previous => ({ ...previous, [key]: value }))
        }
    }

    console.log(fieldValue)
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
                                <Input selectedValue={fieldValue?.title} {...formConfiguration} cb={onTextChange('title')} />
                                <div className='flex gap-4 mt-5'>
                                    <Textarea parentClass="textArea w-1/2" value={fieldValue?.description} onChange={onTextChange('description')} title="Service Description" name="serviceDescription" />
                                    <Textarea parentClass="textArea w-1/2" value={fieldValue?.warrentyDescription} onChange={onTextChange('warrentyDescription')} title="Warrenty Description" name="serviceDescription" />
                                </div>
                            </div>
                            <FileUpload parentClass='file_upload w-full md:w-[48%] lg:w-[36%]' imageURL={fieldValue.icon} title="Upload Department Image" imagePath={onTextChange('icon')} />

                        </div>
                        <hr />
                        <div className="w-auto flex flex-col md:flex-row gap-4 m-10">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Cost</label>
                            </div>
                            <div className=''>
                                <div className='flex basis-wrapper flex-wrap lg:flex-nowrap gap-4'>
                                    <Input selectedValue={fieldValue?.costOfService} {...costInputFieldConfiguration("costOfService", "Cost Of Service")} cb={onTextChange('costOfService')} />
                                    <Input selectedValue={fieldValue?.costOfMaterial} {...costInputFieldConfiguration("costOfMaterial", "Cost Of Material")} cb={onTextChange('costOfMaterial')} />
                                    <Input selectedValue={fieldValue?.commission} {...costInputFieldConfiguration("commission", "Commission")} cb={onTextChange('commission')} />
                                    <Input selectedValue={fieldValue?.labourMinuites} {...costInputFieldConfiguration("labourMinuites", "Labour Minuites")} cb={onTextChange('labourMinuites')} />
                                    <Input selectedValue={fieldValue?.labourCost} {...costInputFieldConfiguration("labourCost", "Labour Cost")} cb={onTextChange('labourCost')} />
                                </div>
                                <div className='flex items-center flex-wrap lg:flex-nowrap basis-wrapper gap-4 mt-5'>
                                    <Input selectedValue={fieldValue?.memberPrice} {...costInputFieldConfiguration("memberPrice", "Member Price")} cb={onTextChange('memberPrice')} />
                                    <Input selectedValue={fieldValue?.addOnPrice} {...costInputFieldConfiguration("addOnPrice", "Add On Price")} cb={onTextChange('addOnPrice')} />
                                    <CheckBox value="Taxeable" defaultValue={(fieldValue?.isTaxable) ? true : false} cb={onTextChange('isTaxable')} />
                                    <CheckBox value="Discountable" defaultValue={(fieldValue?.isDiscountable) ? true : false} cb={onTextChange('isDiscountable')} />
                                </div>
                            </div>


                        </div>
                        <hr /> 
                        <div className="w-auto flex flex-col lg:flex-row gap-4 m-10">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Attachments</label>
                            </div>
                            <div className='flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-5'>
                            <MultipleDocUploader list={fieldValue?.documents} onListUpdate={onTextChange("documents")} />
                            </div>
                            
                            <div className='attachment__wrapper w-full flex flex-col gap-y-5'>
                               <MultipleImageUploader list={fieldValue?.images} onListUpdate={onTextChange("images")}/>
                            </div>
                            <MultipleVideoUploader list={fieldValue?.videos} onListUpdate={onTextChange("videos")} />
                        </div>
                        <hr />
                        <div className="w-auto flex flex-col lg:flex-row gap-4 m-10">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Associated Products</label>
                            </div>
                            <div className='flex gap-y-6 flex-col'>
                            <div className='products__wrapper flex-wrap lg:flex-nowrap flex flex-col md:flex-row gap-4'>
                                <div className='product basis__25 basis__48 rounded-lg border border-[#DFE2E9] py-4'>
                                    <div className='px-8'>
                                        <div className='bg-[#DFE2E9] p-9 rounded-lg w-14 mx-auto mb-3.5'></div>
                                        <p className='text-center text-sm font-semibold mb-3'>Replace Pilot Safety Sensor</p>
                                        <p className='text-center font-medium text-xs text-[#B8B0B0]'>(#56933)</p>
                                    </div>                                
                                   
                                   
                                        <div className='flex justify-between px-4 items-center mt-4'>
                                            <span className='text-[#B8B0B0]'>Qty <span className='text-black font-bold'>10</span></span>
                                            <span className='bg-[#E1F3EA] text-[#00875A] text-base font-semibold px-3 py-1.5 rounded-lg'>240$</span>
                                        </div>
                                    
                                </div>
                                <div className='product basis__25 basis__48 rounded-lg border border-[#DFE2E9] py-4'>
                                    <div className='px-8'>
                                        <div className='bg-[#DFE2E9] p-9 rounded-lg w-14 mx-auto mb-3.5'></div>
                                        <p className='text-center text-sm font-semibold mb-3'>Replace Pilot Safety Sensor</p>
                                        <p className='text-center font-medium text-xs text-[#B8B0B0]'>(#56933)</p>
                                    </div>
                                    <div className='flex justify-between px-4 items-center mt-4'>
                                        <span className='text-[#B8B0B0]'>Qty <span className='text-black font-bold'>10</span></span>
                                        <span className='bg-[#E1F3EA] text-[#00875A] text-base font-semibold px-3 py-1.5 rounded-lg'>240$</span>
                                    </div>
                                </div>
                                <div className='product basis__25 basis__48 rounded-lg border border-[#DFE2E9] py-4'>
                                    <div className='px-8'>
                                        <div className='bg-[#DFE2E9] p-9 rounded-lg w-14 mx-auto mb-3.5'></div>
                                        <p className='text-center text-sm font-semibold mb-3'>Replace Pilot Safety Sensor</p>
                                        <p className='text-center font-medium text-xs text-[#B8B0B0]'>(#56933)</p>
                                    </div>
                                    <div className='flex justify-between px-4 items-center mt-4'>
                                        <span className='text-[#B8B0B0]'>Qty <span className='text-black font-bold'>10</span></span>
                                        <span className='bg-[#E1F3EA] text-[#00875A] text-base font-semibold px-3 py-1.5 rounded-lg'>240$</span>
                                    </div>
                                </div>
                                <div className='product basis__25 basis__48 rounded-lg border border-[#DFE2E9] py-4'>
                                    <div className='px-8'>
                                        <div className='bg-[#DFE2E9] p-9 rounded-lg w-14 mx-auto mb-3.5'></div>
                                        <p className='text-center text-sm font-semibold mb-3'>Replace Pilot Safety Sensor</p>
                                        <p className='text-center font-medium text-xs text-[#B8B0B0]'>(#56933)</p>
                                    </div>
                                    <div className='flex justify-between px-4 items-center mt-4'>
                                        <span className='text-[#B8B0B0]'>Qty <span className='text-black font-bold'>10</span></span>
                                        <span className='bg-[#E1F3EA] text-[#00875A] text-base font-semibold px-3 py-1.5 rounded-lg'>240$</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='w-full md:w-auto py-3 px-14 text-sm font-medium text-[#646982] bg-[#E4E6F1] rounded-md'>Show all</button>
                            </div>
                            </div>
                        </div>
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

AddEditService.defaultProps = defaultProps;
export default AddEditService;
