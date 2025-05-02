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
  music: MusicData;
};

export type UserId = {
  id: number;
};
