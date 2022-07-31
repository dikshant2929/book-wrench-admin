import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import ReactTypeHead from '@common/elements/ReactTypehead';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import '../../User.scss';
import Services from '../../Services/user.service';
import Button from '@button';
import UALink from '@common/elements/UALink';
import { popupContents, popupToggler } from '@common/elements/Popup';
import AddEditContactAddress from './AddEditContactAddress';

const { User } = exposedPath;
const defaultProps = {};
const title = 'Address';

const Address = (props) => {
    const [userData, setUserData] = useState({});
    const getContactPersons = (userId) => {
        Services.userList(
            (data) => {
                if (data?.length) {
                    setUserData(data[0]);
                }
            },
            { userId: userId },
        );
    };

    useEffect(() => {
        const userId = props?.match?.params?.userId;
        if (userId) {
            userId && getContactPersons(userId);
        } else {
            const userData = props?.history?.location?.state;
            if (userData) {
                setUserData({ ...userData });
            }
        }
    }, [props]);


    const ContactItem = ({ location, gateNumber, contactPerson, itemNumber, _id }) => {
        const getContactPersonsFromId = (id) => userData.contactPerson.find(item => item._id === id);
        return (
            <div className="bg-[#F2F3F7] rounded-lg POC relative flex flex-col p-2 gap-1.5">
                <span className='text-base font-semibold'>Address-{itemNumber + 1}</span>
                {location && <span className='text-sm font-normal'>{location}</span>}
                {gateNumber && <span className='text-sm font-normal'>Gate Number: {gateNumber}</span>}
                {contactPerson && <span className='text-sm font-normal'>Contact Person : {getContactPersonsFromId(contactPerson).name}</span>}
                <div className='absolute top-0 right-0 flex gap-1 items-center p-2'>
                    <span onClick={() => editPointOfContact(itemNumber)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#a4a4a4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </span>
                    <span onClick={() => onRemoveContactPerson(userData.id, _id, location)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#a4a4a4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </span>
                </div>
            </div>
        );
    };

    const editPointOfContact = (itemNumber) => {
        onAddContactButtonClicked(itemNumber);
    };

    const addNewAddress = (data) => {
        // userData.contactPerson.push(data);
        // const {_id, userId, createdBy, createdAt, updatedAt, id, userName, actions, type, ...request} = userData;
        const { locality : location, gateNumber = null, contactPerson } = data
        const request = {
            contactAddress: [{
                location, gateNumber, contactPerson
            }],
        };
        //Add New Point Of Contact
        Services.addAddress(request, userData.id, (data) => {
            setUserData({ ...data });
            popupToggler();
        });
    };

    const onRemoveContactPerson = (userId, contactPersonId, name) => {

        const removeContact = () => {
            Services.removeAddress(userId, contactPersonId, (data) => {
                console.log(data);
                setUserData({ ...data });
                popupToggler();
            });
        };

        const popupContent = (
            <>
                <p className="text-sm">
                    Do you really want to delete <span className="font-bold">{name}</span> location ?{' '}
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

        popupContents({ contents: popupContent, title: 'Remove Address' });
        popupToggler();
    };

    const editAddress = (data, currentIndex) => {
        const { locality : location, gateNumber = null, contactPerson } = data
        const request = {
            contactAddress: {
                location, gateNumber, contactPerson
            },
        };
        //Edit existing contact person
        Services.editAddress(request, userData.id, userData?.contactAddress[currentIndex]._id, (data) => {
            setUserData({ ...data });
            popupToggler();
        });
    };

    const onAddContactButtonClicked = (itemNumber) => {
        const popupContent = (
            <AddEditContactAddress
                {...userData}
                currentId={itemNumber}
                editAddress={editAddress}
                addNewAddress={addNewAddress}
            />
        );
        popupContents({ contents: popupContent, title: 'Information' });
        popupToggler();
    };

    const onclickEvents = () => {
        const editPath = `${User}/edit/${encrypt.encode(JSON.stringify({ ...userData, type: 'Edit' }))}`;
        props.history.push(editPath, userData);
    };

    return (
        <div className="mx-8 sm:mx-20 mt-12 mb-10">
            <div className="user__wrapper">
                <h1 className="text-center font-medium text-2xl mx-6 my-8 sm:text-left">{title}</h1>

                <div className="user__section flex flex-col lg:flex-row gap-3 m-6">
                    <div className="addCategory user__sidebar basis__20 pt-4 px-3 bg-white rounded-md">
                        <ul className="side_menubar text-center md:text-left">
                            <li onClick={onclickEvents}>Personal Information</li>
                            <li onClick={() => props.history.push(exposedPath.PointOfContact + "/" + userData?.userId, userData)}>Point Of Contact</li>
                            <li className='active' onClick={() => props.history.push(exposedPath.Address + "/" + userData?.userId, userData)}>Addresses</li>
                            <li onClick={() => props.history.push(exposedPath.UserMaintenance + "/" + userData?.userId, userData)}>Maintenance</li>
                         </ul>
                    </div>
                    <div className="addCategory bg-white center rounded-md w-full">
                        <div className="wrapper__1">
                            <div className="wrapper__2">
                                <div className="add-catg-form-wrapper maintenance__wrapper px-4 pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-base font-bold inline-block">{title}</h3>
                                        <Button className='border border-[#0066FF] rounded-lg items-center justify-center'
                                            title="Add Address"
                                            onClick={() => onAddContactButtonClicked(null)}
                                        />
                                    </div>
                                    <div className="user__detail_section mt-6 flex flex-col POC__section my-8">
                                        {userData?.contactAddress?.length > 0 ? (
                                            <div>
                                                <ul className="grid md:grid-cols-3 gap-4">
                                                    {userData?.contactAddress?.map((contact, index) => (
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