import "../styles/main.scss";
import { UserCard } from "../components/userCard/UserCard";
import { ActionMenu } from "../components/navigation/actionMenu/ActionMenu";
import sound from "../assets/testMusic/mind.mp3";
import { MusicData } from "../components/userCard/userType";
import cov5 from "../assets/testMusic/cov5.jpg";
import { useGetUserDataQuery } from "../api/userApi";
import { normalizeUserData } from "../utils/normalizeUser";
import { WaitingPage } from "./servicePages/waiting/WaitingPage";
export const Profile = () => {
  const { data, isLoading, isSuccess } = useGetUserDataQuery(undefined);

  if (isLoading || !data) return <WaitingPage />;
  if (!isSuccess) return <WaitingPage />;
  console.log(data);

  const musicdata: MusicData = {
    name: "Mind",
    coverUrl: cov5,
    url: sound,
  };
  const arrMusic = [musicdata, musicdata];

  const normalizeUser = normalizeUserData(data, arrMusic);

  return (
    <main>
      <UserCard {...normalizeUser} />
      <ActionMenu />
    </main>
  );
};
