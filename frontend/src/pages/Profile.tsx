import "../styles/main.scss";
import { BottomMenu } from "../components/navigation/bottomMenu/BottomMenu";
import { UserCard } from "../components/userCard/UserCard";
import { ActionMenu } from "../components/navigation/actionMenu/ActionMenu";
export const Profile = () => {
  return (
    <div className="app-layout">
      <main className="content">
        <UserCard />
        <ActionMenu />
      </main>
      <BottomMenu />
    </div>
  );
};
