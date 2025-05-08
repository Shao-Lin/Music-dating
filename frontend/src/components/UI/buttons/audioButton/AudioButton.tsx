import { useEffect, useRef, useState } from "react";
import Stop from "../../../../assets/musicButton/Stop.svg"; // иконки
import Play from "../../../../assets/musicButton/Play.svg"; // иконки
//import coverImage from "../../../../assets/musicButton/cover.png"; // или строкой как пропс
//import sound from "../../../../assets/testMusic/linkin-park-in-the-end-original_(bobamuz.online).mp3"; // путь к mp3

type MusicData = {
  name: string;
  cover: string;
  music: string;
  isEditProfile?: boolean;
};

export const AudioButton = ({
  name,
  cover,
  music,
  isEditProfile = false,
}: MusicData) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [containerSize, setContainerSize] = useState(90);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const baseWidth = 390;
      const baseSize = 80;

      // Пропорциональное масштабирование от базовой ширины 390px
      const scaledSize = (screenWidth / baseWidth) * baseSize;

      // Ограничим размер в адекватных рамках
      const finalSize = Math.max(70, Math.min(scaledSize, 160));

      setContainerSize(finalSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div ref={containerRef} className="audio-box-container">
      <div className="audio-box-wrapper">
        <div
          className="cover"
          style={
            !isEditProfile
              ? { width: `${containerSize}px`, height: `${containerSize}px` }
              : { width: "60px", height: "60px" }
          }
          onClick={handleTogglePlay}
        >
          <img
            src={cover}
            style={{ width: `${containerSize}px` }}
            alt="cover"
          />
          <img
            src={isPlaying ? Stop : Play}
            className="overlay"
            alt="state icon"
          />
        </div>

        <div className="track-title">
          <button type="button" onClick={handleTogglePlay}>
            <div
              className="label"
              style={
                !isEditProfile ? { fontSize: "24px" } : { fontSize: "20px" }
              }
            >
              {name}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
