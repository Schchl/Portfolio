import { useEffect, useRef } from 'react';

// Pluie de 0 et de 1 aux couleurs du site, pendant la transition vers la page « Moi, en vrai ».
export default function BinaryTransition() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const css = getComputedStyle(document.documentElement);
    const paper = css.getPropertyValue('--paper').trim() || '#f1f2fa';
    const colors = [css.getPropertyValue('--orange').trim(), css.getPropertyValue('--cobalt').trim()];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const size = 18;
    const drops = Array.from({ length: Math.ceil(canvas.width / size) }, () => Math.random() * -20);
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `800 ${size}px 'Bricolage Grotesque', monospace`;
    let raf;
    const draw = () => {
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      drops.forEach((y, i) => {
        ctx.fillStyle = colors[(i + Math.floor(y)) % 2];
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.95 ? 0 : y + 1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="binary" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
