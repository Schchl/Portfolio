import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    import('https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js')
      .then(({ neonCursor }) => {
        neonCursor({
          el: document.getElementById('app'),
          shaderPoints: 16,
          curvePoints: 80,
          curveLerp: 0.5,
          radius1: 5,
          radius2: 30,
          velocityTreshold: 10,
          sleepRadiusX: 100,
          sleepRadiusY: 100,
          sleepTimeCoefX: 0.0025,
          sleepTimeCoefY: 0.0025
        });
      });
  }, []);

  return (
    <div
      id="app"
      className="relative w-full h-screen overflow-hidden touch-pan-y text-white font-montserrat bg-black"
    >
      <div
        className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
        style={{
          textShadow: '0 0 10px #ffffff, 0 0 30px #ff00ff, 0 0 60px #ff00ff'
        }}
      >
        <h1
          className="uppercase"
          style={{
            fontSize: '6vw',
            lineHeight: '12vw',
          }}
        >
          Erreur 404<br />Page introuvable
        </h1>
      </div>
    </div>
  );
}
