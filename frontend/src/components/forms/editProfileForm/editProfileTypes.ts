export type Track = {
  id: string;
  isActive: boolean;
  url: string;
  coverUrl: string;
  name: string;
};
export type aboutAndMusicProp = {
  about: string;
  audioTracks: Track[];
};
