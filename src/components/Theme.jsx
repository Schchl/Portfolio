import { createTheme } from "@mui/material/styles";

// Thème clair
export const LightPalette = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3090f7',
            hover: '#208bc5',
        },
        background: {
            default: '#f9fafb',
            presentation: 'linear-gradient(to top right, #ededed 35%, #ED6E00 99%)'
        },
        text: {
            primary: '#111827',
            secondary: '#08a9ff'
        },
        niveau: {
            langue: {
                background: '#ede9fe', 
                main: '#6b21a8'      
            }
        }
    },
});

// Thème sombre
export const DarkPalette = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#a78bfa',
            hover: '#8f6afb',
        },
        background: {
            default: '#1e293b',
            paper: "#181e29",
            presentation: 'linear-gradient(to top right, #1f2527 35%, #ED6E00 99%)'
        },
        text: {
            primary: '#f9fafb',
            secondary: '#dad0f8'
        },
        niveau: {
            avance: {
                main: '#e0e7ff',
                background: '#3730a3'
            },
            intermediaire: {
                main: '#ede9fe',
                background: '#5b21b6'
            },
            debutant: {
                main: '#fce7f3',
                background: '#9d174d'
            },
            langue: {
                background: '#4c1d95', 
                main: '#ddd6fe'
            }
        }
    },
});