import { MatchItem } from "../components/matchItem/MatchItem";
//import { useGetListUserMatchesQuery } from "../api/matchesApi";

import {
  MusicDataMatchItem,
  MatchItemType,
} from "../components/matchItem/matchItemType";
import testAvatar from "../assets/testAvatar.png";
import sound from "../assets/testMusic/linkin-park-in-the-end-original_(bobamuz.online).mp3";
//import coverImage from "../assets/musicButton/cover.png";
import cov8 from "../assets/testMusic/cov8.png";

export const ListOfMatches = () => {
  //const { data: listUsers } = useGetListUserMatchesQuery();

  const musicTest: MusicDataMatchItem = {
    music: sound,
    cover: cov8,
  };
  const test1: MatchItemType = {
    id: "1",
    name: "Екатерина",
    avatar: testAvatar,
    online: false,
    music: musicTest,
  };
  const test2: MatchItemType = {
    id: "2",
    name: "Даша",
    avatar: testAvatar,
    online: true,
    music: musicTest,
  };
  const test3: MatchItemType = {
    id: "3",
    name: "Маша",
    avatar: testAvatar,
    online: false,
    music: musicTest,
  };
  const test4: MatchItemType = {
    id: "4",
    name: "Маша",
    avatar: testAvatar,
    online: false,
    music: musicTest,
  };
  const test5: MatchItemType = {
    id: "5",
    name: "Маша",
    avatar: testAvatar,
    online: false,
    music: musicTest,
  };
  const test6: MatchItemType = {
    id: "6",
    name: "Маша",
    avatar: testAvatar,
    online: false,
    music: musicTest,
  };
  const test7: MatchItemType = {
    id: "7",
    name: "Маша",
    avatar: testAvatar,
    online: false,
    music: musicTest,
  };
  const testList = [test1, test2, test3, test4, test5, test6, test7];
  return (
    <main className="content">
      <div className="content-inner">
        <div className="header-chat-and-Matches">Vibe</div>

        {testList.map((item) => (
          <MatchItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};
