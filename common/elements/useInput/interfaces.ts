export interface UseInputProps {
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: any;
    onKeyDown?: any;
    labelClass?: string;
    iconName?: string;
    name?: string;
    extraprops?: {
        id?: string;
        parentId?: string;
        parentClass?: string;
        placeHolder?: any;
        validation?: string;
        scrollIntoView?: boolean;
        error?: string;
        minLength?: string | number;
    };
    error?: {
        errorClass: string;
        message: string;
    };
}
