'use client';
import React, { useEffect, useState } from 'react';
import { DatePicker, Stack } from 'rsuite';

const daterangepicker = () => {

  const [selectedDates, setSelectedDates] = useState([]);

   const handleDateChange = (value) => {
     const formattedDate = value.toLocaleDateString('en-CA')
     setSelectedDates(formattedDate); 
  };

  useEffect(() => {
    console.log(selectedDates); 
  }, [selectedDates]);

    return (
        <div>
            <Stack spacing={10} direction="column" alignItems="flex-start">
                <DatePicker format="MMMM dd, yyyy" onChange={(value)=>handleDateChange(value)}/>
            </Stack>
        </div>
    )
}

export default daterangepicker
