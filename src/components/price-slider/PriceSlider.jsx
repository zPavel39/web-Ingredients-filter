import React from 'react'
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
    <div className='priceSlider'>
      <div className='priceSlider__head'>
        <input className='priceSlider__head_input' type='number' value={props.priceRangeValue[0]} onChange={(e) => props.setPriceRangeValue([e.target.value, props.priceRangeValue[1]])} />
        <input className='priceSlider__head_input' type='number' value={props.priceRangeValue[1]} onChange={(e) => props.setPriceRangeValue([props.priceRangeValue[0], e.target.value])} />
      </div>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={props.priceRangeValue}
          min={props.minPrice}
          max={props.maxPrice}
          step={10}
          onChange={callback.setPriceRangeValue}
          valueLabelDisplay="auto"
          color="secondary"
        />
      </Box>
    </div>
  );
}
export default PriceSlider