import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from '../index';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Header', function () {
    it('should render the component correctly', function () {
        const wrapper = shallow(<Header />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should work logout functionality on sign out button clicked', function () {
        const props = {
            auth: {
                signout: jest.fn(),
            },
        };
        const wrapper = mount(<Header {...props} />);
        wrapper.find('button').simulate('click');
        expect(props.auth.signout).toHaveBeenCalled();
    });
});

jest.mock('../utils.ts', () => ({ GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID' }));
jest.mock('react-google-login', () => {
    const mockGoogleSignin = { ...jest.requireActual('react-google-login') };
    // eslint-disable-next-line react/display-name
    mockGoogleSignin.GoogleLogout = ({ onLogoutSuccess }) => {
        const handleClick = () => {
            onLogoutSuccess();
        };
        return <button onClick={handleClick} className={`ml-1 inline-flex button-primary w-auto h-46px px-20px text-sm`}>Logout</button>;
    };
    return mockGoogleSignin;
});
