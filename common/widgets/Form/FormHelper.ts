import InputField from '@common/elements/Input';
import ReactTypeHead from '@common/elements/ReactTypehead';

export default class FormHelper {
    configuration = [];
    formValidationPublisher: any = null;
    isDisable: any;

    constructor(items?: any, formValidationSubscriber?: any) {
        this.configuration = items;
    }

    subscribe(formValidationSubscriber: any) {
        this.formValidationPublisher = formValidationSubscriber;
    }

    getElements() {
        const state: any = {};
        Array.isArray(this.configuration) &&
            this.configuration.forEach((item: any) => {
                state[item.id] = item.selectedValue || '';
            });
        state.isValidForm = this.getButtonStatus(state);
        return state;
    }

    getConfig({ state, onChange }: any) {
        const data =
            (Array.isArray(this.configuration) &&
                this.configuration.map((item: any) => {
                    item.onChange = onChange(item.id);
                    item.component = this.getComponent(item, state, onChange);
                    return item;
                })) ||
            [];
        state.isValidForm = this.getButtonStatus(state);
        return data;
    }

    getButtonStatus(state: any) {
        const isValid = this.configuration.every((item: any) => {
            if (item.isRequired) {
                return Boolean(state[item.id]);
            } else {
                return true;
            }
        });
        this.formValidationPublisher && this.formValidationPublisher(isValid);
        return isValid;
    }

    isDisabled() {
        return this.isDisable;
    }

    getComponent(item: any, state: any, onChange: any) {
        switch (item.componentType) {
            case 'InputBox':
                item.value = state[item.id];
                item.selectedValue = state[item.id];
                item.cb = (field: any, value: any) => {
                    state[field] = value;
                    const handleChange = onChange(item.id);
                    handleChange({ value });
                };
                return InputField;
            case 'Dropdown':
                (item.header = item.header || null),
                    (item.placeholder = item.placeholder || null),
                    (item.dataList = item.options || []);
                item.defaultValue = state[item.id] || null;
                item.className = 'leading-8 block w-full rounded-md outline-none';
                item.classNamePrefix = 'custamSelectBox outline-none bg-gray-100 border-transparent border-none ';
                item.isMulti = Boolean(item.isMulti);
                item.fields = item.fields || { key: 'id', value: 'name' };
                item.handleSelect = (data: any) => {
                    state[item.id] = data.value;
                    const handleChange = onChange(item.id);
                    handleChange(data);
                };

                return ReactTypeHead;
            default:
                return InputField;
        }
    }
}
