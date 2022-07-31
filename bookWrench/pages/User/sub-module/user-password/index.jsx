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
import AddEditContactPerson from './AddEditUserPassword';

const { User } = exposedPath;
const defaultProps = {};
const title = 'Point of Contact';



const formConfigurationPassword = (keyOfInput, label) => {
    return {
        id: keyOfInput,
        componentType: 'InputBox',
        selectedValue: '',
        props: {
            type: 'password',
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

const PointOfContact = (props) => {

    console.log({ props });

    const [fieldValue, setFieldValue] = useState({
    })
    const [isButtonEnable, setButtonEnable] = useState(false);

    const [userData, setUserData] = useState({});
    const [contacts, setContactList] = useState([]);
    const getContactPersons = (userId) => {
        Services.userList(
            (data) => {
                if (data?.length) {
                    setUserData(data[0]);
                    setContactList(data?.[0]?.contactPerson || []);
                }
            },
            { _id :userId } ,
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
                setContactList(userData?.contactPerson || []);
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
                    <span className='' onClick={() => onRemoveContactPerson(userData.id, contactPersonId, name)}>
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
        // userData.contactPerson.push(data);
        // const {_id, userId, createdBy, createdAt, updatedAt, id, userName, actions, type, ...request} = userData;
        const request = {
            contactPerson: [data],
        };
        //Add New Point Of Contact
        Services.addContactPerson(request, userData.id, (data) => {
            setUserData({ ...data });
            popupToggler();
        });
    };

    const onRemoveContactPerson = (userId, contactPersonId, name) => {
        const removeContact = () => {
            Services.removeContactPerson(userId, contactPersonId, (data) => {
                console.log(data);
                setUserData({ ...data });
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
        Services.editContactPerson(request, userData.id, userData?.contactPerson[currentIndex]._id, (data) => {
            setUserData({ ...data });
            popupToggler();
        });
    };

    const onAddContactButtonClicked = (itemNumber) => {
        const popupContent = (
            <AddEditContactPerson
                {...userData}
                currentId={itemNumber}
                editContactPerson={editContactPerson}
                addNewContactPerson={addNewContactPerson}
            />
        );
        popupContents({ contents: popupContent, title: 'Information' });
        popupToggler();
    };

    const onclickEvents = () => {
        const editPath = `${User}/edit/${encrypt.encode(JSON.stringify({ ...userData, type: 'Edit' }))}`;
        props.history.push(editPath, userData);
    };

    const onTextChange = (key) => (...data) => {
        
        if (Array.isArray(data)) {
            const fields = ["password", "confirmPassword"]
            const value = (fields.includes(key) ? data[1] : data[0]);
            setFieldValue(previous => ({ ...previous, [key]: value }))
            setFieldValue(previous => {
                if(previous["password"] && previous["confirmPassword"]){
                    setButtonEnable(previous["password"] === previous["confirmPassword"]);
                }
                return previous;
            })
        }
    }

    const onFormSubmit = ({ password }) => {
        console.log(userData, password);
        const { id, createdAt, username, lastLogin, updatedAt, ...request} = userData;
        Services.editUser({ ...request, password }, (data) => {
            if(data){
                const editPath = `${User}/edit/${encrypt.encode(JSON.stringify({ ...data, type : "Edit" }))}`;
                props.history.push(editPath, data);
            }

        }, {}, id)
    }
    console.log(fieldValue);
    return (
        <div className="mx-8 sm:mx-20 mt-12 mb-10">
            <div className="user__wrapper">
                <h1 className="text-center font-medium text-2xl mx-6 my-8 sm:text-left">{title}</h1>

                <div className="user__section flex flex-col lg:flex-row gap-3 m-6">
                    <div className="addCategory user__sidebar basis__20 pt-4 px-3 bg-white rounded-md">
                        <ul className="side_menubar text-center md:text-left">



                            {/* 
                            <li className="active">
                                <UALink title="Point Of Contact" to={exposedPath.PointOfContact}>
                                    Point Of Contact
                                </UALink>
                            </li> */}

                            <li onClick={onclickEvents}>Personal Information</li>
                            <li className='active' onClick={() => props.history.push(exposedPath.PasswordOfUser + "/" + userData?.id, userData)}>Password</li>

                        </ul>
                    </div>
                    <div className="addCategory bg-white center rounded-md w-full">
                        <div className="wrapper__1">
                            <div className="wrapper__2">
                                <div className="add-catg-form-wrapper maintenance__wrapper px-4 pt-4">
                                    {/* <div className="flex justify-between">
                                        <h3 className="text-base font-bold inline-block">{title}</h3>
                                        <Button className='border border-[#0066FF] rounded-lg items-center justify-center'
                                            title="Add Contact Person"
                                            onClick={() => onAddContactButtonClicked(null)}
                                        />
                                    </div>
                                    <div className="user__detail_section mt-6 flex flex-col POC__section my-8">
                                        {contacts.length > 0 ? (
                                            <div >
                                                <ul className="grid md:grid-cols-3 gap-4">
                                                    {userData?.contactPerson?.map((contact, index) => (
                                                        <li key={contact._id}>
                                                            <ContactItem itemNumber={index} {...contact} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <div>No Point of contact at the moment </div>
                                        )}
                                    </div> */}

                                    <div>
                                        <div className='grid md:grid-cols-2 gap-4 add__poc'>
                                        <Input  {...formConfigurationPassword("password", "Password")} selectedValue={fieldValue?.password} cb={onTextChange('password')} />
                                        <Input  {...formConfigurationPassword("confirmPassword", "Confirm Password")} selectedValue={fieldValue?.confirmPassword} cb={onTextChange('confirmPassword')} />
                                        </div>
                                        <div className="btn-wrapper m-auto text-center pt-9">
                                            <Button
                                                disabled={!isButtonEnable ?? false}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onFormSubmit(fieldValue);
                                                }}
                                                className={`form__button ${!isButtonEnable ?? false ? 'btn-disabled' : 'button-primary'}`}
                                                title={'Update' }
                                            />
                                        </div>
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
