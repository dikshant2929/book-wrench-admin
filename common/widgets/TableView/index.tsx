import React, { useState, useEffect } from 'react';
import globals from '@globals';
import Pagination from '@common/elements/Pagination';
import Switch from '@common/elements/Switch';
import DateBox from '@common/elements/DateBox';
import ShimmerEffect from '@common/elements/ShimmerEffect';
import GridColumnPicker from '@common/widgets/TableView/GridColumnPicker';
import { TableViewProps } from './interfaces';

const defaultProps = {
    listData: {
        tableHeading: [{ name: 'DATE' }, { name: 'Error Code	' }, { name: 'Error Message' }, { name: 'Count' }],
    },
    isLoading: false,
    showColumnPicker: true,
};

const TableView = (props: TableViewProps) => {
    const tableClasses = `text-center table-auto w-full rounded-lg bg-white border border-gray-200 ${props?.tableClasses}`;
    const { tableHeaders, updateHeader } = props;
    //const [tableHeaders, setTableHeaders] = useState<HeaderProps[]>(props.config?.table?.heading);

    const thClasses = `px-4 py-4 font-inter font-semibold text-sm text-left ${props?.thClasses}`;
    const tdClasses = `px-4 py-2 font-inter font-medium text-sm text-left min-w-100px ${props?.tdClasses}`;

    if (!props.config) {
        return null;
    }

    const getValue = (item: any) => {
        if (typeof item === 'boolean') {
            return <Switch defaultChecked={item} />;
        }
        return <span>{item}</span>;
    };

    const onChangeColumn = (arg: any) => {
        updateHeader(arg);
    };
    
    return (
        <>
            {React.Children.count(props.children) > 0 ? props.children : null}
            {props.isLoading && <ShimmerEffect height={150} count={3} visible={props.isLoading} type="grid" />}
            {!globals.isEmptyObject(props.config.table.dataList) && (
                <>
                    <GridColumnPicker
                        dataSource={tableHeaders}
                        isVisible={props.showColumnPicker}
                        onChangeColumn={onChangeColumn}
                    />
                    <div className="overflow-auto bg-white mb-2">
                        <table className={tableClasses}>
                            <thead className='border-b border-[#DFE2E9]'>
                                <tr className=''>
                                    {tableHeaders &&
                                        tableHeaders.map(({ value, isShown = true }: any, index: number) => (
                                            <th key={index} className={thClasses} hidden={!isShown}>
                                                {value}
                                            </th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableHeaders &&
                                    props.config?.table?.dataList.map((item: any, index: number) => (
                                        <tr key={index} className="hover:bg-gray-200 border-b border-[#DFE2E9]">
                                            {tableHeaders.map(({ key, isShown = true }: any, index: number) =>
                                                props.tableCellView !== undefined ? (
                                                    // Cell View ONE
                                                    <td className={tdClasses} key={index} hidden={!isShown}>
                                                        {props.tableCellView({
                                                            column: tableHeaders[index],
                                                            data: item,
                                                        })}
                                                    </td>
                                                ) : (
                                                    // Cell View TWO
                                                    <td className={tdClasses} key={index} hidden={!isShown}>
                                                        {getValue(item[key])}
                                                    </td>
                                                ),
                                            )}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={props.currentPage || 0}
                        segmentCount={props.totalCount || 0}
                        cb={props.onPaginationItemClick}
                        numberOfRowOnPageCB={props.itemsPerPage}
                    />
                </>
            )}
        </>
    );
};

TableView.defaultProps = defaultProps;
export default React.memo(TableView);
