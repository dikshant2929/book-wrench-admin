import React, { useState, useEffect } from 'react';
import ReactTypeHead from '@common/elements/ReactTypehead';
import API from '@API';

const modelDropdown = 'ModelsDropDown';
const variantDropdwon = 'VariantsDropDown';
const colorDropdown = 'ColorDropDown';
const yearDropdwon = 'GetMfYear';

const defaultProps = {
    modelId: null,
    variantId: null,
    colorId: null,
    mfYear: null,
};

const VehicleSelect = ({ oemId, ...props }: any) => {
    const [modelsList, setModelsList] = useState([]);
    const [variantsList, setVariantsList] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [mfYearList, setMfYearList] = useState([]);

    const [requestParameters, setRequestParameters] = useState({
        modelId: props.modelId,
        variantId: props.variantId,
        colorId: props.colorId,
        mfYear: props.mfYear,
    });

    //Model List
    useEffect(() => {
        if(oemId){
            fetchModelsList({ oemId });
        }
    }, [oemId]); //makeId

    useEffect(() => {
        setRequestParameters({
            modelId: props.modelId,
            variantId: props.variantId,
            colorId: props.colorId,
            mfYear: props.mfYear,
        });
    }, [props.modelId, props.variantId, props.colorId, props.mfYear]);

    // Varient List
    useEffect(() => {
        if(requestParameters.modelId){
            setVariantsList([]);
            setColorList([]);
            props.handleSelect && props.handleSelect('colorId')({ value: null });
            props.handleSelect && props.handleSelect('variantId')({ value: null });
            requestParameters.modelId && fetchVarientList(requestParameters);    
        }
        
    }, [requestParameters.modelId]);

    //Color List
    useEffect(() => {
        setColorList([]);
        props.handleSelect && props.handleSelect('colorId')({ value: null });
        requestParameters.variantId && fetchColorList(requestParameters);
    }, [requestParameters.variantId]);

    // Manufecturing Year List
    useEffect(() => {
        fetchMfYearList();
    }, []);

    //-----------------Hitting APIS To Fatch Data----------------
    const fetchModelsList = (data: any) => {
        getDataFromAPI(modelDropdown, data, setModelsList);
    };

    const fetchVarientList = (data: any) => {
        getDataFromAPI(variantDropdwon, data, setVariantsList);
    };

    const fetchColorList = (data: any) => {
        getDataFromAPI(colorDropdown, data, setColorList);
    };

    const fetchMfYearList = () => {
        getDataFromAPI(yearDropdwon, {}, setMfYearList);
    };

    const getDataFromAPI = (pageName: any, data: any, callback: any) => {
        API.get(pageName, data)
            .then((data) => callback(data?.data?.result || []))
            .catch(() => callback([]));
    };
    //---------------------------------------------------------------

    // EventListener (onChange)
    const handleOnChange = (field: any) => (event: any) => {
        const { value = null } = event || {};
        setRequestParameters((prevState) => ({ ...prevState, [field]: value }));
        props.handleSelect && props.handleSelect(field)({ value });
    };

    // if (!oemId) {
    //     return null;
    // }

    return (
        <>
            {/* Model List DropDown */}
            {/* {modelsList.length > 0 && (  */}
                <ReactTypeHead
                    header="Model"
                    handleSelect={handleOnChange('modelId')}
                    dataList={modelsList}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder="Select Model"
                    defaultValue={requestParameters.modelId}
                    parentClass={props.parentClass}
                />
            {/* )} */}

            {/* Varient List DropDown */}
            {/* {variantsList.length > 0 && ( */}
                <ReactTypeHead
                    isClearable
                    header="Variant"
                    handleSelect={handleOnChange('variantId')}
                    dataList={variantsList}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder="Select Variant"
                    parentClass={props.parentClass}
                    defaultValue={requestParameters.variantId}
                />
            {/* )} */}

            {/* Color List DropDown */}
            {/* {colorList.length > 0 && ( */}
                <ReactTypeHead
                    isClearable
                    header="Color"
                    handleSelect={handleOnChange('colorId')}
                    dataList={colorList}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder="Select Color"
                    parentClass={props.parentClass}
                    defaultValue={requestParameters.colorId}
                />
            {/* )} */}

            {/* Manufacturing Year List DropDown */}
            {/* {mfYearList.length > 0 && ( */}
                <ReactTypeHead
                    isClearable
                    header="Year"
                    handleSelect={handleOnChange('mfYear')}
                    dataList={mfYearList}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder="Manufacturing Year"
                    parentClass={props.parentClass}
                    defaultValue={requestParameters.mfYear}
                />
            {/* )} */}
        </>
    );
};

VehicleSelect.defaultProps = defaultProps;
export default VehicleSelect;
