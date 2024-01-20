import { Stack } from '@mui/material';
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

const Skills = React.forwardRef(function Skills(
  { data, onChange }: ISkillsProps,
  ref: React.Ref<SkillsMethods>,
) {
  const [skillErrors, setSkillsErrors] = React.useState<ISkillsData>({} as ISkillsData);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onChange({ skills: { ...data, [name]: value } } as IFormData);
  };

  return (
    <Stack spacing={3} sx={{ width: 500, minHeight: 400 }}>
      <TextField label="Skills" variant="standard" onChange={handleChange} value={data.skills} name='skills' sx={{
        margin: 1
      }}
        error={Boolean(skillErrors.skills)}
        helperText={skillErrors.skills} />
      <TextField label="Skill Level" variant="standard" name='skillLevel' onChange={handleChange} value={data.skillLevel} sx={{
        margin: 1
      }}
        error={Boolean(skillErrors.skillLevel)}
        helperText={skillErrors.skillLevel} />
    </Stack>
  );
});

export default Skills;

