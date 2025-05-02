import { CustomAvatar } from "../UI/avatar/CustomAvatar";
//import avatar from "../../assets/testAvatar.png";
import arrowBack from "../../assets/chat/ArrowBack.svg";
import type { HeaderType } from "./headerType";
import { useNavigate } from "react-router";

export const ChatHeader = ({ name, avatar, isOnline }: HeaderType) => {
  // const name = "Anastasia";
  // const isOnline = true;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <header className="chat-header">
      <button onClick={handleClick} className="chat-header__back">
        <img src={arrowBack} alt="назад" />
      </button>

      <CustomAvatar avatar={avatar} online={isOnline} size={40} isChat={true} />

      <div className="chat-header__info">
        <div className="chat-header__name">{name}</div>
        <div className={`chat-header__status`}>
          {isOnline ? "online" : "offline"}
        </div>
      </div>
    </header>
  );
};
