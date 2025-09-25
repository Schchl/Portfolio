import { HashRouter as Router, Routes, Route }from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LightPalette, DarkPalette } from './components/Theme';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import BinaryRoute from "./components/BinaryRoute";
import Header from './components/Header';
import Presentation from './views/Presentation';
import Competences from './views/Competences';
import Experiences from './views/Experiences';
import Creations from './views/Creations';
import Contact from './views/Contact';
import Gamepres from './views/Gamepres';
import NotFound from './views/NotFound';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Synchroniser la classe HTML pour Tailwind (facultatif si tu utilises aussi Tailwind)
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Choisir le thème MUI dynamiquement
  const muiTheme = useMemo(() => {
    return theme === 'dark' ? DarkPalette : LightPalette;
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Presentation theme={theme} />} />
          <Route path="/comp" element={<Competences theme={theme} />} />
          <Route path="/exp" element={<Experiences theme={theme} />} />
          <Route path="/crea" element={<Creations theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="/transition-to-game" element={<BinaryRoute to="/game" theme={theme} />} />
          <Route path="/game" element={<Gamepres theme={theme} />} />
          <Route path="*" element={<NotFound theme={theme} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
