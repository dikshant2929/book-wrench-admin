import React, { useEffect, useState } from 'react';
import TableView from '@common/widgets/TableView';
import TableWidgets from '@common/widgets/TableView/TableWidgets';
import RedirectButton from '@common/elements/RedirectButton';
import exposedPath from '@ExposedPath';
import Services from './Services/SubCategory.service';
import './SubCategory.scss';
const { SubCategoryCreate } = exposedPath;
import TableEditViewExpire from './Helpers/Template';
import Switch from '@common/elements/Switch';

const defaultProps = {
    title: 'Sub-Categories',
    table: {
        totalRecords: 0,
        filteredRecords: 20,
        heading: [
            
            {
                key: 'title',
                value: 'Name',
            },
            {
                key: 'category',
                value: 'Category',
            },
            {
                key: 'industry',
                value: 'Industry',
            },
            
            {
                key: 'numberOfProducts',
                value: 'No Of Products',
            },
            {
                key: 'numberOfServices',
                value: 'No of Services',
            },
            {
                key: 'status',
                value: 'Status',
            },
            {
                key: 'createdAt',
                value: 'Created At',
                isShown: false,
            },
            {
                key: 'updatedAt',
                value: 'Update At',
                isShown: false,
            },
            {
                key: 'action',
                value: 'Actions',
            },
        ],
        dataList: []
    },
};

const SubCategory = (props) => {

    const [isShimmerVisible, setShimmer] = useState(false);
    const [config, setConfig] = useState(props);
    const [tableHeaders, setTableHeaders] = useState(config?.table?.heading);
    const [filters, setFilters] = useState({
        page: 1,
        size: 10,
    });

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
        Services.subcategoryList(data => {
            const prevConfig = { ...config };
            prevConfig.table.totalRecords = 0;
            prevConfig.table.filteredRecords = 0;
            prevConfig.table.dataList = data.map((item, index) => ({...item,category: item?.categoryId?.title || "NA", industry: item?.categoryId?.departmentId?.title || "NA", sNo : (index + 1), actions : [ 'edit','expire'] }));
            setConfig({ ...prevConfig });
        });
    }, []);

  

    const loadTableData = () => {
        console.log('loadTableData');
        window.location.reload();
    };

    const onRefreshButtonClicked = (data) => {
        console.log('onRefreshButtonClicked');
        console.log(data);
    }

    const updateStatus = (id, data) => {
        Services.subeditCategory(data, (data) => {
            let existingTable = config.table.dataList;
            existingTable = existingTable.map(item => ({ ...item, ...(item.id === id && data || {})}));
            config.table.dataList = existingTable;
            setConfig({...config})
        }, {}, id);

    } 

    const getImageUrl = (data) => data?.icon || data?.categoryId?.icon || data?.categoryId?.departmentId?.icon || "";
    
    const tableCellView = ({ column, data }) => {
        switch (column.key) {
            case 'title':
                const icon = getImageUrl(data);
                return  <div className='flex items-center justify-start gap-3'>
                        {icon && <img className="w-7 h-7" src={icon} alt="logo" />}
                        <p className='font-medium text-sm'>{data[column.key]}</p> 
                </div>;
            case 'action':
                return <TableEditViewExpire data={data} onRefreshClicked = {onRefreshButtonClicked} reloadTable={loadTableData} />;
            case 'status':
                const onChange = (key) => ({value}) => updateStatus(key, {isActive: value});
                return  <Switch defaultValue={data.isActive} id={data.id} onChange={onChange}/>
            default:
                return <p>{data[column.key]}</p>;
        }
    };

    return (
        <div className="sub-category md:mx-20 mt-11 mb-6">
            <div className=" flex justify-between items-end mb-7">
                <h1 className="font-medium list-heading">{config.title}</h1>
                <div className="btn-wrapper">
                    <TableWidgets>
                        <RedirectButton
                            title="New Sub-Category"
                            link={SubCategoryCreate}
                            className="button-primary ml-1 title-btns"
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

SubCategory.defaultProps = defaultProps;
export default SubCategory;
