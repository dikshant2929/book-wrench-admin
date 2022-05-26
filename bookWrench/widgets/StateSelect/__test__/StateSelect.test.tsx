import React from 'react';
import { shallow, mount } from 'enzyme';
import StateSelect from '../index';
import API from '@API';
import { waitForComponentToPaint } from '@common-utils/jestHelper';

jest.mock('@API');

afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    API.get.mockClear();
});

describe('StateSelect', function () {
    it('should render the component correctly', function () {
        const wrapper = shallow(<StateSelect handleSelect />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should not contain predefined value in State Dropdown', async function () {
        mockData();
        const wrapper = mount(<StateSelect />);
        await waitForComponentToPaint(wrapper);
        expect(wrapper.find('Select').text()).toEqual('Select State');
        expect(API.get).toHaveBeenCalled();
    });

    it('should show second selected option as State and No City', async function () {
        mockData();
        const wrapper = mount(<StateSelect />);
        await waitForComponentToPaint(wrapper);
        const stateDropdown = wrapper.find('Select').first();
        stateDropdown.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
        stateDropdown.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
        stateDropdown.simulate('keyDown', { key: 'Enter', keyCode: 13 });
        await waitForComponentToPaint(wrapper);
        expect(wrapper.find('Select').first().text()).toBe('State Two');
        expect(wrapper.find('Select').last().text()).toEqual('Select City');
        expect(API.get).toHaveBeenCalled();
    });

    it('should show first selected option as City', async function () {
        mockData();
        const wrapper = mount(<StateSelect />);
        await waitForComponentToPaint(wrapper);
        const stateDropdown = wrapper.find('Select').first();
        stateDropdown.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
        stateDropdown.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
        stateDropdown.simulate('keyDown', { key: 'Enter', keyCode: 13 });
        await waitForComponentToPaint(wrapper);
        const cityDropdown = wrapper.find('Select').last();
        expect(cityDropdown.text()).toEqual('Select City');
        cityDropdown.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 }); //Opens Up
        cityDropdown.simulate('keyDown', { key: 'Enter', keyCode: 13 }); //Hit Enter
        expect(wrapper.find('Select').first().text()).toBe('State Two');
        expect(wrapper.find('Select').last().text()).toEqual('City One');
        expect(API.get).toHaveBeenCalled();
    });
});

function mockData() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    API.get = jest.fn((key) => {
        let result: any = [];
        switch (key) {
            case 'StateDropdown':
                result = [
                    { id: 1, name: 'State One' },
                    { id: 2, name: 'State Two' },
                    { id: 3, name: 'State Three' },
                ];
                break;
            case 'CityDropdown':
                result = [
                    { id: 11, name: 'City One' },
                    { id: 12, name: 'City Two' },
                    { id: 13, name: 'City Three' },
                ];
                break;
        }
        return Promise.resolve({
            data: {
                result,
            },
        });
    });
}
