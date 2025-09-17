import { useTheme } from '@mui/material/styles';

export default function Gamepres() {
  const theme = useTheme();

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <h1
        className="text-4xl font-bold mb-10 text-center"
        style={{ color: theme.palette.primary.main }}
      >
        Ma Présentation Gaming
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Minecraft */}
        <section className="flex flex-col items-center text-center md:text-left">
          <img
            src="/Portfolio/game/minecraft.png"
            alt="Minecraft"
            className="mb-4 object-contain"
            style={{ width: 'auto', height: '160px' }}
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Minecraft</h2>
            <p className="text-lg leading-relaxed">
              Je joue à Minecraft depuis 6 ans. Petite, je regardais Frigiel, Siphano, Aypierre... les Fallen Kingdom et les KTP.
              <br />
              Il y a 6 ans j'ai reçu Minecraft Java premium : j’ai commencé à jouer en survie et en UHC.
            </p>
          </div>
        </section>

        {/* Among Us */}
        <section className="flex flex-col items-center text-center md:text-left">
          <img
            src="/Portfolio/game/amongus.png"
            alt="Among Us"
            className="mb-4 object-contain"
            style={{ width: 'auto', height: '160px' }}
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Among Us</h2>
            <p className="text-lg leading-relaxed">
              Entre amis, Among Us c’est parfait ! On découvre la façon de penser des autres... ou de les manipuler.
              <br />
              Spécialité : tuer une seule personne en boucle au premier tour. Raison: Vote par défaut. 😈
            </p>
          </div>
        </section>

        {/* Valorant */}
        <section className="flex flex-col items-center text-center md:text-left md:col-span-2">
          <img
            src="/Portfolio/game/skye.png"
            alt="Skye de Valorant"
            className="mb-4 object-contain"
            style={{ width: 'auto', height: '160px' }}
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Valorant</h2>
            <p className="text-lg leading-relaxed">
              Sur Valorant, je main <strong>Skye</strong> (même si je sais toujours pas flash correctement 🙈).
              Je soigne l’équipe, je tente d’être stratégique, et surtout… je râle quand je me fait onetap.
              <br />
              <s>Je joue pour prouver que les filles savent jouer</s> (Chloé arrête de mentir t'es encore fer 3 après un an de jeu 💀)
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
