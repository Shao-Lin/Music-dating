import { UserCard } from "../components/userCard/UserCard";
import { SelectMatch } from "../components/UI/selectMatch/SelectMatch";
export const MatchFeed = () => {
  return (
    <main className="content">
      <UserCard />
      <SelectMatch />
    </main>
  );
};
