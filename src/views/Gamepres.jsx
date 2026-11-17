import { PageHead } from '../components/Scribble';

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
    text: [
      'Sur Valorant, je main Skye (même si je sais toujours pas flash correctement 🙈). Je soigne l’équipe, je tente d’être stratégique, et surtout… je râle quand je me fais onetap.',
      null,
    ],
  },
];

export default function Gamepres() {
  return (
    <div className="page wrap">
      <PageHead title="Gaming" lead="Ce que je joue quand je ne dessine pas et que je ne code pas." variant={1} />

      {GAMES.map((g) => (
        <section className="stage" key={g.name}>
          <div className="art" style={{ '--c': g.color }}>
            <span className={`shape ${g.shape}`} />
            <span className={`shape-line ${g.shape}`} />
            <img className={g.photo ? 'photo' : undefined} src={`/Portfolio/game/${g.img}`} alt={g.name} />
          </div>
          <div>
            <h2 className="display">{g.name}</h2>
            {g.text.map((t, i) => t && <p key={i}>{t}</p>)}
            {g.name === 'Valorant' && (
              <p>
                <s>Je joue pour prouver que les filles savent jouer</s> (Chloé arrête de mentir, t’es encore fer 3 après un an de jeu 💀)
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
