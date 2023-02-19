import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { Card, Typography, CardCover, CardContent, Sheet, Box, CircularProgress, Tooltip  } from '@mui/joy';
import { CityDataContext } from '../context/CityDataContext';
import { Link, } from '@mui/material';

import Filters from './Filters';
import { getAirBnbListUrl, getVerboListUrl, toLocaleString } from '../utils/helper';

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
    const propertiesPerPage = 9;

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

    const propertyTooltipCss = {
        '&[data-tooltip]': {
            position: 'relative',
        },
        '&[data-tooltip]:before': {
            content: '""',
            display: 'none',
            position: 'absolute',
            top: 'calc(100%)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderTop: 'none',
            borderRight: '5px solid transparent',
            borderBottom: `5px solid ${mode === 'light' ? 'rgb(250 250 250 / 90%)' : 'rgb(0 0 0 / 90%)'}`,
            borderLeft: '5px solid transparent',
            zIndex: '1',
        },
        '&[data-tooltip]:after': {
            content: 'attr(data-tooltip)',
            display: 'none',
            position: 'absolute',
            top: 'calc(100% + 5px)',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '5px',
            backgroundColor: `${mode === 'light' ? 'rgb(250 250 250 / 90%)' : 'rgb(0 0 0 / 90%)'}`,
            border: `2px solid ${mode === 'light' ? 'rgb(0 0 0 / 90%)' : 'rgb(250 250 250 / 90%)'}`,
            fontSize: '12px',
            whiteSpace: 'nowrap',
            borderRadius: '4px',
            zIndex: '1',
        },
        '&[data-tooltip]:hover:before, &[data-tooltip]:hover:after': {
            display: 'block',
        },
    }

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
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
                                    height: '300px',
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
                                        height: '140px',
                                        background: `${mode === 'light' ? 'rgb(250 250 250 / 50%)' : 'rgb(0 0 0 / 50%)'}`,
                                    }}
                                >
                                    <Box sx={{ flex: 1, paddingBottom: 1 }}>
                                        <Link
                                            sx={{textAlign: 'center'}} 
                                            href={getAirBnbListUrl(property.platforms.airbnb_property_id)} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            underline='none'
                                        >
                                            <Typography sx={{ fontWeight: 'bold', '&:hover': {fontSize: 'large'} }}>{property.title}</Typography>
                                        </Link>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop:'5px'}}>
                                            <Tooltip title="Yearly Revenue" arrow variant="solid">
                                                <Box sx={{...propertyValuesCss, ...propertyTooltipCss }} data-tooltip="Yearly Revenue">
                                                    <MoneyIcon />
                                                    <span style={{ marginLeft: '5px', }}>{property.revenue ? toLocaleString(property.revenue) : 0}</span>
                                                </Box>
                                            </Tooltip>
                                            <Tooltip title="AirBnB Link" arrow variant="solid">
                                                <Link
                                                    sx={{textAlign: 'center'}} 
                                                    href={getAirBnbListUrl(property.platforms.airbnb_property_id)} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    underline='none'
                                                >
                                                    <Box sx={{...propertyValuesCss, ...propertyTooltipCss, cursor: 'pointer'}} data-tooltip="">
                                                        <AirbnbIcon />
                                                        <span style={{ marginLeft: '5px', }}>ABnB</span>
                                                    </Box>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="Vrbo Link" arrow variant="solid">
                                                <Link
                                                    sx={{textAlign: 'center'}} 
                                                    href={getVerboListUrl(property.platforms.homeaway_property_id)} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    underline='none'
                                                >
                                                    <Box sx={{...propertyValuesCss, cursor: 'pointer'}}>
                                                        <VerboIcon />
                                                        <span style={{ marginLeft: '5px', }}>Verbo</span>
                                                    </Box>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="Occupancy Rate" arrow variant="solid">
                                                <Box sx={propertyValuesCss}>
                                                    <GroupsIcon />
                                                    <span style={{ marginLeft: '5px', }}>{property.occ ? `${property.occ}%` : 0}</span>
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop:'5px'}}>
                                            {[
                                                { icon: <DollarIcon />, value: toLocaleString(property.adr), tooltip: 'Average Daily Rate' },
                                                { icon: <BedIcon />, value: property.bedrooms, tooltip: 'Bedrooms' },
                                                { icon: <BathtubIcon />, value: property.bathrooms, tooltip: 'Bathrooms' },
                                                { icon: <PeopleIcon />, value: property.accommodates, tooltip: 'Accommodates' },
                                                { icon: <StarIcon />, value: property.rating, tooltip: 'Rating' },
                                            ].map((item) => (
                                                <Tooltip title={item.tooltip} arrow variant="solid" key={item.tooltip}>
                                                    <Box sx={propertyValuesCss}>
                                                        {item.icon} 
                                                        <span style={{ marginLeft: '1px', }}>{item.value ? item.value : 0}</span>
                                                    </Box>
                                                </Tooltip>
                                            ))}
                                            <Tooltip title="Reviews" arrow variant="solid">
                                                <Link href={getAirBnbListUrl(property.platforms.airbnb_property_id)} target="_blank" rel="noopener noreferrer" underline='none'>
                                                    <Box sx={{...propertyValuesCss, cursor: 'pointer'}}>
                                                        <ReviewsIcon />
                                                        <span style={{ marginLeft: '1px', }}>{property.reviews ? property.reviews : 0}</span>
                                                    </Box>
                                                </Link>
                                            </Tooltip>
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