import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { 
    IconButton, Box, Typography 
} from '@mui/joy';
import SearchInput from './SearchInput';

// Icons Import
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';

function ColorSchemeToggle() {
	const { mode, setMode } = useColorScheme();
	const [mounted, setMounted] = React.useState(false);
	
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <IconButton size="sm" variant="outlined" color="primary" />;
	}

	return (
		<IconButton
			id="toggle-mode"
			size="sm"
			variant="outlined"
			color="primary"
			onClick={() => {
				if (mode === 'light') {
					setMode('dark');
				} else {
					setMode('light');
				}
			}}
		>
			{mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
		</IconButton>
	);
}

export default function Header() {
    return(
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, }} >
                <IconButton size="sm" variant="solid" sx={{ display: { xs: 'none', sm: 'inline-flex' } }} >
                    <FindInPageRoundedIcon />
                </IconButton>
                <Typography component="h1" fontWeight="xl">
                    Property Listings
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, }} >
                <SearchInput />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                <ColorSchemeToggle />
            </Box>
        </>
    );
}