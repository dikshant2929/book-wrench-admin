import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { DatePickerProps } from './interface';
import 'react-datepicker/dist/react-datepicker.css';

const defaultProps = {
    rangeSelect: false,
    label: '',
    defaultDate: '',
    minimumDate: null,
    maximumDate: null,
    startDate: null,
    endDate: null,
    selectsStart: false,
    selectsEnd: false,
    parentClass: ''
};

const DatePickerBox = (props: DatePickerProps): ReactElement => {
    const [startDate, setStartDate] = useState(props.selected);

    useEffect(() => {
        setStartDate(props.selected);
    }, [props.selected]);

    const onSelectSingleDate = (date: any) => {
        setStartDate(date);
        props.onSelectDate(date);
    };

    return (
        <div className={`p-1 min-w-1/4 mb-2 inline-block relative ${props.parentClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute top-9 right-4 z-1 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
            <label className="block text-xs text-gray-700 mb-1 text-left truncate" htmlFor={props.label}>
                {' '}
                {props.label}{' '}
            </label>
            <DatePicker
                selected={startDate}
                className="block w-full rounded-md border border-gray-200 h-46px focus:ring-0 text-sm"
                minDate={props.minimumDate}
                maxDate={props.maximumDate}
                startDate={props.startDate}
                endDate={props.endDate}
                selectsStart={props.selectsStart}
                selectsEnd={props.selectsEnd}
                onChange={onSelectSingleDate}
                {...props}
            />
        </div>
    );
};
DatePickerBox.defaultProps = defaultProps;
export default DatePickerBox;
