import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

export default function Timeline() {
  const muiTheme = useTheme();

  const [data, setData] = useState({
    experiences: [],
    parcours: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/Portfolio/experience.json')
      .then(response => {
        if (!response.ok) throw new Error('Erreur lors du chargement des données');
        return response.json();
      })
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur:', error);
        setLoading(false);
      });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const getIconPath = (iconName) => {
    if (iconName && iconName.startsWith("/")) return `/Portfolio${iconName}`;
    return `/Portfolio/${iconName}`;
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/Portfolio/placeholder-icon.png';
  };

  const extractYearFromDate = (dateStr) => {
    const yearMatch = dateStr.match(/\b(20\d{2})\b/);
    if (yearMatch && yearMatch[1]) return parseInt(yearMatch[1], 10);
    if (dateStr.includes("2020") || dateStr.includes("2021")) return 2020;
    if (dateStr.includes("2022")) return 2022;
    if (dateStr.includes("2023")) return 2023;
    if (dateStr.includes("2024")) return 2024;
    return 0;
  };

  // Nouvelle fonction pour déterminer si une date est une année seule
  const isYearOnly = (dateStr) => {
    // Nettoie la chaîne en supprimant les espaces et retours à la ligne
    const cleanStr = dateStr.replace(/\s+/g, ' ').trim();
    // Vérifie si c'est exactement une année (4 chiffres commençant par 20)
    return /^20\d{2}$/.test(cleanStr);
  };

  // Fonction de tri modifiée
  const getSortValue = (item) => {
    const year = extractYearFromDate(item.date);
    const isOnlyYear = isYearOnly(item.date);
    
    // Les années seules ont une priorité plus élevée (valeur plus grande)
    // On multiplie par 10000 l'année et on ajoute 1 si c'est une année seule
    return year * 10000 + (isOnlyYear ? 1 : 0);
  };

  const getFilteredItems = () => {
    let items = [];

    if (selectedCategory === 'experiences') {
      items = data.experiences.map(item => ({ ...item, category: 'experiences' }));
    } else if (selectedCategory === 'parcours') {
      items = data.parcours.map(item => ({ ...item, category: 'parcours' }));
    } else {
      items = [
        ...data.experiences.map(item => ({ ...item, category: 'experiences' })),
        ...data.parcours.map(item => ({ ...item, category: 'parcours' }))
      ];
    }

    // Tri décroissant : les plus récents en haut, avec priorité aux années seules
    items.sort((a, b) => getSortValue(b) - getSortValue(a));

    return items;
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen" style={{ backgroundColor: muiTheme.palette.background.default }}>
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 px-2"
          style={{ color: muiTheme.palette.primary.main }}
        >
          Mon Parcours
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
            {/* Boutons de filtrage */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
              {[
                { key: 'all', label: 'Tout afficher' },
                { key: 'experiences', label: 'Expériences' },
                { key: 'parcours', label: 'Formation' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className="px-3 py-2 rounded-full font-medium border text-xs sm:text-sm md:text-base transition-colors duration-300 flex-shrink-0"
                  style={{
                    backgroundColor: selectedCategory === key ? muiTheme.palette.primary.main : 'transparent',
                    color: selectedCategory === key ? '#fff' : muiTheme.palette.primary.main,
                    borderColor: muiTheme.palette.primary.main,
                    minWidth: '70px',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== key) {
                      e.currentTarget.style.backgroundColor = muiTheme.palette.primary.main;
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== key) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = muiTheme.palette.primary.main;
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative px-2 sm:px-0">
              {/* Ligne verticale centrale sur sm+ */}
              <div
                className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
                style={{ backgroundColor: muiTheme.palette.primary.light }}
              ></div>

              {/* Ligne verticale mobile à gauche */}
              <div
                className="sm:hidden absolute left-6 w-0.5 h-full"
                style={{ backgroundColor: muiTheme.palette.primary.light }}
              ></div>

              <div className="space-y-8 sm:space-y-16">
                {getFilteredItems().map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex ${
                      // Mobile : toujours en ligne avec icône à gauche
                      'flex-row items-start sm:items-center'
                    } ${
                      // Desktop : alternance gauche/droite
                      index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Icône mobile à gauche */}
                    <div className="flex-shrink-0 sm:hidden mr-4">
                      <div
                        className="flex justify-center items-center bg-white rounded-full shadow-md overflow-hidden w-10 h-10 relative z-10"
                        style={{ border: `2px solid ${muiTheme.palette.primary.light}` }}
                      >
                        <img
                          src={getIconPath(item.icon)}
                          alt="Icône"
                          className="w-6 h-6 object-contain"
                          onError={handleImageError}
                        />
                      </div>
                    </div>

                    {/* Carte */}
                    <div
                      className={`flex-1 sm:w-1/2 ${
                        index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                      }`}
                    >
                      <div
                        className="p-4 sm:p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                        style={{
                          backgroundColor: muiTheme.palette.background.paper,
                          borderLeft: `4px solid ${
                            item.category === 'experiences' ? '#fb923c' : '#60a5fa'
                          }`,
                          color: muiTheme.palette.text.primary,
                        }}
                      >
                        <div 
                          className="text-sm sm:text-base font-medium"
                          style={{ color: muiTheme.palette.text.secondary }}
                        >
                          {item.date.split('\n').map((dateLine, i) => (
                            <div key={i}>{dateLine}</div>
                          ))}
                        </div>
                        <div className="font-medium mt-2 text-sm sm:text-base break-words leading-relaxed">
                          {item.label.split('\n').map((line, i) => (
                            <div key={i} className={i > 0 ? 'mt-1' : ''}>{line}</div>
                          ))}
                        </div>
                        <div
                          className="text-xs mt-3 font-medium uppercase tracking-wide"
                          style={{ color: muiTheme.palette.primary.main }}
                        >
                          {item.category === 'experiences' ? 'Expérience' : 'Formation'}
                        </div>
                      </div>
                    </div>

                    {/* Icône desktop au centre */}
                    <div
                      className="hidden sm:flex justify-center items-center bg-white rounded-full shadow-md overflow-hidden w-12 h-12 absolute left-1/2 transform -translate-x-1/2"
                      style={{ 
                        zIndex: 10,
                        border: `3px solid ${muiTheme.palette.primary.light}`
                      }}
                    >
                      <img
                        src={getIconPath(item.icon)}
                        alt="Icône"
                        className="w-8 h-8 object-contain"
                        onError={handleImageError}
                      />
                    </div>

                    {/* Espace vide desktop */}
                    <div className="hidden sm:block w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}