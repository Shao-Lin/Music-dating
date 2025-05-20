// useYandexPageview.ts
// useYandexPageview.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Объявляем тип для глобального объекта ym
declare global {
  interface Window {
    ym?: (counterId: number, action: "hit", url: string) => void;
  }
}

export const useYandexPageview = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.ym) {
      window.ym(102028659, "hit", location.pathname + location.search);
    }
  }, [location]);
};
