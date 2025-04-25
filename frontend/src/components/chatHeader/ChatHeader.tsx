import { CustomAvatar } from "../UI/avatar/CustomAvatar";
import testAvatar from "../../assets/testAvatar.png";
import arrowBack from "../../assets/ArrowBack.svg";

export const ChatHeader = () => {
  const name = "Anastasia";
  const isOnline = true;

  return (
    <header className="chat-header">
      <button className="chat-header__back">
        <img src={arrowBack} alt="назад" />
      </button>

      <CustomAvatar
        avatar={testAvatar}
        online={isOnline}
        size={40}
        isChat={true}
      />

      <div className="chat-header__info">
        <div className="chat-header__name">{name}</div>
        <div className={`chat-header__status`}>
          {isOnline ? "online" : "offline"}
        </div>
      </div>
    </header>
  );
};
