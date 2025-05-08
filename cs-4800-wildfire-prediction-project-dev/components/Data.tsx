import { Box, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ReactElement, useContext, useMemo, useState } from 'react';
import { City } from '../data/cityCache';
import { Context, ContextType } from '../pages';

export const Data = (): ReactElement => {
  const [filter, setFilter] = useState<string>('');
  const context = useContext<ContextType>(Context);
  const filteredCities = useMemo(() => {
    // console.log('cities has been modified');
    return context.cities
      .filter((city) => city.name.toLowerCase().includes(filter.toLowerCase()))
      .map((city) => {
        return <CityData key={city.name} city={city} />;
      });
  }, [context.cities, filter]);

  return (
    <Stack
      sx={{
        margin: 0,
        padding: 0,
        paddingTop: 1,
        height: '100%',
        maxHeight: '100%',
        width: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      <TextField
        id="outlined-basic"
        label="Enter Location..."
        variant="outlined"
        value={filter}
        onChange={(val) => setFilter(val.target.value || '')}
      />

      {filteredCities}
    </Stack>
  );
};

const CityData = ({ city }: { city: City }): ReactElement => {
  return (
    <Box sx={{ border: '1px black solid', p: 1 }}>
      <Stack>
        <Typography variant="h6">
          {city.name} ({city.lat},{city.lng})
          {city.probability && city.humidity && city.temp ? (
            <>
              <Typography>
                Wildfire Chance: {Math.round(city.probability * 10000) / 100}%
              </Typography>
              <Typography>
                Humidity: {Math.round(city.humidity * 10000) / 100}%
              </Typography>
              <Typography>
                Temperature: {Math.round(city.temp * 100) / 100}°F
              </Typography>
            </>
          ) : (
            ' Loading...'
          )}
        </Typography>
      </Stack>
    </Box>
  );
};
