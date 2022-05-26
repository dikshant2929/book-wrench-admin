'use strict';
import React, { ReactElement, useEffect, useState } from 'react';
import globals from '@globals';
import ReactLazy from '@common-utils/ReactLazy';
import detect from '@common-utils/detect';
import { HtmlTagsProps } from './interfaces';

const defaultProps: any = {
    type: 'cls',
    translate: true,
};

function HtmlTag(props: React.PropsWithChildren<HtmlTagsProps>) {
    //const { _T } = context;

    const tag = props.tag;
    const refs: React.RefObject<any> = React.createRef();

    const attributes = () => {
        const o: any = {};
        //@ts-ignore
        for (const i in props) o[i] = props[i];
        if (props.translate) {
            if (o.dangerouslySetInnerHTML) o.dangerouslySetInnerHTML.__html = o.dangerouslySetInnerHTML.__html;
            if (o.title) o.title = o.title;
        }
        // HACK :: To remove title for JS links on request of SEO
        if (o.tag == 'span') {
            delete o.title;
        }

        if (o.tag) delete o.tag;
        if (o.type) delete o.type;
        if (o.translate) delete o.translate;
        if (o.text) delete o.text;
        if (o.settings) delete o.settings;

        o.ref = refs;
        return o;
    };
    const attr = attributes();

    const children = props.translate ? props.children || props.text || '' : props.children || props.text || '';

    useEffect(() => {
        if (refs.current && refs.current.getAttribute('data-lazy')) {
            // console.log(refs.current, props.type);
            if (props.type == 'content') {
                const img = refs.current.querySelectorAll('[data-gsll-src]');
                if (img) {
                    for (let i = 0; i < img.length; i++) {
                        // console.log(img[i], props.type);
                        ReactLazy({ element: img[i], type: props.type }, function (element: any) {
                            // console.log(element);

                            if (element && element.getAttribute('data-gsll-src')) {
                                element.src = element.getAttribute('data-gsll-src');
                            }
                        });
                    }
                }
            } else {
                const options: any = {
                    element: refs.current,
                    type: props.type,
                };

                if (props.type == 'cls' && detect.isMobile()) {
                    options.delay = 0;
                }
                ReactLazy(options);
            }
        }
    }, []);

    if (
        globals.isEmptyObject(children) &&
        globals.isEmptyObject(attr.dangerouslySetInnerHTML) &&
        typeof tag == 'undefined'
    ) {
        return null;
    }

    if (typeof tag == 'undefined') {
        return children;
    }

    if (children && attr.dangerouslySetInnerHTML) {
        console.error('dangerouslySetInnerHTML or children not allowed at same time, Please Check Render Method');
        return React.createElement(tag, attr);
    }

    if (globals.isEmptyObject(children)) {
        return React.createElement(tag, attr);
    }

    return React.createElement(tag, attr, children);
}
export default HtmlTag;
HtmlTag.defaultProps = defaultProps;

HtmlTag.contextTypes = {
    //_T: PropTypes.func
};
