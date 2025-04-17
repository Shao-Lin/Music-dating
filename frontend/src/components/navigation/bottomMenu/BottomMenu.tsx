import { useEffect, useState } from "react";
import LentMatch from "../../../assets/bottomMenuIcon/LentMatch.png";
import LentMatchActive from "../../../assets/bottomMenuIcon/LentMatchActive.png";
import ListChat from "../../../assets/bottomMenuIcon/ListChat.png";
import ListChatActive from "../../../assets/bottomMenuIcon/ListChatActive.png";
import ListYourMatch from "../../../assets/bottomMenuIcon/ListYourMatch.svg";
import ListYourMatchActive from "../../../assets/bottomMenuIcon/ListYourMatchActive.svg";
import Profile from "../../../assets/bottomMenuIcon/Profile.png";
import ProfileActive from "../../../assets/bottomMenuIcon/ProfileActive.png";
import { BottomNavBtn } from "../../UI/buttons/bottomNavBtn/BottomNavBtn";
import { Outlet, useLocation, useNavigate } from "react-router";
export const BottomMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LentMatch, activeIcon: LentMatchActive },
    { icon: ListChat, activeIcon: ListChatActive },
    { icon: ListYourMatch, activeIcon: ListYourMatchActive },
    { icon: Profile, activeIcon: ProfileActive },
  ];

  const links = ["/matchFeed", "/listChat", "/listMatch", "/profile"];

  // Автоматически определяем активный индекс при изменении пути
  useEffect(() => {
    const path = location.pathname;
    const index = links.findIndex((link) => path.startsWith(link));
    if (index >= 0) {
      setActiveIndex(index);
    }
  }, [location]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    navigate(links[index]);
  };

  return (
    <div className="app-layout">
      <div className="content">
        <Outlet />
      </div>

      <footer className="app-footer">
        {menuItems.map((item, index) => (
          <BottomNavBtn
            key={index}
            icon={item.icon}
            activeIcon={item.activeIcon}
            isActive={index === activeIndex}
            onClick={() => handleClick(index)} // Исправлено - теперь вызывается
            customClassName={
              index === 0 ? "large-left" : index === 2 ? "large-center" : ""
            }
          />
        ))}
      </footer>
    </div>
  );
};
