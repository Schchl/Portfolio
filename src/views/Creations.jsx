import { useEffect, useRef, useState } from 'react';
import { PageHead, Squiggle } from '../components/Scribble';

const IMG = /\.(jpe?g|png|gif|webp)$/i;

function linkLabel(url) {
  if (url.includes('github.com')) return 'Voir le code sur GitHub';
  if (url.includes('figma.com')) return 'Voir la maquette Figma';
  if (url.includes('codesandbox')) return 'Lancer le jeu';
  return 'Voir le site web';
}

function Gallery({ images }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);

  const go = (dir) => {
    const el = track.current;
    el.scrollTo({ left: el.clientWidth * (index + dir), behavior: 'smooth' });
  };

  return (
    <div className="gal">
      <div className="gal-track" ref={track} onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
        {images.map((src, i) => <img key={src} src={`/Portfolio${src}`} alt={`Image ${i + 1} sur ${images.length}`} />)}
      </div>
      {images.length > 1 && (
        <div className="gal-nav">
          <span>{index + 1} / {images.length}</span>
          <div>
            <button onClick={() => go(-1)} disabled={index === 0} aria-label="Image précédente">←</button>
            <button onClick={() => go(1)} disabled={index === images.length - 1} aria-label="Image suivante">→</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({ item, onClose }) {
  const images = (item.gallery || []).filter((g) => IMG.test(g));
  const others = (item.gallery || []).filter((g) => !IMG.test(g));

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('lock');
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('lock'); };
  }, [onClose]);

  return (
    <div className="veil" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Fermer" autoFocus>×</button>
        <h2 id="modal-title" className="display">{item.title}</h2>
        {item.logiciel?.length > 0 && (
          <div className="soft">{item.logiciel.map((l) => <img key={l} src={`/Portfolio${l}`} alt="" />)}</div>
        )}
        <p className="desc">{item.description}</p>

        <div className="links">
          {item.link && <a className="btn btn-fill" href={item.link} target="_blank" rel="noopener noreferrer">{linkLabel(item.link)}</a>}
          {item.iframe && <a className="btn btn-fill" href={`/Portfolio${item.iframe}`} target="_blank" rel="noopener noreferrer">Ouvrir le PDF</a>}
        </div>

        {images.length > 0 && <Gallery images={images} />}
        {others.map((src) =>
          src.includes('drive.google.com')
            ? <iframe key={src} className="embed" src={src.replace('/view', '/preview')} allow="autoplay" title={item.title} />
            : <video key={src} className="embed" src={src} controls />
        )}
      </div>
    </div>
  );
}

export default function Creations() {
  const [creations, setCreations] = useState([]);
  const [cat, setCat] = useState('Tout');
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch('/Portfolio/mes_creations.json')
      .then((r) => r.json())
      .then(setCreations)
      .catch((e) => console.error(e));
  }, []);

  const categories = ['Tout', ...new Set(creations.flatMap((c) => c.categories))];
  const shown = cat === 'Tout' ? creations : creations.filter((c) => c.categories.includes(cat));

  return (
    <div className="page wrap">
      <PageHead title="Créations" lead="Projets d’école et projets personnels. Clique sur l’un d’eux pour le voir en détail." variant={4} />

      <div className="tabs" role="group" aria-label="Filtrer par catégorie">
        {categories.map((c) => (
          <button key={c} className="tab" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
            {cat === c && <Squiggle />}
          </button>
        ))}
      </div>

      <ul className="works">
        {shown.map((c) => (
          <li key={c.modal_id}>
            <button className="work" onClick={() => setActive(c)}>
              <span className="frame">
                <img className="cover" src={`/Portfolio${c.cover}`} alt="" loading="lazy" />
                <i className="crop a" /><i className="crop b" /><i className="crop c" /><i className="crop d" />
              </span>
              <span className="meta">
                <span>
                  <b>{c.title}</b>
                  <small>{c.categories.join(', ')}</small>
                </span>
                {c.logiciel?.length > 0 && (
                  <span className="soft">{c.logiciel.map((l) => <img key={l} src={`/Portfolio${l}`} alt="" />)}</span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && <Modal item={active} onClose={() => setActive(null)} />}
    </div>
  );
}
