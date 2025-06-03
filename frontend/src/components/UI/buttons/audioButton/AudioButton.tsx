// AudioButton.tsx
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Stop from "../../../../assets/musicButton/Stop.svg";
import Play from "../../../../assets/musicButton/Play.svg";

type MusicData = {
  name: string;
  coverUrl: string;
  url: string;
  isMain: boolean;
  trackId: string;
  isEditProfile?: boolean;
};

export type AudioButtonHandle = {
  playTrack: () => void;
};

// eslint-disable-next-line react/display-name
export const AudioButton = forwardRef<AudioButtonHandle, MusicData>(
  ({ name, coverUrl, url, isEditProfile = false }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [containerSize, setContainerSize] = useState(90);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        const baseWidth = 390;
        const baseSize = 80;
        const scaledSize = (screenWidth / baseWidth) * baseSize;
        const finalSize = Math.max(70, Math.min(scaledSize, 160));
        setContainerSize(finalSize);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      audioRef.current = new Audio(url);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
      return () => {
        audioRef.current?.pause();
        audioRef.current = null;
      };
    }, [url]);

    const handleTogglePlay = () => {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    // <-- expose method to parent
    useImperativeHandle(ref, () => ({
      playTrack: () => {
        if (!audioRef.current) return;
        if (!isPlaying) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      },
    }));

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
              src={coverUrl}
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
  }
);
