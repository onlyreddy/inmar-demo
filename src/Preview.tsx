/* eslint-disable react-refresh/only-export-components */
import { Typography } from '@mui/material';
import React from 'react';
import SimpleProperty from './SimpleProperty';
import { IFormData } from './types/IFormData';
import { tss } from "tss-react/mui";

export interface IPreviewProps {
    data: Array<IFormData>;
}

const useStyles = tss
    .create(({ theme }) => ({
        root: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            color: theme.palette.primary.main
        },
    }));

/**
 * This component renders the user details as a preview. 
 */
const Preview = ({ data }: IPreviewProps) => {
    const { classes } = useStyles({});

    const headers: Array<string> = Object.keys(data);

    /**
     * Converts the keyValues to Title case.
     * @param str - Key value
     */
    const toTitleCase = React.useCallback((str: string) => {
        if (str === '' || str.length === 0) return undefined;

        return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str: string) {
            return str.toUpperCase();
        });
    }, []);

    return (
        <>
            {headers.map((header: string, index: number) => {
                const userData = (data[header]);
                const values: Array<string> = Object.keys(userData);

                return (
                    <>
                        <Typography className={classes.root} key={index} variant='h5'>{toTitleCase(header)}:</Typography>
                        {values.map((item, key) => {
                            const keyValue: string = userData[item];
                            const title: string = String(toTitleCase(item));

                            return (
                                (title && typeof keyValue !== 'object') && (<SimpleProperty key={key} name={title} value={keyValue} />)
                            )
                        })}
                    </>
                )
            })}
        </>
    )
}

export default React.memo(Preview)