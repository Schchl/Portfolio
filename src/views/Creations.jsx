import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Slider from 'react-slick';

export default function MesCreations() {
  const theme = useTheme();
  const [creations, setCreations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [activeCreation, setActiveCreation] = useState(null);
  const [iframeZoom, setIframeZoom] = useState(0.5);

  useEffect(() => {
    fetch('/Portfolio/mes_creations.json')
      .then(res => res.json())
      .then(setCreations)
      .catch(err => console.error("Erreur de chargement du JSON :", err));
  }, []);

  const categories = [...new Set(creations.flatMap(c => c.categories))];

  const filteredCreations = selectedCategory === 'Tout'
    ? creations
    : creations.filter(c => c.categories.includes(selectedCategory));

  const openModal = (creation) => {
    setActiveCreation(creation);
    setIframeZoom(0.55); // Reset zoom when opening modal
  };
  
  const closeModal = () => {
    setActiveCreation(null);
    setIframeZoom(0.55); // Reset zoom when closing modal
  };


  const CustomArrow = ({ direction, onClick }) => (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        [direction]: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: '1.5rem',
        zIndex: 10,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.9)';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
      }}
    >
      {direction === 'left' ? '◀' : '▶'}
    </div>
  );

  return (
    <div style={{ backgroundColor: theme.palette.background.default }} className="max-w-screen-xl mx-auto px-4 mt-8 mb-12 text-base">
      <h1 style={{ color: theme.palette.primary.main }} className="text-3xl font-bold mb-6">
        Mes Créations
      </h1>

      {/* Filtres */}
      <div className="mb-6 flex flex-wrap gap-2">
        {['Tout', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-4 py-2 rounded-full font-medium border transition"
            style={{
              backgroundColor: selectedCategory === cat ? theme.palette.primary.main : 'transparent',
              color: selectedCategory === cat ? '#fff' : theme.palette.primary.main,
              borderColor: theme.palette.primary.main
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== cat) {
                e.currentTarget.style.backgroundColor = theme.palette.primary.main;
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== cat) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = theme.palette.primary.main;
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Créations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreations.map(creation => (
          <div
            key={creation.modal_id}
            onClick={() => openModal(creation)}
            className="rounded-lg p-4 shadow hover:shadow-lg border transition cursor-pointer"
            style={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary
            }}
          >
            <h2 className="text-xl font-semibold mb-2">{creation.title}</h2>
              {creation.cover && (
                <img
                  src={`/Portfolio${creation.cover}`}
                  alt={creation.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}

              {/* Logos des logiciels */}
                {creation.logiciel && creation.logiciel.length > 0 && (
                  <div className="flex justify-end gap-2 mt-2">
                    {creation.logiciel.map((logo, idx) => (
                      <img
                        key={idx}
                        src={`/Portfolio${logo}`}
                        alt="logo logiciel"
                        className="h-8 w-auto"
                        style={{ objectFit: 'contain' }}
                      />
                    ))}
                  </div>
                )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeCreation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={closeModal}
        >
          <div
            className="p-6 rounded max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              overflowX: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{activeCreation.title}</h3>
            <p className="mb-4">{activeCreation.description}</p>

            {activeCreation.link && (
              <a
                href={activeCreation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline block mb-6"
              >
                Voir le site web
              </a>
            )}

            {/* Iframe avec contrôles de zoom */}
            {activeCreation.iframe && (
              <div className="mb-6">
                {/* Iframe container avec overflow pour le zoom */}
                <div className="flex justify-center">
                  <div 
                    className="w-full aspect-video max-h-[70vh] relative rounded border"
                    style={{ borderColor: theme.palette.divider, overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        transform: `scale(${iframeZoom})`,
                        transformOrigin: 'top left',
                        width: `${100 / iframeZoom}%`,
                        height: `${100 / iframeZoom}%`
                      }}
                    >
                      <iframe
                        src={activeCreation.iframe}
                        title="iframe-content"
                        className="w-full h-full bg-black"
                        style={{
                          border: 'none',
                          width: '100%',
                          height: '100%'
                        }}
                        allowFullScreen
                        scrolling="auto"
                        sandbox="allow-scripts allow-popups allow-forms"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Galerie */}
            {activeCreation.gallery && activeCreation.gallery.length > 0 && (
              <div className="space-y-4 mb-6" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                {/* Images */}
                {(() => {
                  const images = activeCreation.gallery.filter(item =>
                    item.match(/\.(jpe?g|png|gif|webp)$/i)
                  );

                  if (images.length === 1) {
                    return (
                      <div 
                        className="flex justify-center items-center bg-black rounded overflow-hidden"
                        style={{ height: '500px', maxWidth: '100%' }}
                      >
                        <img
                          src={`/Portfolio${images[0]}`}
                          alt="media"
                          className="max-w-full max-h-full object-contain"
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </div>
                    );
                  }

                  if (images.length > 1) {
                    return (
                      <div 
                        className="relative overflow-hidden"
                        style={{ height: '500px', maxWidth: '100%' }}
                      >
                        <Slider
                          dots
                          infinite
                          speed={500}
                          slidesToShow={1}
                          slidesToScroll={1}
                          prevArrow={<CustomArrow direction="left" />}
                          nextArrow={<CustomArrow direction="right" />}
                          dotsClass="slick-dots"
                          customPaging={() => (
                            <div
                              style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: theme.palette.primary.main,
                                opacity: 0.5
                              }}
                            />
                          )}
                        >
                          {images.map((img, idx) => (
                            <div key={idx} style={{ maxWidth: '100%', overflow: 'hidden' }}>
                              <div
                                className="flex justify-center items-center bg-black rounded overflow-hidden"
                                style={{ height: '500px', maxWidth: '100%' }}
                              >
                                <img
                                  src={`/Portfolio${img}`}
                                  alt={`slide-${idx}`}
                                  className="max-w-full max-h-full object-contain"
                                  style={{ maxWidth: '100%', height: 'auto' }}
                                />
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    );
                  }

                  return null;
                })()}

                {/* Vidéos / Fichiers externes */}
                {activeCreation.gallery
                  .filter(item => !item.match(/\.(jpe?g|png|gif|webp)$/i))
                  .map((item, idx) => {
                    if (item.includes('drive.google.com')) {
                      const embedUrl = item.replace('/view', '/preview');
                      return (
                        <div key={idx} className="w-full overflow-hidden">
                          <iframe
                            src={embedUrl}
                            allow="autoplay"
                            className="w-full h-[400px] rounded bg-black"
                            style={{ 
                              border: 'none',
                              maxWidth: '100%',
                              overflow: 'hidden'
                            }}
                            title={`embed-${idx}`}
                            scrolling="no"
                          />
                        </div>
                      );
                    }
                    return (
                      <video
                        key={idx}
                        src={item}
                        controls
                        className="w-full h-[400px] object-contain rounded bg-black"
                        style={{ maxWidth: '100%' }}
                      />
                    );
                  })}
              </div>
            )}

            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 rounded hover:shadow"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Styles CSS pour le carrousel et l'iframe responsive */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .slick-dots {
            bottom: -40px;
          }
          .slick-dots li button:before {
            display: none;
          }
          .slick-dots li.slick-active div {
            opacity: 1 !important;
          }
          /* Empêcher le défilement horizontal dans les modals */
          .slick-track {
            display: flex !important;
          }
          .slick-slide {
            overflow: hidden;
            max-width: 100%;
          }
          .slick-slide > div {
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden;
          }
          .slick-slider {
            max-width: 100%;
            overflow: hidden;
          }
          .slick-list {
            overflow: hidden;
          }
          
          /* Styles pour iframe responsive */
          iframe {
            width: 100% !important;
            min-width: 100%;
          }
          
          /* Force le contenu de l'iframe à s'adapter */
          iframe[src*="docs.google.com"],
          iframe[src*="drive.google.com"] {
            zoom: 1;
            -moz-transform: scale(1);
            -webkit-transform: scale(1);
            transform: scale(1);
          }
          
          /* Media queries pour les petits écrans */
          @media (max-width: 768px) {
            iframe {
              height: 300px !important;
            }
          }
          
          @media (max-width: 480px) {
            iframe {
              height: 250px !important;
            }
          }

          /* Styles pour les boutons de zoom désactivés */
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `
      }} />
    </div>
  );
}