import { useEffect, useState, useRef } from "react";
import { UserCard } from "../components/userCard/UserCard";
import { SelectMatch } from "../components/UI/selectMatch/SelectMatch";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetRecommendationsQuery,
  useLikeTargetMutation,
  useDislikeTargetMutation,
} from "../api/usersApi";
import { useCreateChatMutation } from "../api/chatApi";
import type { RecommendationUser } from "../components/userCard/userType";
import { useGetSettingsDataQuery } from "../api/settingsAndEditProfileApi";

export const MatchFeed = () => {
  const size = 5;
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<RecommendationUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const { data: dataSettings } = useGetSettingsDataQuery(undefined);

  const loadedUserIds = useRef(new Set<string>()); // ⬅️ отслеживание уникальных пользователей

  const { data, isSuccess, isLoading, isError } = useGetRecommendationsQuery({
    page,
    size,
  });

  const [likeTarget] = useLikeTargetMutation();
  const [dislikeTarget] = useDislikeTargetMutation();
  const [createChat] = useCreateChatMutation();

  // Загружаем новых пользователей, фильтруя повторяющихся
  useEffect(() => {
    if (isSuccess && data) {
      const newUsers = data.filter(
        (user) => !loadedUserIds.current.has(user.userId)
      );

      if (newUsers.length > 0) {
        newUsers.forEach((user) => loadedUserIds.current.add(user.userId));
        setUsers((prev) => [...prev, ...newUsers]);
      }
    }
  }, [data, isSuccess]);

  // Начальная очистка
  useEffect(() => {
    setPage(0);
    setUsers([]);
    setCurrentIndex(0);
    loadedUserIds.current.clear();
  }, []);

  const performAction = async (action: "like" | "dislike") => {
    const currentUser = users[currentIndex];
    if (!currentUser) return;

    try {
      if (action === "like") {
        const { mutualMatch } = await likeTarget(currentUser.userId).unwrap();
        console.log(mutualMatch);

        if (mutualMatch) {
          try {
            await createChat([currentUser.userId]).unwrap();
          } catch (error) {
            console.error(`Ошибка при создании чата`, error);
          }
        }
      } else {
        await dislikeTarget(currentUser.userId).unwrap();
      }
    } catch (error) {
      console.log(`Ошибка при ${action}:`, error);
      return;
    }

    setSwipeDirection(action === "like" ? "right" : "left");
  };

  const handleAnimationComplete = () => {
    if (swipeDirection) {
      setSwipeDirection(null);
      const nextIndex = currentIndex + 1;

      if (nextIndex < users.length) {
        setCurrentIndex(nextIndex);
      } else {
        setPage((prev) => prev + 1);
        setCurrentIndex(nextIndex);
      }
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (e) => {
      const target = e.event.target as HTMLElement;
      if (!target.closest(".carousel")) {
        performAction("dislike");
      }
    },
    onSwipedRight: (e) => {
      const target = e.event.target as HTMLElement;
      if (!target.closest(".carousel")) {
        performAction("like");
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  if (isLoading && users.length === 0) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки рекомендаций</p>;
  if (!users.length)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <p>Нет доступных пользователей</p>
      </div>
    );

  const currentUser = users[currentIndex];
  if (!currentUser)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <p>Нет доступных пользователей</p>
      </div>
    );

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
            transition={{ duration: 0.3 }}
            onAnimationComplete={handleAnimationComplete}
            className="animated-card"
          >
            <UserCard {...currentUser} isAutoplay={dataSettings.autoplay} />
          </motion.div>
        </AnimatePresence>
      </div>

      <SelectMatch onAction={performAction} />
    </main>
  );
};
