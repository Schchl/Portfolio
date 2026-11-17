import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BinaryTransition from './BinaryTransition';

export default function BinaryRoute() {
  const navigate = useNavigate();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const timer = setTimeout(() => navigate('/game', { replace: true }), reduce ? 0 : 1500);
    return () => clearTimeout(timer);
  }, [navigate, reduce]);

  return reduce ? null : <BinaryTransition />;
}
