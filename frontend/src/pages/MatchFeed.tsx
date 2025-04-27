import { UserCard } from "../components/userCard/UserCard";
import { SelectMatch } from "../components/UI/selectMatch/SelectMatch";

import one from "../assets/testCarousel/one.webp";
import two from "../assets/testCarousel/two.png";
import three from "../assets/testCarousel/three.png";

import sound from "../assets/testMusic/linkin-park-in-the-end-original_(bobamuz.online).mp3";
import coverImage from "../assets/musicButton/cover.png";
import { MusicData } from "../components/userCard/userType";
import { UserData } from "../components/userCard/userType";

//import { useGetUserIdQuery } from "../api/userApi";
//import { useGetUserFeedDataQuery } from "../api/userFeedApi";
export const MatchFeed = () => {
  //const {data: userID} = useGetUserIdQuery()
  //const {data: userFeed} = useGetUserFeedDataQuery()

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
  const userId = {
    id: 123,
  };
  return (
    <main>
      <UserCard {...test1} />
      <SelectMatch meId={userId.id} feedId={test1.id} />
    </main>
  );
};
