/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { tss } from "tss-react/mui";
import type { CSSObject } from 'tss-react';

export interface SimplePropertyProps
    extends React.HTMLAttributes<HTMLDivElement>,
    Record<string, unknown> {
    classes?: Partial<ReturnType<typeof useStyles>['classes']>;
    name?: React.ReactNode;
    value?: React.ReactNode;
}

const useStyles = tss
    .create(({ theme }) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& + &': {
            marginTop: theme.spacing(1.5),
        },
    },
    name: {
        ...(theme.typography.body2 as CSSObject),
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(0.5),
    },
    value: {},
}));

/**
 * This component renders the form user entered data.
 */
const SimpleProperty = React.forwardRef(function SimpleProperty(
    props: SimplePropertyProps,
    ref: React.Ref<HTMLDivElement>,
) {
    const { name, value, ...rest } = props;

    const { classes } = useStyles(props);

    return (
        <div className={classes.root} ref={ref} {...rest}>
            <div className={classes.name}>{name}</div>
            <div className={classes.value}>{value}</div>
        </div>
    );
});

export default React.memo(SimpleProperty);
