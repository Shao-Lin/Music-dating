import { useState } from "react";
import { UserCard } from "../components/userCard/UserCard";
import { SelectMatch } from "../components/UI/selectMatch/SelectMatch";

import one from "../assets/testCarousel/one.webp";
import two from "../assets/testCarousel/two.png";
import three from "../assets/testCarousel/three.jpg";

import sev from "../assets/testCarousel/sev.webp";
import eig from "../assets/testCarousel/eig.webp";
import nine from "../assets/testCarousel/nine.webp";

import cov2 from "../assets/testMusic/obloj2.webp";
import cov3 from "../assets/testMusic/obloj3.webp";
import cov6 from "../assets/testMusic/cov6.jpg";

import sound from "../assets/testMusic/linkin-park-in-the-end-original_(bobamuz.online).mp3";
//import coverImage from "../assets/musicButton/cover.png";
import { MusicData, UserData } from "../components/userCard/userType";

export const MatchFeed = () => {
  const photos2 = [one, two, three];
  const photos3 = [sev, eig];
  const photos4 = [nine];

  const musicdata: MusicData = {
    name: "In the end",
    cover: cov3,
    music: sound,
  };
  const musicdata2: MusicData = {
    name: "Miracle",
    cover: cov2,
    music: sound,
  };

  const musicdata3: MusicData = {
    name: "Fragile",
    cover: cov6,
    music: sound,
  };
  const birthDate: Date = new Date(2006, 11, 21);
  const birthDate2: Date = new Date(2002, 11, 21);
  const birthDate3: Date = new Date(2004, 11, 21);

  const test1: UserData = {
    id: "1",
    photos: photos2,
    name: "Алина",
    birthday: birthDate,
    city: "г.Воронеж",
    music: musicdata,
  };

  const test2: UserData = {
    id: "2",
    photos: photos3,
    name: "Дарья",
    birthday: birthDate2,
    city: "г.Москва",
    music: musicdata2,
  };

  const test3: UserData = {
    id: "3",
    photos: photos4,
    name: "Ксения",
    birthday: birthDate3,
    city: "г.Нижний Новгород",
    music: musicdata3,
  };

  const arrTest = [test1, test2, test3];

  const userId = { id: "123" };

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = arrTest[currentIndex];

  const handleSwipe = async () => {
    // Логика можно добавить здесь если нужно
    if (currentIndex < arrTest.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Можно показать сообщение: лента закончилась
      console.log("Больше пользователей нет");
    }
  };

  return (
    <main>
      {currentUser && (
        <>
          <UserCard {...currentUser} />
          <SelectMatch
            meId={userId.id}
            feedId={currentUser.id}
            onSwipe={handleSwipe}
          />
        </>
      )}
    </main>
  );
};
