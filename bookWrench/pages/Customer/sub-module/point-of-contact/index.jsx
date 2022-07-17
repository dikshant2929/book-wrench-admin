import React, { useEffect, useState } from 'react';
import Input from '@common/elements/Input';
import ReactTypeHead from '@common/elements/ReactTypehead';
import exposedPath from '@ExposedPath';
import encrypt from '@app/storage/encrypt';
import '../../Customer.scss';
import Services from '../../Services/customer.service';
import Button from '@button';
import UALink from '@common/elements/UALink';

const { Customer } = exposedPath;
const defaultProps = {};
const title = "Point of Contact";


const PointOfContact = (props) => {

    const [contacts, setContactList] = useState([]);
    const getContactPersons = (userId) => {
        Services.customerList((data) => {

            if (data?.length) {
                console.log(data?.[0]);
                setContactList(data?.[0]?.contactPerson || []);
            }
        }, { customerId: userId })
    }
    useEffect(() => {
        getContactPersons(3);
    }, []);

    console.log(contacts);

    const ContactItem = ({ name, email, mobileNumber, designation }) => {

        return (
            <div>
                {name && <p>{name}</p>}
                {email && <p>{email}</p>}
                {mobileNumber && <p>{mobileNumber}</p>}
                {designation && <p>{designation}</p>}
            </div>
        )
    }
    return (
        <div className="mx-8 sm:mx-20 mt-12 mb-10">

            <div className='customer__wrapper'>
                <h1 className="text-center font-medium text-2xl mx-6 my-8 sm:text-left">
                    {title}
                </h1>
                <div className='customer__section flex flex-col lg:flex-row gap-3 m-6'>
                    <div className='addCategory customer__sidebar basis__20 pt-4 px-3 bg-white rounded-md'>
                        <ul className='side_menubar text-center md:text-left'>
                            <li>Personal Information</li>
                            {/* <li className='active'><UALink title="Point Of Contact" to={PointOfContact}>Point Of Contact</UALink></li> */}
                            <li>Maintenance</li>
                            <li>Others</li>
                        </ul>
                    </div>
                    <div className="addCategory bg-white center rounded-md w-full">

                        <div className="wrapper__1">
                            <div className="wrapper__2">
                                <div className="add-catg-form-wrapper maintenance__wrapper px-4 pt-4">
                                    <h3 className='text-base font-bold'>{title}</h3>
                                    <div className='customer__detail_section mt-6 flex flex-col POC__section my-8'>
                                        <div className='grid md:grid-cols-4 gap-4'>
                                            <ul>
                                                {contacts.map(contact => <li key={contact._id}><ContactItem {...contact} /></li>)}
                                            </ul>
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
