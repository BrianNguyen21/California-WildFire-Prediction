import { Box, Slider, Stack, TextField, Typography } from '@mui/material';
import { ReactElement, useContext } from 'react';
import { Context, defaultContext } from '../pages';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

export const UserInput = (): ReactElement => {
  const context = useContext(Context);
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflowY: 'hidden',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Pick a Date"
          value={context.date}
          onChange={(newDate) => {
            context.setDate(newDate ?? defaultContext.date);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <RainfallSlider
        label="30 Days Rainfall (in.)"
        rainFall={context.rain_30}
        onChange={(e, val) => {
          context.setRain_30(val as number);
        }}
      />

      <RainfallSlider
        label="60 Days Rainfall (in.)"
        rainFall={context.rain_60}
        onChange={(e, val) => {
          context.setRain_60(val as number);
        }}
      />

      <RainfallSlider
        label="90 Days Rainfall (in.)"
        rainFall={context.rain_90}
        onChange={(e, val) => {
          context.setRain_90(val as number);
        }}
      />
    </Box>
  );
};

const RainfallSlider = (props: {
  label: string;
  rainFall: number;
  onChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
}): ReactElement => {
  return (
    <Stack direction="column">
      <Typography sx={{ fontWeight: 600 }}>{props.label}</Typography>
      <Slider
        step={1}
        defaultValue={props.rainFall}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={props.onChange}
      />
    </Stack>
  );
};
