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
import AddEditContactAddress from './AddEditContactAddress';

const { Customer } = exposedPath;
const defaultProps = {};
const title = 'Address';

const Address = (props) => {
    const [customerData, setCustomerData] = useState({});
    const getContactPersons = (userId) => {
        Services.customerList(
            (data) => {
                if (data?.length) {
                    setCustomerData(data[0]);
                }
            },
            { customerId: userId },
        );
    };

    useEffect(() => {
        const customerId = props?.match?.params?.customerId;
        if(customerId){
            customerId && getContactPersons(customerId);
        }else{
            const customerData = props?.history?.location?.state;
            if (customerData) {
                setCustomerData({ ...customerData });
            }
        }
    }, [props]);


    const ContactItem = ({ location, gateNumber, contactPerson }) => {
        const getContactPersonsFromId = (id) => customerData.contactPerson.find(item => item._id === id);
        return (
            <div className="bg-gray-300">
                {location && <div>{location}</div>}
                {gateNumber && <div>Gate Number: {gateNumber}</div>}
                {contactPerson && <div>Contact Person : {getContactPersonsFromId(contactPerson).name}</div>}
                <div onClick={() => editPointOfContact(itemNumber)}>Edit Icon</div>
                <div onClick={() => onRemoveContactPerson(customerData.id, contactPersonId, name)}>Delete Icon</div>
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
            <AddEditContactAddress
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
                            <li onClick={onclickEvents}>Personal Information</li>
                            <li onClick={() => props.history.push(exposedPath.PointOfContact + "/" + customerData?.customerId, customerData)}>Point Of Contact</li>
                            <li className='active' onClick={() => props.history.push(exposedPath.Address + "/" + customerData?.customerId, customerData)}>Addresses</li>

                        </ul>
                    </div>
                    <div className="addCategory bg-white center rounded-md w-full">
                        <div className="wrapper__1">
                            <div className="wrapper__2">
                                <div className="add-catg-form-wrapper maintenance__wrapper px-4 pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-base font-bold inline-block">{title}</h3>
                                        <Button
                                            title="Add Address"
                                            onClick={() => onAddContactButtonClicked(null)}
                                        />
                                    </div>
                                    <div className="customer__detail_section mt-6 flex flex-col POC__section my-8">
                                        {customerData?.contactAddress?.length > 0 ? (
                                            <div className="grid md:grid-cols-4 gap-4">
                                                <ul>
                                                    {customerData?.contactAddress?.map((contact, index) => (
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

Address.defaultProps = defaultProps;
export default Address;
