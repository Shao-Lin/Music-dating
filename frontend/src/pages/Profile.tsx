import "../styles/main.scss";
import { UserCard } from "../components/userCard/UserCard";
import { ActionMenu } from "../components/navigation/actionMenu/ActionMenu";

//import four from "../assets/testCarousel/four.webp";
//import five from "../assets/testCarousel/five.jpg";
//import six from "../assets/testCarousel/six.jpg";

import sound from "../assets/testMusic/mind.mp3";

import { MusicData } from "../components/userCard/userType";
//import { UserData } from "../components/userCard/userType";
import cov5 from "../assets/testMusic/cov5.jpg";

import { useGetUserDataQuery } from "../api/userApi";
import { normalizeUserData } from "../utils/normalizeUser";
export const Profile = () => {
  const { data, isLoading, isSuccess } = useGetUserDataQuery();
  console.log(data);

  if (isLoading || !data) return <div>Загрузка...</div>;
  if (!isSuccess) return <div>Загрузка...</div>;

  //const photos2 = [four, five, six];

  const musicdata: MusicData = {
    name: "Mind",
    cover: cov5,
    music: sound,
  };
  const arrMusic = [musicdata, musicdata];
  const birthDate: Date = new Date(2006, 11, 21);

  //const test1: UserData = {
  //id: "1",
  //photos: photos2,
  //name: "Тайлер",
  //birthday: birthDate,
  //city: "г.Воронеж",
  //tracks: arrMusic,
  //};

  const normalizeUser = normalizeUserData(data, arrMusic, birthDate);

  //if (!data.photos || !Array.isArray(data.tracks)) {
  //return <div>Данные пользователя неполные</div>;
  //}

  return (
    <main>
      <UserCard {...normalizeUser} />
      <ActionMenu />
    </main>
  );
};
