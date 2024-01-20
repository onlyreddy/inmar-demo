import { IEducationInformationData } from '../EducationInformation';
import { IPersonalInformationData } from '../PersonalInformation';
import { ISkillsData } from '../Skills';
import { IWorkExperienceData } from '../WorkExperience';

export interface IFormData {
    personalInformation: IPersonalInformationData;
    workExperience: IWorkExperienceData;
    education: IEducationInformationData;
    skills: ISkillsData;
}