import { createContext, useContext } from "react"
import { CityDataContextType } from "../types/CityDataContextType"

const cityInfo = {
    "name": "Stra, Veneto, Italy",
    "type": "city",
    "country": {
        "code": "it",
        "name": "Italy"
    },
    "state": {
        "code": "veneto",
        "name": "Veneto"
    },
    "city": {
        "id": 52088,
        "code": "stra",
        "name": "Stra"
    },
    "region": null
}

const propertyInfo = {
    img_cover: "",
    id: "",
    rating: 0,
    adr: 0,
    title: "",
    platforms: {
        airbnb_property_id: 0,
        homeaway_property_id: 0,
    },
    bathrooms: 0,
    bedrooms: 0,
    accommodates: 0,
    lattitude: 0,
    longitude: 0,
    property_type: "",
    real_estate_type: "",
    room_type: "",
    reviews: 0,
    ratings: 0,
    regions: {
        neighborhood_ids: [],
        zipcode_ids: [],
    },
    professionally_managed: false,
    days_available: 0,
    revenue: 0,
    occ: "0",
}

const propertyFilterData = {
        minPrice: 0,
        maxPrice: 1000,
        maxSelectedPrice:1000,
        minBedrooms: 0,
        maxBedrooms: 10,
        minBathrooms: 0,
        maxBathrooms: 10,
        minOccupancy: 0,
        maxOccupancy: 20,
    }

export const CityDataContext = createContext<CityDataContextType>({
    cityId: 76953,
    setCityId: () =>{},
    cityName: "East Stroudsburg",
    setCityName: () =>{},
    search: {
        "num_items": 1,
        "items": [
            cityInfo
        ]
    },
    selectedCity: cityInfo,
    setSelectedCity: () => {},
    selectedProperty: propertyInfo,
    setSelectedProperty: () => {},
    setSearch: () => {},
    onCityNameChanged: () => {},
    propertyList: [propertyInfo],
    setPropertyList: () => {},
    propertyFilter: propertyFilterData, 
    setPropertyFilter: () => {}, 
    propertySort: "", 
    setPropertySort: () => {},
    filteredProperties: [propertyInfo],
    setFilteredProperties: () => {},
    propertiesLoading: false,
});
export const useGlobalContext = () => useContext(CityDataContext)