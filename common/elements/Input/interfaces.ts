export interface InputBoxProps {
    extraProps?: any;
    selectedValue?: any;
    name?: string;
    cb?: any;
    noScrollFlag?: any;
    focusCB?: any;
    props: { name: string };
    blurCB?: any;
    tooltipData?: any;
    toggleExpandCollapseCB?:any;
    editId?:any;
    autoFocusFlag?:any;
    disabled?:any;
    readonly?:any;
    showMessage?:any;
    isCustomValidate?:any;
    pressEnter?:any;
    toolTip?:any;
    errCls?:any
}

export interface InputState {
    extraProps?: any;
    selectedValue?: any;
    name?: string;
    placeHolder?: string;
    labelClass?: string;
    error?: any;
    IconName?: string;
    errorCls: any;
}
