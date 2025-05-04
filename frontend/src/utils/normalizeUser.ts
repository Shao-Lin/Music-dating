import { UserData, MusicData } from "../components/userCard/userType";

interface RawUserData {
  id?: string;
  name?: string;
  birthday?: string;
  city?: string;
  photos?: string[];
  avatarUrl?: string;
  music?: MusicData[];
}

export const normalizeUserData = (
  raw: RawUserData,
  fallbackMusic: MusicData[],
  fallbackBirthday: Date
): UserData => {
  return {
    id: raw.id ?? "unknown-id",
    name: raw.name ?? "Без имени",
    birthday: raw.birthday ? new Date(raw.birthday) : fallbackBirthday,
    city: raw.city ?? "Не указан",
    photos: raw.photos?.length ? raw.photos : [raw.avatarUrl ?? "/default.jpg"],
    tracks: raw.music?.length ? raw.music : fallbackMusic,
  };
};
