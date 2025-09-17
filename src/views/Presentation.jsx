import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const Presentation = () => {
  const theme = useTheme();

  return (
    <div
      className="min-h-screen px-4 sm:px-8 py-12 sm:py-16 flex flex-col items-center relative overflow-hidden"
      style={{
        background: theme.palette.background.presentation,
      }}
    >
      {/* Texte géant en arrière-plan */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl z-10">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <h1
            className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-extrabold tracking-wider select-none text-center"
            style={{
              color: theme.palette.text.primary,
              opacity: 0.06,
            }}
          >
            PORTFOLIO
          </h1>
        </div>

        {/* Texte de présentation */}
        <div className="pre-text text-center lg:text-left mb-8 lg:mb-0 font-montserrat z-10 max-w-xl">
          <p
            className="text-3xl sm:text-4xl mb-4"
            style={{ color: theme.palette.text.primary }}
          >
            Salut !
          </p>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-2 text-center sm:text-left"
            style={{ color: theme.palette.text.primary }}
          >
            <span className="block sm:inline whitespace-normal sm:whitespace-nowrap">
              Je suis{" "}
              <span
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                SCHAUM&nbsp;Chloé
              </span>
            </span>
          </h1>

          <h2
            className="text-2xl sm:text-3xl lg:text-5xl"
            style={{ color: theme.palette.text.secondary }}
          >
            Étudiante en première année de Master
          </h2>
          <h3 className="text-xl sm:text-2xl lg:text-3xl"
            style={{ color: theme.palette.text.primary }}>
            Management de l’innovation&nbsp;e-Marketing
          </h3>
        </div>

        {/* Image de présentation */}
        <NavLink
          to="/transition-to-game"
          className="pre-image flex-shrink-0 relative z-20 cursor-pointer"
        >
          <img
            className="rounded-full w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[450px] lg:h-[450px] hover:opacity-80 transition"
            src="/Portfolio/images/tete.png"
            alt="Chloé"
          />
        </NavLink>
      </section>
    </div>
  );
};

export default Presentation;
