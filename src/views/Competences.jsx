import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LightPalette, DarkPalette } from '../components/Theme';

export default function Competences({ theme }) {
  const muiTheme = useTheme();
  const palette = theme === 'dark' ? DarkPalette.palette : LightPalette.palette;

  const [competences, setCompetences] = useState({
    creationNumerique: [],
    developpementWeb: [],
    langues: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/Portfolio/competence.json')
      .then(response => {
        if (!response.ok) throw new Error('Erreur lors du chargement des données');
        return response.json();
      })
      .then(jsonData => {
        setCompetences(jsonData.competences);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur:', error);
        setLoading(false);
      });
  }, []);

  const redirectToVideo = (url) => {
    window.open(url, '_blank');
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/Portfolio/placeholder-icon.png';
  };

  const getLangueNiveauStyle = () => {
    const { niveau: niveauPalette } = palette;
    return {
      backgroundColor: niveauPalette.langue.background,
      color: niveauPalette.langue.main
    };
  };


  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: muiTheme.palette.background.default }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1
          className="text-4xl font-bold text-center mb-12"
          style={{ color: muiTheme.palette.primary.main }}
        >
          Mes Compétences
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
              style={{ borderColor: muiTheme.palette.primary.main }}
            ></div>
          </div>
        ) : (
          <>
            {/* Création Numérique */}
            <section className="mb-12">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: muiTheme.palette.primary.main }}
              >
                Création Numérique
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {competences.creationNumerique.map((competence, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-4 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col items-center justify-center border"
                    style={{
                      backgroundColor: muiTheme.palette.background.paper,
                      color: muiTheme.palette.text.primary,
                      borderColor: muiTheme.palette.divider
                    }}
                  >
                    <img
                      src={`/Portfolio${competence.image}`}
                      alt={competence.nom}
                      className="w-16 h-16 mb-2 object-contain"
                      onError={handleImageError}
                    />
                    <p className="font-medium">{competence.nom}</p>
                    <span
                      className="text-xs mt-1"
                      style={{ color: muiTheme.palette.primary.main }}
                    >
                      {competence.categorie}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Développement Web */}
            <section className="mb-12">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: muiTheme.palette.primary.main }}
              >
                Développement Web
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {competences.developpementWeb.map((competence, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-4 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col items-center justify-center border"
                    style={{
                      backgroundColor: muiTheme.palette.background.paper,
                      color: muiTheme.palette.text.primary,
                      borderColor: muiTheme.palette.divider
                    }}
                  >
                    <img
                      src={`/Portfolio${competence.image}`}
                      alt={competence.nom}
                      className="w-16 h-16 mb-2 object-contain"
                      onError={handleImageError}
                    />
                    <p className="font-medium">{competence.nom}</p>
                    <div className="flex flex-col items-center mt-1">
                      <span
                        className="text-xs"
                        style={{ color: muiTheme.palette.primary.main }}
                      >
                        {competence.categorie}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Langues */}
            <section className="mb-12">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: muiTheme.palette.primary.main }}
              >
                Langues
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
                {competences.langues.map((langue, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-4 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer border"
                    style={{
                      backgroundColor: muiTheme.palette.background.paper,
                      color: muiTheme.palette.text.primary,
                      borderColor: muiTheme.palette.divider
                    }}
                    onClick={() => {
                      const urls = [
                        'https://youtu.be/X5hrUGFhsXo?si=rSfjhMaBopDSBmtC',
                        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        'https://www.youtube.com/watch?v=kJQP7kiw5Fk'
                      ];
                      redirectToVideo(urls[index] || urls[0]);
                    }}
                  >
                    <img
                      src={`/Portfolio${langue.image}`}
                      alt={langue.nom}
                      className="w-20 h-20 mb-2 object-contain"
                      onError={handleImageError}
                    /> 
                    <p className="font-medium">{langue.nom}</p>
                    <span
                      className="text-xs mt-1 px-2 py-1 rounded-full"
                      style={getLangueNiveauStyle()}
                    >
                      {langue.niveau}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
