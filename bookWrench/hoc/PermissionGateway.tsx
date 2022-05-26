'use strict';

import React, { useEffect, useState } from 'react';
import storage from '@storage';

export default function PermissionGateway({ tag = '', children }: any) {
    const [isShown, setVisibility] = useState(false);

    useEffect(() => {
        try {
            const {
                data: { modulePermissions },
            } = storage.getUserInfo();
            const [MOD = null, PERM = null] = tag.split('.');
            setVisibility(
                PERM ? modulePermissions[MOD].some((item: string) => item === PERM) : Boolean(modulePermissions[MOD]),
            );
        } catch (error) {
            setVisibility(false);
        }
    }, [tag]);

    return <>{isShown && children}</>;
}
