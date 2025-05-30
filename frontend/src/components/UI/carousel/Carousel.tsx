import { useState, useRef, useEffect, useCallback } from "react";
import { CarouselMenu } from "../../UI/menu/CarouselMenu";
import {
  useDeletePhotoMutation,
  usePatchAvatarMutation,
} from "../../../api/userApi";

export type CarouselImage = {
  photoId: string;
  url: string;
};

interface CarouselProps {
  avatarUrl: string;
  photos: CarouselImage[];
  showMenuButton: boolean;
}

export const Carousel = ({
  avatarUrl,
  photos,
  showMenuButton,
}: CarouselProps) => {
  const [deletePhoto] = useDeletePhotoMutation();
  const [patchAvatar] = usePatchAvatarMutation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerSize, setContainerSize] = useState(350);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null); // Новый ref для изображения
  const touchStartX = useRef<number | null>(null);

  const images: CarouselImage[] = [
    { photoId: "avatar", url: avatarUrl },
    ...photos,
  ];

  const currentImage = images[activeIndex];
  const isAvatar = currentImage.photoId === "avatar";

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await patchAvatar(formData).unwrap();
      if (e.target) {
        e.target.value = "";
      }
    } catch (error) {
      console.error("Ошибка при смене аватара:", error);
    }
  };

  const handleDeletePhoto = useCallback(async () => {
    try {
      await deletePhoto(currentImage.photoId).unwrap();
      if (activeIndex >= images.length - 1) {
        setActiveIndex(Math.max(0, activeIndex - 1));
      }
    } catch (error) {
      console.error("Ошибка при удалении фото:", error);
    }
  }, [currentImage.photoId, activeIndex, images.length, deletePhoto]);

  // Resize
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

  // Swipe
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handlePointerDown = (e: PointerEvent) => {
      console.log("Начало свайпа");
      touchStartX.current = e.clientX;
    };

    const handlePointerUp = (e: PointerEvent) => {
      console.log("Конец свайпа");
      if (touchStartX.current === null) return;

      const delta = e.clientX - touchStartX.current;
      if (delta > 50) {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (delta < -50) {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }

      touchStartX.current = null;
    };

    imageElement.addEventListener("pointerdown", handlePointerDown);
    imageElement.addEventListener("pointerup", handlePointerUp);

    return () => {
      imageElement.removeEventListener("pointerdown", handlePointerDown);
      imageElement.removeEventListener("pointerup", handlePointerUp);
    };
  }, [images]);

  return (
    <div className="carousel-wrapper" ref={carouselRef}>
      <div
        className="carousel"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          position: "relative",
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

        <div ref={imageRef} className="image-container">
          <img
            key={currentImage.photoId}
            className="carousel-image"
            src={currentImage.url}
            alt={`Image ${activeIndex + 1}`}
          />
        </div>

        {showMenuButton && (
          <CarouselMenu
            isAvatar={isAvatar}
            onChangeAvatar={handleChangeAvatar}
            onDeletePhoto={handleDeletePhoto}
          />
        )}
      </div>
    </div>
  );
};
