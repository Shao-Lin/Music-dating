export type Track = {
  id: string;
  isActive: boolean;
  music: string;
  cover: string;
  name: string;
};
export type aboutAndMusicProp = {
  about: string;
  audioTracks: Track[];
};
