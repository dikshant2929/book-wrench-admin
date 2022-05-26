export interface DatePickerProps {
    selected?: any;
    rangeSelect?: boolean;
    label?: string;
    onSelectDate: (args: string | {}) => any;
    defaultDate?: any;
    minimumDate?: any;
    maximumDate?: any;
    startDate?: any;
    endDate?: any;
    selectsStart?: boolean;
    selectsEnd?: boolean;
    dateFormat?: string;
    value?: any;
    className?: string;
    parentClass?:string;
}
