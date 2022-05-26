'use strict';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HGroupProps } from './interfaces';

const HGroup = (props: HGroupProps) => {
    const tag = props.tag;
    const translate = props.translate;
    let content = props.content;
    if (typeof translate != 'undefined') {
        content = props.content;
    }
    const attributes = () => {
        const o: any = {};
        //@ts-ignore
        for (const i in props) o[i] = props[i];
        if (o.cls) {
            o.className = o.cls;
            delete o.cls;
        }
        if (o.tag) delete o.tag;
        if (o.settings) delete o.settings;
        delete o.content;
        delete o.translate;
        return o;
    };
    return React.createElement(tag, attributes(), content);
};
export default HGroup;
// HGroup.contextTypes = {
// 	// translations: PropTypes.object,
// 	_T: PropTypes.func
// }

HGroup.propTypes = {
    tag: PropTypes.string.isRequired,
};
