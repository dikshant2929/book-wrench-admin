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
import AddEditMaintenance from './AddEditMaintenance';

const { User } = exposedPath;
const defaultProps = {};
const title = 'Maintenance';

const MaintenanceUser = (props) => {
    const [userData, setUserData] = useState({});
    const [maintenanceUserList, setMaintenanceUserList] = useState({});

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

    const getMaintenanceUser = () => {
        Services.maintenanceUserList(
            (data) => {
                if (data?.length) {
                    setMaintenanceUserList(data);
                }
            }

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



        getMaintenanceUser()


    }, [props]);


    const MaintenanceItems = (list) => {

        // const getContactPersonsFromId = (id) => userData.contactPerson.find(item => item._id === id);
        const maintenanceTitle = `Maintenance-${list.itemNumber + 1}`;

        return (
            <div className="bg-[#F2F3F7] rounded-lg POC relative flex flex-col p-2 gap-1.5">
                <div className='mb-3'>
                    <span className='text-base font-semibold'>{ maintenanceTitle }</span>
                    <div className='text-xs font-normal text-[#6F757E] py-1'>Place on : {list.updatedAt}</div>
                </div>
                <div className='grid grid-cols-2 mb-3'>
                    <div className='text-xs font-semibold text-[#6F757E]'>Service Package
                        <div className='text-sm font-medium text-[#27303E] py-1'>{list.maintenance.title}</div>
                    </div>
                    <div className='text-xs font-semibold text-[#6F757E]'>Visit Frequency
                        <div className='text-sm font-medium text-[#27303E] py-1'> {list.vistFrequency.value} {list.vistFrequency.interval}</div>
                    </div>
                </div>

                <div className='text-xs font-semibold text-[#6F757E] mb-3'>Description
                    <div className='text-sm font-medium text-[#27303E] py-1'> {list.description || "NA"}</div>
                </div>

                <div className='flex bg-white p-2.5 rounded-md'>
                    <div className='basis__22 text-xs font-semibold text-[#6F757E]'>Package Cost
                        <div className='text-sm font-medium text-[#27303E] py-1'> ${list.maintenance.cost.packageCost} </div>
                    </div>

                    <div className='basis__22 text-xs font-semibold text-[#6F757E]'>Cost per visit
                        <div className='text-sm font-medium text-[#27303E] py-1'>${list.maintenance.cost.costPerVisit}</div>
                    </div>

                    <div className='basis__22 text-xs font-semibold text-[#6F757E]'>Renewal Cost
                        <div className='text-sm font-medium text-[#27303E] py-1'> ${list.maintenance.cost.renewalCost}</div>
                    </div>
                </div>


                <div className='absolute top-0 right-0 flex gap-1 items-center p-2'>
                    <span onClick={() => editPointOfContact(list.itemNumber)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#a4a4a4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </span>
                    <span onClick={() => onRemoveMaintenance(list.id, maintenanceTitle)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#a4a4a4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </span>
                </div>
            </div>
        );
    };

    const editPointOfContact = (itemNumber) => {
        onAddContactButtonClicked(itemNumber);
    };

    const addNewMaintenance = (data) => {
        const { contactAddress: address, maintenance, description, interval, intervalValue: value } = data
        const request = {
            address,
            maintenance,
            user: userData.id,
            description,
            vistFrequency: {
                interval,
                value
            },
        };
        //Add New Point Of Contact
        Services.addMaintenance(request, (data) => {
            const mcList = [...(maintenanceUserList || [])];
            mcList.push(data);
            setMaintenanceUserList([ ...mcList ]);
            popupToggler();
        });
    };

    const onRemoveMaintenance = (id, title) => {

        const removeMaintenance = () => {
            Services.removeMaintenanceList(id, (data) => {
                if(data?.id){
                    const filteredMaintenanceList = maintenanceUserList.filter(({ id }) => id !== data.id);
                    setMaintenanceUserList([...filteredMaintenanceList]);
                }
                popupToggler();
            });
        };

        const popupContent = (
            <>
                <p className="text-sm">
                    Do you really want to delete <span className="font-bold">{title}</span> ?{' '}
                </p>
                <br />
                <span
                    onClick={removeMaintenance}
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

        popupContents({ contents: popupContent, title: 'Remove Maintenance Package' });
        popupToggler();
    };

    const editAddress = (data, currentIndex) => {
        
        const id = maintenanceUserList[currentIndex].id;
        const { contactAddress: address, maintenance, description, interval, intervalValue: value } = data
        const request = {
            address,
            maintenance,
            user: userData.id,
            description,
            vistFrequency: {
                interval,
                value
            },
        };

        Services.editMaintenance(request, (data) => {
            const mcList = [...maintenanceUserList];
            mcList[currentIndex] = data;
            setMaintenanceUserList(mcList)
            popupToggler();
        }, {}, id);
    };

    const onAddContactButtonClicked = (itemNumber) => {
        const popupContent = (
            <AddEditMaintenance
                {...{ maintenanceUserList, userData }}
                currentId={itemNumber}
                editAddress={editAddress}
                addNewMaintenance={addNewMaintenance}
            />
        );
        popupContents({ contents: popupContent, title: 'Add Maintenance' });
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
                            <li onClick={() => props.history.push(exposedPath.Address + "/" + userData?.userId, userData)}>Addresses</li>
                            <li className='active' onClick={() => props.history.push(exposedPath.UserMaintenance + "/" + userData?.userId, userData)}>Maintenance</li>
                        </ul>
                    </div>
                    <div className="addCategory bg-white center rounded-md w-full">
                        <div className="wrapper__1">
                            <div className="wrapper__2">
                                <div className="add-catg-form-wrapper maintenance__wrapper px-4 pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-base font-bold inline-block">{title}</h3>
                                        <Button className='border border-[#0066FF] rounded-lg items-center justify-center'
                                            title="Add Maintenance"
                                            onClick={() => onAddContactButtonClicked(null)}
                                        />
                                    </div>
                                    <div className="user__detail_section mt-6 flex flex-col POC__section my-8">
                                        {maintenanceUserList?.length > 0 ? (
                                            <div>
                                                <ul className="grid gap-8">
                                                    {maintenanceUserList?.map((list, index) => (
                                                        <li key={list._id}>
                                                            <MaintenanceItems itemNumber={index} {...list} />
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

MaintenanceUser.defaultProps = defaultProps;
export default MaintenanceUser;