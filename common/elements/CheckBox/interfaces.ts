import { any } from "prop-types";

export interface RadioProps {
    defaultChecked?: any;
    defaultValue?: any;
    checked?:any;
    isDisable?: boolean;
    id?: any;
    name?: string;
    titleClass?: string;
    parentClass?: string;
    childClass?: string;
    inputClass?: string;
    labelClass?: string;
    title?:string;
    options?:Array<T>;
    value?:any,
    cb?:any;
    onClick?: (field: string) => (event: any) => void;
}


