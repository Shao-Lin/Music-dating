import { useEffect, useState } from "react";
import { UserCard } from "../components/userCard/UserCard";
import { SelectMatch } from "../components/UI/selectMatch/SelectMatch";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { useGetRecommendationsQuery } from "../api/usersApi";
import { UserData } from "../components/userCard/userType";

export const MatchFeed = () => {
  const size = 5;
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  const { data, isSuccess } = useGetRecommendationsQuery({ page, size });

  console.log(data);
  // Добавление новых пользователей при загрузке новой страницы
  useEffect(() => {
    if (isSuccess && data) {
      setUsers((prev) => [...prev, ...data]);
    }
  }, [data, isSuccess]);

  const handleSwipe = (action: "like" | "dislike") => {
    setSwipeDirection(action === "like" ? "right" : "left");

    setTimeout(() => {
      setSwipeDirection(null);

      // Переход к следующему пользователю
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // Если мы показали последнего из текущей пачки — загружаем следующую
      if (nextIndex >= users.length) {
        setPage((prev) => prev + 1);
      }
    }, 300);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (e) => {
      const target = e.event.target as HTMLElement;
      if (!target.closest(".carousel")) {
        handleSwipe("dislike");
      }
    },
    onSwipedRight: (e) => {
      const target = e.event.target as HTMLElement;
      if (!target.closest(".carousel")) {
        handleSwipe("like");
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  const currentUser = users[currentIndex];

  if (!currentUser) return <p>Загрузка...</p>;

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
            <UserCard {...currentUser} isAutoplay={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      <SelectMatch
        meId={currentUser.userId} // или другой id текущего пользователя
        feedId={currentUser.userId}
        onSwipe={handleSwipe}
      />
    </main>
  );
};
