import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './PriceSlider.scss'


const PriceSlider = ({ ...props }) => {

  const callback = {
    setPriceRangeValue: (event, newValue) => {
      props.setPriceRangeValue(newValue)
    }
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={props.priceRangeValue}
        min={props.minPrice}
        max={props.maxPrice}
        step={10}
        onChange={callback.setPriceRangeValue}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
export default PriceSlider