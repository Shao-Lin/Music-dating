import { useState } from "react";
import { UserCard } from "../components/userCard/UserCard";
import { SelectMatch } from "../components/UI/selectMatch/SelectMatch";

import one from "../assets/testCarousel/one.jpg";
import two from "../assets/testCarousel/two.png";
import three from "../assets/testCarousel/three.jpg";

import sev from "../assets/testCarousel/sev.webp";
import eig from "../assets/testCarousel/eig.webp";
import nine from "../assets/testCarousel/nine.webp";

import cov2 from "../assets/testMusic/obloj2.webp";
import cov3 from "../assets/testMusic/obloj3.webp";
import cov6 from "../assets/testMusic/cov6.jpg";

import sound from "../assets/testMusic/linkin-park-in-the-end-original_(bobamuz.online).mp3";
//import coverImage from "../assets/musicButton/coverUrl.png";
import { MusicData, UserData } from "../components/userCard/userType";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion"; // NEW

export const MatchFeed = () => {
  const photos2 = [one, two, three];
  const photos3 = [sev, eig];
  const photos4 = [nine];

  const musicdata: MusicData = {
    name: "In the end",
    coverUrl: cov3,
    url: sound,
  };
  const musicdata2: MusicData = {
    name: "Miracle",
    coverUrl: cov2,
    url: sound,
  };

  const musicdata3: MusicData = {
    name: "Fragile",
    coverUrl: cov6,
    url: sound,
  };
  const arrMusic1 = [musicdata];
  const arrMusic2 = [musicdata2];
  const arrMusic3 = [musicdata3];
  const birthDate = "2007-05-02";
  const birthDate2 = "2002-05-02";
  const birthDate3 = "2004-05-02";

  const test1: UserData = {
    userId: "1",
    photos: photos2,
    name: "Алина",
    birthDate: birthDate,
    city: "Воронеж",
    tracks: arrMusic1,
  };

  const test2: UserData = {
    userId: "2",
    photos: photos3,
    name: "Дарья",
    birthDate: birthDate2,
    city: "Москва",
    tracks: arrMusic2,
  };

  const test3: UserData = {
    userId: "3",
    photos: photos4,
    name: "Ксения",
    birthDate: birthDate3,
    city: "Нижний Новгород",
    tracks: arrMusic3,
  };

  const arrTest = [test1, test2, test3];

  const userId = { userId: "123" };

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = arrTest[currentIndex];
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  const handleSwipe = (action: "like" | "dislike") => {
    setSwipeDirection(action === "like" ? "right" : "left");

    setTimeout(() => {
      setSwipeDirection(null); // сброс анимации
      if (currentIndex < arrTest.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        console.log("Больше пользователей нет");
      }
    }, 300); // немного подождём, чтобы анимация проигралась
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      // Check if the swipe originated from the carousel
      const target = eventData.event.target as HTMLElement | null;
      if (target && !target.closest(".carousel")) {
        handleSwipe("dislike");
      }
    },
    onSwipedRight: (eventData) => {
      // Check if the swipe originated from the carousel
      const target = eventData.event.target as HTMLElement | null;
      if (target && !target.closest(".carousel")) {
        handleSwipe("like");
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <main className="match-feed">
      <div className="card-wrapper" {...swipeHandlers}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentUser.userId}
            initial={{ x: 0, opacity: 1 }}
            animate={{
              x:
                swipeDirection === "left"
                  ? -300
                  : swipeDirection === "right"
                  ? 300
                  : 0,
              opacity: swipeDirection ? 0 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="animated-card"
          >
            <UserCard {...currentUser} />
          </motion.div>
        </AnimatePresence>
      </div>
      <SelectMatch
        meId={userId.userId}
        feedId={currentUser.userId}
        onSwipe={handleSwipe}
      />
    </main>
  );
};
