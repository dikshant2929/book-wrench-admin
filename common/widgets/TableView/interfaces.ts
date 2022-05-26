export interface HeaderProps {
    key: string;
    value: string;
    isShown: boolean;
    label?: string;
}

export interface TableViewProps {
    config: {
        title?: string | undefined;
        table: {
            totalRecords: any;
            filteredRecords: any;
            heading: HeaderProps[];
            dataList: any[];
        };
    };
    isLoading?: boolean;
    updateHeader: (data: any) => void;
    tableHeaders: HeaderProps[];
    tableClasses?: string;
    thClasses?: string;
    tdClasses?: string;
    children?: any;
    showColumnPicker?: boolean;
    tableCellView?: any;
    currentPage?: number;
    totalCount?: number;
    onPaginationItemClick?: (data: any) => void;
    itemsPerPage?: (data: any) => void;
}

export interface HeaderProps {
    key: string;
    value: string;
    isShown: boolean;
    label?: string;
}

export interface ColChooserProps {
    isVisible?: boolean;
    dataSource: HeaderProps[];
    onChangeColumn?: any;
}
