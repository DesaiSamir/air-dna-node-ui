import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { Card, Typography, CardCover, CardContent, Sheet, Box, CircularProgress, Tooltip  } from '@mui/joy';
import { CityDataContext } from '../context/CityDataContext';
import { Link, } from '@mui/material';

import Filters from './Filters';
import { getAirBnbListUrl, getListingUrl, getVerboListUrl, toLocaleString } from '../utils/helper';
// import Helper from '../utils/helper';

// Icons Import
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DollarIcon from '@mui/icons-material/AttachMoney';
import MoneyIcon from '@mui/icons-material/CurrencyExchange';
import GroupsIcon from '@mui/icons-material/Groups';
import AirbnbIcon from '@mui/icons-material/FontDownload';
import VerboIcon from '@mui/icons-material/AirlineStops';
import CardsPagination from './CardsPagination';

export default function PropertyList() {
    const { mode } = useColorScheme();
    const { 
        filteredProperties, selectedProperty, setSelectedProperty, propertiesLoading,
    } = React.useContext(CityDataContext);
    const [currentPage, setCurrentPage] = React.useState(1);
    const propertiesPerPage = 18;

    const propertyValuesCss = { 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '6px',
        borderRadius: '4px',
        transition: 'background-color 0.2s ease',
        px: 1,
        cursor: 'default',
        '&:hover': {
            backgroundColor: `${mode === 'light' ? 'rgb(0 0 0 / 20%)' : 'rgb(250 250 250 / 20%)'}`,
        }
    };

    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties && filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Filters />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
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
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 2,
                            height: 'calc(100vh - 302px)', 
                            overflowY: 'auto'
                        }}
                    >
                        {!currentProperties || (currentProperties && currentProperties.length === 0) 
                        ?   
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center',}}> 
                                {propertiesLoading &&
                                    <CircularProgress /> 
                                }
                            </Box>
                        : currentProperties.map((property) => (
                            <Card 
                                key={property.id} 
                                sx={{ 
                                    '--Card-radius': (theme) => theme.vars.radius.sm, 
                                    boxShadow: 'none', 
                                    height: '400px',
                                    padding: '0px',
                                    border: selectedProperty === property ? '5px solid skyblue' : 'none',
                                }}
                                onClick={() => setSelectedProperty(property)}
                            >
                                <CardCover>
                                    <img alt="" src={property.img_cover} loading="lazy" />
                                </CardCover>
                                <CardCover sx={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.12))', }} />
                                <CardContent
                                    sx={{
                                        mt: 'auto',
                                        flexGrow: 0,
                                        flexDirection: 'row',
                                        alignItems: 'end',
                                        height: '170px',
                                        background: `${mode === 'light' ? 'rgb(250 250 250 / 50%)' : 'rgb(0 0 0 / 50%)'}`,
                                    }}
                                >
                                    <Box sx={{ flex: 1, paddingBottom: 1 }}>
                                        <Link
                                            sx={{textAlign: 'center'}} 
                                            href={ getListingUrl(property.platforms)} 
                                            target={getListingUrl(property.platforms) === '#' ? undefined : "_blank"} 
                                            rel="noopener noreferrer" 
                                            underline='none'
                                        >
                                            <Typography sx={{ fontWeight: 'bold', }}>{property.title}</Typography>
                                        </Link>
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                flexDirection: 'row', 
                                                flexWrap: 'wrap', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-evenly', 
                                                marginTop:'5px'
                                            }}
                                        >
                                            {[
                                                { 
                                                    icon: <MoneyIcon />, 
                                                    value: property.revenue ? toLocaleString(property.revenue) : 0, 
                                                    tooltip: 'Yearly Revenue'
                                                },
                                                {
                                                    icon: <AirbnbIcon />,
                                                    value: 'ABnB',
                                                    tooltip: 'AirBnB Link',
                                                    href: getAirBnbListUrl(property.platforms.airbnb_property_id)
                                                },
                                                {
                                                    icon: <VerboIcon />,
                                                    value: 'Vrbo',
                                                    tooltip: 'Vrbo Link',
                                                    href: getVerboListUrl(property.platforms.homeaway_property_id)
                                                },
                                                {
                                                    icon: <GroupsIcon />,
                                                    value: property.occ ? `${property.occ}%` : 0,
                                                    tooltip: 'Occupancy Rate'
                                                },
                                                { 
                                                    icon: <DollarIcon />, 
                                                    value: toLocaleString(property.adr), 
                                                    tooltip: 'Average Daily Rate'
                                                },
                                                {
                                                    icon: <BedIcon />,
                                                    value: property.bedrooms,
                                                    tooltip: 'Bedrooms'
                                                },
                                                {
                                                    icon: <BathtubIcon />,
                                                    value: property.bathrooms,
                                                    tooltip: 'Bathrooms'
                                                },
                                                {
                                                    icon: <PeopleIcon />,
                                                    value: property.accommodates,
                                                    tooltip: 'Accommodates'
                                                },
                                                {
                                                    icon: <StarIcon />,
                                                    value: property.rating ? property.rating : 0,
                                                    tooltip: 'Rating'
                                                },
                                                {
                                                    icon: <ReviewsIcon />,
                                                    value: property.reviews ? property.reviews : 0,
                                                    tooltip: 'Reviews',
                                                    href: getAirBnbListUrl(property.platforms.airbnb_property_id)
                                                }
                                            ].map((item) => (
                                                <Tooltip title={item.tooltip} arrow variant="solid" key={item.tooltip}>
                                                    <Link
                                                        sx={{textAlign: 'center'}} 
                                                        href={item.href} 
                                                        target={item.href === '#' ? undefined : "_blank"}
                                                        rel="noopener noreferrer" 
                                                        underline='none'
                                                    >
                                                        <Box sx={{...propertyValuesCss, cursor: `${item.href ? 'pointer' : 'default'}`}}>
                                                            {item.icon} 
                                                            <span style={{ marginLeft: '5px', }}>{item.value}</span>
                                                        </Box>
                                                    </Link>
                                                </Tooltip>
                                            ))}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </ Sheet>
                <CardsPagination totalPages={Math.ceil(filteredProperties && filteredProperties.length / propertiesPerPage)} onPageChange={handlePageChange} />
            </Box>
        </Box>
    );
}