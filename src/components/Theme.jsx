import { createTheme } from "@mui/material/styles";

// Tokens partagés : cadrage — viseur, live, création multi-format
const typography = {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.01em' },
    h2: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    button: { fontFamily: "'JetBrains Mono', monospace", textTransform: 'none', fontWeight: 500 },
};

// Thème clair — blanc cassé, corail en accent
export const LightPalette = createTheme({
    typography,
    palette: {
        mode: 'light',
        primary: {
            main: '#e8264a',
            hover: '#c81f3d',
        },
        background: {
            default: '#f6f5f3',
            paper: '#ffffff',
            presentation: 'linear-gradient(to top right, #f6f5f3 30%, #2dd4c6 130%)'
        },
        text: {
            primary: '#171820',
            secondary: '#c81f3d'
        },
        niveau: {
            avance: {
                main: '#fff0f2',
                background: '#c81f3d'
            },
            intermediaire: {
                main: '#effcfa',
                background: '#1aa89c'
            },
            debutant: {
                main: '#3a3f45',
                background: '#e3e1db'
            },
            langue: {
                background: '#e6faf7',
                main: '#0e8a7d'
            }
        }
    },
});

// Thème sombre — encre, corail + cyan en accents
export const DarkPalette = createTheme({
    typography,
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff3d5a',
            hover: '#ff6178',
        },
        background: {
            default: '#12131a',
            paper: '#1b1d26',
            presentation: 'linear-gradient(to top right, #12131a 35%, #2dd4c6 99%)'
        },
        text: {
            primary: '#f6f5f3',
            secondary: '#2dd4c6'
        },
        niveau: {
            avance: {
                main: '#ffe4e9',
                background: '#c81f3d'
            },
            intermediaire: {
                main: '#e6faf7',
                background: '#1aa89c'
            },
            debutant: {
                main: '#d8dbe0',
                background: '#3a3f45'
            },
            langue: {
                background: '#123634',
                main: '#2dd4c6'
            }
        }
    },
});