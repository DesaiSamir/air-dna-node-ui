import * as React from 'react';
import { Box, Sheet, Typography, Divider, Chip, Button} from '@mui/joy';
import { CityDataContext } from '../context/CityDataContext';

export default function Navigation() {
	const { 
        selectedCity, topPropertyManagers, neighborCities, setCityId, setSelectedCity
    } = React.useContext(CityDataContext);

	return (
        <Sheet 
            variant="outlined"
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
                    {selectedCity && selectedCity.name}
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Sheet 
                    variant="outlined"
                    sx={{ 
                        display: { 
                            xs: 'none', 
                            sm: 'initial' 
                        }, 
                        borderLeft: '1px solid', 
                        borderColor: 'neutral.outlinedBorder',
                    }} 
                >
                    <>
                        <Box 
                            sx={{ 
                                p: 1, 
                                alignItems: 'center', 
                            }}
                        >
                            <Typography 
                                sx={{ 
                                    fontWeight: 'bold',
                                }}
                            >
                                Top Property Managers
                            </Typography>
                        </Box>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.5,
                                height: 145,
                            }}
                        >
                            {topPropertyManagers && topPropertyManagers.map((manager, index) => (
                               <Box 
                                    key = {index}
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
                                        {manager.name}
                                    </Chip>
                                </Box>
                            ))}
                        </Box>
                    </>
                </Sheet>
                <Sheet 
                    variant="outlined"
                    sx={{ 
                        borderRadius: 'sm',
                        '& > *': {
                            '&:nth-of-type(n):not(:nth-of-type(-n+4))': {
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            },
                        },
                    }} 
                >
                    <Box 
                        sx={{ 
                            p: 1, 
                            display: 'flex', 
                            alignItems: 'center', 
                            height: 50,
                        }}
                    >
                        <Typography 
                            sx={{ 
                                flex: 1, 
                                fontWeight: 'bold',
                            }}
                        >
                            Neighbor Cities
                        </Typography>
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            height: 'calc(100vh - 423px)', 
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                            p: 0.5,
                        }}
                    >
                        { neighborCities && neighborCities.sort((a, b) => a.code.city.localeCompare(b.code.city)).map((neighbor) =>
                            <Button 
                                fullWidth 
                                key = {neighbor.id}
                                variant="outlined"
                                onClick={() => {
                                    setCityId(neighbor.id)
                                    setSelectedCity({
                                        name: `${neighbor.name.city}, ${neighbor.name.state}`,
                                        type: "city",
                                        country: {
                                            code: neighbor.code.country,
                                            name: neighbor.name.country
                                        },
                                        state: {
                                            code: neighbor.code.state,
                                            name: neighbor.name.state
                                        },
                                        city: {
                                            id: neighbor.id,
                                            code: neighbor.code.city,
                                            name: neighbor.name.city
                                        },
                                        region: null
                                    })
                                }}
                            >
                                <Typography >
                                    {neighbor.name.city}, {neighbor.name.state}
                                </Typography>
                            </Button>
                        )}
                    </Box>
                </Sheet>
            </Box>
            
        </Sheet>
	);
}
