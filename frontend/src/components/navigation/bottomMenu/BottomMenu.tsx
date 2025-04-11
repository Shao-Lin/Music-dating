import { useState } from "react";
import LentMatch from "../../../assets/bottomMenuIcon/LentMatch.png";
import LentMatchActive from "../../../assets/bottomMenuIcon/LentMatchActive.png";
import ListChat from "../../../assets/bottomMenuIcon/ListChat.svg";
import ListChatActive from "../../../assets/bottomMenuIcon/ListChatActive.svg";
import ListYourMatch from "../../../assets/bottomMenuIcon/ListYourMatch.svg";
import ListYourMatchActive from "../../../assets/bottomMenuIcon/ListYourMatchActive.svg";
import Profile from "../../../assets/bottomMenuIcon/Profile.svg";
import ProfileActive from "../../../assets/bottomMenuIcon/ProfileActive.svg";
import { BottomNavBtn } from "../../UI/buttons/bottomNavBtn/BottomNavBtn";
export const BottomMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { icon: LentMatch, activeIcon: LentMatchActive },
    { icon: ListChat, activeIcon: ListChatActive },
    { icon: ListYourMatch, activeIcon: ListYourMatchActive },
    { icon: Profile, activeIcon: ProfileActive },
  ];
  return (
    <footer className="app-footer">
      {menuItems.map((item, index) => (
        <BottomNavBtn
          key={index}
          icon={item.icon}
          activeIcon={item.activeIcon}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index)}
          customClassName={
            index === 0 ? "large-left" : index === 2 ? "large-center" : ""
          }
        />
      ))}
    </footer>
  );
};
