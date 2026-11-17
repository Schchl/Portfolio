import { useEffect, useState } from 'react';
import { PageHead, Ring } from '../components/Scribble';

const VIDEOS = [
  'https://youtu.be/X5hrUGFhsXo?si=rSfjhMaBopDSBmtC',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
];

function Tools({ items, tone }) {
  return (
    <ul className="tools">
      {items.map((c, i) => (
        <li className="tool" key={c.nom}>
          <div className="ring-wrap">
            <Ring index={i} tone={tone} />
            <img src={`/Portfolio${c.image}`} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
          </div>
          <b>{c.nom}</b>
          <span>{c.categorie}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Competences() {
  const [data, setData] = useState({ creationNumerique: [], developpementWeb: [], langues: [] });

  useEffect(() => {
    fetch('/Portfolio/competence.json')
      .then((r) => { if (!r.ok) throw new Error('Chargement impossible'); return r.json(); })
      .then((j) => setData(j.competences))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="page wrap">
      <PageHead title="Compétences" lead="Les outils que j’utilise pour dessiner, monter, animer et coder." variant={0} />

      <section className="group">
        <h2>Création numérique</h2>
        <Tools items={data.creationNumerique} tone="orange" />
      </section>

      <section className="group">
        <h2>Développement web</h2>
        <Tools items={data.developpementWeb} tone="cobalt" />
      </section>

      <section className="group">
        <h2>Langues</h2>
        <div className="langs">
          {data.langues.map((l, i) => (
            <button key={l.nom} className="lang" onClick={() => window.open(VIDEOS[i] || VIDEOS[0], '_blank', 'noopener')}>
              <img src={`/Portfolio${l.image}`} alt="" />
              <div>
                <b>{l.nom}</b>
                <span>{l.niveau}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
