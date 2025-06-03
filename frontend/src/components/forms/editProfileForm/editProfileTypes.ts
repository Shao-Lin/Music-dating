export type Track = {
  url: string;
  coverUrl: string;
  name: string;
  isMain: boolean;
  trackId: string;
};
export type aboutAndMusicProp = {
  about: string;
  tracks: Track[];
  onRefetch: () => void;
};
