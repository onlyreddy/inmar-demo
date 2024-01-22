/* eslint-disable react-refresh/only-export-components */
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';
import MUIDatePicker from '../shared/DatePicker';
import { IFormData } from '../../types/IFormData';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

export interface IEducationInformationData {
  institutionName: string;
  typeOfInstitution: string;
  degree: string;
  date?: string | null;
  formattedDate: string;
}
export interface EducationInformationMethods {
  validateEducationInfo: () => boolean;
}

export interface IEducationInformationProps {
  data: IEducationInformationData;
  onChange: (stepData: IFormData) => void;
}

/**
 * This component is the 2nd step of the application form. It contains all the details about the user educational information.
 */
const EducationInformation = React.forwardRef(function EducationInformation(
  { data, onChange }: IEducationInformationProps,
  ref: React.Ref<EducationInformationMethods>,
) {
  const [educationInfoErrors, setEducationInfoErrors] = React.useState<IEducationInformationData>({} as IEducationInformationData);

  /**
   * Below method checks the validation of the user entered details and bases on the non available date the error messages will updated in the UI.
   */
  const validateEducationInfo = React.useCallback((): boolean => {
    const errors: IEducationInformationData = {} as IEducationInformationData;

    if (!data.institutionName.trim()) {
      errors.institutionName = 'Institution name is required';
    }

    if (!data.typeOfInstitution.trim()) {
      errors.typeOfInstitution = 'Institution type is required';
    }

    if (!data.degree.trim()) {
      errors.degree = 'Degree is required';
    }

    if (isEmpty(data.date)) {
      errors.date = 'Completion date is required';
    }

    setEducationInfoErrors(errors);

    return Object.keys(errors).length === 0;
  }, [data]);

  React.useImperativeHandle(ref, () => ({
    validateEducationInfo
  }));

  /**
   * Updates the user form entered data.
   * @param e - Change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onChange({ education: { ...data, [name]: value } } as IFormData);
  };

  /**
   * Updates the selection of the degree from the selection.
   * @param e - Selection Event
   */
  const handleDegreeChange = React.useCallback((e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    onChange({ education: { ...data, [name]: value } } as IFormData);
  }, [data, onChange]);

  /**
   * Below method updates the date and it's format to show in the UI.
   * @param e - Date selection event
   */
  const handleDateChange = React.useCallback((e: unknown) => {
    onChange({ education: { ...data, date: e, formattedDate: dayjs(e).format('YYYY-MM-DD') } } as IFormData);
  }, [data, onChange]);

  return (
    <Stack spacing={3} sx={{ width: 500, minHeight: 400 }}>
      <TextField label="Institution Name" variant="standard" name='institutionName' onChange={handleChange} value={data.institutionName} sx={{
        margin: 1
      }}
        error={Boolean(educationInfoErrors.institutionName)}
        helperText={educationInfoErrors.institutionName} />
      <TextField label="Type Of Institution" variant="standard" name='typeOfInstitution' onChange={handleChange} type='email' value={data.typeOfInstitution} sx={{
        margin: 1
      }}
        error={Boolean(educationInfoErrors.typeOfInstitution)}
        helperText={educationInfoErrors.typeOfInstitution} />
      <Select
        name='degree'
        onChange={handleDegreeChange}
        value={data.degree}
        displayEmpty
        variant='standard'
        error={Boolean(educationInfoErrors.degree)}
        label="Degree"
      >
        <MenuItem value="">
          <em>Degree Type</em>
        </MenuItem>
        <MenuItem value={'Under Graduate'}>Under Graduate</MenuItem>
        <MenuItem value={'Post Graduate'}>Post Graduate</MenuItem>
        <MenuItem value={'SSC'}>SSC</MenuItem>
        <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
        <MenuItem value={'PhD'}>PhD</MenuItem>
      </Select>
      {Boolean(educationInfoErrors.degree) && <FormHelperText sx={{ color: '#d32f2f' }}>{educationInfoErrors.degree}</FormHelperText>}
      <MUIDatePicker label="Date of Completion" name='date' onChange={handleDateChange} value={data.date} sx={{
        margin: 1
      }}
      />
      {Boolean(educationInfoErrors.date) && <FormHelperText sx={{ color: '#d32f2f' }}>{educationInfoErrors.date}</FormHelperText>}
      <Button sx={{ width: 'fit-content' }} variant='contained'>Add More</Button>
    </Stack>
  );
});

export default React.memo(EducationInformation);
