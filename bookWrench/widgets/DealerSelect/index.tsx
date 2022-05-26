import React, { useState, useEffect } from 'react';
import ReactTypeHead from '@common/elements/ReactTypehead';
import API from '@API';

const dealerOrganizationListDropdown = 'DealerOrganizationDropdown';
const dealerListDropdown = 'DealerListDropdown';

const defaultProps = {
    dealerOrgId: null,
    dealerOutletId: null,
};

const DealerSelect = ({ makeId, cityId, dealerOrgId, dealerOutletId, ...props }: any) => {
    // if (!makeId || !cityId) {
    //     return null;
    // }

    const [dealerOrganizationList, setDealerOrganizationList] = useState([]);
    const [dealerList, setDealerList] = useState([]);

    const [requestParameters, setRequestParameters] = useState({
        dealerOrgId: dealerOrgId,
        dealerOutletId: dealerOutletId,
    });

    useEffect(() => {
        fetchDealerOrganizationList({ makeId, cityId });
    }, [makeId, cityId]);

    useEffect(() => {
        setRequestParameters({ dealerOrgId, dealerOutletId });
    }, [dealerOrgId, dealerOutletId]);

    useEffect(() => {
        if (!requestParameters.dealerOrgId) {
            setDealerOrganizationList([]);
            setDealerList([]);
            return;
        }
        setDealerList([]);
        requestParameters.dealerOrgId && fetchDealerList(requestParameters);
    }, [requestParameters.dealerOrgId]);

    const fetchDealerOrganizationList = (data: any) => {
        setDealerOrganizationList([]);
        setDealerList([]);
        getDataFromAPI(dealerOrganizationListDropdown, data, setDealerOrganizationList);
    };

    const fetchDealerList = (data: any) => {
        setDealerList([]);
        getDataFromAPI(dealerListDropdown, { ...data, cityId }, setDealerList);
    };

    const getDataFromAPI = (pageName: any, data: any, callback: any) => {
        API.get(pageName, data)
            .then((data) => callback(data?.data?.result || []))
            .catch(() => callback([]));
    };

    const handleOnChange = (field: any) => (event: any) => {
        const { value = null } = event || {};
        setRequestParameters((prevState) => ({ ...prevState, [field]: value }));
        props.handleSelect && props.handleSelect(field)({ value });
    };

    return (
        <>
            {/* {Boolean(dealerOrganizationList.length) && ( */}
                <ReactTypeHead
                    header="Organization"
                    handleSelect={handleOnChange('dealerOrgId')}
                    dataList={dealerOrganizationList}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder="Select Organization"
                    defaultValue={requestParameters.dealerOrgId}
                    parentClass={props.parentClass}
                />
            {/* )} */}

            {/* {Boolean(dealerList.length) && ( */}
                <ReactTypeHead
                    isClearable
                    header="Dealer"
                    handleSelect={handleOnChange('dealerOutletId')}
                    dataList={dealerList}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder="Select Dealer"
                    defaultValue={requestParameters.dealerOutletId}
                    parentClass={props.parentClass}
                />
            {/* )} */}
        </>
    );
};

DealerSelect.defaultProps = defaultProps;
export default DealerSelect;
