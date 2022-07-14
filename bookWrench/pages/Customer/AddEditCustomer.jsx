import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import MultipleVideoUploader from '@common/elements/MultipleVideoUploader';
import Textarea from '@common/elements/Textarea';
import ReactTypeHead from '@common/elements/ReactTypehead';
import FileUpload from '@app/widgets/FileUpload';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Customer.scss';
import Services from './Services/customer.service';
import Button from '@button';
import MultipleDocUploader from '../../../common/elements/MultipleDocUploader';
import MultipleImageUploader from '../../../common/elements/MultipleImageUploader';


const { Customer } = exposedPath;
const defaultProps = {};











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

const AddEditCustomer = (props) => {

    const mandatoryFields = ["categoryId", "title","packageCost","costPerVisit","renewalCost","duration","interval","intervalValue"];

   
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState('Create New Customer');
    const [selectedDropdownValue, setDropdownValue] = useState(null);
    const [selectedSubCategoryDropdownValue, setSubCategoryDropdownValue] = useState(null);
    const [selectedPriorityDropdownValue, setSelectedPriorityDropdownValue] = useState(null);
    const [selectedDurationDropdownValue, setSelectedDurationDropdownValue] = useState(null);
    const [selectedIntervalDropdownValue, setSelectedIntervalDropdownValue] = useState(null);
    const [isButtonEnable, setButtonEnable] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);

    const [productList, setProductList] = useState([]);
    const [selectedProductDropdownValue, setProductDropdownValue] = useState(null);

    const [servicesList, setServicesList] = useState([]);
    const [selectedServicesDropdownValue, setServicesDropdownValue] = useState(null);

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
                duration:data.duration,
                packageCost:data.packageCost || "",
                costPerVisit:data.costPerVisit || "",
                renewalCost: data.renewalCost,
               
            },
            expense:{
                expense:data.expense,
                additionalCost:data.additionalCost,
                commission:data.commission,
                ticketTimeMinutes:data.ticketTimeMinutes,
                laborCost:data.laborCost,
            },
            frequency:{
                interval:data.interval,
                intervalValue:data.intervalValue
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
            subCategoryIds: data.subCategoryIds || "",
            servicesIds: data.servicesIds || "",
            productsIds: data.productsIds || "",
            title: data.title || "",
            packageDescription:data.packageDescription || "" 
        }

        if (isEditMode) {
            Services.editMaintenance(payload, () => props.history.push(Customer), {}, editModeData.id);
        } else {
            Services.addMaintenance(payload, () => props.history.push(Customer));
        }
    };

    useEffect(() => {

        let categoryId = null;
        let subCategoryIds = null;
        let productsIds = null;
        let servicesIds = null;

        

        const encryptedData = props?.match?.params?.editcustomer;
       
        if (encryptedData) {
            const data = JSON.parse(encrypt.decode(encryptedData));
            const { title, isActive, packageDescription, icon } = data;
            subCategoryIds = Array.isArray(data.subCategoryIds) && data.subCategoryIds.map(item => item.id) || [];
            productsIds = Array.isArray(data.productsIds) && data.productsIds.map(item => item.id) || [];
            servicesIds = Array.isArray(data.servicesIds) && data.servicesIds.map(item => item.id) || [];
            setFieldValue(
                { 
                    title, 
                    isActive, 
                    packageDescription, 
                    icon,
                    subCategoryIds, 
                    productsIds,
                    servicesIds,
                    categoryId:data.categoryId.id,
                    priority:data.priority,
                   
                    duration:data.cost.duration,
                    packageCost:data.cost.packageCost,
                    costPerVisit:data.cost.costPerVisit,
                    renewalCost: data.cost.renewalCost,

                    expense:data.expense.expense,
                    additionalCost:data.expense.additionalCost,
                    commission:data.expense.commission,
                    ticketTimeMinutes:data.expense.ticketTimeMinutes,
                    laborCost:data.expense.laborCost,

                    interval:data.frequency.interval,
                    intervalValue:data.frequency.intervalValue,
                   
                    
                    
                    documents: data.attachments.documents || [],
                    images: data.attachments.images || [],
                    videos: data.attachments.videos || []
                }
            );

            categoryId = data.categoryId.id;

          
            if (data.priority) {
                const selectedData = priorityList.find(item => item.id === data.priority);
                setSelectedPriorityDropdownValue({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }
            if (data.cost.duration) {
                const selectedData = durationList.find(item => item.id === data.cost.duration);
                setSelectedDurationDropdownValue({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }

            if (data.frequency.interval) {
                const selectedData = intervalList.find(item => item.id === data.frequency.interval);
                setSelectedIntervalDropdownValue({ ...selectedData, label: selectedData.title, value: selectedData.id })
            }
            


            


            setTitle(`Edit Customer (${data.title})`);
            formConfiguration.selectedValue = data.title;
            setEditModeData(data);
            setEditMode(true);
        }

        fetchCategoryList(categoryId);
        fetchSubCategoryList(categoryId,subCategoryIds) 
        fetchProductList(productsIds);
        fetchServicesList(servicesIds);

        
        

        return () => formConfiguration.selectedValue = null;
    }, [props]);

    
    
    const fetchProductList = (productsIds) => {
        Services.productList(data => {
            setProductList(data);
            
            if (productsIds && Array.isArray(productsIds) && productsIds.length) {
                let selectedDataList = data.filter(item => productsIds.some(productId => productId === item.id));
                selectedDataList = selectedDataList.map(item => ({ ...item, label: item.title, value: item.id }))
                setProductDropdownValue([...selectedDataList]);
            }

        })
    }
    

    const fetchServicesList = (servicesIds) => {
        Services.servicesList(data => {
            setServicesList(data);
            if (servicesIds && Array.isArray(servicesIds) && servicesIds.length) {
                let selectedDataList = data.filter(item => servicesIds.some(servicesId => servicesId === item.id));
                selectedDataList = selectedDataList.map(item => ({ ...item, label: item.title, value: item.id }))
                setServicesDropdownValue([...selectedDataList]);
            }

        })
    }
    
    
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
                setFieldValue(previous => ({ ...previous, subCategoryIds: ids }));
                break;
            case "priority":
                setSelectedPriorityDropdownValue(value);
                setFieldValue(previous => ({ ...previous}));
                break;
            case "duration":
                setSelectedDurationDropdownValue(value);
                setFieldValue(previous => ({ ...previous}));
                break;
            case "interval":
                setSelectedIntervalDropdownValue(value);
                setFieldValue(previous => ({ ...previous}));
                break;
            case "productsId":
                const id = Array.isArray(value) && value.map(item => item.id) || [];
                setProductDropdownValue(value);
                setFieldValue(previous => ({ ...previous, productsIds: id }));
                break;
            case "servicesId":
                const sid = Array.isArray(value) && value.map(item => item.id) || [];
                setServicesDropdownValue(value);
                setFieldValue(previous => ({ ...previous, servicesIds: sid }));
                break;
            default:
                break;
        }
    };

    const onTextChange = (key) => (...data) => {
        if (Array.isArray(data)) {
            const fields = ['title','packageCost','costPerVisit','renewalCost','expense','additionalCost','commission','ticketTimeMinutes','laborCost','intervalValue']
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
                    <div className="add-catg-form-wrapper maintenance__wrapper">
                        
                       
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

AddEditCustomer.defaultProps = defaultProps;
export default AddEditCustomer;
