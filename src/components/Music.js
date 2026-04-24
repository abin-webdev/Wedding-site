import { useEffect, useRef } from "react";

export default function Music() {
  const audioRef = useRef(null);

  useEffect(() => {
    const play = () => {
      audioRef.current.play().catch(() => {});
    };
    document.addEventListener("click", play);
    return () => document.removeEventListener("click", play);
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/music.mpeg" type="audio/mp3" />
    </audio>
  );
}