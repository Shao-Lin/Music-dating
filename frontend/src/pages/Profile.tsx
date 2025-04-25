import "../styles/main.scss";
import { UserCard } from "../components/userCard/UserCard";
import { ActionMenu } from "../components/navigation/actionMenu/ActionMenu";

import one from "../assets/testCarousel/one.webp";
import two from "../assets/testCarousel/two.png";
import three from "../assets/testCarousel/three.png";

import sound from "../assets/testMusic/linkin-park-in-the-end-original_(bobamuz.online).mp3";
import coverImage from "../assets/musicButton/cover.png";
import { MusicData } from "../components/userCard/userType";
import { UserData } from "../components/userCard/userType";

//import { useGetUserDataQuery } from "../api/userApi";
export const Profile = () => {
  //const { data, isLoading } = useGetUserDataQuery();

  //if (isLoading) return <div>Загрузка...</div>;

  const photos2 = [one, two, three];

  const musicdata: MusicData = {
    name: "In the end",
    cover: coverImage,
    music: sound,
  };
  const birthDate: Date = new Date(2006, 11, 21);

  const test1: UserData = {
    id: 1,
    photos: photos2,
    name: "Алина",
    birthday: birthDate,
    city: "Воронеж",
    music: musicdata,
  };

  return (
    <main>
      <UserCard {...test1} />
      <ActionMenu />
    </main>
  );
};
