/* eslint-disable react-refresh/only-export-components */
import { Button, FormHelperText, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';
import { IFormData } from './types/IFormData';

export interface ISkillsData {
  skills: string;
  skillLevel: string;
}
interface ISkillsProps {
  data: ISkillsData;
  onChange: (stepData: IFormData) => void;
}

export interface SkillsMethods {
  validateSkills: () => boolean;
}

/**
 * This component renders the complete skills of the user.
 */
const Skills = React.forwardRef(function Skills(
  { data, onChange }: ISkillsProps,
  ref: React.Ref<SkillsMethods>,
) {
  const [skillErrors, setSkillsErrors] = React.useState<ISkillsData>({} as ISkillsData);

  /**
 * Below method checks the validation of the user entered details and bases on the non available date the error messages will updated in the UI.
 */
  const validateSkills = React.useCallback(() => {
    const errors: ISkillsData = {} as ISkillsData;
    if (!data.skills.trim()) {
      errors.skills = 'Skills are required';
    }

    if (!data.skillLevel.trim()) {
      errors.skillLevel = 'Skill level is required';
    }

    setSkillsErrors(errors);

    return Object.keys(errors).length === 0;
  }, [data]);


  React.useImperativeHandle(ref, () => ({
    validateSkills
  }));

  /**
 * Updates the user form entered data.
 * @param e - Change event
 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onChange({ skills: { ...data, [name]: value } } as IFormData);
  };

  /**
 * Updates the selection of the degree from the selection.
 * @param e - Selection Event
 */
  const handleSkillChange = React.useCallback((e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    onChange({ skills: { ...data, [name]: value } } as IFormData);
  }, [data, onChange]);

  return (
    <Stack spacing={3} sx={{ width: 500, minHeight: 400 }}>
      <TextField label="Skills" variant="standard" onChange={handleChange} value={data.skills} name='skills' sx={{
        margin: 1
      }}
        error={Boolean(skillErrors.skills)}
        helperText={skillErrors.skills} />
      <Select
        name='skillLevel'
        onChange={handleSkillChange}
        value={data.skillLevel}
        displayEmpty
        variant='standard'
        error={Boolean(skillErrors.skillLevel)}
        label="Skill Level"
      >
        <MenuItem value="">
          <em>Skill Level</em>
        </MenuItem>
        <MenuItem value={'Initial'}>Initial</MenuItem>
        <MenuItem value={'Medium'}>Medium</MenuItem>
        <MenuItem value={'Professional'}>Professional</MenuItem>
        <MenuItem value={'Expert'}>Expert</MenuItem>
      </Select>
      {Boolean(skillErrors.skillLevel) && <FormHelperText sx={{ color: '#d32f2f' }}>{skillErrors.skillLevel}</FormHelperText>}
      <Button sx={{ width: 'fit-content' }} variant='contained'>Add More</Button>
    </Stack>
  );
});

export default React.memo(Skills);

