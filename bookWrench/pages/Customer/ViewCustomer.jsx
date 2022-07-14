import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import MultipleVideoUploader from '@common/elements/MultipleVideoUploader';
import Textarea from '@common/elements/Textarea';
import ReactTypeHead from '@common/elements/ReactTypehead';
import FileUpload from '@app/widgets/FileUpload';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import './Maintenance.scss';
import Services from './Services/customer.service';
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

const intervalList = [
    {
        id:"days",
        title:"Days"
    },
    {
        id:"weeks",
        title:"Weeks"
    },
    {
        id:"months",
        title:"Months"
    },
    {
        id:"seasons",
        title:"Seasons"
    },
]




const durationList = [
    {
        id:"180 days",
        title:"6 Months"
    },
    {
        id:"364 days",
        title:"12 Months"
    },
    {
        id:"738 days",
        title:"2 Years"
    },
    {
        id:"1092 days",
        title:"3 Years"
    },
    {
        id:"1820 days",
        title:"5 Years"
    },
    {
        id:"continous",
        title:"Ongoing & Continous"
    }
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

const ViewCustomer = (props) => {

    const mandatoryFields = ["categoryId", "title","packageCost","costPerVisit","renewalCost","duration","interval","intervalValue"];

   
    const [isEditMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [title, setTitle] = useState('Create New Maintenance Package');
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
        const encryptedData = props?.match?.params?.editmaintenance;
        const editPath = `${Maintenance}/edit/${encryptedData}`;
        props.history.push(editPath);
    };

    useEffect(() => {

        let categoryId = null;
        let subCategoryIds = null;
        let productsIds = null;
        let servicesIds = null;

        

        const encryptedData = props?.match?.params?.editmaintenance;
       
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
            
            setTitle(`${data.title}`);
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
                        <div className="flex flex-col lg:flex-row lg:items-center category__header m-10 gap-4 maintenance__first">
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
                                parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none mandatory__field"}
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
                                isMulti
                            />
                        </div>
                        <hr />
                        <div className="flex flex-col lg:flex-row file_upload_wrapper lg:items-start category__header m-10 gap-4">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Package</label>
                            </div>
                            <div className='flex-col w-full md:w-1/2'>
                                <Input  disabled={true} {...formConfiguration("title", "Package Name")} selectedValue={fieldValue?.title} cb={onTextChange('title')} />
                                <ReactTypeHead
                                    header="Priority"
                                    handleSelect={handleOnChange('priority')}
                                    dataList={priorityList}
                                    fields={{ key: 'id', value: 'title' }}
                                    placeholder="Select priority"
                                    disabled={true}
                                    value={selectedPriorityDropdownValue}
                                    parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none mt-5"}
                                 />
                                <div className='flex gap-4 mt-5'>
                                     <Textarea disabled={true} parentClass="textArea w-1/2 ta__with-height" value={fieldValue?.packageDescription} onChange={onTextChange('packageDescription')} title="Package Description" name="packageDescription" />
                                </div>
                            </div>
                            <FileUpload disabled={true} parentClass='file_upload w-full md:w-[48%] lg:w-[36%]' imageURL={fieldValue.icon} title="Icon" imagePath={onTextChange('icon')} />

                        </div>
                        <hr />
                        <div className="w-auto md:w-full flex flex-col md:flex-row gap-4 m-10 mandatory__field">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Cost</label>
                            </div>
                            <div className='w-auto md:w-full'>
                                <div className='flex basis-wrapper flex-wrap lg:flex-nowrap gap-4'>
                                <ReactTypeHead
                                    header="Duration"
                                    handleSelect={handleOnChange('duration')}
                                    dataList={durationList}
                                    fields={{ key: 'id', value: 'title' }}
                                    placeholder="Select duration"
                                    value={selectedDurationDropdownValue}
                                    disabled={true}
                                    parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                 />
                                    <Input disabled={true} {...costInputFieldConfiguration("packageCost", "Package Cost")} selectedValue={fieldValue?.packageCost} cb={onTextChange('packageCost')} />
                                    <Input disabled={true} {...costInputFieldConfiguration("costPerVisit", "Cost Per Visit")} selectedValue={fieldValue?.costPerVisit} cb={onTextChange('costPerVisit')} />
                                    <Input disabled={true} {...costInputFieldConfiguration("renewalCost", "Renewal Cost")} selectedValue={fieldValue?.renewalCost} cb={onTextChange('renewalCost')} />
                                </div>
                               
                            </div>


                        </div>
                        <hr /> 
                        <div className="w-auto md:w-full flex flex-col md:flex-row gap-4 m-10">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Expense (Internal)</label>
                            </div>
                            <div className='w-auto md:w-full'>
                                <div className='flex basis-wrapper flex-wrap lg:flex-nowrap gap-4'>
                                    <Input disabled={true} {...costInputFieldConfiguration("expense", "Expense")} selectedValue={fieldValue?.expense} cb={onTextChange('expense')} />
                                    <Input disabled={true}  {...costInputFieldConfiguration("additionalCost", "Additional Cost")} selectedValue={fieldValue?.additionalCost} cb={onTextChange('additionalCost')} />
                                    <Input disabled={true} {...costInputFieldConfiguration("commission", "commission (if any)")} selectedValue={fieldValue?.commission} cb={onTextChange('commission')} />
                                    <Input disabled={true}  {...costInputFieldConfiguration("ticketTimeMinutes", "Ticket Time Minutes")} selectedValue={fieldValue?.ticketTimeMinutes} cb={onTextChange('ticketTimeMinutes')} />
                                    <Input disabled={true} {...costInputFieldConfiguration("laborCost", "Labor Cost")} selectedValue={fieldValue?.laborCost} cb={onTextChange('laborCost')} />
                                    
                               
                                </div>
                               
                            </div>


                        </div>
                        <hr /> 
                        <div className="w-auto md:w-full flex flex-col md:flex-row gap-4 m-10 mandatory__field">
                            <div className='basis__10 border-light '>
                                <label className='text-base font-bold'>Frequency</label>
                            </div>
                            <div className='w-auto md:w-full'>
                                <div className='flex basis-wrapper flex-wrap lg:flex-nowrap gap-4'>
                                <ReactTypeHead
                                    header="Interval"
                                    handleSelect={handleOnChange('interval')}
                                    dataList={intervalList}
                                    disabled={true}
                                    fields={{ key: 'id', value: 'title' }}
                                    placeholder="Select Interval"
                                    value={selectedIntervalDropdownValue}
                                    parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                 />
                                    <Input  disabled={true} {...costInputFieldConfiguration("intervalValue", (fieldValue?.interval || "Days"))} selectedValue={fieldValue?.intervalValue} cb={onTextChange('intervalValue')} />
                                </div>
                               
                            </div>


                        </div>
                        <hr /> 
                        <div className="w-auto md:w-full flex flex-col md:flex-row gap-4 m-10">
                            <div className='basis__10 border-light'>
                                <label className='text-base font-bold'>Products & Services</label>
                            </div>
                            <div className='w-auto md:w-full'>
                                <div className='flex basis-wrapper flex-wrap lg:flex-nowrap gap-4'>
                                <ReactTypeHead
                                    header="Products"
                                    handleSelect={handleOnChange('productsId')}
                                    dataList={productList}
                                    fields={{ key: 'id', value: 'title' }}
                                    placeholder="Select Products"
                                    value={selectedProductDropdownValue}
                                    disabled={true}
                                    parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                    isMulti
                                />

                                <ReactTypeHead
                                    header="Services"
                                    handleSelect={handleOnChange('servicesId')}
                                    dataList={servicesList}
                                    fields={{ key: 'id', value: 'title' }}
                                    placeholder="Select Services"
                                    value={selectedServicesDropdownValue}
                                    disabled={true}
                                    parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                                    isMulti
                                />

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
                            <MultipleDocUploader disabled={true} list={fieldValue?.documents} onListUpdate={onTextChange("documents")} />
                            </div>
                            
                            <div className='attachment__wrapper w-full flex flex-col'>
                               <MultipleImageUploader disabled={true} list={fieldValue?.images} onListUpdate={onTextChange("images")}/>
                            </div>
                            <MultipleVideoUploader disabled={true} list={fieldValue?.videos} onListUpdate={onTextChange("videos")} />
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

ViewCustomer.defaultProps = defaultProps;
export default ViewCustomer;
