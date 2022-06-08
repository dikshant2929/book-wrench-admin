export interface RadioProps {
    defaultChecked?: string;
    defaultValue?: string;
    isDisable?: boolean;
    id?: string | number;
    name?: string;
    titleClass?: string;
    parentClass?: string;
    childClass?: string;
    inputClass?: string;
    labelClass?: string;
    title?:string;
    options?:Array<T>;
    cb?:any;
    onClick?: (field: string) => (event: any) => void;
}


