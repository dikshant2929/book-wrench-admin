import React, { useEffect, useState } from 'react';
import TableView from '@common/widgets/TableView';
import TableWidgets from '@common/widgets/TableView/TableWidgets';
import RedirectButton from '@common/elements/RedirectButton';
import exposedPath from '@ExposedPath';
import Services from './Services/category.service';
import './Category.scss';
const { CategoryCreate } = exposedPath;
import TableEditViewExpire from './Helpers/Template';

const defaultProps = {
    title: 'Categories',
    table: {
        totalRecords: 0,
        filteredRecords: 20,
        heading: [
            {
                key: 'sNo',
                value: 'Number#',
            },
            {
                key: 'title',
                value: 'Title',
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

const Category = (props) => {

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
        Services.categoryList(data => {
            const prevConfig = { ...config };
            prevConfig.table.totalRecords = 0;
            prevConfig.table.filteredRecords = 0;
            prevConfig.table.dataList = data.map((item, index) => ({...item, sNo : (index + 1), actions : [ 'edit'] }));
            setConfig({ ...prevConfig });
        });
    }, []);

    const loadTableData = () => {
        console.log('loadTableData');
    };

    const onRefreshButtonClicked = (data) => {
        console.log('onRefreshButtonClicked');
        console.log(data);
    }

    const tableCellView = ({ column, data }) => {
        switch (column.key) {
            case 'action':
                return <TableEditViewExpire data={data} onRefreshClicked = {onRefreshButtonClicked} reloadTable={loadTableData} />;
            default:
                return <p>{data[column.key]}</p>;
        }
    };

    return (
        <div className="category md:mx-20 mt-11 mb-6">
            <div className=" flex justify-between items-end mb-7">
                <h1 className="font-medium list-heading">{config.title}</h1>
                <div className="btn-wrapper">
                    <TableWidgets>
                        <RedirectButton
                            title="New Category"
                            link={CategoryCreate}
                            className="button-primary ml-1 title-btn"
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
            />

        </div>

    );
};

Category.defaultProps = defaultProps;
export default Category;
