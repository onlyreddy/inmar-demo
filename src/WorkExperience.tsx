import TextField from '@mui/material/TextField';
import React from 'react';
import MUIDatePicker from './DatePicker';
import { IFormData } from './types/IFormData';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

export interface IWorkExperienceData {
  companyName: string;
  startDate: string;
  endDate: string;
  roles: string;
}
export interface IWorkExperienceProps {
  data: IWorkExperienceData;
  onChange: (stepData: IFormData) => void;
}

export interface WorkExperienceMethods {
  validateWorkExperienceInfo: () => boolean;
}

const WorkExperience = React.forwardRef(function WorkExperience(
  { data, onChange }: IWorkExperienceProps,
  ref: React.Ref<WorkExperienceMethods>,
) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ workExperience: { ...data, [name]: value } } as IFormData);
  };

  const [workExperienceErrors, setWorkExperienceErrors] = React.useState<IWorkExperienceData>({} as IWorkExperienceData);

  const validateWorkExperienceInfo = React.useCallback(() => {
    const errors: IWorkExperienceData = {} as IWorkExperienceData;
    if (!data.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }

    if (isEmpty(data.endDate)) {
      errors.endDate = 'End date is required';
    }

    if (isEmpty(data.startDate)) {
      errors.startDate = 'Start date is required';
    }

    if (!data.roles.trim()) {
      errors.roles = 'Role is required';
    }

    setWorkExperienceErrors(errors);

    return Object.keys(errors).length === 0;
  }, [data]);

  React.useImperativeHandle(ref, () => ({
    validateWorkExperienceInfo
  }));

  const handleDateChange = React.useCallback((e: unknown, name: string) => {
    console.log("", e)
    onChange({ workExperience: { ...data, [name]: dayjs(e).format('YYYY-MM-DD') } } as unknown as IFormData);
  }, [data, onChange]);

  return (
    <Stack spacing={3} sx={{ width: 500, minHeight: 400 }}>
      <TextField label="Company Name" variant="standard" onChange={handleChange} value={data.companyName} name='companyName' sx={{
        margin: 1
      }}
        error={Boolean(workExperienceErrors.companyName)}
        helperText={workExperienceErrors.companyName} />
      <MUIDatePicker label="Start Date" name='startDate' onChange={(v) => handleDateChange(v, 'startDate')} value={data.startDate} sx={{
        margin: 1
      }} />
      {Boolean(workExperienceErrors.startDate) && <FormHelperText sx={{ color: '#d32f2f' }}>{workExperienceErrors.startDate}</FormHelperText>}
      <MUIDatePicker label="End Date" name='endDate' onChange={(v) => handleDateChange(v, 'endDate')} value={data.endDate} sx={{
        margin: 1
      }} />
      {Boolean(workExperienceErrors.endDate) && <FormHelperText sx={{ color: '#d32f2f' }}>{workExperienceErrors.endDate}</FormHelperText>}
      <TextField label="Roles" variant="standard" name='roles' onChange={handleChange} value={data.roles} sx={{
        margin: 1
      }}
        error={Boolean(workExperienceErrors.roles)}
        helperText={workExperienceErrors.roles} />
    </Stack>
  );
});

export default WorkExperience;

