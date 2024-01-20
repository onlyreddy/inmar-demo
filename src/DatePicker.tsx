import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface MUIDatePickerProps<TDate> extends DatePickerProps<TDate> { }

const MUIDatePicker = (props: MUIDatePickerProps<unknown>) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker slotProps={{ textField: { variant: 'standard', } }}
                {...props}
            />
        </LocalizationProvider>
    )
}

export default MUIDatePicker;