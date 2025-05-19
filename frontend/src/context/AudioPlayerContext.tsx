import React, { createContext, useContext, useState } from "react";

type AudioPlayerContextType = {
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
  currentId: string | null;
  setCurrentId: (id: string | null) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context)
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return context;
};

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [currentId, setCurrentId] = useState<string | null>(null);

  return (
    <AudioPlayerContext.Provider
      value={{ currentAudio, setCurrentAudio, currentId, setCurrentId }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
