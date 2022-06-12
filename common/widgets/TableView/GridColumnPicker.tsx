import React, { ReactElement, useEffect, useState } from 'react';
import { ColChooserProps, HeaderProps } from './interfaces';
import ReactTypehead from '@common/elements/ReactTypehead';
import globals from '@common-utils/globals';

const defaultProps = {
    isVisible: true,
};

function GridColumnPicker(props: ColChooserProps): ReactElement {
    const [dataSource, setDataSource] = useState<any>(props.dataSource);
    const [values, setValues] = useState<any>([]);
    const [dropdownData, setDropdownData] = useState<any>([]);

    useEffect(() => {
        setValues([]);
        setDropdownData([]);

        // Set Data Source With 'label' key
        const newDataList: any = Array.isArray(props.dataSource) && props.dataSource.map((items: HeaderProps) => ({ ...items, label: items.value })) || [];
        setDataSource(newDataList);

        // Set selected (true) values in dropdown
        newDataList?.forEach((items: HeaderProps) => {
            if (items.isShown || items.isShown === undefined) {
                setValues((prev: any) => [...prev, items]);
            } else {
                setDropdownData((prev: any) => [...prev, items]);
            }
        });
    }, [props.dataSource]);

    const onSelectColumn = (arg: []) => {
        const cloneDataSource = globals.cloneObject(dataSource);

        cloneDataSource.forEach((item: any) => {
            item.isShown = Boolean(arg.find((ele: any) => ele.key === item.key));
            return item;
        });

        props.onChangeColumn(cloneDataSource);
    };

    return (
        <div className="mb-7 gridColumnPicker">
            {props.isVisible && (
                <ReactTypehead
                    isClearable
                    menuPlacement="auto"
                    handleSelect={onSelectColumn}
                    placeholder="Choose Columns"
                    dataList={dropdownData}
                    value={values}
                    isMulti
                    fields={{ key: 'key', value: 'value' }}
                    parentClass="w-full"
                />
            )}
        </div>
    );
}
GridColumnPicker.defaultProps = defaultProps;
export default GridColumnPicker;
