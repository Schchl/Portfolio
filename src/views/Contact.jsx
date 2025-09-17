import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [notification, setNotification] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    fetch('/Portfolio/contact.json')
      .then(res => {
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        return res.json();
      })
      .then(data => setContacts(data.contacts))
      .catch(err => console.error("Erreur de chargement du fichier contacts.json :", err));
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotification(`Copié : ${text}`);
      setTimeout(() => setNotification(null), 3000);
    });
  };

  return (
    <div
      className="max-w-screen-xl mx-auto px-4 mt-8"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: theme.palette.primary.main }}
      >
        Mes Contacts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {contacts.map((contact, index) => {
          const handleClick = () => {
            if (contact.lien) {
              window.open(contact.lien, '_blank');
            } else {
              copyToClipboard(contact.username);
            }
          };

          return (
            <div
              key={index}
              onClick={handleClick}
              className="cursor-pointer p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition border"
              style={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
              }}
            >
              <img
                src={`/contact/${
                  contact.platform === "GitHub"
                    ? theme.palette.mode === "dark"
                      ? "github.png"
                      : "github.svg"
                    : contact.image
                }`}
                alt={`${contact.platform} logo`}
                className="w-12 h-12 mb-3 mx-auto"
              />
              <div className="text-center">
                <div
                  className="text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {contact.platform}
                </div>
                <div
                  className="text-base font-semibold break-words"
                  style={{ color: theme.palette.text.primary }}
                >
                  {contact.username}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notification */}
      {notification && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50"
          style={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
          }}
        >
          {notification}
        </div>
      )}
    </div>
  );
}
