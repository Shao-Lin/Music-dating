export type MusicDataMatchItem = {
  music: string;
  cover: string;
};

export type MatchItemType = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  music: MusicDataMatchItem;
};
