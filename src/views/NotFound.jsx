import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Page 404 : le curseur laisse un trait orange qui s'efface, comme un coup de plume.
export default function NotFound() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const pts = [];
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pts.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
    };
    window.addEventListener('pointermove', onMove);

    const css = getComputedStyle(document.documentElement);
    const colors = [css.getPropertyValue('--orange').trim(), css.getPropertyValue('--cobalt').trim()];
    const life = 1400;
    let raf;
    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      while (pts.length && now - pts[0].t > life) pts.shift();
      ctx.lineCap = 'round';
      for (let i = 1; i < pts.length; i++) {
        const age = 1 - (now - pts[i].t) / life;
        colors.forEach((col, k) => {
          ctx.strokeStyle = col;
          ctx.lineWidth = (k === 0 ? 22 : 3) * age;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x + k * 10, pts[i - 1].y + k * 8);
          ctx.lineTo(pts[i].x + k * 10, pts[i].y + k * 8);
          ctx.stroke();
        });
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section className="lost">
      <canvas ref={ref} aria-hidden="true" />
      <div className="lost-inner">
        <h1 className="display">404</h1>
        <p>Cette page n’existe pas. Dessine quelque chose en attendant.</p>
        <Link className="btn btn-fill" to="/">Retour à l’accueil</Link>
      </div>
    </section>
  );
}
