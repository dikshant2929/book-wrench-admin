'use strict';

import React, { useState } from 'react';
import { CLinkProps } from './interfaces';
import { useHistory, NavLink } from 'react-router-dom';
import configs from '@app/configs/configs';
let $: any;
const defaultProps = {
    default: true,
    popup: false,
    tracking: false,
    event: 'click',
    linkViaClick: false,
    checkHashPopUp: true,
    translate: true,
};

export default function CLink(props: CLinkProps) {
    const history = useHistory();

    const tracking = (e: any, fn: any) => {
        //console.log(e, fn)
        if (typeof fn === 'function') {
            fn(e);
        }

        let obj = $(e.target);
        if (!obj.is('a')) {
            obj = obj.parents('a');
            if (obj.length <= 0) {
                obj = $(e.target);
            }
        }

        if (props.linkViaClick) {
            handleClick(e, null);
        }

        if (obj.attr('href') == '#') {
            e.preventDefault();
            return false;
        }
    };

    const handleClick = (e: any, fn: any) => {
        if (typeof fn === 'function') {
            fn(e);
        }

        // Generate url from state, so we can set state from JS/Zepto
        const url = props.slug;
        if (props.default) {
            if (props.target == '_blank') {
                window.open(url);
            } else {
                if (url.startsWith('#')) {
                    //@ts-ignore
                    window.__doNotScroll = true;
                    const scr = document.body.scrollTop;
                    window.location.hash = url;
                    document.body.scrollTop = scr;
                } else {
                    window.location.href = url;
                }
            }
        } else {
            history.push(url);
        }
    };

    const attributes = () => {
        const t = [
            'urlKey',
            'translate',
            'linkViaClick',
            'slug',
            'default',
            'tracking',
            'children',
            'category',
            'label',
            'event',
            'prefix',
            'settings',
            'tag',
            'checkHashPopUp',
        ];

        const o: any = {};

        for (const i in props) {
            if (t.indexOf(i) > -1) continue;
            //@ts-ignore
            if (props[i]) o[i] = props[i];
        }
        //console.log(props.tracking)
        if (props.tracking) {
            //console.log(o.onClick)
            var fn = o.onClick; //Parent onclick
            o.onClick = (e: any) => tracking(e, fn);
        } else {
            o.onClick = (e: any) => handleClick(e, fn);
        }

        if (props.target == '_blank') {
            o.rel = 'noopener';
        }
        // HACK :: To remove title for JS links on request of SEO
        if (props.linkViaClick || props.tag == 'span') {
            delete o.title;
        }

        return o;
    };

    const getChildrens = () => {
        const children = props.children;
        return children;
    };

    const tag = () => {
        if (typeof props.tag == 'string' && props.tag) {
            return React.createElement(props.tag, attributes(), getChildrens());
            //console.log('span tag value is ',props.children )
            //return (
            //	<span {...attributes()}>{getChildrens()}</span>
            //);
        }

        if (props.linkViaClick) {
            console.log('link via click value is ', props.children);
            return (
                <a href="#" {...attributes()}>
                    {getChildrens()}
                </a>
            );
        }
        if (props.popup) {
            console.log('popups value is', props.title);
            return <span data-popup={props.datapopup}>{props.title}</span>;
        }
        if (props.default) {
            //console.log('default value is',props.children )

            return (
                <a
                    href={props.prefix == undefined || props.prefix ? `${configs.baseUrl}${props.slug}` : props.slug}
                    {...attributes()}
                >
                    {getChildrens()}
                </a>
            );
        } else
            return (
                <NavLink to={props.slug} {...attributes()}>
                    {getChildrens()}
                </NavLink>
            );
    };

    return tag();
}

//add required to category and label later

// CLink.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	default: PropTypes.bool,
// 	popup: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
// 	slug: PropTypes.string,
// 	tracking: PropTypes.bool,
// 	category: PropTypes.string,
// 	label: PropTypes.string,
// 	prefix: PropTypes.bool
// }

CLink.defaultProps = defaultProps;
