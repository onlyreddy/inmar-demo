import { Button, Step, StepButton, Stepper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { tss } from "tss-react/mui";
import EducationInformation, { EducationInformationMethods } from './EducationInformation';
import PersonalInformation, { PersonalInformationMethods } from './PersonalInformation';
import Skills, { SkillsMethods } from './Skills';
import WorkExperience, { WorkExperienceMethods } from './WorkExperience';
import { IFormData } from './types/IFormData';
import Preview from './Preview';

const steps = ['Personal Information', 'Education', 'Work Experience', 'Skills', 'Preview'];

const useStyles = tss
    .create(({ theme }) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            height: '100%',
            padding: 16,
            overflow: 'auto'
        },
        actions: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        content: {
            minHeight: 400,
            height: 400
        },
        next: {
            position: 'fixed',
            right: 16
        },
        finish: {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
        }
    }));

const MultiStepForm: React.FC = () => {
    const { classes } = useStyles({});
    const [formData, setFormData] = React.useState<IFormData>({
        personalInformation: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            languageKnown: [],
        },
        workExperience: {
            companyName: '',
            startDate: '',
            endDate: '',
            roles: ''
        },
        education: {
            institutionName: '',
            typeOfInstitution: '',
            degree: '',
            date: ''
        },
        skills: {
            skills: '',
            skillLevel: ''
        },
    });

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const personalInfoRef = React.useRef<PersonalInformationMethods>(null);
    const educationInfoRef = React.useRef<EducationInformationMethods>(null);
    const workExperienceRef = React.useRef<WorkExperienceMethods>(null);
    const skillsRef = React.useRef<SkillsMethods>(null);

    const isStepOptional = React.useCallback((step: number) => {
        return step === 1;
    }, []);

    const isStepSkipped = React.useCallback((step: number) => {
        return skipped.has(step);
    }, [skipped]);

    const handleNext = React.useCallback(() => {
        let newSkipped = skipped;

        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        if (
            activeStep === 4 || (personalInfoRef.current?.validatePersonalInfo()
                || workExperienceRef.current?.validateWorkExperienceInfo() || educationInfoRef.current?.validateEducationInfo() || skillsRef.current?.validateSkills())
        ) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    }, [activeStep, isStepSkipped, skipped]);

    const handleBack = React.useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }, []);

    const handleSkip = React.useCallback(() => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    }, [activeStep, isStepOptional]);

    const handleReset = React.useCallback(() => {
        setActiveStep(0);
    }, []);

    const handleFormDataChange = React.useCallback((stepData: IFormData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...stepData,
        }));
    }, []);

    const handleStep = React.useCallback((step: number) => () => {
        setActiveStep(step);
    }, []);
    console.log(activeStep)
    return (
        <Box className={classes.root}>
            {(activeStep !== 5) && (
                <>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};

                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepButton color="inherit" onClick={handleStep(index)} {...labelProps}>{label}</StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>) : <div>
                        {activeStep === 0 && <PersonalInformation
                            data={formData.personalInformation}
                            onChange={handleFormDataChange}
                            ref={personalInfoRef}
                        />}
                        {activeStep === 1 && <EducationInformation data={formData.education} onChange={handleFormDataChange}
                            ref={educationInfoRef} />}
                        {activeStep === 2 && <WorkExperience
                            data={formData.workExperience}
                            onChange={handleFormDataChange}
                            ref={workExperienceRef} />}
                        {activeStep === 3 && <Skills data={formData.skills} onChange={handleFormDataChange} ref={skillsRef} />}
                        {activeStep === 4 && <Preview data={formData as unknown as Array<IFormData>} />}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }} variant='outlined'>
                                    Skip
                                </Button>
                            )}
                            <Button onClick={handleNext} variant='contained'>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </div>
                    }
                </>
            )}
            <>
                {activeStep === 5 && (
                    <div className={classes.finish}>
                        <Typography variant='h4'>Thanks for the  application submission.</Typography>
                        <Typography variant="body2" color="GrayText" sx={{ m: 2 }}>Our team will get back to you shortly.</Typography>
                    </div>
                )}
            </>
        </Box>
    );
};

export default React.memo(MultiStepForm);
