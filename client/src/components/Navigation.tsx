import * as React from 'react';
import { Box, Sheet, Typography, Divider, } from '@mui/joy';
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
        selectedCity,
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
		
		</Sheet>
	);
}
