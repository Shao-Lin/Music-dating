export type MusicDataMatchItem = {
  coverUrl: string;
  name: string;
  url: string;
  isMain: boolean;
  trackId: string;
};

export type MatchItemType = {
  userId: string;
  name: string;
  avatarUrl: string;
  online?: boolean;
  tracks: MusicDataMatchItem[];
};
