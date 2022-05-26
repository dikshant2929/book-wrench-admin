import React from 'react';
import { shallow, mount } from 'enzyme';
import SideMenu from '../index';
import storage from '@storage';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('@storage');

beforeEach(() => {
    jest.resetModules();
});

describe('SideMenu', function () {
    it('should render the component correctly', function () {
        const wrapper = shallow(<SideMenu />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render all (6) links', function () {
        storage.getUserInfo = jest.fn(() => ({
            data: {
                modulePermissions: {
                    MOD_OFFER: [],
                    MOD_DASHBOARD: [],
                    MOD_INVENTORY: [],
                    MOD_TEST_DRIVE_INVENTORY: [],
                    MOD_DEALER: [],
                    MOD_RM: [],
                },
            },
        }));
        const wrapper = mount(
            <Router>
                <SideMenu />
            </Router>,
        );
        expect(storage.getUserInfo).toHaveBeenCalled();
        expect(wrapper.find('li').length).toBe(6);
    });

    it('should render only Campaign Link if permissions are limited', function () {
        storage.getUserInfo = jest.fn(() => ({
            data: {
                modulePermissions: {
                    MOD_OFFER: ['PERM_LIST'],
                },
            },
        }));
        const wrapper = mount(
            <Router>
                <SideMenu />
            </Router>,
        );
        expect(storage.getUserInfo).toHaveBeenCalled();
        expect(wrapper.find('li').length).toBe(1);
    });
});
