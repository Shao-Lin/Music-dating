export type MusicData = {
  name: string;
  coverUrl: string;
  url: string;
  isMain: boolean;
  trackId: string;
};

export type Photos = {
  photoId: string;
  url: string;
};

export type UserData = {
  userId: string;
  photos: Photos[];
  avatarUrl: string;
  name: string;
  birthDate: string;
  city: string;
  tracks: MusicData[];
};

export type UserId = {
  id: string;
};

export type RecommendationUser = {
  userId: string;
  name: string;
  about: string;
  birthDate: string; // ISO-формат даты, например: "1998-05-12"
  city: string;
  gender: "male" | "female" | string; // если гендер может быть иным — оставим string
  avatarUrl: string;
  photos: {
    photoId: string;
    url: string;
  }[];
  tracks: {
    coverUrl: string;
    name: string;
    url: string;
    isMain: boolean;
    trackId: string;
  }[];
};
