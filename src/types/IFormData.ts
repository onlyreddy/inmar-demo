import { IEducationInformationData } from '../features/steps/EducationInformation';
import { IPersonalInformationData } from '../features/steps/PersonalInformation';
import { ISkillsData } from '../features/steps/Skills';
import { IWorkExperienceData } from '../features/steps/WorkExperience';

export interface IFormData {
    personalInformation: IPersonalInformationData;
    workExperience: IWorkExperienceData;
    education: IEducationInformationData;
    skills: ISkillsData;
}