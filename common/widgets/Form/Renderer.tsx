// Renderer.js
import React, { Fragment } from 'react';

const mapPropsToConfig = (config: any) => {
    const configWithProps: any[] = [];

    config.forEach((item: any) => {
        if (item && item.component) {
            const { component, ...props } = item;
            configWithProps.push({
                ...props,
                Component: component,
            });
        }
    });

    return configWithProps;
};

export const Renderer = ({ config }: any) => {
    if (!config) {
        throw new Error('You are calling Renderer with no config.');
    }

    const configWithProps = mapPropsToConfig(config);

    const renderComponents = (items: any) => {
        return items.map((item: any) => {
            const { Component, ...props } = item;
            return (
                <Fragment key={props.id}>
                    <Component {...props} />
                </Fragment>
            );
        });
    };

    return renderComponents(configWithProps);
};
