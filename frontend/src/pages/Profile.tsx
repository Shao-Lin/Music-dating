import "../styles/main.scss";
import { UserCard } from "../components/userCard/UserCard";
import { ActionMenu } from "../components/navigation/actionMenu/ActionMenu";
export const Profile = () => {
  return (
    <main>
      <UserCard />
      <ActionMenu />
    </main>
  );
};
