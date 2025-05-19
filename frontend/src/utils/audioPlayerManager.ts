// src/utils/audioPlayerManager.ts

let currentAudio: HTMLAudioElement | null = null;

export const playAudio = (audio: HTMLAudioElement) => {
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
  }
  currentAudio = audio;
  audio.play();
};

export const pauseAudio = (audio: HTMLAudioElement) => {
  if (currentAudio === audio) {
    audio.pause();
    currentAudio = null;
  }
};

export const stopCurrentAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
};

export const isCurrentAudio = (audio: HTMLAudioElement) => {
  return currentAudio === audio;
};
