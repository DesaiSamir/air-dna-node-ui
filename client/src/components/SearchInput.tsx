import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import { CityDataContext } from '../context/CityDataContext';
import { searchItemType } from '../types/searchItemType';

export default function SearchInput() {
    const [open, setOpen] = React.useState(false);
    const { 
        setCityId, 
        onCityNameChanged,
        search,
        selectedCity,
        setSelectedCity,
    } = React.useContext(CityDataContext);
    const [options, setOptions] = React.useState<searchItemType[]>([]);
    const loading = open && options?.length === 0;

    React.useEffect(() => {
        search && setOptions([...search.items]);
    }, [search]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <>
            <Autocomplete
                sx={{ width: 300 }}
                placeholder="Search by city name here..."
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                value={selectedCity}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                endDecorator={
                    loading ? (
                        <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                    ) : null
                }
                onKeyDown = {onCityNameChanged}
                onChange={(event, newCity) => {
                    try {
                        setCityId(newCity?.city.id)
                        setSelectedCity(newCity)
                    } catch (error) {
                        console.log({event, cityId: newCity?.city.id});
                    }
                }}
            />
        </>
    );
}
