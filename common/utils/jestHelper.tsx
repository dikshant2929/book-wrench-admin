import React, { ReactElement } from 'react';
import { waitFor } from '@testing-library/react';
import { ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

interface asyncRenderModel {
    (renderMethod: (node: ReactElement) => ReactWrapper<any>, component: ReactElement): Promise<ReactWrapper<any>>;
}

export const asyncRender: asyncRenderModel = async (renderMethod, component) => {
    let result = renderMethod(<></>);
    try {
        await waitFor(() => {
            result = renderMethod(component);
        });
    } catch (e) {
        console.error(e);
    }
    return result;
};

export const waitForComponentToPaint = async (wrapper: any) => {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();
    });
};
