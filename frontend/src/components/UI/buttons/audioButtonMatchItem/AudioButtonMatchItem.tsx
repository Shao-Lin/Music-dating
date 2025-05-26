import { useEffect, useRef, useState } from "react";
import Stop from "../../../../assets/musicButton/Stop.svg"; // иконки
import Play from "../../../../assets/musicButton/Play.svg"; // иконки
import { useAudioPlayer } from "../../../../context/AudioPlayerContext";

interface PropsAudio {
  coverUrl: string;
  url: string;
  userId: string;
}

export const AudioButton = ({ coverUrl, url, userId }: PropsAudio) => {
  const { currentAudio, setCurrentAudio, currentId, setCurrentId } =
    useAudioPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio(url));

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

    if (currentId === userId) {
      thisAudio.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
      setCurrentId(null);
    } else {
      thisAudio.play();
      setCurrentAudio(thisAudio);
      setCurrentId(userId);
      setIsPlaying(true);
    }
  };

  // Если текущий активный ID — не этот, но кнопка думает, что играет — сбрасываем
  useEffect(() => {
    if (currentId !== userId && isPlaying) {
      setIsPlaying(false);
    }
  }, [currentId]);

  return (
    <div className="cover" onClick={handleTogglePlay}>
      <img src={coverUrl} alt="cover" />
      <img src={isPlaying ? Stop : Play} className="overlay" alt="state icon" />
    </div>
  );
};
