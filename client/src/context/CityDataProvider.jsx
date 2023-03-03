import { useState, useEffect } from "react";
import { CityDataContext, cityInfo } from "./CityDataContext";
const http = require("../utils/http");

function CityDataProvider({ children }){
    const [cityId, setCityId] = useState(76953);
    const [cityName, setCityName] = useState(null);
    const [selectedCity, setSelectedCity] = useState(cityInfo);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [stateName, setStateName] = useState(null);
    const [activeListings, setActiveListings] = useState(null);
    const [areaInfo, setAreaInfo] = useState(null);
    const [neighborCities, setNeighborCities] = useState(null);
    const [areaLookup, setAreaLookup] = useState(null);
    const [overview, setOverview] = useState(null);
    const [propertyList, setPropertyList] = useState(null);
    // const [propertyMetrics, setPropertyMetrics] = useState(null);
    const [search, setSearch] = useState(null);
    const [topPropertyManagers, setTopPropertyManagers] = useState(null);
    const [propertyFilter, setPropertyFilter] = useState({
        minPrice: 0,
        maxPrice: 1000,
        minBedrooms: 0,
        maxBedrooms: 0,
        minBathrooms: 0,
        maxBathrooms: 0,
        minOccupancy: 0,
        maxOccupancy: 0,
    });
    const [filteredProperties, setFilteredProperties] = useState(null);
    const [propertySort, setPropertySort] = useState("adr");
    const [propertiesLoading, setPropertiesLoading] = useState(null);
    
    useEffect(() => {
        if(cityId){
            setActiveListings(null);
            http.getActiveListings(cityId, setActiveListings);
            setAreaInfo(null);
            http.getAreaInfo(cityId, setAreaInfo);
            setNeighborCities(null);
            http.getNeighborCities(cityId, setNeighborCities);
            setOverview(null);
            http.getOverview(cityId, setOverview);
            let payload = {
                currency: "USD",
                filters: [
                    {
                        type: "select",
                        field: "city_id", 
                        value: cityId
                    }]
            }
            setPropertyList(null);
            setPropertiesLoading(true);
            setFilteredProperties(null);
            setSelectedProperty(null);
            const setProperties = (data) => {
                const sortedData = data.sort((a, b) => b.adr - a.adr);
                setSelectedProperty(sortedData[0]);             
                setFilteredProperties(sortedData);
                setPropertySort('adr');
                setPropertyList(sortedData);
                setPropertiesLoading(false);
            }
            http.getPropertyList(payload, setProperties);
            // setPropertyMetrics(null);
            // http.getPropertyMetrics(cityId, setPropertyMetrics);
            setTopPropertyManagers(null);
            http.getTopPropertyManagers(cityId, setTopPropertyManagers);
        }
    }, [cityId]);

    useEffect(() => {
        if (!propertyList) return;
        const maxBathrooms = propertyList && propertyList.reduce((max, property) => {
            return property.bathrooms > max ? property.bathrooms : max;
        }, 0);
        const maxBedrooms = propertyList && propertyList.reduce((max, property) => {
            return property.bedrooms > max ? property.bedrooms : max;
        }, 0);
        const maxOccupancy = propertyList && propertyList.reduce((max, property) => {
            return property.accommodates > max ? property.accommodates : max;
        }, 0);
        const maxPrice = propertyList && propertyList.reduce((max, property) => {
            return property.adr > max ? property.adr : max;
        }, 0);

        setPropertyFilter({
            minPrice: 0,
            maxPrice,
            maxSelectedPrice: maxPrice,
            minBedrooms: 0,
            maxBedrooms,
            maxSelectedBedrooms: maxBedrooms,
            minBathrooms: 0,
            maxBathrooms,
            maxSelectedBathrooms: maxBathrooms,
            minOccupancy: 0,
            maxOccupancy,
            maxSelectedOccupancy: maxOccupancy,
        });
    }, [propertyList])

    useEffect(() => {
        if(cityName){
            http.getSearch(cityName, setSearch);
        }
    }, [cityName])

    useEffect(() => {
        if(selectedCity){
            http.getAreaLookup(selectedCity.state.code, selectedCity.city.code, setAreaLookup);
        }
    }, [selectedCity])

    var timer;
    const onCityNameChanged = (e) => {        
        var target = e.target.value;
        
        if(target === '')
            target = 'East Stroudsburg';

        clearTimeout(timer);

        timer = setTimeout(() => {
            setCityName(target);
        }, 2000);
    }

    return (
        <CityDataContext.Provider value={{
            cityId, 
            setCityId, 
            cityName, 
            setCityName, 
            selectedCity,
            setSelectedCity, 
            stateName, 
            setStateName,  
            activeListings, 
            areaInfo, 
            areaLookup, 
            overview, 
            propertyList, 
            // propertyMetrics,
            search , 
            setSearch, 
            topPropertyManagers, 
            onCityNameChanged, 
            selectedProperty, 
            setSelectedProperty,
            propertyFilter, 
            setPropertyFilter, 
            propertySort, 
            setPropertySort,
            filteredProperties, 
            setFilteredProperties,
            propertiesLoading,
            neighborCities,
        }}>
            {children}
        </CityDataContext.Provider>
    );
};

export default CityDataProvider;