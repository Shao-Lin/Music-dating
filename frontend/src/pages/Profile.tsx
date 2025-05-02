import "../styles/main.scss";
import { UserCard } from "../components/userCard/UserCard";
import { ActionMenu } from "../components/navigation/actionMenu/ActionMenu";

import four from "../assets/testCarousel/four.webp";
import five from "../assets/testCarousel/five.jpg";
import six from "../assets/testCarousel/six.jpg";

import sound from "../assets/testMusic/mind.mp3";
import { MusicData } from "../components/userCard/userType";
import { UserData } from "../components/userCard/userType";
import cov5 from "../assets/testMusic/cov5.jpg";

//import { useGetUserDataQuery } from "../api/userApi";
export const Profile = () => {
  //const { data, isLoading } = useGetUserDataQuery();

  //if (isLoading) return <div>Загрузка...</div>;

  const photos2 = [four, five, six];

  const musicdata: MusicData = {
    name: "Mind",
    cover: cov5,
    music: sound,
  };
  const birthDate: Date = new Date(2006, 11, 21);

  const test1: UserData = {
    id: "1",
    photos: photos2,
    name: "Тайлер",
    birthday: birthDate,
    city: "г.Воронеж",
    music: musicdata,
  };

  return (
    <main>
      <UserCard {...test1} />
      <ActionMenu />
    </main>
  );
};
