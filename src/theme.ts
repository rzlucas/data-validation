
import { createTheme, Theme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';


export const lightTheme: Theme = createTheme({
    palette: {
    mode: 'light',
    
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
        main: blue[500],
        },
        tonalOffset: {
            light: 0.1,
            dark: 0.5,
        },
    },
});
