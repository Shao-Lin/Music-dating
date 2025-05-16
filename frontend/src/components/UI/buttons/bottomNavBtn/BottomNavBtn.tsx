import React from "react";
interface BottomNavBtnProps {
  icon: string;
  activeIcon: string;
  isActive: boolean;
  onClick: () => void;
  customClassName?: string;
  disabled?: boolean; // <-- добавили проп
}

export const BottomNavBtn: React.FC<BottomNavBtnProps> = ({
  icon,
  activeIcon,
  isActive,
  onClick,
  customClassName = "",
  disabled = false,
}) => {
  return (
    <button
      className={`bottom-nav-btn ${customClassName}`}
      onClick={onClick}
      disabled={disabled} // <-- применили
      style={{
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }} // визуальное отличие
    >
      <img src={isActive ? activeIcon : icon} alt="nav icon" />
    </button>
  );
};
