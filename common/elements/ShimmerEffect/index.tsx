'use strict';
import React, { PropsWithChildren, useState } from 'react';
import PropTypes from 'prop-types';
import { SimmerProps } from './interfaces';

const defaultProps = {
    visible: false,
    height: 150,
    count: 1,
    type: 'grid',
    columnCls: 'row',
    containerCls: 'containerSWMenu',
};

const ShimmerEffect = (props: PropsWithChildren<SimmerProps>) => {
    let count = props.count ? props.count : 1;
    let shimmer = function () {
        var h = [];
        for (let i = 0; i < count; i++) {
            h.push(
                <div key={i} className={props.columnCls}>
                    <div className="contentLoader ">
                        <div className="animated-backgroundlarge firstRow"> </div>
                        <div className="animated-backgroundlarge secondRow" style={{ height: '8px', width: '85%' }}>
                            {' '}
                        </div>
                        <div className="animated-backgroundlarge secondRow" style={{ height: '8px', width: '75%' }}>
                            {' '}
                        </div>
                        <div className="animated-backgroundlarge secondRow" style={{ height: '8px', width: '65%' }}>
                            {' '}
                        </div>
                        <div className="animated-background" style={{ height: props.height, marginBottom: '0px' }}>
                            {' '}
                        </div>
                    </div>
                </div>,
            );
        }

        return h;
    };

    let gridShimmer = function () {
        var h = [];
        for (let i = 0; i < count; i++) {
            h.push(
                <div key={i} className={props.columnCls}>
                    <div className="bg-white text-black py-5 my-5 mx-auto w-full border border-opacity-50 contentLoader">
                        <div className="relative mx-4 mb-4 animate-pulse bg-gray-200" style={{ height: props.height }}>
                            {' '}
                        </div>
                        <div className="relative mx-4 mb-4 animate-pulse bg-gray-200 w-10/12 h-3"></div>
                        <div className="relative mx-4 mb-4 animate-pulse bg-gray-200 w-9/12 h-3"></div>
                        <div className="relative mx-4 mb-4 animate-pulse bg-gray-200 w-8/12 h-3"></div>
                    </div>
                </div>,
            );
        }

        return h;
    };

    if (!props.visible) return null;

    return (
        <div className={`${props.containerCls}`}>
            {props.visible ? (props.type == 'grid' ? gridShimmer() : shimmer()) : ''}
        </div>
    );
};
export default ShimmerEffect;

ShimmerEffect.propTypes = {
    count: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    type:
        Boolean(PropTypes.string) &&
        function (props: any, propName: string, componentName: string) {
            let value = props[propName];
            var converttoarray = value.split(',');
            var checker = function (arrayvalue: any) {
                return (
                    arrayvalue.indexOf('list') > -1 || arrayvalue.indexOf('grid') > -1 || arrayvalue.indexOf('') > -1
                );
            };
            return converttoarray.every(checker)
                ? null
                : new Error(
                      propName +
                          ' in ' +
                          componentName +
                          ' should have only grid or list(empty value will be considered as grid)',
                  );
        },
};

ShimmerEffect.defaultProps = defaultProps;
