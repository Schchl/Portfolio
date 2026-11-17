import { useEffect, useRef, useState } from 'react';
import { PageHead } from '../components/Scribble';

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [toast, setToast] = useState(null);
  const timer = useRef();

  useEffect(() => {
    fetch('/Portfolio/contact.json')
      .then((r) => { if (!r.ok) throw new Error(`Erreur HTTP : ${r.status}`); return r.json(); })
      .then((d) => setContacts(d.contacts))
      .catch((e) => console.error(e));
    return () => clearTimeout(timer.current);
  }, []);

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast(`Copié : ${text}`);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), 3000);
    });
  };

  return (
    <div className="page wrap">
      <PageHead title="Contact" lead="Un mail, un message, ou une partie de Valorant : choisis ton canal." variant={2} />

      <ul className="contacts">
        {contacts.map((c) => {
          const inner = (
            <>
              <span className="chip"><img src={`/Portfolio/contact/${c.image.replace(/^\//, '')}`} alt="" /></span>
              <span className="name">{c.platform}</span>
              <span className="user">
                {c.username}
                <small>{c.lien ? 'Ouvrir le profil' : 'Copier'}</small>
              </span>
            </>
          );
          return (
            <li key={c.platform}>
              {c.lien
                ? <a className="contact-row" href={c.lien} target="_blank" rel="noopener noreferrer">{inner}</a>
                : <button className="contact-row" onClick={() => copy(c.username)}>{inner}</button>}
            </li>
          );
        })}
      </ul>

      <div role="status" aria-live="polite">{toast && <div className="toast">{toast}</div>}</div>
    </div>
  );
}
