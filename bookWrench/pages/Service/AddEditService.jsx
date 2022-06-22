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

    const [isShimmerVisible, setShimmer] = useState(false);
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
        if (isEditMode) {
            Service.editService(fieldValue, () => props.history.push(Category), {}, editModeData.id);
        } else {
            Service.addService(fieldValue, () => props.history.push(Category));
        }
    };

    useEffect(() => {

        let categoryId = null;

        const encryptedData = props?.match?.params?.editService;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            console.log(data,"data")
            const { title, isActive, description, icon } = data;
            setFieldValue({ title, isActive, description, icon, categoryId: data.categoryId.id });

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
            if (categoryId) {
                const selectedData = data.find(item => item.id === categoryId);
                setDropdownValue({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }

        })
    }

    const fetchSubCategoryList = (categoryId, subCategoryId) => {
        Service.subCategoryList({ categoryId }, data => {
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
            const value = key === "isActive" ? (data[1] === "active") : (key === "title" ? data[1] : data[0]);
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
                            <div className='flex-col w-full lg:w-1/2'>
                                <Input selectedValue={editModeData?.title} {...formConfiguration} cb={onTextChange('title')} />
                                <div className='flex flex-col md:flex-row gap-4 mt-5'>
                                    <Textarea parentClass="textArea md:w-1/2" value={editModeData?.description} onChange={onTextChange('serviceDescription')} title="Service Description" name="serviceDescription" />
                                    <Textarea parentClass="textArea md:w-1/2" value={editModeData?.description} onChange={onTextChange('warrentyDescription')} title="Warrenty Description" name="serviceDescription" />
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
                                <div className='flex flex-wrap md:flex-nowrap basis-wrapper gap-4'>
                                    <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("constOfService", "Cost Of Service")} cb={onTextChange('costOfService')} />
                                    <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("costOfMaterial", "Cost Of Material")} cb={onTextChange('costOfMaterial')} />
                                    <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("commission", "Commission")} cb={onTextChange('commission')} />
                                    <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("labourMinuites", "Labour Minuites")} cb={onTextChange('labourMinuites')} />
                                    <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("labourCost", "Labour Cost")} cb={onTextChange('labourCost')} />
                                </div>
                                <div className='flex flex-wrap md:flex-nowrap items-center basis-wrapper gap-4 mt-5'>
                                    <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("memberPrice", "Member Price")} cb={onTextChange('memberPrice')} />
                                    <Input selectedValue={editModeData?.title} {...costInputFieldConfiguration("addOnPrice", "Add On Price")} cb={onTextChange('addOnPrice')} />

                                    <label className='mt-5 flex items-center label__small'>
                                        <input className='no-outline border-2 border-[#D6D6D6] rounded w-5 h-5 mr-2' type="checkbox" />
                                    Taxeable
                                    </label>


                                    <label className='mt-5 flex items-center label__small'><input type="checkbox" className='no-outline border-2 border-[#D6D6D6] rounded w-5 h-5 mr-2' />Discountable</label>

                                </div>
                            </div>


                        </div>
                        <hr />
                        <div className="w-auto flex flex-col lg:flex-row gap-4 m-10">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Attachments</label>
                            </div>

                            <div className='attachment__wrapper w-full flex flex-col gap-y-5'>
                                <div className='attached__docs__wrapper'>
                                    <label className='label__small'>Documents</label>
                                    <div className='flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-5'>
                                        <div className='attached__docs flex bg-[#F2F3F7] basis__33 basis__48 justify-around py-6 rounded-lg'>
                                            <div className='flex gap-6 items-center'>
                                                <span className='docs__icon__name'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="27" viewBox="0 0 21 27" fill="none">
                                                        <path d="M13.7503 0.520508H2.2C0.984974 0.520508 0 1.50548 0 2.72051V24.4019C0 25.617 0.984971 26.6019 2.2 26.6019H18.5273C19.7423 26.6019 20.7273 25.617 20.7273 24.4019V7.08006C20.7273 6.4617 20.467 5.87189 20.0103 5.45505L15.2333 1.0955C14.828 0.725587 14.2991 0.520508 13.7503 0.520508Z" fill="#77ABFA" />
                                                        <path d="M14.5 5.75911V1.40369C14.5 1.23811 14.6897 1.14425 14.8213 1.24468L20.5295 5.60011C20.6816 5.7162 20.5995 5.95911 20.4082 5.95911H14.7C14.5895 5.95911 14.5 5.86957 14.5 5.75911Z" fill="#2268D1" />
                                                        <line x1="5" y1="11.0923" x2="16" y2="11.0923" stroke="white" stroke-width="2" />
                                                        <line x1="5" y1="15.2251" x2="16" y2="15.2251" stroke="white" stroke-width="2" />
                                                        <line x1="5" y1="19.3584" x2="13" y2="19.3584" stroke="white" stroke-width="2" />
                                                    </svg>
                                                </span>
                                                <span className='text-[#7D829F] font-semibold text-sm'>Demo documents 1</span>
                                            </div>
                                            <span className='cross__icon bg-[#DBDDE3] fill-[#989FAD] p-1.5 rounded-full cursor-pointer'>
                                                <svg height="18" width="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class=""><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                                            </span>
                                        </div>
                                        <div className='attachment flex bg-[#F2F3F7] basis__33 basis__48 justify-around py-6 rounded-lg'>
                                            <div className='flex gap-6 items-center'>
                                                <span className='docs__icon__name'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="27" viewBox="0 0 21 27" fill="none">
                                                        <path d="M13.7503 0.520508H2.2C0.984974 0.520508 0 1.50548 0 2.72051V24.4019C0 25.617 0.984971 26.6019 2.2 26.6019H18.5273C19.7423 26.6019 20.7273 25.617 20.7273 24.4019V7.08006C20.7273 6.4617 20.467 5.87189 20.0103 5.45505L15.2333 1.0955C14.828 0.725587 14.2991 0.520508 13.7503 0.520508Z" fill="#77ABFA" />
                                                        <path d="M14.5 5.75911V1.40369C14.5 1.23811 14.6897 1.14425 14.8213 1.24468L20.5295 5.60011C20.6816 5.7162 20.5995 5.95911 20.4082 5.95911H14.7C14.5895 5.95911 14.5 5.86957 14.5 5.75911Z" fill="#2268D1" />
                                                        <line x1="5" y1="11.0923" x2="16" y2="11.0923" stroke="white" stroke-width="2" />
                                                        <line x1="5" y1="15.2251" x2="16" y2="15.2251" stroke="white" stroke-width="2" />
                                                        <line x1="5" y1="19.3584" x2="13" y2="19.3584" stroke="white" stroke-width="2" />
                                                    </svg>
                                                </span>
                                                <span className='text-[#7D829F] font-semibold text-sm'>Demo documents 1</span>
                                            </div>
                                            <span className='cross__icon bg-[#DBDDE3] fill-[#989FAD] p-1.5 rounded-full cursor-pointer'>
                                                <svg height="18" width="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class=""><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                                            </span>
                                        </div>
                                        <div className='attachment flex bg-[#F2F3F7] basis__33 basis__48 justify-around py-6 rounded-lg'>
                                            <div className='flex gap-6 items-center'>
                                                <span className='docs__icon__name'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="27" viewBox="0 0 21 27" fill="none">
                                                        <path d="M13.7503 0.520508H2.2C0.984974 0.520508 0 1.50548 0 2.72051V24.4019C0 25.617 0.984971 26.6019 2.2 26.6019H18.5273C19.7423 26.6019 20.7273 25.617 20.7273 24.4019V7.08006C20.7273 6.4617 20.467 5.87189 20.0103 5.45505L15.2333 1.0955C14.828 0.725587 14.2991 0.520508 13.7503 0.520508Z" fill="#77ABFA" />
                                                        <path d="M14.5 5.75911V1.40369C14.5 1.23811 14.6897 1.14425 14.8213 1.24468L20.5295 5.60011C20.6816 5.7162 20.5995 5.95911 20.4082 5.95911H14.7C14.5895 5.95911 14.5 5.86957 14.5 5.75911Z" fill="#2268D1" />
                                                        <line x1="5" y1="11.0923" x2="16" y2="11.0923" stroke="white" stroke-width="2" />
                                                        <line x1="5" y1="15.2251" x2="16" y2="15.2251" stroke="white" stroke-width="2" />
                                                        <line x1="5" y1="19.3584" x2="13" y2="19.3584" stroke="white" stroke-width="2" />
                                                    </svg>
                                                </span>
                                                <span className='text-[#7D829F] font-semibold text-sm'>Demo documents 1</span>
                                            </div>
                                            <span className='cross__icon bg-[#DBDDE3] fill-[#989FAD] p-1.5 rounded-full cursor-pointer'>
                                                <svg height="18" width="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class=""><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='pb-7 border-b-2 border-gray-100'>
                                    <FileUpload parentClass='file_upload md:w-[36%]' imageURL={fieldValue.icon} title="Upload Department Image" imagePath={onTextChange('icon')} />
                                </div>
                                <div className='image__wrapper pb-7 border-b-2 border-gray-100'>
                                    <label className='label__small'>Images</label>
                                    <div className='img__thumbnail flex flex-wrap gap-3'>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                        <span className='bg-[#DFE2E9] p-9 rounded-lg'></span>
                                    </div>
                                </div>
                                <div className='video__wrapper'>
                                    <label className='label__small'>Videos</label>
                                    <div className='flex items-center gap-3'>
                                        <input className='form__input_w_height md:w-1/2' type="text" placeholder="youtube.com/watch?v=Vowek3_420o" />
                                        <span className='bg-[#E1F3EA] p-3.5 rounded-lg cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M9 9V5H11V9H15V11H11V15H9V11H5V9H9ZM10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18Z" fill="#00875A" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                            </div>
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
                                    <div className='product basis__25 rounded-lg border border-[#DFE2E9] py-4'>
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
                                    <div className='product basis__25 rounded-lg border border-[#DFE2E9] py-4'>
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
                                    <div className='product basis__25 rounded-lg border border-[#DFE2E9] py-4'>
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
