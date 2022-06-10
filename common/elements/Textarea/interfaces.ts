export interface TextareaProps {
    textareaClass?: string;
    title?: string;
    titleClass?: string;
    parentClass?: string;
    cb?:any;
    rows?:string;
    name?:any;
    cols?:any;
    value?:string;
    onClick?: (field: string) => (event: any) => void;
    onBlur?: (field: string) => (event: any) => void;
    
}


