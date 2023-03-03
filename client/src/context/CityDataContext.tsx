import { createContext, useContext } from "react"
import { CityDataContextType } from "../types/CityDataContextType"

export const cityInfo = {
    name: "East Stroudsburg, Pennsylvania",
    type: "city",
    country: {
        code: "us",
        name: "United States"
    },
    state: {
        code: "pennsylvania",
        name: "Pennsylvania"
    },
    city: {
        id: 52088,
        code: "east-stroudsburg",
        name: "East Stroudsburg"
    },
    region: null
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
    latitude: 0,
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
    map_url: "",
}

const propertyFilterData = {
        minPrice: 0,
        maxPrice: 1000,
        maxSelectedPrice: 1000,
        minBedrooms: 0,
        maxBedrooms: 10,
        maxSelectedBedrooms: 10,
        minBathrooms: 0,
        maxBathrooms: 10,
        maxSelectedBathrooms: 10,
        minOccupancy: 0,
        maxOccupancy: 20,
        maxSelectedOccupancy: 20,
    }

const propertyManagers = {
    avg_rating: 4.5589255,
    listings_change: 0.5,
    name: "Evolve",
    total_listings: 30,
    total_reviews: 577
};

const neighborCities = {
    id: 78140,
    code: {
        city: "wrightsville",
        state: "pennsylvania",
        country: "us"
    },
    name: {
        city: "Wrightsville",
        state: "Pennsylvania",
        country: "United States"
    },
};

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
    topPropertyManagers: [propertyManagers],
    neighborCities: [neighborCities],
});
export const useGlobalContext = () => useContext(CityDataContext)