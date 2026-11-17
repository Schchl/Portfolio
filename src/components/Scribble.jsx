// Petits traits dessinés réutilisables : soulignement, anneaux, courbes de Bézier.

export function Squiggle() {
  return (
    <svg className="squig" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength="1" d="M2 6 C12 1 18 11 28 6 S46 1 56 6 S74 11 84 6 S94 3 98 5" />
    </svg>
  );
}

const RINGS = [
  'M62 8 C93 6 114 30 112 62 C110 94 86 114 56 112 C26 110 6 88 9 56 C12 26 36 11 70 12',
  'M20 30 C40 6 88 2 108 36 C126 68 100 112 60 114 C22 116 -2 74 18 40 C28 22 50 12 74 10',
  'M56 6 C90 2 116 34 112 66 C108 100 70 120 40 106 C8 92 2 52 22 30 C36 14 62 8 84 14',
];

export function Ring({ index = 0, tone = 'orange' }) {
  return (
    <svg className={`ring ${tone}`} viewBox="-6 -6 132 132" aria-hidden="true" style={{ transform: `rotate(${index * 37}deg)` }}>
      <path d={RINGS[index % 3]} />
    </svg>
  );
}

// Chaque page a sa courbe, avec ses points d'ancrage et ses poignées, comme dans l'outil plume.
const CURVES = [
  { d: 'M10 140 C90 140 90 20 150 80 S220 150 290 20', a: [[10, 140], [150, 80], [290, 20]], h: [[10, 140, 90, 140], [150, 80, 90, 20], [150, 80, 210, 140], [290, 20, 220, 150]] },
  { d: 'M10 140 C40 20 260 20 290 140', a: [[10, 140], [290, 140]], h: [[10, 140, 40, 20], [290, 140, 260, 20]] },
  { d: 'M20 120 C120 140 200 40 150 40 C100 40 120 130 280 60', a: [[20, 120], [150, 40], [280, 60]], h: [[20, 120, 120, 140], [150, 40, 200, 40], [150, 40, 100, 40], [280, 60, 120, 130]] },
  { d: 'M10 80 C50 10 100 10 150 80 S250 150 290 80', a: [[10, 80], [150, 80], [290, 80]], h: [[10, 80, 50, 10], [150, 80, 100, 10], [150, 80, 200, 150], [290, 80, 250, 150]] },
  { d: 'M150 80 C150 40 220 40 220 90 C220 150 120 150 90 90 C60 30 130 -10 250 10', a: [[150, 80], [220, 90], [90, 90], [250, 10]], h: [[150, 80, 150, 40], [220, 90, 220, 40], [220, 90, 220, 150], [90, 90, 120, 150], [90, 90, 60, 30], [250, 10, 130, -10]] },
];

export function Bezier({ variant = 0 }) {
  const c = CURVES[variant % CURVES.length];
  return (
    <svg className="bez" viewBox="0 -20 300 180" aria-hidden="true">
      <path className="curve" d={c.d} />
      {c.h.map(([x, y, hx, hy], i) => (
        <g key={i}>
          <line className="handle" x1={x} y1={y} x2={hx} y2={hy} />
          <circle className="knob" cx={hx} cy={hy} r="4.5" />
        </g>
      ))}
      {c.a.map(([x, y], i) => (
        <rect key={i} className="anchor" x={x - 7} y={y - 7} width="14" height="14" />
      ))}
    </svg>
  );
}

export function PageHead({ title, lead, variant }) {
  return (
    <header className="head">
      <div>
        <h1 className="display">{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
      <Bezier variant={variant} />
    </header>
  );
}
