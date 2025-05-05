import { UserData, MusicData } from "../components/userCard/userType";

interface RawUserData {
  id?: string;
  name?: string;
  birthDate?: string;
  city?: string;
  photos?: string[];
  avatarUrl?: string;
  music?: MusicData[];
}

export const normalizeUserData = (
  raw: RawUserData,
  fallbackMusic: MusicData[]
): UserData => {
  return {
    id: raw.id ?? "unknown-id",
    name: raw.name ?? "Без имени",
    birthDate: raw.birthDate ?? "1999-05-02",
    city: raw.city ?? "Не указан",
    photos: raw.photos?.length ? raw.photos : [raw.avatarUrl ?? "/default.jpg"],
    tracks: raw.music?.length ? raw.music : fallbackMusic,
  };
};
