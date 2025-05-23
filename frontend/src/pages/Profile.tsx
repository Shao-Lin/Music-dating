import "../styles/main.scss";
import { UserCard } from "../components/userCard/UserCard";
import { ActionMenu } from "../components/navigation/actionMenu/ActionMenu";
import { useGetUserDataQuery } from "../api/userApi";

import { WaitingPage } from "./servicePages/waiting/WaitingPage";
export const Profile = () => {
  const { data, isLoading, isSuccess } = useGetUserDataQuery(undefined);

  if (isLoading || !data) return <WaitingPage />;
  if (!isSuccess) return <WaitingPage />;
  console.log(data);

  return (
    <main>
      <UserCard {...data} isAutoplay={false} isProfile={true} />
      <ActionMenu />
    </main>
  );
};
