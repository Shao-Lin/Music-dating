export type MusicData = {
  name: string;
  cover: string;
  music: string;
};

export type UserData = {
  id: string;
  photos: string[];
  name: string;
  birthday: Date;
  city: string;
  tracks: MusicData[];
};

export type UserId = {
  id: string;
};
