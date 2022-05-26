export interface SelectBoxProps {
    isClearable?: boolean;
    header?: string;
    handleSelect?: any;
    dataList?: any;
    fields?: { key: string; value: string };
    placeholder?: string;
    defaultValue?: any;
    parentClass?: string;
    title?: string;
    value?: any;
    isMulti?: boolean;
    menuPlacement?: string;
    hideSelectedOptions?: boolean;
    minMenuHeight?: boolean;
}
