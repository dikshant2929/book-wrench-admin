import React, { useEffect, useState } from 'react';
import TableView from '@common/widgets/TableView';
import TableWidgets from '@common/widgets/TableView/TableWidgets';
import RedirectButton from '@common/elements/RedirectButton';
import exposedPath from '@ExposedPath';
import Services from './Services/department.service';
import './Department.scss';
const { DepartmentCreate } = exposedPath;
import TableEditViewExpire from './Helpers/Template';
import Switch from '@common/elements/Switch';
import Input from '@common/elements/Input';

const defaultProps = {
    title: 'Department',
    table: {
        totalRecords: 0,
        filteredRecords: 20,
        heading: [
            {
                key: 'title',
                value: 'Name',
            },
            {
                key: 'description',
                value: 'Description',
                isShown: true,
            },
            {
                key: 'updatedAt',
                value: 'Update At',
                isShown: false,
            },
            {
                key: 'status',
                value: 'Status',
            },
            {
                key: 'action',
                value: 'Actions',
            },
        ],
        dataList: []
    },
};

const Department = (props) => {

    const [isShimmerVisible, setShimmer] = useState(false);
    const [config, setConfig] = useState(props);
    const [dataList, setDataList] = useState([]);
    const [tableHeaders, setTableHeaders] = useState(config?.table?.heading);
    const [filters, setFilters] = useState({
        page: 1,
        size: 10,
    });

    const [searchParameters, setSearchParameters] = useState("");

    const onPaginationItemClick = (pageNo) => {
        const prevFilter = { ...filters };
        prevFilter.page = pageNo;
        setFilters({ ...prevFilter });
    };

    const itemsPerPage = (value) => {
        const prevFilter = { ...filters };
        prevFilter.page = 1;
        prevFilter.size = parseInt(value);
        setFilters({ ...prevFilter });
    };

    const updateHeader = (data) => {
        setTableHeaders(data);
    };

    useEffect(() => {
        Services.DepartmentList(data => {
            const prevConfig = { ...config };
            prevConfig.table.totalRecords = 0;
            prevConfig.table.filteredRecords = 0;
            prevConfig.table.dataList = data.map((item, index) => ({ ...item, sNo: (index + 1), actions: ['edit', 'expire'] }));
            setDataList(prevConfig.table.dataList);
            setConfig({ ...prevConfig });
        });
    }, []);

    const loadTableData = () => {
        window.location.reload()
    };

    const onRefreshButtonClicked = (data) => {
        console.log('onRefreshButtonClicked');
        console.log(data);
    }

    const updateStatus = (id, data) => {
        Services.editDepartment(data, (data) => {
            let existingTable = config.table.dataList;
            existingTable = existingTable.map(item => ({ ...item, ...(item.id === id && data || {}) }));
            config.table.dataList = existingTable;
            setConfig({ ...config })
        }, {}, id);

    }

    const tableCellView = ({ column, data }) => {
        switch (column.key) {
            case 'title':
                return <div className='flex items-center justify-start gap-3'>
                    {data.icon && <img className="w-7 h-7" src={data.icon} alt="logo" />}
                    <p className='font-medium text-sm'>{data[column.key]}</p>
                </div>
            case 'status':
                const onChange = (key) => ({ value }) => updateStatus(key, { isActive: value });
                return <Switch defaultValue={data.isActive} id={data.id} onChange={onChange} />
            case 'action':
                return <TableEditViewExpire data={data} onRefreshClicked={onRefreshButtonClicked} reloadTable={loadTableData} />;
            default:
                return <p>{data[column.key]}</p>;
        }
    };

    const onChangeSearchValue = (_, value) => {
        setSearchParameters(value || "");
        if (value.length) {
            const searchedData = [];
            dataList.forEach(data => {
                for (const item of Object.values(data)) {
                    if (typeof item === "string" && item.toLowerCase().includes(value.toLowerCase())) {
                        searchedData.push(data);
                        break;
                    }
                }
            });
            config.table.dataList = searchedData;
            setConfig({ ...config })
        } else {
            config.table.dataList = dataList;
            setConfig({ ...config })
        }
    };

    const resetSearch = () => {
        setSearchParameters("");
        onChangeSearchValue("", "")
    };
    return (
        <div className="department md:mx-20 mt-11 mb-6">
            <div className="flex justify-between items-end">
                <h1 className="font-medium list-heading">{config.title}</h1>
                <div className="btn-wrapper">
                    <TableWidgets>
                        <div className='table__header flex items-center relative'>
                            <Input
                                props={{
                                    placeHolder: 'Search',
                                    value: searchParameters,
                                    classNameInput: "h-full p-2 pr-11 pl-8 rounded-[5px] focus:border-0"
                                }}
                                cb={onChangeSearchValue}>

                            </Input>
                            <div className='px-2 py-1 h-full absolute right-0'>
                                <span className='h-full bg-gray-100 cursor-pointer flex items-center p-2 rounded' onClick={resetSearch}>
                                    <svg height="18" width="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class=""><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                                </span>
                            </div>
                            <span className='p-2 absolute'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15" fill="none">
                                    <path d="M6.81964 12.2639C9.8265 12.2639 12.264 9.82631 12.264 6.81944C12.264 3.81256 9.8265 1.375 6.81964 1.375C3.81278 1.375 1.37524 3.81256 1.37524 6.81944C1.37524 9.82631 3.81278 12.2639 6.81964 12.2639Z" stroke="#A5A9C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.6252 13.625L10.6648 10.6646" stroke="#A5A9C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>

                        </div>

                        <RedirectButton
                            title="New Department"
                            link={DepartmentCreate}
                            className="button-primary ml-1 title-btn rounded-5px"
                            display="inline-flex"
                            width="w-auto"
                            height="h-10"
                            padding="px-3.5"
                            icon={`M12 4v16m8-8H4`}
                            fontSize="text-sm"
                        />
                    </TableWidgets>
                </div>
            </div>
            <TableView
                config={config}
                isLoading={isShimmerVisible}
                currentPage={filters.page}
                totalCount={config.table.filteredRecords}
                onPaginationItemClick={onPaginationItemClick}
                itemsPerPage={itemsPerPage}
                tableHeaders={tableHeaders}
                tableCellView={tableCellView}
                updateHeader={updateHeader}
                showColumnPicker={false}
            />

        </div>

    );
};

Department.defaultProps = defaultProps;
export default Department;
