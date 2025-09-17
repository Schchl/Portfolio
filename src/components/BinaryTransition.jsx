import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";

function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function BinaryTransition({ onComplete }) {
  const canvasRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binary = "01";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1);

    const duration = 1500;
    const startTime = Date.now();

    const draw = () => {
      ctx.fillStyle = hexToRGBA(theme.palette.background.default, 0.1);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      if (Date.now() - startTime < duration) {
        requestAnimationFrame(draw);
      } else {
        setFadeOut(true);
        setTimeout(() => onComplete(), 500);
      }
    };

    draw();
  }, [onComplete, theme]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 pointer-events-none transition-opacity duration-500 ease-in-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
