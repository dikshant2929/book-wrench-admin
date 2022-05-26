import React, { useState, useEffect } from 'react';
import ReactTypeHead from '@common/elements/ReactTypehead';
import API from '@API';
import { StateSelectModel } from './models';

const defaultProps = {
    stateId: null,
    cityId: null,
    chooseMultiCity: false,
    optStateAll: false,
    statePageName: 'StateDropdown',
    cityPageName: 'CityDropdown',
};

const StateSelect = (props: StateSelectModel) => {
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [stateDropdown, setStateDropdown] = useState(props.statePageName);
    const [cityDropdown, setCityDropdown] = useState(props.cityPageName);
    const [disableState, setDisableState] = useState(false);
    const [disableCity, setDisableCity] = useState(false);
    const citiesHeader = (heading: string) =>
        props.chooseMultiCity ? customHeader(heading, 'cityId', setDisableCity) : heading;
    const stateHeader = (heading: string) =>
        props.optStateAll ? customHeader(heading, 'stateId', setDisableState) : heading;
    const [requestParameters, setRequestParameters] = useState({
        stateId: props.stateId,
        cityId: props.cityId,
    });

    useEffect(() => {
        setRequestParameters({
            stateId: props.stateId,
            cityId: props.cityId,
        });
    }, [props.stateId, props.cityId]);

    useEffect(() => {
        setStateDropdown(props.statePageName || 'StateDropdown');
        setCityDropdown(props.cityPageName || 'CityDropdown');
        fetchStateList();
    }, [props.statePageName, props.cityPageName]);

    useEffect(() => {
        setCityList([]);
        // props.handleSelect && props.handleSelect('cityId')({ value: null });
        requestParameters.stateId && fetchCityList({ stateId: requestParameters.stateId });
    }, [requestParameters.stateId]);

    // Default Initial Value of city heared checkbox
    useEffect(() => {
        props.chooseMultiCity && setDisableCity(!Boolean(props?.cityId?.length));
    }, [props?.cityId]);

    ////// Hitting APIs //////////////////////////////////////////
    const fetchStateList = () => {
        getDataFromAPI(stateDropdown, {}, setStateList);
    };

    const fetchCityList = (data: any) => {
        getDataFromAPI(cityDropdown, data, setCityList);
    };

    const getDataFromAPI = (pageName: any, data: any, callback: any) => {
        API.get(pageName, data)
            .then((data) => callback(data?.data?.result || []))
            .catch(() => callback([]));
    };

    const handleChange = (field: string) => (event: any) => {
        const value = (Array.isArray(event) && event.map(({ value }) => value)) || event?.value || null;
        setRequestParameters((prevState) => ({ ...prevState, [field]: value }));
        props.handleSelect && props.handleSelect(field)({ value });
    };
    //---------------------------------------------------------------------------

    const customHeader = (text: string, field: string, setDisable: any) => {
        const selectAllVarient =
            (field: any) =>
            ({ target }: any) => {
                // setDisable(target?.checked);
                setDisable((preivousState: boolean) => !preivousState);
                setRequestParameters((prevState) => ({ ...prevState, [field]: null }));
                props.handleSelect && props.handleSelect(field)({ value: null });
                field === 'stateId' && props.handleSelect && props.handleSelect('panIndia')({ value: target?.checked });
            };
        // const getStatus = (text: string) => (text === 'State' ? disableState : disableCity);
        const getMessage = (text: string) =>
            text === 'State' ? 'Tick here to select PAN India' : `Tick here to select all ${text}`;
        return (
            <div className="flex justify-between items-center">
                {text}{' '}
                <label style={{ fontSize: '16px' }}>
                    <span className="text-tiny">
                        ({getMessage(text)}{' '}
                        {text === 'State' ? (
                            <input type="checkbox" checked={disableState} onChange={selectAllVarient(field)} className="appearance-none checked:bg-primary checked:border-transparent rounded-sm  checked:hover:bg-primary focus:ring-0 checked:focus:bg-primary"/>
                        ) : (
                            <input type="checkbox" checked={disableCity} onChange={selectAllVarient(field)} className="appearance-none checked:bg-primary checked:border-transparent rounded-sm  checked:hover:bg-primary focus:ring-0 checked:focus:bg-primary"/>
                        )}
                    </span>{' '}
                </label>{' '}
            </div>
        );
    };

    const cityPlaceHolder = props.chooseMultiCity ? 'Select Cities' : 'Select City';
    return (
        <>
            {/* {stateList.length > 0 && ( */}
                <ReactTypeHead
                    isClearable
                    header={stateHeader('State')}
                    handleSelect={handleChange('stateId')}
                    dataList={stateList}
                    isDisabled={disableState}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder="Select State"
                    defaultValue={requestParameters.stateId}
                    parentClass={props.parentClass}
                />
            {/* )} */}

            {/* {cityList.length > 0 && ( */}
                <ReactTypeHead
                    isClearable
                    header={citiesHeader('City')}
                    isDisabled={disableCity}
                    handleSelect={handleChange('cityId')}
                    dataList={cityList}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder={cityPlaceHolder}
                    parentClass={props.dropdownWidth ||  props.parentClass}
                    isMulti={props.chooseMultiCity}
                    defaultValue={requestParameters.cityId}
                />
            {/* )} */}
        </>
    );
};

StateSelect.defaultProps = defaultProps;
export default StateSelect;
