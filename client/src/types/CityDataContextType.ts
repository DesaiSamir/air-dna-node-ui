import { neighborCitiesType } from "./neighborCitiesType"
import { propertyFilterType } from "./propertyFilterType"
import { propertiesType, propertyListType } from "./propertyListType"
import { propertyManagersType } from "./propertyManagersType"
import { searchItemType } from "./searchItemType"


export type CityDataContextType = {
    // copy: string
    // setCopy:(c: string) => void
    cityId: undefined | number 
    setCityId: (c: undefined | number) => void 
    cityName: string 
    setCityName: (c: undefined | string) => void 
    selectedCity: searchItemType
    setSelectedCity: (e: undefined | null | searchItemType) => void
    selectedProperty: propertiesType 
    setSelectedProperty: (e: undefined | null | propertiesType) => void
    // stateName, 
    // setStateName,  
    // activeListings, 
    // areaInfo, 
    // areaLookup, 
    // overview, 
    propertyList: propertyListType 
    setPropertyList: (e: undefined | null | propertyListType) => void
    // propertyMetrics,
    search: {
        num_items: number
        items: searchItemType[]
    }
    setSearch: (c: searchItemType) => void 
    topPropertyManagers: [propertyManagersType], 
    onCityNameChanged: (e: object) => void
    
    propertyFilter: propertyFilterType, 
    setPropertyFilter: (e: undefined | null | propertyFilterType) => void
    propertySort: string
    setPropertySort: (e: string) => void
    filteredProperties: propertyListType 
    setFilteredProperties: (e: undefined | null | propertyListType) => void
    propertiesLoading: boolean
    neighborCities: neighborCitiesType[]
}