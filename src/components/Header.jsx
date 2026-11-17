import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Squiggle } from './Scribble';

const LINKS = [
  { to: '/', label: 'Présentation' },
  { to: '/comp', label: 'Compétences' },
  { to: '/exp', label: 'Expériences' },
  { to: '/crea', label: 'Créations' },
  { to: '/contact', label: 'Contact' },
];

export default function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('lock', open);
    return () => document.body.classList.remove('lock');
  }, [open]);

  const next = theme === 'dark' ? 'clair' : 'sombre';

  return (
    <header className="hdr">
      <NavLink to="/" className="brand" aria-label="Accueil" onClick={() => setOpen(false)}>
        <img src="/Portfolio/images/logo.svg" alt="" />
      </NavLink>

      <nav className="nav" aria-label="Navigation principale">
        {LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {({ isActive }) => (<>{label}{isActive && <Squiggle />}</>)}
          </NavLink>
        ))}
      </nav>

      <button className="icon-btn" onClick={toggleTheme} aria-label={`Passer en mode ${next}`} title={`Mode ${next}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
        </svg>
      </button>

      <button className="icon-btn burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>

      {open && (
        <nav className="sheet" aria-label="Menu">
          {LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
