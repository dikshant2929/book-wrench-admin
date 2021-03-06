import React, { PropsWithChildren, useEffect, useState } from 'react';
// import { SelectBoxProps } from './interfaces';
import Select from 'react-select';

const defaultProps = {
    title: "",
    dataList: [],
    fields: {
        key: "id",
        value: "name",
    },
    isSort: false,
    parentClass: "",
    //value: { label: '--Select--', value: null },
    className: "leading-8 block w-full rounded-md outline-none",
    classNamePrefix:
        "custamSelectBox outline-none bg-gray-100 border-transparent border-none ",
    insertDummyValue: false,
};

function ReactTypeHead(props: PropsWithChildren<any>) {
    const [dataList, setDataList] = useState([]);
    const [defaultValue, setDefaultValue] = useState(null);

    useEffect(() => {
        const { dataList, fields } = props;

        const newDataList = dataList.map((items: any) => ({
            ...items,
            label: items[fields!.value],
            value: items[fields!.key],
        }));
        setDataList(newDataList);

        // newDataList.length !== 1 ? findNSetDefaultValue(newDataList) : setDefaultValue(newDataList[0]);
        findNSetDefaultValue(newDataList);
    }, [props]);

    const findNSetDefaultValue = (dataList: any) => {
        if (Array.isArray(props.defaultValue)) {
            const defaultValue =
                dataList.filter(({ value }: any) => value === props.defaultValue.find((val: any) => value === val)) ||
                null;
            setDefaultValue(defaultValue);
        } else {
            const defaultValue = dataList.find((element: any) => props.defaultValue == element.value) || null;
            setDefaultValue(defaultValue);
        }
    };

    // console.log(props);

    return (
        
        <div className={`${props.parentClass}`}>
            {props.header && (
                <label
                    className="block text-xs text-gray-700 mb-1 text-left truncate"
                    htmlFor={props.header}
                >
                    {" "}
                    {props.header}{" "}
                </label>
            )}
            <div className="border border-gray-200 rounded-md text-sm reactTypehead">
                <Select
                    menuPlacement="auto"
                    value={props.value || defaultValue}
                    options={dataList}
                    onChange={props.handleSelect}
                    {...props}
                />
            </div>
        </div>
        
    );
}

ReactTypeHead.defaultProps = defaultProps;
export default ReactTypeHead;
