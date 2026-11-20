import { useCallback, useEffect, useMemo, useState } from 'react';
import { PageHead, Squiggle } from '../components/Scribble';

const GAMES = [
  {
    name: 'Minecraft', img: 'minecraft.png', photo: true, color: 'var(--cobalt)', shape: 'tilt',
    text: [
      'Je joue à Minecraft depuis 6 ans. Petite, je regardais Frigiel, Siphano, Aypierre… les Fallen Kingdom et les KTP.',
      'Il y a 6 ans j’ai reçu Minecraft Java premium : j’ai commencé à jouer en survie et en UHC.',
    ],
  },
  {
    name: 'Among Us', img: 'amongus.png', photo: true, color: 'var(--orange)', shape: 'round',
    text: [
      'Entre amis, Among Us c’est parfait ! On découvre la façon de penser des autres… ou de les manipuler.',
      'Spécialité : tuer une seule personne en boucle au premier tour. Raison : vote par défaut. 😈',
    ],
  },
  {
    name: 'Valorant', img: 'skye.png', color: 'var(--sun)', shape: 'diamond',
    text: ['Sur Valorant, je main Skye (même si je sais toujours pas flash correctement 🙈). Je soigne l’équipe, je tente d’être stratégique, et surtout… je râle quand je me fais onetap.'],
    strike: ['Je joue pour prouver que les filles savent jouer', ' (Chloé arrête de mentir, t’es encore fer 3 après un an de jeu 💀)'],
  },
];

// Visionneuse : clic sur une photo pour l'agrandir, flèches du clavier pour naviguer.
function Lightbox({ photos, index, onClose, onMove }) {
  const p = photos[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('lock');
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('lock'); };
  }, [onClose, onMove]);

  return (
    <div className="veil" onClick={onClose}>
      <figure className="lightbox" role="dialog" aria-modal="true" aria-label={p.legende} onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Fermer" autoFocus>×</button>
        <img src={`/Portfolio${p.src}`} alt={p.legende} />
        <figcaption>
          <span>{p.legende}</span>
          {photos.length > 1 && (
            <span className="gal-nav">
              <button onClick={() => onMove(-1)} aria-label="Photo précédente">←</button>
              <button onClick={() => onMove(1)} aria-label="Photo suivante">→</button>
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}

function Photos() {
  const [list, setList] = useState([]);
  const [broken, setBroken] = useState(() => new Set());
  const [cat, setCat] = useState('Tout');
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetch('/Portfolio/moi.json')
      .then((r) => { if (!r.ok) throw new Error('moi.json introuvable'); return r.json(); })
      .then((d) => setList(d.photos || []))
      .catch((e) => console.error(e));
  }, []);

  // Une photo dont le fichier n'existe pas est simplement ignorée.
  const ok = useMemo(() => list.filter((p) => !broken.has(p.src)), [list, broken]);
  const cats = useMemo(() => ['Tout', ...new Set(ok.map((p) => p.categorie).filter(Boolean))], [ok]);
  const shown = cat === 'Tout' ? ok : ok.filter((p) => p.categorie === cat);

  const markBroken = (src) => setBroken((s) => new Set(s).add(src));
  const move = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  if (list.length === 0 || ok.length === 0) {
    // On garde les <img> hors écran pour détecter les fichiers manquants sans rien afficher.
    return list.length === 0 ? null : (
      <div hidden>{list.map((p) => <img key={p.src} src={`/Portfolio${p.src}`} alt="" onError={() => markBroken(p.src)} />)}</div>
    );
  }

  return (
    <section className="group">
      <h2>Hors écran</h2>

      {cats.length > 2 && (
        <div className="tabs" role="group" aria-label="Filtrer les photos">
          {cats.map((c) => (
            <button key={c} className="tab" aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}{cat === c && <Squiggle />}
            </button>
          ))}
        </div>
      )}

      <ul className="shots">
        {shown.map((p, i) => (
          <li key={p.src}>
            <button className="shot" onClick={() => setOpen(i)} aria-label={`Agrandir : ${p.legende}`}>
              <span className="shot-frame">
                <img src={`/Portfolio${p.src}`} alt={p.legende} loading="lazy" onError={() => markBroken(p.src)} />
                <i className="crop a" /><i className="crop b" /><i className="crop c" /><i className="crop d" />
              </span>
              <span className="shot-cap">{p.legende}</span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && shown[open] && <Lightbox photos={shown} index={open} onClose={() => setOpen(null)} onMove={move} />}
    </section>
  );
}

export default function Gamepres() {
  return (
    <div className="page wrap">
      <PageHead title="Moi, en vrai" lead="Les jeux, les potes, le cor d’harmonie : ce que je fais quand je ne dessine pas et que je ne code pas." variant={1} />

      <section className="group">
        <h2>Sur l’écran</h2>
        {GAMES.map((g) => (
          <section className="stage" key={g.name}>
            <div className="art" style={{ '--c': g.color }}>
              <span className={`shape ${g.shape}`} />
              <span className={`shape-line ${g.shape}`} />
              <img className={g.photo ? 'photo' : undefined} src={`/Portfolio/game/${g.img}`} alt={g.name} />
            </div>
            <div>
              <h3 className="display">{g.name}</h3>
              {g.text.map((t) => <p key={t}>{t}</p>)}
              {g.strike && <p><s>{g.strike[0]}</s>{g.strike[1]}</p>}
            </div>
          </section>
        ))}
      </section>

      <Photos />
    </div>
  );
}
