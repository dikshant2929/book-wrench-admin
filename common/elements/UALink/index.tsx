'use strict';
import React, { PropsWithChildren, useState } from 'react';
import { UALinkProps } from './interfaces';
import { useHistory, NavLink } from 'react-router-dom';

import storage from '@storage';

const defaultProps = {
    event: 'click',
    isauthurl: 'false',
};

export default function UALink(props: PropsWithChildren<UALinkProps>) {
    const history = useHistory();

    let handleClick = (e: any, fn: any) => {
        if (typeof fn === 'function') {
            fn(e);
        }
        // Generate url from state, so we can set state from JS/Zepto
        let url: any = props.slug;
        if (props.default) {
            if (props.target == '_blank') {
                window.open(url);
            } else {
                if (url.startsWith('#')) {
                    var scr = document.body.scrollTop;
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

    let isAuthURL = (url: string) => {
        let permissions = storage.getUserRoleInfo()?.permissionsAssigned;
        if (
            permissions?.[0] == 'all' ||
            (permissions && permissions.length == 0) ||
            !url ||
            props.isauthurl === 'false'
        ) {
            return true;
        } else {
            let urlArr = url.split('/');
            for (let i in permissions) {
                console.log(permissions[i], urlArr);
                console.log(permissions[i].indexOf(urlArr[2]), permissions[i].indexOf(urlArr[3]));
                if (
                    (urlArr[2] == 'admin' ? true : permissions[i].indexOf(urlArr[2]) > -1) &&
                    permissions[i].indexOf(urlArr[3]) > -1
                ) {
                    return true;
                }
            }
            return false;
        }
    };

    let attributes = () => {
        let o: any = {};
        //@ts-ignore
        for (let i in props) o[i] = props[i];
        var fn = o.onClick; //Parent onclick
        o.onClick = (e: any) => handleClick(e, fn);
        return o;
    };

    let getChildrens = () => {
        let children = props.children;
        return children;
    };

    let tag = () => {
        if (typeof props.tag == 'string' && props.tag) {
            return React.createElement(props.tag, attributes(), getChildrens());
            //console.log('span tag value is ',props.children )
            //return (
            //	<span {...attributes()}>{getChildrens()}</span>
            //);
        }
        if (!isAuthURL(props.slug || props.to)) return null;

        if (props.default) {
            return (
                <a href={props.slug || props.to} {...attributes()}>
                    {getChildrens()}
                </a>
            );
        } else {
            return (
                <NavLink to={props.slug || props.to} {...attributes()}>
                    {getChildrens()}
                </NavLink>
            );
        }
    };

    return tag();
}

//add required to category and label later

// UALink.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	default: PropTypes.bool,
// 	popup: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
// 	slug: PropTypes.string,
// 	tracking: PropTypes.bool,
// 	category: PropTypes.string,
// 	label: PropTypes.string,
// 	prefix: PropTypes.bool
// }

UALink.defaultProps = defaultProps;
