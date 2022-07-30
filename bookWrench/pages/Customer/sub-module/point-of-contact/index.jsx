import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import ReactTypeHead from '@common/elements/ReactTypehead';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import '../../Customer.scss';
import Services from '../../Services/customer.service';
import Button from '@button';
import UALink from '@common/elements/UALink';
import { popupContents, popupToggler } from '@common/elements/Popup';
import AddEditContactPerson from './AddEditContactPerson';

const { Customer } = exposedPath;
const defaultProps = {};
const title = 'Point of Contact';

const PointOfContact = (props) => {
    const [customerData, setCustomerData] = useState({});
    const [contacts, setContactList] = useState([]);
    const getContactPersons = (userId) => {
        Services.customerList(
            (data) => {
                if (data?.length) {
                    setCustomerData(data[0]);
                    setContactList(data?.[0]?.contactPerson || []);
                }
            },
            { customerId: userId },
        );
    };

    useEffect(() => {
        const customerId = props?.match?.params?.customerId;
        if (customerId) {
            customerId && getContactPersons(customerId);
        } else {
            const customerData = props?.history?.location?.state;
            if (customerData) {
                setCustomerData({ ...customerData });
                setContactList(customerData?.contactPerson || []);
            }
        }
    }, [props]);

    const ContactItem = ({ name, email, mobileNumber, designation, itemNumber, _id: contactPersonId }) => {
        return (
            <div className="bg-[#F2F3F7] rounded-lg POC relative flex flex-col p-2 gap-1.5">
                {name && <span className='text-base font-semibold'>{name}</span>}
                {email && <span className='text-sm font-normal'>{email}</span>}
                {mobileNumber && <span className='text-sm font-normal'>{mobileNumber}</span>}
                {designation && <span className='text-sm font-normal'>{designation}</span>}
                <div className='absolute top-0 right-0 flex gap-1 items-center p-2'>
                    <span className=' border-[#a4a4a4] p-px' onClick={() => editPointOfContact(itemNumber)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#a4a4a4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </span>
                    <span className='' onClick={() => onRemoveContactPerson(customerData.id, contactPersonId, name)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#a4a4a4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </span>
                </div>
            </div>
        );
    };

    const editPointOfContact = (itemNumber) => {
        onAddContactButtonClicked(itemNumber);
    };

    const addNewContactPerson = (data) => {
        // customerData.contactPerson.push(data);
        // const {_id, customerId, createdBy, createdAt, updatedAt, id, customerName, actions, type, ...request} = customerData;
        const request = {
            contactPerson: [data],
        };
        //Add New Point Of Contact
        Services.addContactPerson(request, customerData.id, (data) => {
            setCustomerData({ ...data });
            popupToggler();
        });
    };

    const onRemoveContactPerson = (customerId, contactPersonId, name) => {
        const removeContact = () => {
            Services.removeContactPerson(customerId, contactPersonId, (data) => {
                console.log(data);
                setCustomerData({ ...data });
                popupToggler();
            });
        };

        const popupContent = (
            <>
                <p className="text-sm">
                    Do you really want to delete <span className="font-bold">{name}</span> contact ?{' '}
                </p>
                <br />
                <span
                    onClick={removeContact}
                    className="inline-block bg-green-500 text-white p-1 cursor-pointer px-4 py-2 rounded-md text-sm"
                >
                    Yes
                </span>
                <span
                    className="inline-block ml-2 bg-gray-200 text-black p-1 cursor-pointer px-4 py-2 rounded-md text-sm"
                    onClick={() => popupToggler(false)}
                >
                    No
                </span>
            </>
        );

        popupContents({ contents: popupContent, title: 'Remove Contact' });
        popupToggler();
    };

    const editContactPerson = (data, currentIndex) => {
        const request = {
            contactPerson: data,
        };
        //Edit existing contact person
        Services.editContactPerson(request, customerData.id, customerData?.contactPerson[currentIndex]._id, (data) => {
            setCustomerData({ ...data });
            popupToggler();
        });
    };

    const onAddContactButtonClicked = (itemNumber) => {
        const popupContent = (
            <AddEditContactPerson
                {...customerData}
                currentId={itemNumber}
                editContactPerson={editContactPerson}
                addNewContactPerson={addNewContactPerson}
            />
        );
        popupContents({ contents: popupContent, title: 'Information' });
        popupToggler();
    };

    const onclickEvents = () => {
        const editPath = `${Customer}/edit/${encrypt.encode(JSON.stringify({ ...customerData, type: 'Edit' }))}`;
        props.history.push(editPath, customerData);
    };

    return (
        <div className="mx-8 sm:mx-20 mt-12 mb-10">
            <div className="customer__wrapper">
                <h1 className="text-center font-medium text-2xl mx-6 my-8 sm:text-left">{title}</h1>

                <div className="customer__section flex flex-col lg:flex-row gap-3 m-6">
                    <div className="addCategory customer__sidebar basis__20 pt-4 px-3 bg-white rounded-md">
                        <ul className="side_menubar text-center md:text-left">



                            {/* 
                            <li className="active">
                                <UALink title="Point Of Contact" to={exposedPath.PointOfContact}>
                                    Point Of Contact
                                </UALink>
                            </li> */}

                            <li onClick={onclickEvents}>Personal Information</li>
                            <li className='active' onClick={() => props.history.push(exposedPath.PointOfContact + "/" + customerData?.customerId, customerData)}>Point Of Contact</li>
                            <li onClick={() => props.history.push(exposedPath.Address + "/" + customerData?.customerId, customerData)}>Addresses</li>
                            <li onClick={() => props.history.push(exposedPath.CustomerMaintenance + "/" + customerData?.customerId, customerData)}>Maintenance</li>

                        </ul>
                    </div>
                    <div className="addCategory bg-white center rounded-md w-full">
                        <div className="wrapper__1">
                            <div className="wrapper__2">
                                <div className="add-catg-form-wrapper maintenance__wrapper px-4 pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-base font-bold inline-block">{title}</h3>
                                        <Button className='border border-[#0066FF] rounded-lg items-center justify-center'
                                            title="Add Contact Person"
                                            onClick={() => onAddContactButtonClicked(null)}
                                        />
                                    </div>
                                    <div className="customer__detail_section mt-6 flex flex-col POC__section my-8">
                                        {contacts.length > 0 ? (
                                            <div >
                                                <ul className="grid md:grid-cols-3 gap-4">
                                                    {customerData?.contactPerson?.map((contact, index) => (
                                                        <li key={contact._id}>
                                                            <ContactItem itemNumber={index} {...contact} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <div>No Point of contact at the moment </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PointOfContact.defaultProps = defaultProps;
export default PointOfContact;
