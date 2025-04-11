import React from "react";
interface BottomNavBtnProps {
  icon: string;
  activeIcon: string;
  isActive: boolean;
  onClick: () => void;
  customClassName?: string;
}
export const BottomNavBtn: React.FC<BottomNavBtnProps> = ({
  icon,
  activeIcon,
  isActive,
  onClick,
  customClassName = "",
}) => {
  return (
    <button className={`bottom-nav-btn ${customClassName}`} onClick={onClick}>
      <img src={isActive ? activeIcon : icon} alt="nav icon" />
    </button>
  );
};
