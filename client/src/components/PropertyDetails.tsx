import * as React from 'react';
import { 
    AspectRatio, Chip, Card,
    // Avatar, AvatarGroup, 
    Button, Divider, Sheet, Box, Typography 
} from '@mui/joy';
import { CityDataContext } from '../context/CityDataContext';
import { toLocaleString } from '../utils/helper';

export default function PropertyDetails() {
	const { 
        selectedProperty
    } = React.useContext(CityDataContext);

    const [photoSelected, setPhotoSelected] = React.useState<boolean>(true);

    const handleSelectView = (view: boolean) => {
        setPhotoSelected(view);
    }

    const selectedPropertyData = selectedProperty && [
        { label: 'Avg Daily Rate', value: `${toLocaleString(selectedProperty.adr)} * 80% = ${toLocaleString(selectedProperty.adr * 0.8)}`},
        { label: 'Real Estate Type', value: selectedProperty.real_estate_type },
        { label: 'Property Type', value: selectedProperty.property_type },
        { label: 'Room Type', value: selectedProperty.room_type },
        { label: 'Days Available', value: `${selectedProperty.days_available} * 50% = ${Math.round(selectedProperty.days_available * 0.5)}` },
        { label: 'Yearly Revenue', value: toLocaleString(selectedProperty.revenue)},
        { label: 'Occupancy Rate', value: selectedProperty.occ + '%' },
        { label: 'Ratings', value: selectedProperty.ratings || 0 },
        { label: 'Reviews', value: selectedProperty.reviews || 0 },
        { label: 'Bedrooms', value: selectedProperty.bedrooms },
        { label: 'Bathrooms', value: selectedProperty.bathrooms },
        { label: 'Accomodates', value: selectedProperty.accommodates },
        { label: 'Prof Managed', value: selectedProperty.professionally_managed ? 'Yes' : 'No' },
      ];
    
    return (
        <Sheet 
            sx={{ 
                display: { 
                    xs: 'none', 
                    sm: 'initial' 
                }, 
                borderLeft: '1px solid', 
                borderColor: 'neutral.outlinedBorder',
            }} 
        >
            <Box 
                sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    height: 75,
                }}>
                <Typography 
                    sx={{ 
                        flex: 1, 
                        fontWeight: 'bold',
                    }}
                >
                    {selectedProperty && selectedProperty.title}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex' }}>
                <Button 
                    variant="plain" 
                    sx={{  
                            borderRadius: 0, 
                            flex: 1, 
                            py: '1rem',
                            borderBottom: `${photoSelected ? '2px solid' : ''}`,
                            borderColor: `${photoSelected ? 'neutral.outlinedBorder' : ''}`,
                        }} 
                    onClick={() => handleSelectView(true)}
                >
                    Details
                </Button>
                <Button 
                    variant="plain" 
                    color="neutral" 
                    sx={{ 
                        borderRadius: 0, 
                        flex: 1, 
                        py: '1rem',
                        borderBottom: `${!photoSelected ? '2px solid' : ''}`,
                        borderColor: `${!photoSelected ? 'neutral.outlinedBorder' : ''}`,
                    }} 
                    onClick={() => handleSelectView(false)}
                >
                    Activity
                </Button>
            </Box>
            <Box sx={{ p: 2, height: 197 }} >
                { photoSelected 
                    ? 
                        (<Box id="image-box">
                            <AspectRatio ratio="21/9">
                                <img alt="" src={selectedProperty && selectedProperty.img_cover} />
                            </AspectRatio>
                        </Box>)
                    :
                        (<Box id="map-box">
                            <Typography level="h2" fontSize="md" >
                                Map goes here
                            </Typography>
                        </Box>)
                }
            </Box>
            <Divider />
            <Box
                sx={{
                    height: 'calc(100vh - 395px)', 
                    overflowY: 'auto'
                }}
            >
                {selectedProperty &&
                    <Box 
                        sx={{ 
                            gap: 1, 
                            p: 1, 
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                        }} >
                        {selectedPropertyData.map(({ label, value }, index) => (
                            <React.Fragment key={index}>
                                <Card
                                    variant="outlined"
                                    orientation="horizontal"
                                    sx={{
                                        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 0.5,
                                        }}
                                    >
                                        <Chip
                                            variant="outlined"
                                            color="primary"
                                            size="sm"
                                            sx={{ pointerEvents: 'none' }}
                                        >
                                            {label}
                                        </Chip>
                                        <Typography level="h2" fontSize="md" >
                                            {value}
                                        </Typography>
                                    </Box>
                                </Card>
                            </React.Fragment>
                        ))}
                    </Box>
                }
            </Box>
        </Sheet>
    );
}