import React, { useEffect, useState } from 'react';
import TableView from '@common/widgets/TableView';
import TableWidgets from '@common/widgets/TableView/TableWidgets';
import RedirectButton from '@common/elements/RedirectButton';
import exposedPath from '@ExposedPath';
const { CategoryCreate } = exposedPath;


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
        ],
        dataList: [ 
            {
                sNo : 1,
                title : "HVAC"
            },
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }
            ,
            {
                sNo : 1,
                title : "HVAC"
            }

        ],
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

    return (
        <div className="">
            
            <h1 className="text-left font-medium text-4xl mb-6 inline-block">{config.title}</h1>
            <div className="float-right inline-block">
                <TableWidgets>
                    <RedirectButton 
                            title="New Category" 
                            link={CategoryCreate} 
                            className="button-primary ml-1" 
                            display="inline-flex" 
                            width="w-auto" 
                            height="h-46px" 
                            padding="px-20px" 
                            icon={`M12 4v16m8-8H4`}
                            fontSize="text-sm" 
                    />
                </TableWidgets>
            </div>

            <TableView
                config={config}
                isLoading={isShimmerVisible}
                currentPage={filters.page}
                totalCount={config.table.filteredRecords}
                onPaginationItemClick={onPaginationItemClick}
                itemsPerPage={itemsPerPage}
                tableHeaders={tableHeaders}
                updateHeader={updateHeader}
            />

        </div>

    );
};

Category.defaultProps = defaultProps;
export default Category;
