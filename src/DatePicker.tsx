/* eslint-disable react-refresh/only-export-components */
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

interface MUIDatePickerProps<TDate> extends DatePickerProps<TDate> { }

/**
 * This component is a wrapper on top of the MUI DatePicker component. 
 */
const MUIDatePicker = (props: MUIDatePickerProps<unknown>) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker slotProps={{ textField: { variant: 'standard', } }}
                {...props}
            />
        </LocalizationProvider>
    )
}

export default React.memo(MUIDatePicker);