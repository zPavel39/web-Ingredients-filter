import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './PriceSlider.scss'


const PriceSlider = ({ ...props }) => {

  const [value, setValue] = React.useState([props.minPrice, props.maxPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue)
    props.setPriceRangeValue(value)
    console.log('range', props.priceRangeValue)
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        min={props.minPrice}
        max={props.maxPrice}
        step={10}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
export default PriceSlider