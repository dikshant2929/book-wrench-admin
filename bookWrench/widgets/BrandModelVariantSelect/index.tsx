import React, { useState, useEffect } from 'react';
import ReactTypeHead from '@common/elements/ReactTypehead';
import API from '@API';

const defaultProps = {
    oemId: null,
    modelId: null,
    variantId: null,
    brandDropdown: 'OfferBrandDropdown',
    modelDropdown: 'OfferModelDropdown',
    variantDropdown: 'OfferVariantsDropdown',
    chooseMultiVariant: false,
    isVariantShown: true,
};

const BrandModelVariantSelect = (props: any) => {
    const [modelsList, setModelsList] = useState([]);
    const [variantsList, setVariantsList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [disableVariant, setDisableVariant] = useState(false);
    const variantHeader = (heading: string) =>
        props.chooseMultiVariant ? customHeader(heading, 'variantId') : heading;
    const [requestParameters, setRequestParameters] = useState({
        oemId: props.oemId,
        modelId: props.modelId,
        variantId: props.variantId,
    });

    //Brand List
    useEffect(() => {
        fetchBrandList();
    }, []);

    useEffect(() => {
        setRequestParameters({
            modelId: props.modelId,
            variantId: props.variantId,
            oemId: props.oemId,
        });
    }, [props.modelId, props.variantId, props.oemId]);

    //Color List
    useEffect(() => {
        setModelsList([]);
        setVariantsList([]);
        props.handleSelect && props.handleSelect('modelId')({ value: props.modelId });
        props.handleSelect && props.handleSelect('variantId')({ value: props.variantId });
        requestParameters.oemId && fetchModelsList({ oemId: requestParameters.oemId });
        props.modelId && fetchVarientList({ modelId: props.modelId });
    }, [requestParameters.oemId]);

    // Varient List
    useEffect(() => {
        setVariantsList([]);
        props.handleSelect && props.handleSelect('variantId')({ value: props.variantId });
        requestParameters.modelId && fetchVarientList({ modelId: requestParameters.modelId });
    }, [requestParameters.modelId]);

    //-----------------Hitting APIS To Fatch Data----------------
    const fetchBrandList = () => {
        getDataFromAPI(props.brandDropdown, {}, setBrandList);
    };

    //-----------------Hitting APIS To Fatch Data----------------
    const fetchModelsList = (data: any) => {
        getDataFromAPI(props.modelDropdown, data, setModelsList);
    };

    const fetchVarientList = (data: any) => {
        getDataFromAPI(props.variantDropdown, data, setVariantsList);
    };

    const getDataFromAPI = (pageName: any, data: any, callback: any) => {
        API.get(pageName, data)
            .then((data) => callback(data?.data?.result || []))
            .catch(() => callback([]));
    };
    //---------------------------------------------------------------

    // EventListener (onChange)
    const handleOnChange = (field: any) => (event: any) => {
        const value = (Array.isArray(event) && event.map(({ value }) => value)) || event?.value || null;
        setRequestParameters((prevState) => ({ ...prevState, [field]: value }));
        props.handleSelect && props.handleSelect(field)({ value });
    };

    // Default Initial Value of varient heared checkbox
    useEffect(() => {
        props.chooseMultiVariant && setDisableVariant(!Boolean(requestParameters?.variantId?.length));
    }, [requestParameters?.variantId]);

    const customHeader = (heading: string, field: string) => {
        const selectAllVarient =
            (field: any) =>
            ({ target }: any) => {
                setDisableVariant(target?.checked);
                setRequestParameters((prevState) => ({ ...prevState, [field]: null }));
                props.handleSelect && props.handleSelect(field)({ value: null });
            };

        return (
            <div>
                {heading}{' '}
                <label className="text-tiny">
                    
                        (Tick here to select all Variants{' '}
                        <input type="checkbox" checked={disableVariant} onChange={selectAllVarient(field)} className="appearance-none checked:bg-primary checked:border-transparent rounded-sm  checked:hover:bg-primary focus:ring-0 checked:focus:bg-primary"/> ){' '}
                    {' '}
                </label>{' '}
            </div>
        );
    };

    return (
        <>
            {/* Color List DropDown */}
            {/* {brandList.length > 0 && ( */}
                <ReactTypeHead
                    isClearable
                    header="Brand"
                    handleSelect={handleOnChange('oemId')}
                    dataList={brandList}
                    // className={`${!disableVariant ? 'btn-disabled' : ''}`}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder="Select Brand"
                    parentClass={props.parentClass}
                    defaultValue={requestParameters.oemId}
                />
            {/* )} */}

            {/* Model List DropDown */}
            {/* {modelsList.length > 0 && ( */}
                <ReactTypeHead
                    isClearable
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
            {/* {props.isVariantShown && variantsList.length > 0 && ( */}
                <ReactTypeHead
                    isClearable
                    isDisabled={disableVariant}
                    header={variantHeader('Variants')}
                    handleSelect={handleOnChange('variantId')}
                    dataList={variantsList}
                    fields={{ key: 'id', value: 'name' }}
                    placeholder="Select Variants"
                    parentClass={props.dropdownWidth ||  props.parentClass}
                    isMulti
                    defaultValue={requestParameters.variantId}
                />
            {/* )} */}
        </>
    );
};

BrandModelVariantSelect.defaultProps = defaultProps;
export default BrandModelVariantSelect;
