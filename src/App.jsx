import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import BinaryRoute from './components/BinaryRoute';
import Header from './components/Header';
import Presentation from './views/Presentation';
import Competences from './views/Competences';
import Experiences from './views/Experiences';
import Creations from './views/Creations';
import Contact from './views/Contact';
import Gamepres from './views/Gamepres';
import NotFound from './views/NotFound';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'light'; } catch { return 'light'; }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* stockage indisponible */ }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <Router>
      <ScrollTop />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/comp" element={<Competences />} />
          <Route path="/exp" element={<Experiences />} />
          <Route path="/crea" element={<Creations />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="/transition-to-game" element={<BinaryRoute />} />
          <Route path="/game" element={<Gamepres />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}
