export type MusicDataMatchItem = {
  music: string;
  cover: string;
};

export type MatchItemType = {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  music: MusicDataMatchItem;
};
