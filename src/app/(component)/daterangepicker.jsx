'use client';
import React, { useState } from 'react';
import { DateRangePicker, Stack } from 'rsuite';

const daterangepicker = () => {

  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (value) => {
    setSelectedDates(value); // Update state with the selected date range
    console.log('Selected Dates:', selectedDates); // Log for debugging purposes
  };
    
    return (
        <div>
            <Stack spacing={10} direction="column" alignItems="flex-start">
                <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} onChange={()=>handleDateChange()}/>

            </Stack>
        </div>
    )
}

export default daterangepicker
