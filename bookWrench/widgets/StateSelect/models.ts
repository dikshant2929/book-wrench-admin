export interface StateSelectModel {
    parentClass?: string;
    dropdownWidth?: string;
    stateId?: string | number | null;
    cityId?: string | any[] | null;
    chooseMultiCity?: boolean;
    handleSelect?: any;
    optCityAll?: boolean;
    optStateAll?: boolean;
    statePageName?: string | null;
    cityPageName?: string | null;
}
