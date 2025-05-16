import { UserData, MusicData } from "../components/userCard/userType";

interface RawUserData {
  userId?: string;
  name?: string;
  birthDate?: string;
  city?: string;
  photos?: string[];
  avatarUrl?: string;
  tracks?: MusicData[];
}

export const normalizeUserData = (
  raw: RawUserData,
  fallbackMusic: MusicData[]
): UserData => {
  return {
    userId: raw.userId ?? "unknown-id",
    name: raw.name ?? "Без имени",
    birthDate: raw.birthDate ?? "1999-05-02",
    city: raw.city ?? "Не указан",
    photos: raw.photos?.length ? raw.photos : [raw.avatarUrl ?? "/default.jpg"],
    tracks: raw.tracks?.length ? raw.tracks : fallbackMusic,
  };
};
