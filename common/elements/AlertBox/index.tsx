import React, { useState } from 'react';
import { AlertBoxProps } from './interfaces';

const defaultProps = {};

function AlertBox(props: AlertBoxProps) {
    return (
        <div className="alertBox">
            <i className="connecto-icons mailOutlineIcon">mail_outline</i>
            Hi {props.email}, You have been invited to join connecto by <span>{props.invitedBy}</span>
        </div>
    );
}

AlertBox.defaultProps = defaultProps;
export default AlertBox;
