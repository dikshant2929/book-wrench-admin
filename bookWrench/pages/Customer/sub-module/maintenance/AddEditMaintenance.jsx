import React, { useState, useEffect } from 'react';
import Input from '@common/elements/Input';
import Button from '@common/elements/Button';
import CheckBox from '@common/elements/CheckBox';
import ReactTypeHead from '@common/elements/ReactTypehead';
import Services from '../../Services/customer.service';
const mandatoryFields = ["maintenance", "contactAddress"];
import Textarea from '@common/elements/Textarea';


const intervalList = [
    {
        id: "days",
        title: "Days"
    },
    {
        id: "weeks",
        title: "Weeks"
    },
    {
        id: "months",
        title: "Months"
    },
    {
        id: "seasons",
        title: "Seasons"
    },
]

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

const AddEditMaintenance = (props) => {

    console.log(props)

    const [selectedDropdownValueAddress, setSelectedDropdownValueAddress] = useState(null);
    const [contactList, setContactList] = useState([]);
    const [isEditMode, setEditMode] = useState(false);
    const [isButtonEnable, setButtonEnable] = useState(false);

    const [maintenanceList, setMaintenanceList] = useState();
    const [selectedMaintenanceList, setSelectedMaintenanceList] = useState();

    const [selectedIntervalDropdownValue, setSelectedIntervalDropdownValue] = useState();



    const [fieldValue, setFieldValue] = useState({
        description: props?.maintenanceCustomerList[props.currentId]?.description || "",
        intervalValue: props?.maintenanceCustomerList[props.currentId]?.vistFrequency.value || "",
        interval: props?.maintenanceCustomerList[props.currentId]?.vistFrequency.interval || "",

    });


    //props.maintenanceCustomerList[props.currentId].maintenance.id
    const onTextChange = (key) => (...data) => {
        if (Array.isArray(data)) {
            const fields = ["intervalValue"];
            const value = fields.includes(key) ? data[1] : data[0];
            setFieldValue(previous => ({ ...previous, [key]: value }))
        }
    }

    useEffect(() => {
        const isValidForm = mandatoryFields.every(item => Boolean(fieldValue[item]))
        setButtonEnable(isValidForm);
    }, [fieldValue]);




    useEffect(() => {
        // if (Array.isArray(props.contactAddress) && props.contactAddress.length) {
        //     const list = [];
        //     props.contactAddress.forEach(contactAddress => { 
        //         const data = {...contactAddress, label: contactAddress.location, value: contactAddress._id } 
        //         if(contactAddress._id === props?.contactAddress[props.currentId]?.contactAddress ){
        //             setFieldValue(prev => ({...prev, contactAddress : contactAddress._id}))
        //             setSelectedDropdownValueAddress({ ...data });
        //         }
        //         list.push(data);
        //     });
        //     setContactList([...list]);
        // }

        if (props.currentId !== null) {
            setEditMode(true);
            setButtonEnable(true);
        }


        Services.maintenanceList(
            (data) => {
                const list = [];
                data.forEach(maintenanceList => {
                    const data = { ...maintenanceList, label: maintenanceList.title, value: maintenanceList.id }
                    if (maintenanceList.id === props?.maintenanceCustomerList[props.currentId]?.maintenance?.id) {
                        setFieldValue(prev => ({ ...prev, maintenance: maintenanceList.id }))
                        setSelectedMaintenanceList({ ...data });
                    }
                    list.push(data);
                });
                setMaintenanceList([...list]);

            },

        );




    }, [props])

    const onFormSubmit = (data) => {
        if (isEditMode) {
            props?.editAddress(data, props.currentId);
        } else {
            props?.addNewMaintenance(data);
        }
    };


    const handleOnChange = (key) => (value) => {
        if (!value) return;
        setFieldValue(previous => ({ ...previous, [key]: value.id ? value.id : value._id }));
        switch (key) {
            case "contactAddress":
                setSelectedDropdownValueAddress(value);
                setFieldValue(previous => ({ ...previous }));
                break;
            case "maintenance":
                setSelectedMaintenanceList(value);
                const ids = Array.isArray(maintenanceList) && maintenanceList.find(item => {
                    if (item.id === value.id) { return item }
                }) || [];
                setSelectedIntervalDropdownValue({ label: ids.frequency.interval, value: ids.frequency.interval })
                setFieldValue(previous => ({ ...previous, interval: ids.frequency.interval, intervalValue: ids.frequency.intervalValue }));
                break;
            case "interval":
                setSelectedIntervalDropdownValue(value);
                setFieldValue(previous => ({ ...previous, intervalValue: "" }));
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <div className='text-left font-semibold text-xs mb-4'>Maintenance Details</div>
            <div className='grid  add__address'>
                <ReactTypeHead
                    id="maintenanceList"
                    header="Maintenance Package"
                    options={maintenanceList}
                    handleSelect={handleOnChange('maintenance')}
                    placeholder="Select Maintenance"
                    value={selectedMaintenanceList}
                />
            </div>
            <div className='grid  add__address'>
                <Textarea parentClass="w-full ta__with-height add__maintainance mt-5" value={fieldValue?.description} onChange={onTextChange('description')} title="Description" name="description" />
            </div>
            <div className='text-left font-semibold text-xs my-4'>Visit Frequency</div>
            <div className='w-auto md:w-full'>
                <div className='grid grid-cols-2 gap-4'>
                    <ReactTypeHead
                        header="Interval"
                        handleSelect={handleOnChange('interval')}
                        dataList={intervalList}
                        fields={{ key: 'id', value: 'title' }}
                        placeholder="Select Interval"
                        value={selectedIntervalDropdownValue}
                        parentClass={"min-w-1/4 leading-8 block w-auto rounded-md outline-none"}
                    />
                    <Input  {...costInputFieldConfiguration("intervalValue", (fieldValue?.interval || "Days"))} selectedValue={fieldValue?.intervalValue} cb={onTextChange('intervalValue')} />
                </div>

            </div>
            <div className='text-left font-semibold text-xs my-4'> Address</div>
            <div className=''>
                <div className='grid select__poc'>
                    {/* <Input  {...formConfiguration("contactName", "Contact Name")} selectedValue={fieldValue?.contactName} cb={onTextChange('contactName')} /> */}
                    <ReactTypeHead
                        id="selectPOC"
                        options={contactList}
                        handleSelect={handleOnChange('contactAddress')}
                        placeholder="Select Address"
                        value={selectedDropdownValueAddress}
                    />
                </div>
            </div>
            <div className="btn-wrapper m-auto text-center py-6">
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
    )
}






export default AddEditMaintenance;