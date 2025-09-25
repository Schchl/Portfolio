import { StrictMode, useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LightPalette, DarkPalette } from './components/Theme';
import App from './App.jsx';

function Main() {
  // Détection du thème système
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const [themeMode, setThemeMode] = useState('light');

  const theme = useMemo(() => (
    themeMode === 'dark' ? DarkPalette : LightPalette
  ), [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
        <App theme={themeMode} toggleTheme={toggleTheme} />
      </React.StrictMode>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
