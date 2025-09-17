import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BinaryTransition from "./BinaryTransition";

export default function BinaryRoute() {
  const [showTransition, setShowTransition] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
      navigate("/game"); // redirection vers la page /game
    }, 1500); // correspond à la durée de l'animation

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      {showTransition && <BinaryTransition onComplete={() => {}} />}
    </>
  );
}
