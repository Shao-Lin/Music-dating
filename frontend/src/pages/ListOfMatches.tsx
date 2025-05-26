import { MatchItem } from "../components/matchItem/MatchItem";
import { useGetMatchesDataQuery } from "../api/usersApi";

export const ListOfMatches = () => {
  const { data = [] } = useGetMatchesDataQuery(undefined, {
    pollingInterval: 20000, // 20 секунд
  });
  console.log(data);

  return (
    <main className="content">
      <div className="content-inner">
        <div className="header-chat-and-Matches">Vibe</div>

        {data.map((item, index) => (
          <MatchItem key={index} item={item} />
        ))}
      </div>
    </main>
  );
};
