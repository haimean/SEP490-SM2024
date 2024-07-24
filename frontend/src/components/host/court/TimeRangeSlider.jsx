import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Range, getTrackBackground } from 'react-range';

const TimeRangeSlider = ({ onSave }) => {
  const STEP = 15; // Step in minutes
  const MIN = 5 * 60; // 05:00 in minutes
  const MAX = 22 * 60; // 22:00 in minutes

  const [values, setValues] = useState([5 * 60, 17 * 60, 22 * 60]); // Initial values in minutes

  const formatTime = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    const priceList = [
      { start: formatTime(values[0]), end: formatTime(values[1]), price: 100000 },
      { start: formatTime(values[1]), end: formatTime(values[2]), price: 120000 },
    ];
    onSave(priceList);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Set Prices for Time Slots
      </Typography>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#548BF4', '#ccc', '#548BF4'],
                  min: MIN,
                  max: MAX
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '24px',
              width: '24px',
              borderRadius: '12px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? '#548BF4' : '#CCC'
              }}
            />
          </div>
        )}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        {values.map((value, index) => (
          <Typography key={index} variant="body1">
            {formatTime(value)}
          </Typography>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 3 }}>
        Save Prices
      </Button>
    </Box>
  );
};

export default TimeRangeSlider;
