import { useState, useRef, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerSize, setContainerSize] = useState(350);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const size = Math.min(
          window.innerWidth - 40,
          window.innerHeight - 100,
          600
        );
        setContainerSize(size);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Обработчики свайпов
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.stopPropagation(); // Останавливаем всплытие
      e.preventDefault();
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation(); // Останавливаем всплытие
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.stopPropagation(); // Останавливаем всплытие
      e.preventDefault();
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (delta > 50) {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (delta < -50) {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
      touchStartX.current = null;
    };

    carouselElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    carouselElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    carouselElement.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });

    return () => {
      carouselElement.removeEventListener("touchstart", handleTouchStart);
      carouselElement.removeEventListener("touchmove", handleTouchMove);
      carouselElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [images]);

  return (
    <div className="carousel-wrapper" ref={carouselRef}>
      <div
        className="carousel"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
        }}
      >
        <div className="carousel-indicator">
          {images.map((_, index) => (
            <div
              key={index}
              className={`indicator-segment ${
                index === activeIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
        <img
          className="carousel-image"
          src={images[activeIndex]}
          alt={`Image ${activeIndex + 1}`}
        />
      </div>
    </div>
  );
};
