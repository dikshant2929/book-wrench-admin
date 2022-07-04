import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import RadioBox from '@common/elements/Radiobox';
import Textarea from '@common/elements/Textarea';
import ReactTypeHead from '@common/elements/ReactTypehead';
import FileUpload from '@app/widgets/FileUpload';

import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Product.scss';
import Services from './Services/Product.service';
import Button from '@button';
import MultipleDocUploader from '../../../common/elements/MultipleDocUploader';
import MultipleImageUploader from '../../../common/elements/MultipleImageUploader';
import MultipleVideoUploader from '@common/elements/MultipleVideoUploader';



const { Product } = exposedPath;
const defaultProps = {};

const formConfiguration = (keyOfInput, label) => {
    return {
        id: keyOfInput,
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'text',
            name: 'title',
            // maxLength : "3",
            'data-gsv-err-msg': label + ' is required.',
            classNameLabel: 'label__small',
            classNameInput: 'form__input_w_height',
        },
        extraProps: {
            label,
            validation: 'required,minLength',
            minLength: 1,
            parentId: 'title',
            parentClass: 'w-full',
            newInptClass: 'newClass',
        },
        isRequired: true,
        cls: "p-1"
    }
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

const AddEditProduct = (props) => {

    const mandatoryFields = ["categoryId", "title"];

    const [isShimmerVisible, setShimmer] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState('Create New Product');
    const [selectedDropdownValue, setDropdownValue] = useState(null);
    const [selectedSubCategoryDropdownValue, setSubCategoryDropdownValue] = useState(null);
    const [selectedServiceDropdownValue, setServiceDropdownValue] = useState(null);

    const [selectedVendorDropdownValue, setVendorDropdownValue] = useState(null);

    const [isButtonEnable, setButtonEnable] = useState(false);

    const [categoryList, setCategoryList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [vendorList, setVendorList] = useState([]);

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
            warrantyDescription: data.warrantyDescription || "",
            code: data.code || "",
            brand: data.brand || "",
            vendorId: data.vendorId || "",
            serviceIds: data.serviceIds || [],
            quantity: data.quantity || "",
            retailPrice: data.retailPrice || "",
            vendorCost: data.vendorCost,
            unitOfMessure: data.unitOfMessure || ""
        }
        if (isEditMode) {
            Services.editProduct(payload, () => props.history.push(Product), {}, editModeData.id);
        } else {
            Services.addProduct(payload, () => props.history.push(Product));
        }
    };

    useEffect(() => {

        let categoryId = null;
        let subCategoryId = null;
        let serviceIds = null;
        let vendorId = null;
        const encryptedData = props?.match?.params?.editproduct;
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            const { title, isActive, description, icon } = data;
            serviceIds = Array.isArray(data.serviceIds) && data.serviceIds.map(item => item.id) || [];
            setFieldValue(
                {
                    title,
                    isActive,
                    description,
                    icon,
                    subCategoryId: data.subCategoryId.id || [],
                    categoryId: data.categoryId.id,
                    documents: data.attachments.documents || [],
                    images: data.attachments.images || [],
                    videos: data.attachments.videos || [],
                    code: data.code || "",
                    brand: data.brand || "",
                    vendorId: data.vendorId.id || [],
                    serviceIds,
                    quantity: data.quantity || "",
                    retailPrice: data.retailPrice || "",
                    vendorCost: data.vendorCost || "",
                    unitOfMessure: data.unitOfMessure || "",
                    warrantyDescription: data.warrantyDescription,
                }
            );

            categoryId = data.categoryId.id;
            subCategoryId = data.subCategoryId.id;
            vendorId = data.vendorId.id;
            setTitle(`Edit Product (${data.title})`);
            formConfiguration.selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }


        fetchCategoryList(categoryId);
        fetchSubCategoryList(categoryId, subCategoryId)
        fetchServiceList(serviceIds);
        fetchVendorList(vendorId);
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

    const fetchVendorList = (vendorId) => {
        Services.vendorList(data => {
            setVendorList(data);
            if (vendorId) {
                const selectedData = data.find(item => item.id === vendorId);
                setVendorDropdownValue({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }

        })
    }

    const fetchServiceList = (serviceIds) => {
        Services.serviceList(data => {
            setServiceList(data);
            if (serviceIds && Array.isArray(serviceIds) && serviceIds.length) {
                let selectedDataList = data.filter(item => serviceIds.some(serviceId => serviceId === item.id));
                selectedDataList = selectedDataList.map(item => ({ ...item, label: item.title, value: item.id }))
                setServiceDropdownValue([...selectedDataList]);
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
            case "serviceId":
                const ids = Array.isArray(value) && value.map(item => item.id) || [];
                setServiceDropdownValue(value);
                setFieldValue(previous => ({ ...previous, serviceIds: ids }));
                break;
            case "vendorId":
                setVendorDropdownValue(value);
                break;
            default:
                break;
        }
    };

    const onTextChange = (key) => (...data) => {
        if (Array.isArray(data)) {
            const fields = ['title', 'code', 'brand', 'vendor', 'quantity', 'retailPrice', 'vendorCost', 'unitOfMessure']
            const value = key === "isActive" ? (data[1] === "active") : (fields.includes(key) ? data[1] : data[0]);
            setFieldValue(previous => ({ ...previous, [key]: value }))
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
                        <div className="flex flex-col lg:flex-row lg:items-center category__header m-10 gap-4">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Category</label>
                            </div>
                            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
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

                                <ReactTypeHead
                                    header="Service"
                                    handleSelect={handleOnChange('serviceId')}
                                    dataList={serviceList}
                                    fields={{ key: 'id', value: 'title' }}
                                    placeholder="Select Service"
                                    value={selectedServiceDropdownValue}
                                    parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                    isMulti
                                />

                            </div>



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
                                <label className='text-base font-bold'>Products</label>
                            </div>
                            <div className='flex flex-col w-full'>
                                <div className='grid md:grid-cols-2 lg:grid-cols-3  gap-4 w-full product__selecter'>

                                    <Input   {...formConfiguration("title", "Product Name")} selectedValue={fieldValue?.title} cb={onTextChange('title')} />
                                    <Input  {...formConfiguration("code", "Product Code")} selectedValue={fieldValue?.code} cb={onTextChange('code')} />
                                    <Input  {...formConfiguration("brand", "Brand")} selectedValue={fieldValue?.brand} cb={onTextChange('brand')} />
                                    {/* <Input  {...formConfiguration("vendor","Vendor")} cb={onTextChange('vendor')}  selectedValue={fieldValue?.vendor} cb={onTextChange('vendor')} /> */}

                                    <ReactTypeHead
                                        header="Vendor"
                                        handleSelect={handleOnChange('vendorId')}
                                        dataList={vendorList}
                                        fields={{ key: 'id', value: 'title' }}
                                        placeholder="Select Vendor"
                                        value={selectedVendorDropdownValue}
                                        parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none p-1"}
                                    />
                                    <Input  {...costInputFieldConfiguration("quantity", "Quantity")} selectedValue={fieldValue?.quantity} cb={onTextChange('quantity')} />
                                    <Input  {...costInputFieldConfiguration("retailPrice", "Retail Price")} selectedValue={fieldValue?.retailPrice} cb={onTextChange('retailPrice')} />
                                    <Input  {...formConfiguration("unitOfMessure", "Unit Of Messure")} selectedValue={fieldValue?.unitOfMessure} cb={onTextChange('unitOfMessure')} />
                                    <Input  {...costInputFieldConfiguration("vendorCost", "Vendor Cost")} selectedValue={fieldValue?.vendorCost} cb={onTextChange('vendorCost')} />
                                    <div>

                                        <div className='flex flex-col p-1 upload__icon'>
                                            <div className="status basis__33">
                                                <RadioBox
                                                    defaultValue={(fieldValue.isActive) ? 'active' : 'inactive'}
                                                    cb={onTextChange('isActive')}
                                                />
                                            </div>

                                        </div>

                                    </div>
                                    <div className='ta__with-height'>
                                        <Textarea parentClass="textArea" value={fieldValue?.description} onChange={onTextChange('description')} title="Description" name="description" />
                                    </div>
                                    <div className='ta__with-height'>
                                        <Textarea parentClass="textArea " value={fieldValue?.warrantyDescription} onChange={onTextChange('warrantyDescription')} title="Warranty Description" name="warrantyDescription" />
                                    </div>
                                    <div className='upload__icon'>
                                        <FileUpload parentClass='file_upload' imageURL={fieldValue.icon} title="Upload Icon" imagePath={onTextChange('icon')} />
                                    </div>
                                </div>
                                {/* <div className='flex flex-col gap-4 my-5'>
                                    <div className="status basis__33">
                                        <RadioBox
                                            defaultValue={(fieldValue.isActive) ? 'active' : 'inactive'}
                                            cb={onTextChange('isActive')}
                                        />
                                    </div>
                                    <FileUpload parentClass='file_upload' imageURL={fieldValue.icon} title="Upload Department Image" imagePath={onTextChange('icon')} />
                                </div>
                                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    
                                    
                                </div> */}

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
                                    <MultipleImageUploader list={fieldValue?.images} onListUpdate={onTextChange("images")} />
                                </div>
                                <div className='attachment__wrapper w-full flex flex-col'>
                                    <MultipleVideoUploader list={fieldValue?.videos} onListUpdate={onTextChange("videos")} />
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

AddEditProduct.defaultProps = defaultProps;
export default AddEditProduct;
