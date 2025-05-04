import { useState, useRef, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerSize, setContainerSize] = useState(350); // Начальный размер
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const arrImages = [images];

  // Ресайз обработчик
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const size = Math.min(
          window.innerWidth - 40, // 20px padding с каждой стороны
          window.innerHeight - 100, // Отступ от верха/низа
          600 // Максимальный размер
        );
        setContainerSize(size);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) {
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (delta < -50) {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
    touchStartX.current = null;
  };

  return (
    <div className="carousel-wrapper" ref={containerRef}>
      <div
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
        }}
      >
        <div className="carousel-indicator">
          {arrImages.map((_, index) => (
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
