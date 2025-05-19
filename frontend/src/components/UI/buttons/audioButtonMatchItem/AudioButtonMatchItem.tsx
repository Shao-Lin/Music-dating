import { useEffect, useRef, useState } from "react";
import Stop from "../../../../assets/musicButton/Stop.svg"; // иконки
import Play from "../../../../assets/musicButton/Play.svg"; // иконки
import { useAudioPlayer } from "../../../../context/AudioPlayerContext";

interface MatchProps {
  cover: string;
  music: string;
  id: string;
}

export const AudioButton = ({ cover, music, id }: MatchProps) => {
  const { currentAudio, setCurrentAudio, currentId, setCurrentId } =
    useAudioPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio(music));

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
      setCurrentId(null);
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  const handleTogglePlay = () => {
    const thisAudio = audioRef.current;

    if (currentAudio && currentAudio !== thisAudio) {
      currentAudio.pause();
    }

    if (currentId === id) {
      thisAudio.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
      setCurrentId(null);
    } else {
      thisAudio.play();
      setCurrentAudio(thisAudio);
      setCurrentId(id);
      setIsPlaying(true);
    }
  };

  // Если текущий активный ID — не этот, но кнопка думает, что играет — сбрасываем
  useEffect(() => {
    if (currentId !== id && isPlaying) {
      setIsPlaying(false);
    }
  }, [currentId]);

  return (
    <div className="cover" onClick={handleTogglePlay}>
      <img src={cover} alt="cover" />
      <img src={isPlaying ? Stop : Play} className="overlay" alt="state icon" />
    </div>
  );
};
