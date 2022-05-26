import React from 'react';
import { shallow, mount } from 'enzyme';
import PermissionGateway from '../PermissionGateway';
import storage from '@storage';

jest.mock('@storage');

beforeEach(() => {
    jest.resetModules();
});

describe('PermissionGateway', function () {
    it('should render the component correctly', function () {
        const wrapper = shallow(<PermissionGateway />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render children for available tag', async function () {
        storage.getUserInfo = jest.fn(() => ({
            data: {
                modulePermissions: {
                    MOD_OFFER: ['PERM_LIST'],
                },
            },
        }));
        const wrapper = mount(
            <PermissionGateway tag="MOD_OFFER.PERM_LIST">
                <span>Show span as Children</span>
            </PermissionGateway>,
        );
        expect(storage.getUserInfo).toHaveBeenCalled();
        expect(wrapper.find('span').exists()).toBeTruthy();
    });

    it("should not render children when tag doesn't existing", async function () {
        storage.getUserInfo = jest.fn(() => ({
            data: {
                modulePermissions: {
                    MOD_OFFER: ['PERM_LIST'],
                },
            },
        }));
        const wrapper = mount(
            <PermissionGateway tag="MOD_OFFER.PERM_UPDATE">
                <span>Should not show span</span>
            </PermissionGateway>,
        );
        expect(storage.getUserInfo).toHaveBeenCalled();
        expect(wrapper.find('span').exists()).toBeFalsy();
    });
});
