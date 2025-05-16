export type MusicData = {
  name: string;
  coverUrl: string;
  url: string;
};

export type UserData = {
  userId: string;
  photos: string[];
  name: string;
  birthDate: string;
  city: string;
  tracks: MusicData[];
};

export type UserId = {
  id: string;
};
