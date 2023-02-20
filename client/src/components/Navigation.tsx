import * as React from 'react';
import { Box, Sheet, Typography, Divider, Card, Chip} from '@mui/joy';
import { CityDataContext } from '../context/CityDataContext';
// import IconButton from '@mui/joy/IconButton';
// import List from '@mui/joy/List';
// import ListSubheader from '@mui/joy/ListSubheader';
// import ListItem from '@mui/joy/ListItem';
// import ListItemButton from '@mui/joy/ListItemButton';
// import ListItemDecorator from '@mui/joy/ListItemDecorator';
// import ListItemContent from '@mui/joy/ListItemContent';

// // Icons import
// import FolderOpenIcon from '@mui/icons-material/FolderOpen';
// import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
// import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function Navigation() {
	const { 
        selectedCity, topPropertyManagers,
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
            <Box 
                sx={{
                    height: 'calc(100vh - 145px)', 
                    overflowY: 'auto',
                }}
            >
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
                    { topPropertyManagers && 
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
                            }}
                        >
                            {topPropertyManagers.map((manager, index) => (
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
                    }
                </Sheet>
                {/* <Sheet 
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
                            Rental Growth
                        </Typography>
                    </Box>
                    <Divider />
                </Sheet> */}
            </Box>
            
        </Sheet>
	);
}
