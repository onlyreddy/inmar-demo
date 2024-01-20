import { Typography } from '@mui/material';
import SimpleProperty from './SimpleProperty';
import { IFormData } from './types/IFormData';

export interface IPreviewProps {
    data: Array<IFormData>;
}

function toTitleCase(str: string) {
    if (str === '' || str.length === 0) return undefined;

    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str: string) {
        return str.toUpperCase();
    });
}

export default function Preview({ data }: IPreviewProps) {
    const headers = Object.keys(data);
    console.log(data)

    return (
        <>
            {headers.map((header: string, index: number) => {
                const userData = (data[header]);
                const values: Array<string> = Object.keys(userData);
                return (
                    <>
                        <Typography key={index} variant='h5'>{toTitleCase(header)}:</Typography>
                        {values.map((item, key) => {
                            console.log(userData[item])
                            const keyValue: string = userData[item];
                            const title: string = String(toTitleCase(item));

                            return (
                                <SimpleProperty key={key} value={keyValue} name={title} />
                            )
                        })}
                    </>
                )
            })}
        </>
    )
}
