import { useEffect, useState } from "react";
import { UserCard } from "../components/userCard/UserCard";
import { SelectMatch } from "../components/UI/selectMatch/SelectMatch";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetRecommendationsQuery,
  useLikeTargetMutation,
  useDislikeTargetMutation,
} from "../api/usersApi";
import type { RecommendationUser } from "../components/userCard/userType";

export const MatchFeed = () => {
  const size = 1;
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<RecommendationUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  const { data, isSuccess, isLoading, isError } = useGetRecommendationsQuery({
    page,
    size,
  });
  const [likeTarget] = useLikeTargetMutation();
  const [dislikeTarget] = useDislikeTargetMutation();

  // Обновление списка пользователей при загрузке новой страницы
  useEffect(() => {
    if (isSuccess) {
      if (data && data.length > 0) {
        setUsers((prev) => [...prev, ...data]);
      } else if (data && data.length === 0 && currentIndex >= users.length) {
        // Если данных нет и все пользователи просмотрены, очищаем список
        setUsers([]);
      }
    }
  }, [data, isSuccess, currentIndex]);

  // Единая функция для обработки действий (свайп или кнопка)
  const performAction = async (action: "like" | "dislike") => {
    const currentUser = users[currentIndex];
    if (!currentUser) return;

    // Отправка запроса
    try {
      if (action === "like") {
        await likeTarget(currentUser.userId).unwrap();
      } else if (action === "dislike") {
        await dislikeTarget(currentUser.userId).unwrap();
      }
    } catch (error) {
      console.log(`Ошибка при ${action}:`, error);
      return;
    }

    // Запуск анимации свайпа
    setSwipeDirection(action === "like" ? "right" : "left");
  };

  // Обработка завершения анимации
  const handleAnimationComplete = () => {
    if (swipeDirection) {
      setSwipeDirection(null);
      const nextIndex = currentIndex + 1;

      if (nextIndex < users.length) {
        // Переход к следующему пользователю
        setCurrentIndex(nextIndex);
      } else {
        // Если пользователей больше нет, увеличиваем страницу
        setPage((prev) => prev + 1);
        setCurrentIndex(nextIndex);
      }
    }
  };

  // Обработчики свайпов
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

  // Обработка состояний
  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки рекомендаций</p>;
  if (!users.length && (!data || data.length === 0)) {
    return <p>Нет доступных пользователей</p>;
  }

  const currentUser = users[currentIndex];
  if (!currentUser) {
    return <p>Нет доступных пользователей</p>;
  }

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
            <UserCard {...currentUser} isAutoplay={false} />
          </motion.div>
        </AnimatePresence>
      </div>

      <SelectMatch onAction={performAction} />
    </main>
  );
};
