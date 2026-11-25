import { useEffect, useMemo, useState } from 'react';
import { PageHead, Squiggle } from '../components/Scribble';

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

// Valeur de tri : la date la plus récente citée dans le texte (année + mois quand il existe).
function sortKey(date) {
  let best = 0;
  const re = new RegExp(`(?:(${MONTHS.join('|')})\\s+)?(20\\d{2})`, 'gi');
  let m;
  while ((m = re.exec(date))) {
    const year = Number(m[2]);
    const month = m[1] ? MONTHS.indexOf(m[1].toLowerCase()) + 1 : date.includes('-') ? 7 : 9;
    best = Math.max(best, year * 100 + month);
  }
  return best;
}

// Courbe qui relie un point au suivant : elle part et arrive à la même abscisse, donc les segments se raccordent.
function Segment() {
  return (
    <svg className="seg" viewBox="0 0 76 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M38 14 C8 34 68 66 38 114" />
    </svg>
  );
}

const FILTERS = [
  { key: 'all', label: 'Tout' },
  { key: 'experiences', label: 'Expériences', glyph: 'sq' },
  { key: 'parcours', label: 'Formation', glyph: 'ci' },
];

export default function Experiences() {
  const [data, setData] = useState({ experiences: [], parcours: [] });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/Portfolio/experience.json')
      .then((r) => { if (!r.ok) throw new Error('Chargement impossible'); return r.json(); })
      .then(setData)
      .catch((e) => console.error(e));
  }, []);

  const items = useMemo(() => {
    const all = [
      ...data.experiences.map((i) => ({ ...i, category: 'experiences' })),
      ...data.parcours.map((i) => ({ ...i, category: 'parcours' })),
    ].filter((i) => filter === 'all' || i.category === filter);
    return all.sort((a, b) => sortKey(b.date) - sortKey(a.date));
  }, [data, filter]);

  return (
    <div className="page wrap">
      <PageHead title="Parcours" lead="Stages, jobs d’été et études, du plus récent au plus ancien." variant={3} />

      <div className="exp-layout">
        <div className="filters" role="group" aria-label="Filtrer le parcours">
          {FILTERS.map((f) => (
            <button key={f.key} className="tab" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.glyph && <span className={`glyph ${f.glyph}`} />}
              {f.label}
              {filter === f.key && <Squiggle />}
            </button>
          ))}
        </div>

        <ol className="path">
          {items.map((item) => {
            const now = item.icon?.includes('g_star');
            const sq = item.category === 'experiences';
            return (
              <li className="stop" key={item.category + item.date + item.label}>
                <div className="rail">
                  <Segment />
                  <span className={`node ${sq ? 'sq' : 'ci'}${now ? ' now' : ''}`} />
                </div>
                <div className="stop-body">
                  <div className="when">
                    {item.date.split('\n').map((l) => <div key={l}>{l}</div>)}
                  </div>
                  {now && <span className="now-tag">En cours</span>}
                  <div className="what">
                    <span className="sr">{sq ? 'Expérience : ' : 'Formation : '}</span>
                    {item.label.split('\n').map((l) => <div key={l}>{l}</div>)}
                  </div>
                  {item.liens?.length > 0 && (
                    <div className="ext-links">
                      {item.liens.map((l) => (
                        <a key={l.url} className="ext" href={l.url} target="_blank" rel="noopener noreferrer">
                          {l.texte}
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 11l6-6M6 5h5v5" /></svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
