export interface SwitchProps {
    defaultChecked?: boolean;
    defaultValue?: boolean;
    isDisable?: boolean;
    id?: string | number;
    name?: string;
    onChange?: (field: string) => (event: any) => void;
}
