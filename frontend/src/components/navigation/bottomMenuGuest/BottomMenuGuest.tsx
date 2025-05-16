import { useEffect, useState } from "react";
import LentMatch from "../../../assets/bottomMenuIconNew/music.svg";
import LentMatchActive from "../../../assets/bottomMenuIconNew/musicActive.svg";
import ListChat from "../../../assets/bottomMenuIconNew/chat.svg";
import ListChatActive from "../../../assets/bottomMenuIconNew/chatActive.svg";
import ListYourMatch from "../../../assets/bottomMenuIconNew/match.svg";
import ListYourMatchActive from "../../../assets/bottomMenuIconNew/matchActive.svg";
import Profile from "../../../assets/bottomMenuIconNew/profile.svg";
import ProfileActive from "../../../assets/bottomMenuIconNew/profileActive.svg";
import { BottomNavBtn } from "../../UI/buttons/bottomNavBtn/BottomNavBtn";
import { Outlet, useLocation, useNavigate } from "react-router";
export const BottomMenuGuest = () => {
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

  useEffect(() => {
    const path = location.pathname;
    const index = links.findIndex((link) => path.startsWith(link));
    if (index >= 0) {
      setActiveIndex(index);
    }
  }, [location]);

  const handleClick = (index: number) => {
    if (index !== 0) return; // гостю нельзя переходить
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
            onClick={() => handleClick(index)}
            disabled={index !== 0} // только первая активна
            customClassName={
              index === 0 ? "large-left" : index === 2 ? "large-center" : ""
            }
          />
        ))}
      </footer>
    </div>
  );
};
