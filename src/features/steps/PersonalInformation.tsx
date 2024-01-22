/* eslint-disable react-refresh/only-export-components */
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';
import { PhoneInput } from '../shared/PhoneInput';
import { IFormData } from '../../types/IFormData';
import Autocomplete from "@mui/material/Autocomplete";

export interface IPersonalInformationData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    languageKnown: Array<string>;
}

interface PersonalInformationProps {
    data: IPersonalInformationData;
    onChange: (stepData: IFormData) => void;
}

export interface PersonalInformationMethods {
    validatePersonalInfo: () => boolean;
}

/**
 * This component renders the User personal information step in the form.
 */
const PersonalInformation = React.forwardRef(function PersonalInformation(
    { data, onChange }: PersonalInformationProps,
    ref: React.Ref<PersonalInformationMethods>,
) {
    const [personalInfoErrors, setPersonalInfoErrors] = React.useState<IPersonalInformationData>({} as IPersonalInformationData);
    const [showLanguageError, setShowLanguageError] = React.useState(false);

    /**
     * Below method checks the validation of the user entered details and bases on the non available date the error messages will updated in the UI.
     */
    const validatePersonalInfo = React.useCallback(() => {
        const errors: IPersonalInformationData = {} as IPersonalInformationData;
        if (!data.firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!data.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!data.email.trim() || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) {
            errors.email = 'Email is required';
        }

        if ((data.phoneNumber.length < 4)) {
            errors.phoneNumber = 'Phone number is required';
        }

        if (data.languageKnown.length === 0) {
            setShowLanguageError(true);
        }

        setPersonalInfoErrors(errors);

        return Object.keys(errors).length === 0;
    }, [data]);


    React.useImperativeHandle(ref, () => ({
        validatePersonalInfo
    }));

    /**
     * Updates the user form entered data.
     * @param e - Change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        onChange({ personalInformation: { ...data, [name]: value } } as IFormData);
    };

    /**
 * Updates the phone input entered data.
 * @param e - Change event
 */
    const handlePhoneValueChange = React.useCallback((e: string) => {
        onChange({ personalInformation: { ...data, phoneNumber: e } } as IFormData);
    }, [data, onChange]);

    /**
 * Updates the language  entered data.
 * @param e - Change event
 * @param value - Changed value
 */
    const handleLanguageChange = React.useCallback((e: unknown,
        value: Array<string>) => {

        onChange({ personalInformation: { ...data, languageKnown: value } } as IFormData);
    }, [data, onChange]);

    return (
        <Stack spacing={3} sx={{ width: 500, minHeight: 400 }}>
            <TextField label="First Name" variant="standard" onChange={handleChange} value={data.firstName} name='firstName' sx={{
                margin: 1
            }}
                error={Boolean(personalInfoErrors.firstName)}
                helperText={personalInfoErrors.firstName} />
            <TextField label="Last Name" variant="standard" name='lastName' onChange={handleChange} value={data.lastName} sx={{
                margin: 1
            }}
                error={Boolean(personalInfoErrors.lastName)}
                helperText={personalInfoErrors.lastName} />
            <TextField label="Email" variant="standard" name='email' onChange={handleChange} type='email' value={data.email} sx={{
                margin: 1
            }}
                error={Boolean(personalInfoErrors.email)}
                helperText={personalInfoErrors.email} />
            <PhoneInput name='phoneNumber' onChange={handlePhoneValueChange} value={data.phoneNumber} sx={{
                margin: 1
            }}
                error={Boolean(personalInfoErrors.phoneNumber)}
                helperText={personalInfoErrors.phoneNumber}
            />
            <Autocomplete
                multiple
                options={['English', 'Telugu', 'Hindi', 'Arabic', 'Others']}
                getOptionLabel={(option) => option}
                onChange={handleLanguageChange}
                value={data.languageKnown}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Languages Known"
                        error={showLanguageError}
                        helperText={showLanguageError ? 'Languages are required' : ''}
                        name='languageKnown'
                        value={data.languageKnown}
                    />
                )}
            />
        </Stack>
    );
});

export default React.memo(PersonalInformation);
