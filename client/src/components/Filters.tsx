import React, { useEffect } from 'react';
import { Box, Sheet, FormControl, Select, Slider, Typography, Option  } from '@mui/joy';
import { CityDataContext } from '../context/CityDataContext';

// Import Icons
import DollarIcon from '@mui/icons-material/AttachMoney';
import MoneyIcon from '@mui/icons-material/CurrencyExchange';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import PeopleIcon from '@mui/icons-material/People';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function Filters() {
    const { 
        propertyList,  
        propertyFilter, setPropertyFilter, 
        propertySort, setPropertySort,
        setFilteredProperties, setSelectedProperty,
    } = React.useContext(CityDataContext);

    const handlePriceSliderChange = (event: any, prices: any) => {
        setPropertyFilter({...propertyFilter, minPrice: prices[0], maxSelectedPrice: prices[1]});
    };

    const handleBedroomChange = (event: any, bedrooms: any) => {
        setPropertyFilter({...propertyFilter, minBedrooms: bedrooms[0], maxSelectedBedrooms: bedrooms[1]});
    };

    const handleBathroomChange = (event: any, bathrooms: any) => {
        setPropertyFilter({...propertyFilter, minBathrooms: bathrooms[0], maxSelectedBathrooms: bathrooms[1]});
    };

    const handleOccupancyChange = (event: any, occupancy: any) => {
        setPropertyFilter({...propertyFilter, minOccupancy: occupancy[0], maxSelectedOccupancy: occupancy[1]});
    }

    const handleSortChange = (event: any, value: any) => {
        setPropertySort(value);
    };

    useEffect(() => {
        if (!propertyList) return;
        let filteredProperties = propertyList
            .filter(property => {
                let isPriceInRange = (property.adr >= propertyFilter.minPrice && property.adr <= propertyFilter.maxSelectedPrice);
                let isBedroomInRange = (property.bedrooms >= propertyFilter.minBedrooms && property.bedrooms <= propertyFilter.maxSelectedBedrooms);
                let isBathroomInRange = (property.bathrooms >= propertyFilter.minBathrooms && property.bathrooms <= propertyFilter.maxSelectedBathrooms);
                let isOccupancyInRange = (property.accommodates >= propertyFilter.minOccupancy && property.accommodates <= propertyFilter.maxSelectedOccupancy);
                return isPriceInRange && isBedroomInRange && isBathroomInRange && isOccupancyInRange;
        });
        if(filteredProperties){
            if (propertySort === 'adr') {
                filteredProperties = filteredProperties.sort((a, b) => b.adr - a.adr);
            } else if (propertySort === 'revenue') {
                filteredProperties = filteredProperties.sort((a, b) => b.revenue - a.revenue);
            } else if (propertySort === 'occ') {
                filteredProperties = filteredProperties.sort((a, b) => b.accommodates - a.accommodates);
            } else if (propertySort === 'bedrooms') {
                filteredProperties = filteredProperties.sort((a, b) => b.bedrooms - a.bedrooms);
            } else if (propertySort === 'bathrooms') {
                filteredProperties = filteredProperties.sort((a, b) => b.bathrooms - a.bathrooms);
            }
            setSelectedProperty(filteredProperties[0]);
            setFilteredProperties(filteredProperties);
        }
    }, [propertyFilter, propertyList, propertySort, setFilteredProperties, setSelectedProperty]);
    
    return (
        <Sheet
            variant="outlined"
            sx={{
                borderRadius: 'sm',
                '& > *': {
                    p: 2,
                    '&:nth-of-type(n):not(:nth-of-type(-n+4))': {
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    },
                },
            }}
        >
            <Box 
                sx={{ 
                    display: { xs: 'none', sm: 'grid' },
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                    gap: 2 
                }}
            >
                <Box sx={{ marginBottom: 2 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        Price
                    </Typography>
                    <Slider
                        value={[propertyFilter.minPrice, propertyFilter.maxSelectedPrice]}
                        onChange={handlePriceSliderChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={propertyFilter.maxPrice}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        Occupancy
                    </Typography>
                    <Slider
                        value={[propertyFilter.minOccupancy, propertyFilter.maxSelectedOccupancy]}
                        onChange={handleOccupancyChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={propertyFilter.maxOccupancy}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        Bedrooms
                    </Typography>
                    <Slider
                        value={[propertyFilter.minBedrooms, propertyFilter.maxSelectedBedrooms]}
                        onChange={handleBedroomChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={propertyFilter.maxBedrooms}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        Bathrooms
                    </Typography>
                    <Slider
                        value={[propertyFilter.minBathrooms, propertyFilter.maxSelectedBathrooms]}
                        onChange={handleBathroomChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={Math.ceil(propertyFilter.maxBathrooms)}
                    />
                </Box>                    
                <Box sx={{ marginBottom: 2 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        Sort By
                    </Typography>
                    <FormControl>
                        <Select
                            id="sort-by-select"
                            defaultValue="adr"
                            placeholder="Sort By"
                            indicator={<KeyboardArrowDown />}
                            onChange={handleSortChange}
                            value={propertySort}
                        >
                            <Option value="adr">
                                <DollarIcon sx={{ marginRight: 1 }} />
                                Average Daily Rate
                            </Option>
                            <Option value="revenue">
                                <MoneyIcon sx={{ marginRight: 1 }} />
                                Revenue
                            </Option>
                            <Option value="occ">
                                <PeopleIcon sx={{ marginRight: 1 }} />
                                Occupancy
                            </Option>
                            <Option value="bedrooms">
                                <BedIcon sx={{ marginRight: 1 }} />
                                Bedrooms
                            </Option>
                            <Option value="bathrooms">
                                <BathtubIcon sx={{ marginRight: 1 }} />
                                Bathrooms
                            </Option>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Sheet>
    );
}
