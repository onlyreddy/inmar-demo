import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Theme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { tss } from 'tss-react/mui';
import { darkTheme, lightTheme } from './themes';
import IconButton from '@mui/material/IconButton';
import { GlobalStyles } from "tss-react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

interface IThemeProviderWrapperProps {
    children: React.ReactNode;
}

const useStyles = tss
    .create(({ theme }) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Roboto, sans-serif',
            position: 'relative',
            height: '100%',
        },
        iconButton: {
            position: 'fixed',
            top: theme.spacing(2),
            right: theme.spacing(2)
        },
    }));

/**
 * This component handles the complete theme switching of the user. 
 */
const ThemeProviderWrapper = ({ children }: IThemeProviderWrapperProps) => {
    const { classes } = useStyles();

    const [selectedTheme, setSelectedTheme] = useState<Theme>(lightTheme);

    /**
     * toggles the theme based on user theme switching.
     */
    const toggleTheme = React.useCallback(() => {
        const theme: Theme = selectedTheme === lightTheme ? darkTheme : lightTheme;

        localStorage.setItem('theme', theme === lightTheme ? 'lightTheme' : 'darkTheme');

        setSelectedTheme(theme);
    }, [selectedTheme]);

    /**
     * Returns the theme icon based on the theme.
     */
    const themeIcon = React.useMemo(() =>
        selectedTheme === lightTheme ? <DarkModeIcon /> : <LightModeIcon />
        , [selectedTheme]);

    React.useEffect(() => {
        const theme: string | null = localStorage.getItem('theme');

        setSelectedTheme(theme === 'lightTheme' ? lightTheme : darkTheme);
    }, []);

    return (
        <div className={classes.root}>
            <ThemeProvider theme={selectedTheme}>
                <GlobalStyles
                    styles={{
                        "html,body, #root": {
                            height: '100%',
                            margin: 0
                        },
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Job Application Form
                            </Typography>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                onClick={toggleTheme}
                            >
                                {themeIcon}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
                {children}
            </ThemeProvider>
        </div>
    );
};

export default ThemeProviderWrapper;
