import React, { PropsWithChildren, useEffect, useState } from 'react';
import { PaginationProps } from './interfaces';
import Select from 'react-select';
import ReactTypehead from '../ReactTypehead';

const defaultProps = {
    queryParam: '',
    showItemCount: false,
    page: [
        { label: '5', value: '5' },
        { label: '10', value: '10' },
        { label: '15', value: '15' },
        { label: '20', value: '20' },
        { label: '30', value: '30' },
    ],
};

export default function Pagination(props: PropsWithChildren<PaginationProps>) {
    if (!props) {
        return null;
    }
    const [dataList, dataListSet] = useState<any>(null);
    const [listPerPage, listPerPageSet] = useState<any>(props.page[1].value);
    const [selectBoxItem, setSelectBoxItem] = useState<any>(props.page[1]);

    useEffect(() => {
        generatePages(props);
    }, [props]);

    const generatePages = (props: any) => {
        const pageCount = Math.ceil(props.segmentCount / listPerPage);
        const pages: Array<any> = [];
        let start = 1;
        let end = 0;

        if (pageCount > 5) {
            end = 5;
        } else {
            end = pageCount;
        }
        if (props.currentPage > 2) {
            start = props.currentPage - 2;
            end = props.currentPage + 2 <= pageCount ? props.currentPage + 2 : pageCount;
        }
        if (props.currentPage > 2 && pageCount < 2) {
            start = 1;
            end = pageCount;
        }

        const endcount = pageCount == end ? pageCount : end;
        end = endcount;
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (!Boolean(pages.length)) return;
        const pageObj: any = {
            pages: pages,
            pageCount: pageCount,
        };
        dataListSet(pageObj);
    };

    const handleClick = (event: any, page: any) => {
        if (typeof props.cb === 'function') {
            props.cb(page);
        }
    };

    const onPageChangeDropDown = (data: any) => {
        console.log(data);
        listPerPageSet(data.value);
        setSelectBoxItem(data);
        props?.numberOfRowOnPageCB?.(data.value);
    };

    return (
        <div className="gsc_row" data-track-component="Pagination">
            {props.pageCount < 2 ? (
                props.pageCount == 1 && props.showItemCount ? (
                    <p className="gsc_col-xs-12 totalvideo">
                        {/* Total {props.totalCount} {props.totalCount > 1 ? _T('videos') : _T('video')} available */}
                    </p>
                ) : (
                    ''
                )
            ) : (
                props.segmentCount > listPerPage && (
                    <div className="gsc_col-md-12">
                        <div className="pagination flex justify-end mt-5">
                            <ul className="flex items-center mr-10">
                            {props.currentPage - 1 >= 1 && <li
                                    className={`text-xs h-9 leading-9 mx-2 cursor-pointer rounded-sm px-2 text-gray-400`}
                                >
                                    <span
                                            className="inline-block pt-1.5"
                                            onClick={(event) => handleClick(event, props.currentPage - 1)}
                                            title={'Previous Page'}
                                        >
                                            {<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                            </svg>}
                                        </span>
                                </li>}
                                {props.currentPage > 1 && <li
                                    className={`text-xs h-9 leading-9 mx-2 cursor-pointer rounded-sm px-2 text-gray-400`}
                                >
                                   <span onClick={(event) => handleClick(event, 1)} title="First Page">
                                            First
                                        </span>
                                </li>}
                                {dataList &&
                                    dataList.pages.map((item: any, index: number) => (
                                        <li
                                            key={index}
                                            className={`text-xs h-9 leading-9 mx-2 cursor-pointer rounded-sm px-2 ${
                                                item == props.currentPage ? 'text-gray-900' : 'text-gray-400'
                                            }`}
                                        >
                                            <span
                                                title={`${'Page'} ${item} ${'of'} ${dataList.pageCount}`}
                                                onClick={(event) => handleClick(event, item)}
                                            >
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                {dataList && dataList.pageCount != props.currentPage && <li
                                    className={`text-xs h-9 leading-9 mx-2 cursor-pointer rounded-sm px-2 text-gray-400`}
                                >
                                    <span
                                            title="last Page"
                                            onClick={(event) => handleClick(event, dataList && dataList.pageCount)}
                                        >
                                            Last
                                        </span>
                                </li>}
                                {dataList && dataList.pageCount != props.currentPage && <li
                                    className={`text-xs h-9 leading-9 mx-2 cursor-pointer rounded-sm px-2 text-gray-400`}
                                >
                                    <span
                                            className="inline-block pt-1.5"
                                            title={'Next Page'}
                                            onClick={(event) => handleClick(event, props.currentPage + 1)}
                                        >
                                            {<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>}
                                        </span>
                                </li>}
                            </ul>
                            <div className="flex items-center">
                                <div className="mr-6 text-xs">Show rows</div>
                                {/* <Select
                                    className="w-24 leading-8 block rounded-md outline-none"
                                    classNamePrefix="custamSelectBox outline-none bg-gray-100 border-transparent border-none "
                                    value={selectBoxItem}
                                    onChange={onPageChangeDropDown}
                                    options={props.page}
                                    menuPlacement="auto"
                                /> */}

                                <ReactTypehead
                                    className="w-32 leading-8 block rounded-md outline-none"
                                    classNamePrefix="custamSelectBox outline-none bg-gray-100 border-transparent border-none "
                                    handleSelect={onPageChangeDropDown}
                                    placeholder="Choose Columns"
                                    value={selectBoxItem}
                                    fields={{ key: 'value', value: 'label' }}
                                    dataList={props.page}
                                    menuPlacement="auto"
                                />

                                {/* <ReactTypeahead
                                selectedValue={listPerPage}
                                textAttr="name"
                                valueSelector="_id"
                                //label="Show rows"
                                id="Perpage"
                                cb={(e) => handleChannel(e)}
                                defaultValueSelector="name"
                                setValueBlank={true}
                                allList={props.page}
                                readOnly={true}
                            /> */}
                            </div>
                            {/* {props.currentPage ?
								(!props.showItemCount) ?
									<p>{"Page"} {props.currentPage} {"of"} {props.pageCount} {_T("pages")}</p>
									:
									<p>{props.currentPage * props.perPage - (props.perPage - 1)} - {props.currentPage == props.pageCount ? props.totalCount : props.currentPage * props.perPage} {_T("of")} {props.totalCount} {_T("videos")}</p>
								: ''
							} */}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

Pagination.defaultProps = defaultProps;
