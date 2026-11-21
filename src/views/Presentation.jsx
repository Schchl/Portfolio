import { Link } from 'react-router-dom';

// Tracé principal : une courbe de Bézier dessinée à la plume, avec ses points d'ancrage et ses poignées.
const STROKE = 'M-40 560 C180 420 330 700 560 600 C790 500 760 220 980 200 C1200 180 1320 420 1180 600 C1050 760 820 640 900 470 C960 340 1180 330 1500 250';
const ANCHORS = [[560, 600], [980, 200], [1180, 600]];
const HANDLES = [[980, 200, 760, 220], [980, 200, 1200, 180], [1180, 600, 1320, 420], [1180, 600, 1050, 760]];

export default function Presentation() {
  return (
    <section className="hero">
      <svg className="hero-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="stroke" pathLength="1" d={STROKE} />
        <g className="marks">
          {HANDLES.map(([x, y, hx, hy], i) => (
            <g key={i}>
              <line className="hl" x1={x} y1={y} x2={hx} y2={hy} />
              <circle className="hk" cx={hx} cy={hy} r="7" />
            </g>
          ))}
          {ANCHORS.map(([x, y], i) => (
            <rect key={i} className="ha" x={x - 10} y={y - 10} width="20" height="20" />
          ))}
        </g>
      </svg>

      <div className="wrap hero-inner">
        <div>
          <p className="hello">Salut, je suis</p>
          <h1 className="display" aria-label="Chloé Schaum">
            <span>Chloé</span>
            <span>Schaum</span>
          </h1>
          <p className="role">
            Étudiante en première année de Master Management de l’innovation e-Marketing.
            <small>Je dessine des interfaces, je les code, et j’apprends à les faire connaître.</small>
          </p>
          <div className="cta">
            <Link className="btn btn-fill" to="/crea">Voir mes créations</Link>
            <Link className="btn" to="/contact">Me contacter</Link>
          </div>
        </div>

        <Link to="/transition-moi" className="portrait" aria-label="Découvrir qui je suis en dehors de l’écran">
          <span className="disc" />
          <span className="disc-line" />
          <img src="/Portfolio/images/tete.png" alt="Portrait de Chloé" />
          <span className="sel" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i />
          </span>
          <span className="tip" aria-hidden="true">Clique : qui je suis en vrai</span>
        </Link>
      </div>
    </section>
  );
}
