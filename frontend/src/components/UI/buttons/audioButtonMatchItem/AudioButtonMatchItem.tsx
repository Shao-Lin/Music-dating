import { useEffect, useRef, useState } from "react";
import Stop from "../../../../assets/musicButton/Stop.svg"; // иконки
import Play from "../../../../assets/musicButton/Play.svg"; // иконки
//import coverImage from "../../../../assets/musicButton/cover.png"; // или строкой как пропс
//import sound from "../../../../assets/testMusic/linkin-park-in-the-end-original_(bobamuz.online).mp3"; // путь к mp3
import { MusicDataMatchItem } from "../../../matchItem/matchItemType";

export const AudioButton = ({ cover, music }: MusicDataMatchItem) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(music);
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="cover" onClick={handleTogglePlay}>
      <img src={cover} alt="cover" />
      <img src={isPlaying ? Stop : Play} className="overlay" alt="state icon" />
    </div>
  );
};
