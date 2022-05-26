import React, { useState } from 'react';
import { DateBoxProps } from './interfaces';

const DateBox = (props: DateBoxProps) => {
    const date = (props.date && new Date(props.date)) || Date.now();
    const _date = date.toDateString('en-US');

    return <span>{_date}</span>;
};

export default DateBox;
