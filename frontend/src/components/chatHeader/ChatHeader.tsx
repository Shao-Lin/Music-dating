import { CustomAvatar } from "../UI/avatar/CustomAvatar";
//import avatar from "../../assets/testAvatar.png";
import arrowBack from "../../assets/ArrowBack.svg";
import type { HeaderType } from "./headerType";

export const ChatHeader = ({ name, avatar, isOnline }: HeaderType) => {
  // const name = "Anastasia";
  // const isOnline = true;

  return (
    <header className="chat-header">
      <button className="chat-header__back">
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
