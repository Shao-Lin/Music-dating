import { Menu, MenuItem } from "@mui/material";
import { MouseEvent, useRef, useState } from "react";
import iconMenu from "../../../assets/serviceImages/carouselMenu.svg";

interface CarouselMenuProps {
  isAvatar: boolean;
  onChangeAvatar?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onDeletePhoto?: () => void;
}

export const CarouselMenu = ({
  isAvatar,
  onChangeAvatar,
  onDeletePhoto,
}: CarouselMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("Клик по кнопке меню");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = () => {
    if (isAvatar) {
      // Открываем выбор файла
      inputRef.current?.click();
    } else {
      onDeletePhoto?.();
    }
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        onPointerDown={(e) => e.stopPropagation()} // Останавливаем распространение события
        className="carousel-menu-button"
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "white",
          borderRadius: "50%",
          padding: 6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img src={iconMenu} alt="menu" style={{ width: 20, height: 20 }} />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => onChangeAvatar?.(e)}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            backgroundColor: "white",
            borderRadius: "8px",
            minWidth: 140,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            paddingY: "4px",
          },
        }}
      >
        <MenuItem
          onClick={handleAction}
          sx={{
            color: "#FE6D87",
            fontSize: "16px",
            paddingY: "4px",
            justifyContent: "center",
          }}
        >
          {isAvatar ? "Сменить аватар" : "Удалить фото"}
        </MenuItem>
      </Menu>
    </>
  );
};
